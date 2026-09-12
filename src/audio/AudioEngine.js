// src/audio/AudioEngine.js - Musical pulse & audio reactivity orchestrator

class AudioEngine {
    constructor() {
        this.isPlaying = false;
        this.progress = 0;
        this.duration = 0;
        this.trackUri = "";
        this.liveTime = 0;

        // Energy bands
        this.bass = 0.1;
        this.mid = 0.1;
        this.treble = 0.1;
        this.energy = 0.1;

        // Rhythm & beat tracking
        this.tempo = 124;
        this.beatProgress = 0;
        this.isBeat = false;
        this.beatCount = 0;
        this.lastBeatTime = 0;

        // Aliases for multi-model compatibility
        this.mids = 0.1;
        this.highs = 0.1;
        this.bpm = 124;
        this.beatPhase = 0;
        this.beatImpulse = 0;
        this.isBeatPulse = false;
        this.is4BeatPulse = false;

        // Optional Web Audio API spectrum bridge
        this.webAudio = new WebAudioBridge();

        setupSpotifyHooks(this);
    }

    connectLiveSource(source) {
        return this.webAudio.connect(source);
    }

    disconnectLiveSource() {
        this.webAudio.disconnect();
    }

    updateTrackInfo() {
        if (typeof Spicetify === "undefined" || !Spicetify.Player) return;
        const data = Spicetify.Player.data;
        if (data && data.item) {
            this.duration = data.item.duration ? data.item.duration.milliseconds : 180000;
            this.trackUri = data.item.uri || "";
            this.tempo = estimateTrackTempo(this.trackUri, data.item.name || "");
            this.bpm = this.tempo;
        }
    }

    update(dt) {
        this.liveTime += dt;

        // 1. If real-time Web Audio API stream is active, use FFT data directly
        const liveFft = this.webAudio.update();
        if (liveFft && liveFft.active) {
            this.isPlaying = true;
            this.bass += (liveFft.bass - this.bass) * 0.35;
            this.mid += (liveFft.mid - this.mid) * 0.25;
            this.treble += (liveFft.treble - this.treble) * 0.3;
            this.energy = liveFft.energy;

            this.mids = this.mid;
            this.highs = this.treble;
            this.isBeat = liveFft.isBeat;
            if (this.isBeat) {
                this.lastBeatTime = this.liveTime;
                this.beatCount++;
            }
            this.beatImpulse = (this.isBeat ? 1.0 : 0.0) + this.energy * 0.4;
            this.isBeatPulse = this.isBeat;
            this.is4BeatPulse = this.isBeat && (this.beatCount % 4 === 0);
            return;
        }

        // 2. Otherwise sync with Spotify Player and algorithmic envelope
        if (typeof Spicetify !== "undefined" && Spicetify.Player) {
            this.isPlaying = Spicetify.Player.isPlaying();
            const prog = Spicetify.Player.getProgress();
            this.progress = (typeof prog === "number" && !isNaN(prog)) ? prog : this.progress + (this.isPlaying ? dt * 1000 : 0);
        } else {
            this.progress += (this.isPlaying ? dt * 1000 : 0);
        }

        const beatInterval = 60 / this.tempo;
        const t = this.isPlaying ? (this.progress / 1000) : (this.liveTime * 0.5);
        const beatPhase = (t % beatInterval) / beatInterval;
        this.beatProgress = beatPhase;
        this.beatPhase = beatPhase;

        // Beat onset trigger
        const currentBeatIndex = Math.floor(t / beatInterval);
        if (currentBeatIndex !== this.beatCount && this.isPlaying) {
            this.beatCount = currentBeatIndex;
            this.isBeat = true;
            this.lastBeatTime = this.liveTime;
        } else {
            this.isBeat = false;
        }

        // Energy envelope & bands update
        updateAudioEnvelope(this, t, beatPhase);
    }
}
