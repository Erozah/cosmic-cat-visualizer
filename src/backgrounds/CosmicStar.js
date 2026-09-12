// src/backgrounds/CosmicStar.js - Twinkling cosmic starfield particle with diffraction spikes

class CosmicStar {
    constructor(w, h) {
        this.reset(w, h, true);
    }

    reset(w, h, initial = false) {
        this.x = Math.random() * w;
        this.y = initial ? Math.random() * h : -10;
        this.size = 0.6 + Math.random() * 1.8;
        this.speedY = 10 + Math.random() * 20;
        this.baseAlpha = 0.2 + Math.random() * 0.6;
        this.pulseSpeed = 1.0 + Math.random() * 3.0;
        this.phase = Math.random() * Math.PI * 2;
        this.hasCross = Math.random() > 0.82;
        this.crossSize = 4 + Math.random() * 7;
    }

    update(dt, w, h, treble) {
        this.y += this.speedY * dt * (1 + (treble || 0) * 0.4);
        if (this.y > h + 10) {
            this.reset(w, h);
        }
    }

    render(ctx, time, treble, color) {
        const twinkle = Math.sin(time * this.pulseSpeed + this.phase) * 0.3 + 0.7;
        const alpha = Math.min(1, this.baseAlpha * twinkle * (0.8 + (treble || 0) * 0.6));
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // 4-point diffraction cross spikes on bright celestial stars (heritage Legacy)
        if (this.hasCross && alpha > 0.45) {
            const clen = this.crossSize * (0.8 + (treble || 0) * 0.5);
            ctx.strokeStyle = color;
            ctx.lineWidth = 0.75;
            ctx.globalAlpha = alpha * 0.65;
            ctx.beginPath();
            ctx.moveTo(this.x - clen, this.y);
            ctx.lineTo(this.x + clen, this.y);
            ctx.moveTo(this.x, this.y - clen);
            ctx.lineTo(this.x, this.y + clen);
            ctx.stroke();
        }
    }
}
