/**
 * CosmicFractals.js
 * Ultra-lightweight, 60/120 FPS high-performance procedural fractals.
 * Renders large, ultra-luminous sacred geometry mandalas with precomputed trigonometry and batched GPU draw calls.
 */

class CosmicFractals {
    constructor() {
        this.rotationAngle = 0;

        // Precompute 36 outer tick mark trigonometry lookup table
        this.ticksCos = new Float32Array(36);
        this.ticksSin = new Float32Array(36);
        for (let i = 0; i < 36; i++) {
            const angle = (i * Math.PI * 2) / 36;
            this.ticksCos[i] = Math.cos(angle);
            this.ticksSin[i] = Math.sin(angle);
        }

        // Precompute 6-fold flower petal trigonometry lookup table
        this.petalCos = new Float32Array(6);
        this.petalSin = new Float32Array(6);
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI * 2) / 6;
            this.petalCos[i] = Math.cos(angle);
            this.petalSin[i] = Math.sin(angle);
        }

        // Precompute hexagram chords
        this.hexagramPoints = [];
        for (let t = 0; t < 2; t++) {
            const offsetAngle = (t * Math.PI) / 3;
            const triangle = [];
            for (let i = 0; i <= 3; i++) {
                const a = offsetAngle + (i * Math.PI * 2) / 3;
                triangle.push({ cos: Math.cos(a), sin: Math.sin(a) });
            }
            this.hexagramPoints.push(triangle);
        }
    }

    update(dt, time, audioState, isPlaying = true) {
        const bpm = audioState.bpm || 120;
        const mids = audioState.mids || audioState.mid || 0;
        const isDrop = audioState.isDrop || false;

        const dropSpeed = isDrop ? 2.4 : 1.0;
        const rotSpeed = isPlaying ? ((0.12 + (bpm / 60) * 0.12 + mids * 0.35) * dropSpeed) : 0.025;
        this.rotationAngle += rotSpeed * dt;
    }

    /**
     * Render large, ultra-luminous sacred geometry mandala rings behind the cat
     */
    render(ctx, cx, cy, baseRadius, palette, audioState) {
        const bass = audioState.bass || 0;
        const mids = audioState.mids || audioState.mid || 0;
        const beat = audioState.beatImpulse || 0;
        const snare = audioState.snareImpulse || 0;
        const energy = audioState.energy || 0.4;
        const isDrop = audioState.isDrop || false;
        const dropMultiplier = isDrop ? 1.25 : 1.0;

        const fractalScale = baseRadius * (1.18 + bass * 0.22 + beat * 0.14) * dropMultiplier;
        const alphaBase = Math.min(0.60, (0.24 + energy * 0.22 + bass * 0.14 + (isDrop ? 0.15 : 0)) * 0.85);

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.translate(cx, cy);
        ctx.rotate(this.rotationAngle);

        // 1. Batched Celestial Outer Tick Marks Ring (With snare reactivity)
        const outerTickRadius = fractalScale * (1.08 + snare * 0.06);
        const innerTickRadius = fractalScale * 1.03;
        const majorTickRadius = fractalScale * 0.99;

        ctx.beginPath();
        for (let i = 0; i < 36; i++) {
            const rIn = (i % 3 === 0) ? majorTickRadius : innerTickRadius;
            const cos = this.ticksCos[i];
            const sin = this.ticksSin[i];
            ctx.moveTo(cos * rIn, sin * rIn);
            ctx.lineTo(cos * outerTickRadius, sin * outerTickRadius);
        }
        ctx.strokeStyle = snare > 0.4 ? palette.core : palette.accentAlpha(alphaBase * (0.75 + snare * 0.4));
        ctx.lineWidth = 1.0 + snare * 0.8;
        ctx.stroke();

        // 2. Concentric Sacred Harmonic Rings (Batched by style)
        // Outer glow rings
        ctx.beginPath();
        ctx.arc(0, 0, fractalScale * 1.08, 0, Math.PI * 2);
        ctx.arc(0, 0, fractalScale * 1.0, 0, Math.PI * 2);
        ctx.strokeStyle = isDrop ? palette.core : palette.accentAlpha(alphaBase * 0.75);
        ctx.lineWidth = 1.4 + (isDrop ? 0.8 : 0);
        ctx.stroke();

        // Inner harmonic rings
        ctx.beginPath();
        ctx.arc(0, 0, fractalScale * 0.72, 0, Math.PI * 2);
        ctx.arc(0, 0, fractalScale * 0.48, 0, Math.PI * 2);
        ctx.arc(0, 0, fractalScale * 0.24, 0, Math.PI * 2);
        ctx.strokeStyle = palette.primaryAlpha(alphaBase * 0.55);
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // 3. Batched 6-Fold Sacred Geometry Petals (Flower of Life - Using precomputed lookup)
        const petalDist = fractalScale * 0.48;
        const petalRadius = fractalScale * 0.48;

        // Outer petals path
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const px = this.petalCos[i] * petalDist;
            const py = this.petalSin[i] * petalDist;
            ctx.moveTo(px + petalRadius, py);
            ctx.arc(px, py, petalRadius, 0, Math.PI * 2);
        }
        ctx.strokeStyle = palette.accentAlpha(alphaBase * 0.75);
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Inner sub-petals and chords path
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const px = this.petalCos[i] * petalDist;
            const py = this.petalSin[i] * petalDist;
            ctx.moveTo(px + petalRadius * 0.5, py);
            ctx.arc(px, py, petalRadius * 0.5, 0, Math.PI * 2);
            // Center radial chord
            ctx.moveTo(0, 0);
            ctx.lineTo(px * 2.0, py * 2.0);
        }
        ctx.strokeStyle = palette.secondaryAlpha(alphaBase * 0.55);
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // 4. Counter-rotating Sacred Hexagram Star Chords
        ctx.save();
        ctx.rotate(-this.rotationAngle * 1.5);
        ctx.beginPath();
        const hexRadius = fractalScale * 0.72;
        for (let t = 0; t < 2; t++) {
            const triangle = this.hexagramPoints[t];
            for (let i = 0; i <= 3; i++) {
                const pt = triangle[i];
                const hx = pt.cos * hexRadius;
                const hy = pt.sin * hexRadius;
                if (i === 0) ctx.moveTo(hx, hy);
                else ctx.lineTo(hx, hy);
            }
        }
        ctx.strokeStyle = palette.accentAlpha(alphaBase * 0.6);
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        // 5. Radiant Central Node
        const centralGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, fractalScale * 0.35);
        centralGlow.addColorStop(0, `rgba(255, 255, 255, ${alphaBase * (0.65 + (isDrop ? 0.35 : 0))})`);
        centralGlow.addColorStop(0.35, palette.accentAlpha(alphaBase * 0.55));
        centralGlow.addColorStop(0.8, palette.primaryAlpha(alphaBase * 0.25));
        centralGlow.addColorStop(1.0, "transparent");

        ctx.fillStyle = centralGlow;
        ctx.beginPath();
        ctx.arc(0, 0, fractalScale * 0.35, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = CosmicFractals;
}
