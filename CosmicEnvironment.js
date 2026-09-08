/**
 * CosmicEnvironment.js
 * Ultra-optimized, lightweight 60/120 FPS cosmic environment.
 * Features:
 * - High-Impact Radial Energy Waves Pulsing Outward 1 PER BEAT (Correlated to BPM)
 * - Stationary Starfield Pulsating Synchronously to the Rhythm of the Music
 * - Large & Ultra-Luminous Cosmic Aura behind the Cat
 */

class CosmicEnvironment {
    constructor(starCount = 220) {
        this.starCount = starCount;
        this.stars = [];
        
        // Fixed-size pre-allocated Wave Object Pool (24 waves for 1-wave-per-beat at up to 200 BPM)
        this.maxWaves = 24;
        this.energyWaves = [];
        for (let i = 0; i < this.maxWaves; i++) {
            this.energyWaves.push({
                active: false,
                cx: 0,
                cy: 0,
                radius: 0,
                maxRadius: 1000,
                speed: 600,
                intensity: 1.0,
                color: "#00f0ff",
                baseAlpha: 0.9,
                currentAlpha: 0.0
            });
        }
        
        // Pre-render soft glow sprite to avoid all per-frame gradient allocations in loops
        this.haloSprite = null;
        this.createHaloSprite();

        this.initStars();
    }

    createHaloSprite() {
        if (typeof document === "undefined") return;
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        grad.addColorStop(0.3, "rgba(255, 255, 255, 0.45)");
        grad.addColorStop(0.7, "rgba(255, 255, 255, 0.12)");
        grad.addColorStop(1.0, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
        this.haloSprite = canvas;
    }

    initStars() {
        this.stars = [];
        for (let i = 0; i < this.starCount; i++) {
            const nx = Math.random();
            const ny = Math.random() * 0.88;
            
            const randTier = Math.random();
            let tier = 1;
            let baseSize = 0.8 + Math.random() * 0.8;
            let hasHalo = false;
            let hasCross = false;
            let crossSize = 0;

            if (randTier > 0.94) {
                tier = 3;
                baseSize = 2.4 + Math.random() * 1.4;
                hasHalo = true;
                hasCross = true;
                crossSize = 8 + Math.random() * 8;
            } else if (randTier > 0.80) {
                tier = 2;
                baseSize = 1.3 + Math.random() * 0.9;
                hasHalo = Math.random() < 0.35;
            }

            const baseAlpha = tier === 3 ? (0.7 + Math.random() * 0.3) : (0.25 + Math.random() * 0.55);
            const pulseSpeed = 0.8 + Math.random() * 1.5;
            const pulsePhase = Math.random() * Math.PI * 2;

            this.stars.push({
                nx,
                ny,
                tier,
                baseSize,
                currentSize: baseSize,
                baseAlpha,
                currentAlpha: baseAlpha,
                pulseSpeed,
                pulsePhase,
                hasHalo,
                hasCross,
                crossSize
            });
        }
    }

    /**
     * Trigger a new radial energy wave from the pool (1 per beat)
     */
    triggerEnergyWave(cx, cy, intensity, palette, bpm = 120) {
        // Find inactive wave or reuse oldest
        let wave = this.energyWaves.find(w => !w.active);
        if (!wave) {
            let maxR = -1;
            for (let i = 0; i < this.energyWaves.length; i++) {
                if (this.energyWaves[i].radius > maxR) {
                    maxR = this.energyWaves[i].radius;
                    wave = this.energyWaves[i];
                }
            }
        }
        if (!wave) wave = this.energyWaves[0];

        const maxRadius = Math.max(window.innerWidth || 1200, window.innerHeight || 800) * 1.15;
        const safeBpm = Math.max(45, Math.min(220, bpm || 120));

        // SPEED CORRELATED TO BPM: Wave crosses the full screen across ~2 musical beats
        // 2 beats duration = 2 * (60 / BPM) = 120 / BPM seconds
        // Speed = (maxRadius * BPM) / 120 px/s
        const speed = (maxRadius * safeBpm) * 0.008333333;

        wave.active = true;
        wave.cx = cx;
        wave.cy = cy;
        wave.radius = 16;
        wave.maxRadius = maxRadius;
        wave.speed = speed;
        wave.intensity = Math.max(0.4, Math.min(1.6, intensity));
        wave.color = palette.accent || "#00f0ff";
        wave.baseAlpha = Math.min(1.0, 0.75 + wave.intensity * 0.25);
        wave.currentAlpha = wave.baseAlpha;
    }

    update(dt, time, audioState, cx, cy, catScale, palette, width, height, isPlaying = true) {
        const bass = audioState.bass || 0;
        const highs = audioState.highs || 0;
        const beat = audioState.beatImpulse || 0;
        const energy = audioState.energy || 0;
        const bpm = audioState.bpm || 120;
        const beatPhase = audioState.beatPhase || 0;

        // 1. STARS PULSATE IN STRICT UNISON WITH THE MUSIC RHYTHM:
        if (isPlaying) {
            // Rhythmic beat envelope: sharp impact on beat onset (beatPhase ~0), gentle decay
            const beatEnvelope = Math.pow(Math.max(0, 1.0 - beatPhase), 2.2);
            const rhythmPulse = (beatEnvelope * 0.65 + beat * 0.55 + bass * 0.4 + energy * 0.25);

            for (let i = 0; i < this.stars.length; i++) {
                const star = this.stars[i];
                const tierWeight = star.tier === 3 ? 1.35 : (star.tier === 2 ? 1.0 : 0.75);
                const organicShimmer = Math.sin(time * star.pulseSpeed + star.pulsePhase) * 0.12;

                // Expand size sharply on every beat
                const sizeMult = 1.0 + (rhythmPulse * tierWeight * 0.95) + organicShimmer;
                star.currentSize = Math.max(0.4, star.baseSize * sizeMult);

                // Brighten alpha on every beat
                const alphaMult = star.baseAlpha + (rhythmPulse * tierWeight * 0.55) + (highs * 0.3);
                star.currentAlpha = Math.max(0.15, Math.min(1.0, alphaMult));
            }
        } else {
            // Paused resting state: calm, barely moving
            for (let i = 0; i < this.stars.length; i++) {
                const star = this.stars[i];
                const restingShimmer = Math.sin(time * 0.3 * star.pulseSpeed + star.pulsePhase) * 0.15;
                star.currentSize = Math.max(0.4, star.baseSize * (1.0 + restingShimmer));
                star.currentAlpha = Math.max(0.1, Math.min(1.0, star.baseAlpha + restingShimmer * 0.15));
            }
        }

        // 2. High-Impact Energy Waves: Triggered STRICTLY 1 VAGUE PAR TEMPS (Every Beat)
        if (isPlaying && (audioState.isBeatPulse || audioState.is4BeatPulse)) {
            const waveOriginY = cy - catScale * 0.15;
            const waveIntensity = (energy * 0.7 + bass * 0.6 + beat * 0.4);
            this.triggerEnergyWave(cx, waveOriginY, waveIntensity, palette, bpm);
        }

        // 3. Update Active Energy Waves in Pool
        for (let i = 0; i < this.energyWaves.length; i++) {
            const w = this.energyWaves[i];
            if (!w.active) continue;

            w.radius += w.speed * dt;
            const progress = w.radius / w.maxRadius;

            // Smooth cubic fadeout as the wave approaches screen perimeter
            w.currentAlpha = Math.max(0, (1.0 - Math.pow(progress, 1.25)) * w.baseAlpha);

            if (progress >= 1.0 || w.currentAlpha <= 0.005) {
                w.active = false;
            }
        }
    }

    renderBackground(ctx, width, height, palette) {
        ctx.save();
        
        // Deep Space Radial Background
        const bgGrad = ctx.createRadialGradient(
            width * 0.5, height * 0.42, 40,
            width * 0.5, height * 0.42, Math.max(width, height) * 0.88
        );
        bgGrad.addColorStop(0, palette.deepNebulaAlpha(0.95));
        bgGrad.addColorStop(0.45, "#060412");
        bgGrad.addColorStop(0.80, "#030209");
        bgGrad.addColorStop(1.0, "#010104");

        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Render Halos from Cached Offscreen Sprite (Top tier stars only)
        if (this.haloSprite) {
            ctx.save();
            ctx.globalCompositeOperation = "screen";
            for (let i = 0; i < this.stars.length; i++) {
                const star = this.stars[i];
                if (star.hasHalo && star.tier === 3) {
                    const sx = star.nx * width;
                    const sy = star.ny * height;
                    const haloRad = star.currentSize * 3.5;
                    ctx.globalAlpha = star.currentAlpha * 0.45;
                    ctx.drawImage(this.haloSprite, sx - haloRad, sy - haloRad, haloRad * 2, haloRad * 2);
                }
            }
            ctx.restore();
        }

        // BATCH ALL STARS IN A SINGLE HARDWARE DRAW CALL:
        ctx.fillStyle = "rgba(240, 245, 255, 0.85)";
        ctx.beginPath();
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i];
            const sx = star.nx * width;
            const sy = star.ny * height;
            ctx.moveTo(sx + star.currentSize, sy);
            ctx.arc(sx, sy, star.currentSize, 0, Math.PI * 2);
        }
        ctx.fill();

        // 4-point cross diffraction spikes on brightest stars (batched single path)
        ctx.beginPath();
        for (let i = 0; i < this.stars.length; i++) {
            const star = this.stars[i];
            if (star.hasCross && star.currentAlpha > 0.45) {
                const sx = star.nx * width;
                const sy = star.ny * height;
                const cLen = (star.crossSize || 10) * (star.currentSize / star.baseSize);
                ctx.moveTo(sx - cLen, sy);
                ctx.lineTo(sx + cLen, sy);
                ctx.moveTo(sx, sy - cLen);
                ctx.lineTo(sx, sy + cLen);
            }
        }
        ctx.strokeStyle = "rgba(210, 235, 255, 0.45)";
        ctx.lineWidth = 0.85;
        ctx.stroke();

        ctx.restore();
    }

    renderNebulaAndAura(ctx, width, height, cx, cy, catScale, audioState, palette, time) {
        const bass = audioState.bass || 0;
        const beat = audioState.beatImpulse || 0;
        const energy = audioState.energy || 0.4;

        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Atmospheric space nebula aura (Gently glowing behind the bright cat)
        const auraRadius = Math.max(catScale * 2.0, Math.min(width, height) * 0.44) * (1.0 + bass * 0.22 + beat * 0.18);
        
        const outerAuraGrad = ctx.createRadialGradient(cx, cy, catScale * 0.1, cx, cy, auraRadius);
        const outerAlpha = 0.22 + energy * 0.20 + bass * 0.15;
        outerAuraGrad.addColorStop(0, palette.accentAlpha(outerAlpha * 0.85));
        outerAuraGrad.addColorStop(0.32, palette.primaryAlpha(outerAlpha * 0.65));
        outerAuraGrad.addColorStop(0.65, palette.secondaryAlpha(outerAlpha * 0.35));
        outerAuraGrad.addColorStop(0.90, palette.deepNebulaAlpha(outerAlpha * 0.12));
        outerAuraGrad.addColorStop(1.0, "transparent");

        ctx.fillStyle = outerAuraGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, auraRadius, 0, Math.PI * 2);
        ctx.fill();

        // Inner soft ambient glow
        const coreRadius = catScale * (1.1 + bass * 0.2 + beat * 0.18);
        const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreRadius);
        const coreAlpha = 0.32 + bass * 0.18 + beat * 0.15;
        coreGrad.addColorStop(0, `rgba(255, 255, 255, ${coreAlpha * 0.5})`);
        coreGrad.addColorStop(0.40, palette.accentAlpha(coreAlpha * 0.7));
        coreGrad.addColorStop(0.80, palette.primaryAlpha(coreAlpha * 0.35));
        coreGrad.addColorStop(1.0, "transparent");

        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, coreRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    /**
     * Render powerful pulsing energy waves emanating from the cat across the entire screen
     * Highly optimized for 60/120 FPS: Zero runtime gradient allocations, direct GPU-accelerated arc strokes.
     */
    renderEnergyWaves(ctx, palette, time) {
        if (!this.energyWaves) return;

        ctx.save();
        ctx.globalCompositeOperation = "screen";

        for (let i = 0; i < this.energyWaves.length; i++) {
            const w = this.energyWaves[i];
            if (!w.active || w.currentAlpha <= 0.008) continue;

            const progress = Math.min(1.0, w.radius / w.maxRadius);
            const a = w.currentAlpha;

            // Pass 1: Soft wide volumetric energy halo (GPU Accelerated wide stroke)
            const haloWidth = (32 + w.intensity * 24) * (1.0 - progress * 0.25);
            ctx.strokeStyle = palette.primaryAlpha(a * 0.35);
            ctx.lineWidth = haloWidth;
            ctx.beginPath();
            ctx.arc(w.cx, w.cy, w.radius, 0, Math.PI * 2);
            ctx.stroke();

            // Pass 2: Vibrant neon wave crest
            const neonWidth = (4.5 + w.intensity * 3.5) * (1.0 - progress * 0.35);
            ctx.strokeStyle = palette.accentAlpha(a * 0.88);
            ctx.lineWidth = neonWidth;
            ctx.beginPath();
            ctx.arc(w.cx, w.cy, w.radius, 0, Math.PI * 2);
            ctx.stroke();

            // Pass 3: Pure starlight white laser core
            ctx.strokeStyle = `rgba(255, 255, 255, ${a * 0.95})`;
            ctx.lineWidth = Math.max(1.4, 2.0 * (1.0 - progress * 0.3));
            ctx.beginPath();
            ctx.arc(w.cx, w.cy, w.radius, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = CosmicEnvironment;
}
