// src/backgrounds/CyberGrid.js - 3D perspective synthwave grid & cyber sparkles

class CyberGrid {
    constructor() {
        this.offsetY = 0;
        this.sparkles = [];
        for (let i = 0; i < 35; i++) {
            this.sparkles.push({
                x: Math.random(),
                y: Math.random(),
                size: 1 + Math.random() * 2,
                speedY: 20 + Math.random() * 45,
                alpha: 0.2 + Math.random() * 0.6
            });
        }
    }

    update(dt, audio) {
        const energy = audio.energy || 0.35;
        const tempoNorm = Math.max(0.4, Math.min(2.0, (audio.bpm || 120) / 120));
        // Calm synthwave cruise on chill music, fast rush on intense music
        const speed = audio.isPlaying !== false 
            ? (14 + tempoNorm * 18 + energy * 50) 
            : 8;
        this.offsetY = (this.offsetY + dt * speed) % 40;

        const sparkleSpeedMult = 0.4 + energy * 0.6;
        for (let i = 0; i < this.sparkles.length; i++) {
            const sp = this.sparkles[i];
            sp.y -= (sp.speedY * dt * sparkleSpeedMult) / 500;
            if (sp.y < 0) {
                sp.y = 1.0;
                sp.x = Math.random();
            }
        }
    }

    render(ctx, w, h, horizonY, audio, palette) {
        if (horizonY >= h) return;
        const gridH = h - horizonY;
        const cx = w * 0.5;

        ctx.save();

        // 1. Horizon glow aura
        const horizonGrad = ctx.createLinearGradient(0, horizonY - 40, 0, horizonY + 30);
        horizonGrad.addColorStop(0, "transparent");
        horizonGrad.addColorStop(0.5, palette.accentAlpha ? palette.accentAlpha(0.4 + audio.bass * 0.3) : "rgba(255, 0, 127, 0.4)");
        horizonGrad.addColorStop(1, "transparent");
        ctx.fillStyle = horizonGrad;
        ctx.fillRect(0, horizonY - 40, w, 70);

        // Horizon sharp laser line
        ctx.strokeStyle = palette.primary;
        ctx.lineWidth = 1.8 + audio.bass * 1.5;
        ctx.beginPath();
        ctx.moveTo(0, horizonY);
        ctx.lineTo(w, horizonY);
        ctx.stroke();

        // 2. Perspective grid floor
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, horizonY, w, gridH);
        ctx.clip();

        // Moving horizontal perspective lines (power distribution for 3D depth)
        const lineCount = 14;
        for (let i = 0; i < lineCount; i++) {
            const frac = (i + (this.offsetY / 40)) / lineCount;
            const norm = Math.pow(frac, 2.5); // perspective distortion
            const ly = horizonY + norm * gridH;
            const alpha = norm * (0.65 + audio.energy * 0.35);

            ctx.strokeStyle = palette.accentAlpha ? palette.accentAlpha(alpha) : palette.accent;
            ctx.lineWidth = 1.0 + norm * 1.6;
            ctx.beginPath();
            ctx.moveTo(0, ly);
            ctx.lineTo(w, ly);
            ctx.stroke();
        }

        // Radiating perspective vertical lines
        const vCount = 18;
        for (let i = -vCount / 2; i <= vCount / 2; i++) {
            const bottomX = cx + (i / (vCount / 2)) * (w * 0.95);
            ctx.strokeStyle = palette.primaryAlpha ? palette.primaryAlpha(0.45 + audio.energy * 0.3) : palette.primary;
            ctx.lineWidth = 1.0;
            ctx.beginPath();
            ctx.moveTo(cx, horizonY);
            ctx.lineTo(bottomX, h);
            ctx.stroke();
        }

        // Floating digital cyber sparks rising from grid
        for (let i = 0; i < this.sparkles.length; i++) {
            const sp = this.sparkles[i];
            const sx = sp.x * w;
            const sy = horizonY + sp.y * gridH;
            ctx.fillStyle = palette.core || "#ffffff";
            ctx.globalAlpha = sp.alpha * (0.65 + audio.treble * 0.35);
            ctx.beginPath();
            ctx.arc(sx, sy, sp.size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
        ctx.restore();
    }
}
