// src/audio/spotifyAnalysis.js - High-fidelity Spotify Audio Analysis engine (beats, bars, sections, segments, pitches, timbre)

class SpotifyAnalysis {
    constructor() {
        this.trackId = null;
        this.data = null;
        this.isLoading = false;

        // Cursors for fast sequential lookup
        this.beatCursor = 0;
        this.barCursor = 0;
        this.sectionCursor = 0;
        this.segmentCursor = 0;

        // Current musical state
        this.lastBeatIndex = -1;
        this.lastBarIndex = -1;
        this.lastSectionIndex = -1;

        this.currentBeat = null;
        this.currentBar = null;
        this.currentSection = null;
        this.currentSegment = null;

        this.isBeat = false;
        this.isBar = false;
        this.isDrop = false;
        this.sectionEnergy = 0.5;
        this.sectionLoudness = -10;
        this.bpm = 120;
    }

    async load(trackUriOrId) {
        if (!trackUriOrId) return;
        const trackId = trackUriOrId.replace("spotify:track:", "").trim();
        if (!trackId || this.trackId === trackId) return;

        this.trackId = trackId;
        this.isLoading = true;
        this.data = null;
        this.beatCursor = 0;
        this.barCursor = 0;
        this.sectionCursor = 0;
        this.segmentCursor = 0;
        this.lastBeatIndex = -1;
        this.lastBarIndex = -1;
        this.lastSectionIndex = -1;

        try {
            // 1. Spicetify CosmosAsync standard endpoint
            if (typeof Spicetify !== "undefined" && Spicetify.CosmosAsync) {
                try {
                    const res = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`);
                    if (res && (res.beats || res.track || res.sections)) {
                        this.data = res;
                        if (res.track && res.track.tempo) {
                            this.bpm = res.track.tempo;
                        }
                        this.isLoading = false;
                        return;
                    }
                } catch (e1) {
                    // Fallback to internal web player pathway
                    try {
                        const resPartner = await Spicetify.CosmosAsync.get(`https://api-partner.spotify.com/pathway/v1/web-player/analysis/${trackId}`);
                        if (resPartner && (resPartner.beats || resPartner.track || resPartner.sections)) {
                            this.data = resPartner;
                            if (resPartner.track && resPartner.track.tempo) {
                                this.bpm = resPartner.track.tempo;
                            }
                            this.isLoading = false;
                            return;
                        }
                    } catch (e2) {}
                }
            }

            // 2. Direct fetch with platform auth token
            if (typeof Spicetify !== "undefined" && Spicetify.Platform && Spicetify.Platform.AuthorizationAPI) {
                const token = await Spicetify.Platform.AuthorizationAPI.getAccessToken();
                if (token) {
                    const resp = await fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (resp.ok) {
                        const json = await resp.json();
                        if (json && (json.beats || json.track || json.sections)) {
                            this.data = json;
                            if (json.track && json.track.tempo) {
                                this.bpm = json.track.tempo;
                            }
                        }
                    }
                }
            }
        } catch (err) {
            console.warn("[SpotifyAnalysis] Analysis fetch unavailable, falling back to envelope follower:", err);
        } finally {
            this.isLoading = false;
        }
    }

    findItem(list, cursorName, sec) {
        if (!list || list.length === 0) return { item: null, index: -1 };

        let idx = this[cursorName] || 0;
        // If track seeked backwards, reset cursor
        if (idx >= list.length || (idx > 0 && list[idx].start > sec)) {
            idx = 0;
        }

        while (idx < list.length - 1 && list[idx + 1].start <= sec) {
            idx++;
        }

        this[cursorName] = idx;
        const item = list[idx];
        return { item, index: idx };
    }

    query(progressSec) {
        if (!this.data || !this.data.beats || this.data.beats.length === 0) {
            return null;
        }

        const sec = Math.max(0, progressSec);

        // 1. Current Beat
        const { item: beat, index: beatIdx } = this.findItem(this.data.beats, 'beatCursor', sec);
        let beatPhase = 0;
        let beatImpulse = 0;
        let isBeat = false;

        if (beat) {
            const beatDur = Math.max(0.1, beat.duration || 0.5);
            beatPhase = Math.max(0, Math.min(1, (sec - beat.start) / beatDur));
            isBeat = (beatIdx !== this.lastBeatIndex && beatIdx >= 0);
            if (isBeat) {
                this.lastBeatIndex = beatIdx;
            }
            // Sharp initial peak with natural organic decay
            beatImpulse = Math.max(0, 1.0 - Math.pow(beatPhase, 0.45) * 1.6);
        }

        // 2. Current Bar (Measure)
        const { item: bar, index: barIdx } = this.findItem(this.data.bars, 'barCursor', sec);
        let barPhase = 0;
        let isBar = false;

        if (bar) {
            const barDur = Math.max(0.4, bar.duration || 2.0);
            barPhase = Math.max(0, Math.min(1, (sec - bar.start) / barDur));
            isBar = (barIdx !== this.lastBarIndex && barIdx >= 0);
            if (isBar) {
                this.lastBarIndex = barIdx;
            }
        }

        // 3. Current Section (Intro, Verse, Chorus, Drop, Breakdown)
        const { item: section, index: secIdx } = this.findItem(this.data.sections, 'sectionCursor', sec);
        if (section) {
            if (secIdx !== this.lastSectionIndex) {
                this.lastSectionIndex = secIdx;
                if (section.tempo) {
                    this.bpm = section.tempo;
                }
            }
            this.sectionLoudness = section.loudness || -10;
            // Map loudness (-28 dB to -3 dB) to normalized energy [0.1 .. 1.0]
            this.sectionEnergy = Math.max(0.1, Math.min(1.0, (this.sectionLoudness + 28) / 25));
            // Detect drops/explosive choruses: high loudness & high tempo
            this.isDrop = this.sectionEnergy > 0.72 || (this.sectionLoudness > -6.5);
        }

        // 4. Current Segment (Timbre & Pitches)
        const { item: segment } = this.findItem(this.data.segments, 'segmentCursor', sec);
        let bassEnergy = 0.2;
        let midEnergy = 0.2;
        let trebleEnergy = 0.2;
        let snareImpulse = 0.0;
        let segmentLoudness = this.sectionEnergy;

        if (segment) {
            // Loudness interpolation
            const segDur = Math.max(0.05, segment.duration || 0.25);
            const segPhase = Math.max(0, Math.min(1, (sec - segment.start) / segDur));
            const loudStart = segment.loudness_start || -20;
            const loudMax = segment.loudness_max || -8;
            const maxTimeNorm = (segment.loudness_max_time || 0.05) / segDur;

            let currentDb = loudStart;
            if (segPhase <= maxTimeNorm && maxTimeNorm > 0) {
                currentDb = loudStart + (loudMax - loudStart) * (segPhase / maxTimeNorm);
            } else if (maxTimeNorm < 1) {
                currentDb = loudMax + (loudStart - loudMax) * ((segPhase - maxTimeNorm) / (1 - maxTimeNorm));
            }
            segmentLoudness = Math.max(0.1, Math.min(1.0, (currentDb + 32) / 28));

            // Pitches (12 chroma frequencies)
            if (segment.pitches && segment.pitches.length === 12) {
                const p = segment.pitches;
                const lowPitch = (p[0] + p[1] + p[2] + p[3]) / 4;
                const midPitch = (p[4] + p[5] + p[6] + p[7] + p[8]) / 5;
                const highPitch = (p[9] + p[10] + p[11]) / 3;

                // Timbre coefficients
                const t0 = segment.timbre ? Math.max(0, (segment.timbre[0] + 50) / 60) : 0.5; // Overall loudness
                const t1 = segment.timbre ? Math.max(0, Math.min(1, (segment.timbre[1] + 80) / 160)) : 0.5; // Brightness / highs

                bassEnergy = Math.min(1.0, lowPitch * 0.45 + beatImpulse * 0.55 + (this.isDrop ? 0.2 : 0));
                midEnergy = Math.min(1.0, midPitch * 0.55 + segmentLoudness * 0.45);
                trebleEnergy = Math.min(1.0, highPitch * 0.5 + t1 * 0.4 + beatImpulse * 0.2);

                // Detect snare / clap transient: mid/treble spike without deep bass dominance
                if (isBeat && (beatIdx % 2 === 1) && (t1 > 0.45 || highPitch > 0.55)) {
                    snareImpulse = Math.min(1.0, (highPitch + t1) * 0.85);
                }
            }
        }

        return {
            isBeat,
            isBar,
            is4BeatPulse: isBeat && (beatIdx % 4 === 0),
            beatPhase,
            beatProgress: beatPhase,
            beatImpulse,
            barPhase,
            beatCount: beatIdx,
            barCount: barIdx,
            bpm: this.bpm,
            isDrop: this.isDrop,
            sectionEnergy: this.sectionEnergy,
            bass: bassEnergy,
            mid: midEnergy,
            mids: midEnergy,
            treble: trebleEnergy,
            highs: trebleEnergy,
            energy: Math.min(1.0, (bassEnergy * 0.45 + midEnergy * 0.3 + trebleEnergy * 0.25) * (0.7 + segmentLoudness * 0.3)),
            snareImpulse
        };
    }
}
