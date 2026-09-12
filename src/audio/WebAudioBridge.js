// src/audio/WebAudioBridge.js - Optional Web Audio API FFT spectrum analyzer bridge (Heritage Legacy)

class WebAudioBridge {
    constructor() {
        this.audioContext = null;
        this.analyser = null;
        this.sourceNode = null;
        this.freqData = null;
        this.isActive = false;

        this.bass = 0;
        this.mid = 0;
        this.treble = 0;
        this.energy = 0;
        this.isBeat = false;
        this.lastBeatTime = 0;
        this.bassHistory = [];
    }

    /**
     * Connect an HTMLMediaElement (audio/video) or a MediaStream (microphone)
     */
    connect(source) {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return false;

            if (!this.audioContext) {
                this.audioContext = new AudioCtx();
            }

            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }

            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 512;
            this.analyser.smoothingTimeConstant = 0.82;
            this.freqData = new Uint8Array(this.analyser.frequencyBinCount);

            if (source instanceof HTMLMediaElement) {
                this.sourceNode = this.audioContext.createMediaElementSource(source);
                this.sourceNode.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);
            } else if (source instanceof MediaStream) {
                this.sourceNode = this.audioContext.createMediaStreamSource(source);
                this.sourceNode.connect(this.analyser);
            } else if (source && typeof source.connect === 'function') {
                source.connect(this.analyser);
            }

            this.isActive = true;
            return true;
        } catch (err) {
            console.warn('[WebAudioBridge] Connection failed:', err);
            this.isActive = false;
            return false;
        }
    }

    disconnect() {
        this.isActive = false;
        if (this.sourceNode) {
            try { this.sourceNode.disconnect(); } catch (e) {}
            this.sourceNode = null;
        }
    }

    update(now = performance.now()) {
        if (!this.isActive || !this.analyser || !this.freqData) {
            return null;
        }

        this.analyser.getByteFrequencyData(this.freqData);
        const len = this.freqData.length;

        // Band bins
        const bassEnd = Math.max(2, Math.floor(len * 0.08));
        const midEnd = Math.floor(len * 0.45);

        let bassSum = 0;
        for (let i = 0; i < bassEnd; i++) bassSum += this.freqData[i];
        const rawBass = bassSum / (bassEnd * 255);

        let midSum = 0;
        for (let i = bassEnd; i < midEnd; i++) midSum += this.freqData[i];
        const rawMid = midSum / ((midEnd - bassEnd) * 255);

        let trebSum = 0;
        for (let i = midEnd; i < len; i++) trebSum += this.freqData[i];
        const rawTreble = trebSum / ((len - midEnd) * 255);

        this.bass = rawBass;
        this.mid = rawMid;
        this.treble = rawTreble;
        this.energy = (rawBass * 0.5) + (rawMid * 0.3) + (rawTreble * 0.2);

        // Beat detection via sliding history
        this.bassHistory.push(rawBass);
        if (this.bassHistory.length > 30) this.bassHistory.shift();

        const avgBass = this.bassHistory.reduce((a, b) => a + b, 0) / this.bassHistory.length;
        const isOnset = rawBass > avgBass * 1.35 && rawBass > 0.35;

        if (isOnset && (now - this.lastBeatTime > 220)) {
            this.isBeat = true;
            this.lastBeatTime = now;
        } else {
            this.isBeat = false;
        }

        return {
            active: true,
            bass: this.bass,
            mid: this.mid,
            treble: this.treble,
            energy: this.energy,
            isBeat: this.isBeat
        };
    }
}
