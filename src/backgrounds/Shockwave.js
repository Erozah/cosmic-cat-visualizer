// src/backgrounds/Shockwave.js - Audio beat-driven shockwave pulse ring

class Shockwave {
    constructor(x, y, maxRadius, color) {
        this.x = x;
        this.y = y;
        this.radius = 16;
        this.maxRadius = maxRadius;
        this.color = color;
        this.life = 1.0;
        this.decay = 1.35;
    }

    update(dt) {
        this.radius += (this.maxRadius - this.radius) * (dt * 3.5);
        this.life -= dt * this.decay;
        return this.life > 0;
    }

    render(ctx) {
        if (this.life <= 0) return;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = this.color;
        ctx.lineWidth = Math.max(0.5, 2.5 * this.life);
        ctx.globalAlpha = Math.max(0, this.life * 0.65);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (this.radius > 35) {
            ctx.lineWidth = 1.0 * this.life;
            ctx.globalAlpha = Math.max(0, this.life * 0.35);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius * 0.75, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();
    }
}
