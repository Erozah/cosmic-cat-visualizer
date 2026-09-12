/**
 * AudioAnalysisEngine.js
 * Comprehensive multi-level musical analysis engine.
 * Integrates Spotify Web API track analysis (segments, beats, tatums, sections),
 * real-time Web Audio API / FFT capture, and organic generative fallback.
 */

class AudioAnalysisEngine {
    constructor() {
        this.currentTrackId = null;
        this.analysisData = null;
        this.isLoading = false;

        // Current smoothed state
        this.state = {
            energy: 0.5,
            volume: 1.0,
            bass: 0.2,
            mids: 0.2,
            highs: 0.2,
            bpm: 120,
            beatImpulse: 0.0,
            beatPhase: 0.0,
            barPhase: 0.0,
            isBeatPulse: false, // Dispatched on EVERY beat (1 per beat)
            is4BeatPulse: false, // Dispatched every 4 beats (1 bar)
            pitches: new Float32Array(12),
            timbre: new Float32Array(12)
        };

        // Internal raw targets for smoothing
        this.targets = {
            energy: 0.5,
            bass: 0.2,
            mids: 0.2,
            highs: 0.2,
            beatImpulse: 0.0
        };

        this.lastBeatIndex = -1;
        this.lastBarIndex = -1;
        this.last4BeatIndex = -1;
        this.liveTime = 0;
        this.lastProgressSec = 0;

        // Fast index pointers for Spotify analysis playback
        this.beatCursor = 0;
        this.barCursor = 0;
        this.sectionCursor = 0;

        // Web Audio API hooks (optional live capture)
        this.audioContext = null;
        this.analyser = null;
        this.freqData = null;
        this.isLiveAudioActive = false;
    }

    /**
     * Load Spotify Audio Analysis for a track ID or URI
     */
    async loadSpotifyAnalysis(trackUriOrId) {
        if (!trackUriOrId) return;
        const trackId = trackUriOrId.replace("spotify:track:", "");
        if (this.currentTrackId === trackId && (this.analysisData || this.isLoading)) return;

        this.currentTrackId = trackId;
        this.isLoading = true;
        this.analysisData = null;
        this.beatCursor = 0;
        this.barCursor = 0;
        this.sectionCursor = 0;

        try {
            // Attempt 1: Spicetify CosmosAsync with Spotify API endpoint
            if (typeof Spicetify !== "undefined" && Spicetify.CosmosAsync) {
                try {
                    const res = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`);
                    if (res && res.track && res.segments) {
                        this.analysisData = res;
                        this.state.bpm = res.track.tempo || 120;
                        this.isLoading = false;
                        return;
                    }
                } catch (e) {
                    // Fallback to partner API
                    try {
                        const resPartner = await Spicetify.CosmosAsync.get(`https://api-partner.spotify.com/pathway/v1/web-player/analysis/${trackId}`);
                        if (resPartner && resPartner.track) {
                            this.analysisData = resPartner;
                            this.state.bpm = resPartner.track.tempo || 120;
                            this.isLoading = false;
                            return;
                        }
                    } catch (err2) {}
                }
            }

            // Attempt 2: Direct fetch (for local or mock server)
            const token = typeof Spicetify !== "undefined" && Spicetify.Platform ? await Spicetify.Platform.AuthorizationAPI.getAccessToken() : null;
            if (token) {
                const response = await fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    this.analysisData = await response.json();
                    this.state.bpm = this.analysisData.track.tempo || 120;
                }
            }
        } catch (error) {
            // Silent fallback to organic synthesizer
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Connect Web Audio API Live Source (microphone, stream, or audio element)
     */
    connectAudioSource(audioSourceNodeOrElement) {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!this.audioContext) {
                this.audioContext = new AudioCtx();
            }
            if (this.audioContext.state === "suspended") {
                this.audioContext.resume();
            }

            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 512;
            this.analyser.smoothingTimeConstant = 0.75;
            this.freqData = new Uint8Array(this.analyser.frequencyBinCount);

            let source;
            if (audioSourceNodeOrElement instanceof HTMLMediaElement) {
                source = this.audioContext.createMediaElementSource(audioSourceNodeOrElement);
                source.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);
            } else if (audioSourceNodeOrElement instanceof MediaStream) {
                source = this.audioContext.createMediaStreamSource(audioSourceNodeOrElement);
                source.connect(this.analyser);
            } else if (audioSourceNodeOrElement instanceof AudioNode) {
                audioSourceNodeOrElement.connect(this.analyser);
            }

            this.isLiveAudioActive = true;
        } catch (e) {
            console.warn("Could not connect live audio analyser:", e);
        }
    }

    /**
     * Main update step called every frame (dt in seconds, progressMs in milliseconds)
     */
    update(dt, progressMs, isPlaying = true, volume = 1.0) {
        this.state.volume = Number.isFinite(volume) ? volume : 1.0;
        this.state.isBeatPulse = false;
        this.state.is4BeatPulse = false;

        const safeDt = Number.isFinite(dt) && dt > 0 ? Math.min(0.1, dt) : 0.016;
        this.liveTime += safeDt;

        if (!isPlaying) {
            // Tranquil, peaceful resting state during pause (soft ambient presence)
            this.targets.energy = 0.35;
            this.targets.bass = 0.2;
            this.targets.mids = 0.2;
            this.targets.highs = 0.2;
            this.targets.beatImpulse = 0.0;
            this.applySmoothing(safeDt);
            return this.state;
        }

        const progressSec = Number.isFinite(progressMs) && progressMs > 0 ? (progressMs / 1000) : this.liveTime;

        // Mode A: Live Web Audio FFT Analyser
        if (this.isLiveAudioActive && this.analyser) {
            this.processLiveFFT(safeDt);
        }
        // Mode B: Spotify Track Analysis Data
        else if (this.analysisData && this.analysisData.segments && this.analysisData.segments.length > 0) {
            this.processSpotifyAnalysis(progressSec, safeDt);
        }
        // Mode C: Generative Organic Synthesizer (Fallback / Offline / Local)
        else {
            this.processGenerativeFallback(this.liveTime, safeDt);
        }

        this.applySmoothing(safeDt);
        this.lastProgressSec = progressSec;
        return this.state;
    }

    /**
     * Process Spotify Track Analysis Data with microsecond precision & fast binary searches
     */
    processSpotifyAnalysis(progressSec, dt) {
        const segments = this.analysisData.segments;
        const beats = this.analysisData.beats || [];
        const bars = this.analysisData.bars || [];
        const sections = this.analysisData.sections || [];

        // 1. Find Current Segment (Fast Binary Search O(log N))
        let seg = null;
        let low = 0, high = segments.length - 1;
        while (low <= high) {
            const mid = (low + high) >> 1;
            const s = segments[mid];
            if (progressSec >= s.start && progressSec < s.start + s.duration) {
                seg = s;
                break;
            } else if (progressSec < s.start) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        if (seg) {
            // Segment loudness envelope (normalized 0..1 from dB -55 to 0)
            const segProgress = (progressSec - seg.start) / seg.duration;
            let currentLoudnessDb = seg.loudness_start;
            const maxTime = seg.loudness_max_time || 0.1;
            if (segProgress < maxTime) {
                currentLoudnessDb = seg.loudness_start + (seg.loudness_max - seg.loudness_start) * (segProgress / Math.max(0.01, maxTime));
            } else {
                currentLoudnessDb = seg.loudness_max + (seg.loudness_end - seg.loudness_max) * ((segProgress - maxTime) / Math.max(0.01, 1 - maxTime));
            }

            const rawLoudness = Math.max(0, Math.min(1, (currentLoudnessDb + 55) / 55));
            this.targets.energy = rawLoudness * this.state.volume;

            // Pitch bands (12 chroma values: 0 = C, 1 = C#, ..., 11 = B)
            const p = seg.pitches;
            const t = seg.timbre;

            const bassPitch = (p[0] + p[1] + p[2] + p[3]) * 0.25;
            const midPitch = (p[4] + p[5] + p[6] + p[7] + p[8]) * 0.2;
            const highPitch = (p[9] + p[10] + p[11]) * 0.3333;

            const timbreBass = Math.max(0, Math.min(1, (t[1] + 100) * 0.005));
            const timbreHigh = Math.max(0, Math.min(1, (t[2] + 100) * 0.005));

            this.targets.bass = Math.min(1.0, (bassPitch * 0.7 + timbreBass * 0.3) * rawLoudness * 1.3);
            this.targets.mids = Math.min(1.0, midPitch * rawLoudness * 1.2);
            this.targets.highs = Math.min(1.0, (highPitch * 0.6 + timbreHigh * 0.4) * rawLoudness * 1.3);

            for (let i = 0; i < 12; i++) {
                this.state.pitches[i] = p[i];
                this.state.timbre[i] = t[i];
            }
        }

        // 2. Find Current Beat & Bar using Fast Cursor (O(1) average time)
        if (this.beatCursor >= beats.length || (beats[this.beatCursor] && progressSec < beats[this.beatCursor].start)) {
            this.beatCursor = 0;
        }
        while (this.beatCursor < beats.length && progressSec >= beats[this.beatCursor].start + beats[this.beatCursor].duration) {
            this.beatCursor++;
        }
        const currentBeat = beats[this.beatCursor];
        const currentBeatIdx = (currentBeat && progressSec >= currentBeat.start) ? this.beatCursor : -1;
        if (currentBeatIdx !== -1) {
            this.state.beatPhase = (progressSec - currentBeat.start) / currentBeat.duration;
        }

        if (this.barCursor >= bars.length || (bars[this.barCursor] && progressSec < bars[this.barCursor].start)) {
            this.barCursor = 0;
        }
        while (this.barCursor < bars.length && progressSec >= bars[this.barCursor].start + bars[this.barCursor].duration) {
            this.barCursor++;
        }
        const currentBar = bars[this.barCursor];
        const currentBarIdx = (currentBar && progressSec >= currentBar.start) ? this.barCursor : -1;
        if (currentBarIdx !== -1) {
            this.state.barPhase = (progressSec - currentBar.start) / currentBar.duration;
        }

        // Detect Beat & 4-Beat boundary
        if (currentBeatIdx !== -1 && currentBeatIdx !== this.lastBeatIndex) {
            this.state.isBeatPulse = true; // 1 VAGUE PAR TEMPS !
            if (currentBeatIdx % 4 === 0 || (currentBarIdx !== -1 && currentBarIdx !== this.lastBarIndex)) {
                this.state.is4BeatPulse = true;
            }
            const beatConfidence = currentBeat.confidence || 0.8;
            const beatImpact = (0.55 + this.targets.energy * 0.45) * beatConfidence;
            
            this.targets.beatImpulse = Math.max(this.targets.beatImpulse, beatImpact);
            this.lastBeatIndex = currentBeatIdx;
            if (currentBarIdx !== -1) this.lastBarIndex = currentBarIdx;
        } else if (currentBarIdx !== -1 && currentBarIdx !== this.lastBarIndex) {
            this.state.is4BeatPulse = true;
            this.state.isBeatPulse = true;
            this.lastBarIndex = currentBarIdx;
        }

        // 3. Section tempo tracking (Fast Cursor)
        if (this.sectionCursor >= sections.length || (sections[this.sectionCursor] && progressSec < sections[this.sectionCursor].start)) {
            this.sectionCursor = 0;
        }
        while (this.sectionCursor < sections.length && progressSec >= sections[this.sectionCursor].start + sections[this.sectionCursor].duration) {
            this.sectionCursor++;
        }
        const currentSec = sections[this.sectionCursor];
        if (currentSec && currentSec.tempo) {
            this.state.bpm = currentSec.tempo;
        }
    }

    /**
     * Process Live Web Audio FFT
     */
    processLiveFFT(dt) {
        this.analyser.getByteFrequencyData(this.freqData);

        const binCount = this.analyser.frequencyBinCount;
        const bassEnd = Math.floor(binCount * 0.08);
        const midEnd = Math.floor(binCount * 0.45);

        let bassSum = 0, midSum = 0, highSum = 0, totalSum = 0;

        for (let i = 0; i < binCount; i++) {
            const val = this.freqData[i] * 0.0039215686; // / 255.0
            totalSum += val;
            if (i < bassEnd) bassSum += val;
            else if (i < midEnd) midSum += val;
            else highSum += val;
        }

        const avgBass = bassSum / Math.max(1, bassEnd);
        const avgMid = midSum / Math.max(1, midEnd - bassEnd);
        const avgHigh = highSum / Math.max(1, binCount - midEnd);
        const avgEnergy = totalSum / binCount;

        this.targets.energy = avgEnergy * this.state.volume;
        this.targets.bass = Math.min(1.0, avgBass * 1.5);
        this.targets.mids = Math.min(1.0, avgMid * 1.4);
        this.targets.highs = Math.min(1.0, avgHigh * 1.6);

        // Transient beat detection from sudden bass jump
        const bassDiff = this.targets.bass - this.state.bass;
        if (bassDiff > 0.18) {
            this.targets.beatImpulse = Math.min(1.0, bassDiff * 3.5);
        }

        // 1-beat & 4-beat bar timing
        const bpm = this.state.bpm || 120;
        const beatInterval = 60 / bpm;
        const barInterval = 4 * beatInterval;

        this.liveTime += dt;
        this.state.beatPhase = (this.liveTime % beatInterval) / beatInterval;
        this.state.barPhase = (this.liveTime % barInterval) / barInterval;

        const currentBeatIdx = Math.floor(this.liveTime / beatInterval);
        if (currentBeatIdx !== this.lastBeatIndex) {
            this.state.isBeatPulse = true;
            this.lastBeatIndex = currentBeatIdx;
        }

        const current4BeatIdx = Math.floor(this.liveTime / barInterval);
        if (current4BeatIdx !== this.last4BeatIndex) {
            this.state.is4BeatPulse = true;
            this.last4BeatIndex = current4BeatIdx;
        }
    }

    /**
     * Generative Organic Synthesizer (Fallback / Offline)
     */
    processGenerativeFallback(progressSec, dt) {
        const bpm = this.state.bpm || 120;
        const beatInterval = 60 / bpm;
        const barInterval = 4 * beatInterval;
        this.state.beatPhase = (progressSec % beatInterval) / beatInterval;
        this.state.barPhase = (progressSec % barInterval) / barInterval;

        // Organic energy wave
        const baseEnergy = 0.45 + Math.sin(progressSec * 0.2) * 0.25 + Math.sin(progressSec * 0.05) * 0.15;
        this.targets.energy = Math.max(0.15, Math.min(0.95, baseEnergy)) * this.state.volume;

        // Bass kick on beat onsets
        const isBeatOnset = this.state.beatPhase < 0.12;
        if (isBeatOnset && Math.random() < 0.85) {
            this.targets.beatImpulse = 0.75 + Math.random() * 0.25;
        }

        const bassWave = Math.sin(progressSec * (bpm / 60) * Math.PI) * 0.5 + 0.5;
        this.targets.bass = (bassWave * 0.4 + (isBeatOnset ? 0.5 : 0.0)) * this.targets.energy * 1.3;
        this.targets.mids = (0.3 + Math.sin(progressSec * 1.4) * 0.25) * this.targets.energy;
        this.targets.highs = (0.2 + Math.sin(progressSec * 3.8) * 0.2 + (Math.random() < 0.2 ? 0.3 : 0.0)) * this.targets.energy;

        // Trigger pulse on every beat (1 vague par temps)
        const currentBeatIdx = Math.floor(progressSec / beatInterval);
        if (currentBeatIdx !== this.lastBeatIndex) {
            this.state.isBeatPulse = true;
            this.lastBeatIndex = currentBeatIdx;
        }

        // Trigger pulse every 4 beats
        const current4BeatIdx = Math.floor(progressSec / barInterval);
        if (current4BeatIdx !== this.last4BeatIndex) {
            this.state.is4BeatPulse = true;
            this.last4BeatIndex = current4BeatIdx;
        }
    }

    /**
     * Apply asymmetric attack / decay smoothing
     */
    applySmoothing(dt) {
        const smooth = (current, target, attackSpeed, decaySpeed) => {
            const speed = target > current ? attackSpeed : decaySpeed;
            return current + (target - current) * Math.min(1.0, dt * speed);
        };

        this.state.energy = smooth(this.state.energy, this.targets.energy, 22.0, 7.0);
        this.state.bass = smooth(this.state.bass, this.targets.bass, 28.0, 9.0);
        this.state.mids = smooth(this.state.mids, this.targets.mids, 18.0, 8.0);
        this.state.highs = smooth(this.state.highs, this.targets.highs, 32.0, 14.0);

        // Fast impulse decay for crisp beat response
        this.state.beatImpulse = smooth(this.state.beatImpulse, 0.0, 30.0, 9.0);
        this.targets.beatImpulse = Math.max(0, this.targets.beatImpulse - dt * 6.5);
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = AudioAnalysisEngine;
}
