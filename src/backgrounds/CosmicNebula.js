// src/backgrounds/CosmicNebula.js - Volumetric cosmic nebula clouds & deep space aura
// Grounded on visual hierarchy guidelines: keeps background soft (alpha 0.3 - 0.55) so foreground cat shines brightest.

class CosmicNebula {
    constructor() {
        this.cloudDrift = 0;
    }

    update(dt, time, audio, isPlaying = true) {
        const driftSpeed = isPlaying ? (0.04 + audio.energy * 0.06) : 0.015;
        this.cloudDrift = (this.cloudDrift + dt * driftSpeed) % (Math.PI * 2);
    }

    render(ctx, w, h, cx, cy, audio, palette, time) {
        const bass = audio.bass || 0;
        const beat = audio.beatImpulse || 0;
        const energy = audio.energy || 0.3;

        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // 1. Large soft cosmic aura behind subject
        const baseRadius = Math.max(160, Math.min(w, h) * 0.38);
        const auraRadius = baseRadius * (1.0 + bass * 0.2 + beat * 0.15);

        const auraGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, auraRadius);
        const alpha = Math.min(0.5, 0.22 + energy * 0.18 + bass * 0.12);

        auraGrad.addColorStop(0, palette.accentAlpha ? palette.accentAlpha(alpha * 0.8) : "rgba(255, 0, 127, 0.25)");
        auraGrad.addColorStop(0.35, palette.primaryAlpha ? palette.primaryAlpha(alpha * 0.55) : "rgba(0, 240, 255, 0.18)");
        auraGrad.addColorStop(0.7, palette.secondaryAlpha ? palette.secondaryAlpha(alpha * 0.25) : "rgba(157, 78, 221, 0.1)");
        auraGrad.addColorStop(1, "transparent");

        ctx.fillStyle = auraGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, auraRadius, 0, Math.PI * 2);
        ctx.fill();

        // 2. Multi-puff volumetric cosmic clouds with subtle orbital drift
        const cloudCount = 3;
        for (let i = 0; i < cloudCount; i++) {
            const angle = this.cloudDrift + (i * Math.PI * 2) / cloudCount;
            const dist = baseRadius * 0.45;
            const puffX = cx + Math.cos(angle) * dist;
            const puffY = cy + Math.sin(angle * 0.8) * (dist * 0.6);
            const puffRadius = baseRadius * (0.65 + Math.sin(time + i) * 0.1);

            const puffGrad = ctx.createRadialGradient(puffX, puffY, 10, puffX, puffY, puffRadius);
            const puffAlpha = alpha * 0.45;

            if (i % 2 === 0) {
                puffGrad.addColorStop(0, palette.primaryAlpha ? palette.primaryAlpha(puffAlpha) : "rgba(0, 240, 255, 0.15)");
                puffGrad.addColorStop(0.5, palette.secondaryAlpha ? palette.secondaryAlpha(puffAlpha * 0.4) : "rgba(157, 78, 221, 0.08)");
            } else {
                puffGrad.addColorStop(0, palette.accentAlpha ? palette.accentAlpha(puffAlpha) : "rgba(255, 0, 127, 0.15)");
                puffGrad.addColorStop(0.5, palette.primaryAlpha ? palette.primaryAlpha(puffAlpha * 0.4) : "rgba(0, 240, 255, 0.08)");
            }
            puffGrad.addColorStop(1, "transparent");

            ctx.fillStyle = puffGrad;
            ctx.beginPath();
            ctx.arc(puffX, puffY, puffRadius, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}
