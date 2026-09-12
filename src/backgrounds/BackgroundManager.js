// src/backgrounds/BackgroundManager.js - Composable background layers & independent visual effects

class BackgroundManager {
    constructor() {
        this.stars = [];
        this.shockwaves = [];
        this.maxStars = 95;
        this.initStars(window.innerWidth || 1200, window.innerHeight || 800);

        this.grid = new CyberGrid();
        this.nebula = new CosmicNebula();

        // Independent composable visual layers (can be toggled ON/OFF without affecting others)
        this.effects = {
            stars: true,        // Particules & Étoiles célestes
            fractals: true,     // Mandalas sacrés rotatifs
            nebula: true,       // Nébuleuse atmosphérique volumétrique
            shockwaves: true,   // Ondes de choc radiales sur le beat
            grid: false,        // Grille synthwave 3D en perspective
            deck: true          // Plateforme deck en bois (sol)
        };

        this.loadSettings();
    }

    loadSettings() {
        try {
            if (typeof localStorage !== "undefined") {
                const saved = localStorage.getItem("cosmic-cat-effects");
                if (saved) {
                    const parsed = JSON.parse(saved);
                    Object.assign(this.effects, parsed);
                }
            }
        } catch (e) {}
    }

    saveSettings() {
        try {
            if (typeof localStorage !== "undefined") {
                localStorage.setItem("cosmic-cat-effects", JSON.stringify(this.effects));
            }
        } catch (e) {}
    }

    setEffect(name, enabled) {
        if (name in this.effects) {
            this.effects[name] = !!enabled;
            this.saveSettings();
        }
        return this.effects[name];
    }

    toggleEffect(name) {
        if (name in this.effects) {
            this.effects[name] = !this.effects[name];
            this.saveSettings();
        }
        return this.effects[name];
    }

    getEffect(name) {
        return !!this.effects[name];
    }

    initStars(w, h) {
        this.stars = [];
        for (let i = 0; i < this.maxStars; i++) {
            this.stars.push(new CosmicStar(w, h));
        }
    }

    spawnShockwave(x, y, maxRadius, color, type = "kick") {
        if (this.shockwaves.length < 12) {
            this.shockwaves.push(new Shockwave(x, y, maxRadius, color, type));
        }
    }

    resize(w, h) {
        this.initStars(w, h);
    }

    update(dt, w, h, audio, palette, catCenterX, catCenterY) {
        // 1. Stars update (if enabled)
        if (this.effects.stars) {
            for (let i = 0; i < this.stars.length; i++) {
                this.stars[i].update(dt, w, h, audio);
            }
        }

        // 2. Nebula update (if enabled)
        if (this.effects.nebula) {
            this.nebula.update(dt, audio.liveTime || 0, audio, audio.isPlaying);
        }

        // 3. Shockwaves update (if enabled)
        if (this.effects.shockwaves && audio.isPlaying) {
            // Kick shockwave (heavy bass ring)
            if ((audio.isBeat && audio.bass > 0.45) || (audio.beatImpulse > 0.72)) {
                this.spawnShockwave(catCenterX, catCenterY, Math.min(w, h) * 0.50, palette.shockwave, "kick");
            }
            // Snare shockwave (rapid thin ripple)
            if (audio.snareImpulse > 0.65) {
                this.spawnShockwave(catCenterX, catCenterY, Math.min(w, h) * 0.44, palette.accent, "snare");
            }
            for (let i = this.shockwaves.length - 1; i >= 0; i--) {
                if (!this.shockwaves[i].update(dt)) {
                    this.shockwaves.splice(i, 1);
                }
            }
        }

        // 4. Cyber 3D Grid update (if enabled)
        if (this.effects.grid) {
            this.grid.update(dt, audio);
        }
    }

    render(ctx, w, h, time, audio, palette, catCenterX, catCenterY, fractalsInstance = null) {
        ctx.save();

        // Base Celestial Void
        const bgGrad = ctx.createRadialGradient(
            catCenterX, catCenterY, 30,
            catCenterX, catCenterY, Math.max(w, h) * 0.75
        );
        bgGrad.addColorStop(0, palette.ambient);
        bgGrad.addColorStop(1, "rgba(2, 2, 6, 0.98)");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // Layer 1: Cyber 3D Grid Floor (if enabled)
        if (this.effects.grid) {
            const horizonY = h * 0.68;
            this.grid.render(ctx, w, h, horizonY, audio, palette);
        }

        // Layer 2: Volumetric Nebula & Atmospheric Clouds (if enabled)
        if (this.effects.nebula) {
            this.nebula.render(ctx, w, h, catCenterX, catCenterY, audio, palette, time);
        }

        // Layer 3: Sacred Fractals Mandalas (if enabled)
        if (this.effects.fractals && fractalsInstance) {
            const baseRad = Math.min(w, h) * 0.26;
            fractalsInstance.render(ctx, catCenterX, catCenterY, baseRad, palette, audio);
        }

        // Layer 4: Stars & Particle field (if enabled)
        if (this.effects.stars) {
            ctx.globalCompositeOperation = "screen";
            for (let i = 0; i < this.stars.length; i++) {
                this.stars[i].render(ctx, time, audio, palette.core);
            }
        }

        // Layer 5: Concentric audio aura rings (subtle presence)
        const isDrop = audio && audio.isDrop;
        const dropMultiplier = isDrop ? 1.5 : 1.0;
        const auraRadius = (135 + (audio.bass || 0) * 35) * dropMultiplier;
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = isDrop ? palette.accent : palette.primary;
        ctx.lineWidth = 1.0 + (isDrop ? 0.8 : 0);
        ctx.globalAlpha = Math.min(0.5, (0.15 + (audio.bass || 0) * 0.15) * dropMultiplier);
        ctx.beginPath();
        ctx.arc(catCenterX, catCenterY, auraRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Layer 6: Radial beat & snare shockwaves (if enabled)
        if (this.effects.shockwaves) {
            for (let i = 0; i < this.shockwaves.length; i++) {
                this.shockwaves[i].render(ctx);
            }
        }

        ctx.restore();
    }
}
