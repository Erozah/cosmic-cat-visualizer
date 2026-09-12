// src/backgrounds/BackgroundManager.js - Orchestrates switchable backgrounds (Stars, Grid, Fractals, Nebula, Minimal)

class BackgroundManager {
    constructor() {
        this.modes = ['stars', 'grid', 'fractals', 'nebula', 'minimal'];
        this.mode = 'stars';

        this.stars = [];
        this.shockwaves = [];
        this.maxStars = 95;
        this.initStars(window.innerWidth || 1200, window.innerHeight || 800);

        this.grid = new CyberGrid();
        this.nebula = new CosmicNebula();
    }

    setMode(mode) {
        if (this.modes.includes(mode)) {
            this.mode = mode;
        }
    }

    nextMode() {
        const idx = this.modes.indexOf(this.mode);
        this.mode = this.modes[(idx + 1) % this.modes.length];
        return this.mode;
    }

    initStars(w, h) {
        this.stars = [];
        for (let i = 0; i < this.maxStars; i++) {
            this.stars.push(new CosmicStar(w, h));
        }
    }

    spawnShockwave(x, y, maxRadius, color) {
        if (this.shockwaves.length < 8) {
            this.shockwaves.push(new Shockwave(x, y, maxRadius, color));
        }
    }

    resize(w, h) {
        this.initStars(w, h);
    }

    update(dt, w, h, audio, palette, catCenterX, catCenterY) {
        const isStarfieldActive = (this.mode === 'stars' || this.mode === 'fractals' || this.mode === 'nebula');

        if (isStarfieldActive) {
            for (let i = 0; i < this.stars.length; i++) {
                this.stars[i].update(dt, w, h, audio.treble);
            }
        }

        if (this.mode === 'stars' || this.mode === 'nebula') {
            this.nebula.update(dt, audio.liveTime || 0, audio, audio.isPlaying);

            if (audio.isBeat && audio.isPlaying && audio.bass > 0.45) {
                this.spawnShockwave(catCenterX, catCenterY, Math.min(w, h) * 0.48, palette.shockwave);
            }
            for (let i = this.shockwaves.length - 1; i >= 0; i--) {
                if (!this.shockwaves[i].update(dt)) {
                    this.shockwaves.splice(i, 1);
                }
            }
        } else if (this.mode === 'grid') {
            this.grid.update(dt, audio);
        }
    }

    render(ctx, w, h, time, audio, palette, catCenterX, catCenterY, fractalsInstance = null) {
        ctx.save();

        // 1. Deep Space Base Background
        const bgGrad = ctx.createRadialGradient(
            catCenterX, catCenterY, 30,
            catCenterX, catCenterY, Math.max(w, h) * 0.75
        );
        bgGrad.addColorStop(0, palette.ambient);
        bgGrad.addColorStop(1, "rgba(2, 2, 6, 0.98)");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // 2. Branch by background mode
        if (this.mode === 'stars') {
            // Starfield with diffraction spikes
            ctx.globalCompositeOperation = "screen";
            for (let i = 0; i < this.stars.length; i++) {
                this.stars[i].render(ctx, time, audio.treble, palette.core);
            }

            // Audio reactive aura rings
            const auraRadius = 140 + (audio.bass || 0) * 35;
            ctx.globalCompositeOperation = "lighter";
            ctx.strokeStyle = palette.primary;
            ctx.lineWidth = 1.2;
            ctx.globalAlpha = 0.18 + (audio.bass || 0) * 0.18;
            ctx.beginPath();
            ctx.arc(catCenterX, catCenterY, auraRadius, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = palette.accent;
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = 0.12 + (audio.mid || 0) * 0.15;
            ctx.beginPath();
            ctx.arc(catCenterX, catCenterY, auraRadius * 0.7, 0, Math.PI * 2);
            ctx.stroke();

            // Active shockwaves
            for (let i = 0; i < this.shockwaves.length; i++) {
                this.shockwaves[i].render(ctx);
            }
        } else if (this.mode === 'nebula') {
            // Volumetric Nebula Clouds + Stars (Heritage Legacy)
            this.nebula.render(ctx, w, h, catCenterX, catCenterY, audio, palette, time);

            ctx.globalCompositeOperation = "screen";
            for (let i = 0; i < this.stars.length; i++) {
                this.stars[i].render(ctx, time, audio.treble, palette.core);
            }

            for (let i = 0; i < this.shockwaves.length; i++) {
                this.shockwaves[i].render(ctx);
            }
        } else if (this.mode === 'grid') {
            // Synthwave cyber grid
            const horizonY = h * 0.68;
            this.grid.render(ctx, w, h, horizonY, audio, palette);

            // Subtle upper sky aura
            const skyAura = 120 + (audio.bass || 0) * 25;
            ctx.save();
            ctx.globalCompositeOperation = "screen";
            ctx.strokeStyle = palette.primary;
            ctx.lineWidth = 1.2;
            ctx.globalAlpha = 0.2 + (audio.bass || 0) * 0.2;
            ctx.beginPath();
            ctx.arc(catCenterX, catCenterY - 30, skyAura, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        } else if (this.mode === 'fractals') {
            // Sacred Geometry Mandalas + Stars
            ctx.globalCompositeOperation = "screen";
            for (let i = 0; i < this.stars.length; i++) {
                this.stars[i].render(ctx, time, audio.treble, palette.core);
            }

            if (fractalsInstance) {
                const baseRad = Math.min(w, h) * 0.26;
                fractalsInstance.render(ctx, catCenterX, catCenterY, baseRad, palette, audio);
            }
        } else if (this.mode === 'minimal') {
            // Minimalist Void: Pure abyss with clean laser aura
            ctx.globalCompositeOperation = "lighter";
            const auraR = 125 + (audio.bass || 0) * 20;
            ctx.strokeStyle = palette.primary;
            ctx.lineWidth = 1.0;
            ctx.globalAlpha = 0.15 + (audio.bass || 0) * 0.15;
            ctx.beginPath();
            ctx.arc(catCenterX, catCenterY, auraR, 0, Math.PI * 2);
            ctx.stroke();

            ctx.strokeStyle = palette.accent;
            ctx.lineWidth = 0.8;
            ctx.globalAlpha = 0.1 + (audio.mid || 0) * 0.1;
            ctx.beginPath();
            ctx.arc(catCenterX, catCenterY, auraR * 0.6, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    }
}
