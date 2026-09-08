// NAME: Cosmic Cat Visualizer
// AUTHOR: Erozah
// DESCRIPTION: Immersive cosmic music visualizer with sitting cat, compact deck, sacred geometry fractals, and energy shockwaves.

(function() {
/**
 * WoodenDeck.js
 * Sleek, compact wooden deck/platform under the cat.
 * Grounded at the bottom ~15% of the screen with refined perspective planks,
 * wood grain, nail fasteners, surface specular reflections, and horizon rim light.
 */

class WoodenDeck {
    constructor() {
        this.plankCount = 4;
        this.planks = [];
        this.initPlanks();
    }

    initPlanks() {
        this.planks = [];
        for (let i = 0; i < this.plankCount; i++) {
            const shift = (Math.random() - 0.5) * 8;
            const r = Math.max(8, Math.min(32, 16 + shift));
            const g = Math.max(6, Math.min(26, 12 + shift * 0.8));
            const b = Math.max(10, Math.min(38, 22 + shift * 1.2));

            this.planks.push({
                r: r | 0,
                g: g | 0,
                b: b | 0,
                topColor: `rgba(${r + 6 | 0}, ${g + 5 | 0}, ${b + 8 | 0}, 0.95)`,
                midColor: `rgba(${r | 0}, ${g | 0}, ${b | 0}, 0.95)`,
                botColor: `rgba(${r - 4 | 0}, ${g - 3 | 0}, ${b - 5 | 0}, 0.95)`,
                grainColor: `rgba(${r + 14 | 0}, ${g + 12 | 0}, ${b + 18 | 0}, 0.16)`,
                nails: [0.12, 0.32, 0.5, 0.68, 0.88]
            });
        }
    }

    /**
     * Render the compact wooden deck at the bottom
     */
    render(ctx, width, height, deckY, palette, audioState) {
        if (deckY >= height) return;

        const deckHeight = height - deckY;
        const bass = audioState.bass || 0;
        const beat = audioState.beatImpulse || 0;
        const energy = audioState.energy || 0.5;

        ctx.save();

        // 1. Base Deck Floor Fill
        const baseDeckGrad = ctx.createLinearGradient(0, deckY, 0, height);
        baseDeckGrad.addColorStop(0, "rgba(14, 10, 20, 0.98)");
        baseDeckGrad.addColorStop(0.35, "rgba(20, 14, 26, 0.99)");
        baseDeckGrad.addColorStop(0.7, "rgba(12, 8, 18, 1.0)");
        baseDeckGrad.addColorStop(1.0, "rgba(6, 4, 12, 1.0)");

        ctx.fillStyle = baseDeckGrad;
        ctx.fillRect(0, deckY, width, deckHeight);

        // 2. Horizontal Wooden Planks
        let currentY = deckY;

        for (let i = 0; i < this.plankCount; i++) {
            const progress = i / this.plankCount;
            const pHeight = deckHeight * (0.16 + progress * 0.16);
            const plankBottom = Math.min(height, currentY + pHeight);
            const plank = this.planks[i];

            const pGrad = ctx.createLinearGradient(0, currentY, 0, plankBottom);
            pGrad.addColorStop(0, plank.topColor);
            pGrad.addColorStop(0.5, plank.midColor);
            pGrad.addColorStop(1.0, plank.botColor);

            ctx.fillStyle = pGrad;
            ctx.fillRect(0, currentY, width, pHeight);

            // Wood Grain Streaks
            ctx.strokeStyle = plank.grainColor;
            ctx.lineWidth = 1.0;
            const grainY = currentY + pHeight * 0.45;

            ctx.beginPath();
            ctx.moveTo(0, grainY);
            ctx.quadraticCurveTo(width * 0.45, grainY - 1.2, width, grainY + 0.8);
            ctx.stroke();

            // Plank Seam Shadow
            ctx.fillStyle = "rgba(4, 3, 8, 0.95)";
            ctx.fillRect(0, plankBottom - 1.5, width, 1.5);

            // Plank Top Bevel Highlight
            ctx.fillStyle = "rgba(255, 255, 255, 0.07)";
            ctx.fillRect(0, currentY, width, 1);

            // Nail Fasteners
            const nails = plank.nails;
            const nailY = currentY + pHeight * 0.5;
            for (let j = 0; j < nails.length; j++) {
                const nailX = nails[j] * width;

                ctx.beginPath();
                ctx.arc(nailX, nailY, 1.6, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(10, 8, 16, 0.85)";
                ctx.fill();

                ctx.beginPath();
                ctx.arc(nailX - 0.4, nailY - 0.4, 0.9, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255, 255, 255, 0.14)";
                ctx.fill();
            }

            currentY = plankBottom;
        }

        // 3. Deck Horizon Rim Light (GPU Accelerated)
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        const rimGrad = ctx.createLinearGradient(0, deckY - 3, 0, deckY + 6);
        rimGrad.addColorStop(0, palette.accentAlpha(0.65 + beat * 0.35));
        rimGrad.addColorStop(0.35, palette.primaryAlpha(0.4 + bass * 0.3));
        rimGrad.addColorStop(1.0, "transparent");

        ctx.fillStyle = rimGrad;
        ctx.fillRect(0, deckY - 2, width, 8);

        // Diffuse rim line
        ctx.strokeStyle = palette.accentAlpha(0.5 + beat * 0.3);
        ctx.lineWidth = 3.0;
        ctx.beginPath();
        ctx.moveTo(0, deckY);
        ctx.lineTo(width, deckY);
        ctx.stroke();

        // Crisp white core rim
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 + beat * 0.4})`;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(0, deckY);
        ctx.lineTo(width, deckY);
        ctx.stroke();

        ctx.restore();

        // 4. Ambient Cat & Energy Reflection on Polished Wood Surface
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        const cx = width * 0.5;
        const reflW = width * 0.34 * (1.0 + bass * 0.2);
        const reflH = deckHeight * 0.85;

        const woodReflGrad = ctx.createRadialGradient(
            cx, deckY + 6, 4,
            cx, deckY + reflH * 0.5, reflW
        );

        const reflAlpha = (0.22 + bass * 0.18 + beat * 0.2) * (0.8 + energy * 0.4);
        woodReflGrad.addColorStop(0, palette.accentAlpha(reflAlpha * 0.9));
        woodReflGrad.addColorStop(0.3, palette.primaryAlpha(reflAlpha * 0.6));
        woodReflGrad.addColorStop(0.7, palette.secondaryAlpha(reflAlpha * 0.25));
        woodReflGrad.addColorStop(1.0, "transparent");

        ctx.fillStyle = woodReflGrad;
        ctx.beginPath();
        ctx.ellipse(cx, deckY + reflH * 0.4, reflW, reflH * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // 5. Contact Shadow directly beneath the cat's seated paws & haunches
        ctx.save();
        const contactShadowGrad = ctx.createRadialGradient(
            cx, deckY + 3, 8,
            cx, deckY + 4, width * 0.16
        );
        contactShadowGrad.addColorStop(0, "rgba(2, 1, 5, 0.90)");
        contactShadowGrad.addColorStop(0.6, "rgba(4, 2, 8, 0.6)");
        contactShadowGrad.addColorStop(1.0, "transparent");

        ctx.fillStyle = contactShadowGrad;
        ctx.beginPath();
        ctx.ellipse(cx, deckY + 3, width * 0.18, 7, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        ctx.restore();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = WoodenDeck;
}

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
        const mids = audioState.mids || 0;

        const rotSpeed = isPlaying ? (0.12 + (bpm / 60) * 0.12 + mids * 0.35) : 0.025;
        this.rotationAngle += rotSpeed * dt;
    }

    /**
     * Render large, ultra-luminous sacred geometry mandala rings behind the cat
     */
    render(ctx, cx, cy, baseRadius, palette, audioState) {
        const bass = audioState.bass || 0;
        const mids = audioState.mids || 0;
        const beat = audioState.beatImpulse || 0;
        const energy = audioState.energy || 0.4;

        const fractalScale = baseRadius * (1.18 + bass * 0.18 + beat * 0.12);
        const alphaBase = Math.min(0.55, (0.24 + energy * 0.20 + bass * 0.12) * 0.85);

        ctx.save();
        ctx.globalCompositeOperation = "screen";
        ctx.translate(cx, cy);
        ctx.rotate(this.rotationAngle);

        // 1. Batched Celestial Outer Tick Marks Ring (Using precomputed table)
        const outerTickRadius = fractalScale * 1.08;
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
        ctx.strokeStyle = palette.accentAlpha(alphaBase * 0.75);
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // 2. Concentric Sacred Harmonic Rings (Batched by style)
        // Outer glow rings
        ctx.beginPath();
        ctx.arc(0, 0, fractalScale * 1.08, 0, Math.PI * 2);
        ctx.arc(0, 0, fractalScale * 1.0, 0, Math.PI * 2);
        ctx.strokeStyle = palette.accentAlpha(alphaBase * 0.75);
        ctx.lineWidth = 1.4;
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
        centralGlow.addColorStop(0, `rgba(255, 255, 255, ${alphaBase * 0.65})`);
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

/**
 * CatGeometry.js
 * High-precision mathematical bezier curves for a sitting cat viewed strictly from behind.
 * Anatomically grounded on a wooden deck with realistic feline posture,
 * dynamic audio-reactive breathing, and luminous ear accents.
 */

class CatGeometry {
    constructor() {
        this.landmarks = {
            tailAnchor: [0, 0],
            leftEarTip: [0, 0],
            leftEarOuter: [0, 0],
            leftEarInner: [0, 0],
            rightEarTip: [0, 0],
            rightEarOuter: [0, 0],
            rightEarInner: [0, 0],
            headCenter: [0, 0],
            spineMid: [0, 0],
            baseCenter: [0, 0]
        };
    }

    /**
     * Compute deformed silhouette parameters based on audio analysis
     */
    getDeformedPath(cx, cy, width, height, audioState, time, deckY, isPlaying = true) {
        const bass = Number.isFinite(audioState?.bass) ? audioState.bass : 0.2;
        const mids = Number.isFinite(audioState?.mids) ? audioState.mids : 0.2;
        const highs = Number.isFinite(audioState?.highs) ? audioState.highs : 0.2;
        const beat = Number.isFinite(audioState?.beatImpulse) ? audioState.beatImpulse : 0.0;
        const bpm = Number.isFinite(audioState?.bpm) ? audioState.bpm : 120;

        // When paused: cat has peaceful resting breath
        // When playing: audio-reactive breathing, bass expansion, ear perks
        const breathSpeed = isPlaying ? (1.6 + (bpm / 60) * 0.4) : 0.8;
        const breath = Math.sin(time * breathSpeed) * (isPlaying ? 0.028 : 0.012);

        // Bass expansion + beat pop
        const bassExpansionX = isPlaying ? (bass * 0.07 + beat * 0.05) : 0;
        const bassExpansionY = isPlaying ? (bass * 0.04 + beat * 0.03) : 0;

        // High frequency micro-vibration
        const vibration = isPlaying ? Math.sin(time * 45) * highs * 0.012 : 0;

        const currentScaleX = (1.0 + breath + bassExpansionX + vibration) * (width * 0.5);
        const currentScaleY = (1.0 - breath * 0.5 + bassExpansionY) * (height * 0.5);

        // Spine subtle organic swaying
        const spineSway = isPlaying ? (Math.sin(time * 2.0) * (0.015 + mids * 0.025)) : (Math.sin(time * 0.8) * 0.005);

        // Ear perk intensity
        const earPerk = isPlaying ? (highs * 0.06 + beat * 0.05) : 0;

        // Anchor bottom base firmly at deckY
        const actualCy = deckY ? (deckY - currentScaleY * 0.96) : cy;

        return {
            cx,
            cy: actualCy,
            scaleX: currentScaleX,
            scaleY: currentScaleY,
            spineSway,
            earPerk,
            breath,
            bass,
            beat,
            highs,
            mids,
            deckY
        };
    }

    /**
     * Build the closed SVG/Canvas Path for the cat body & head seen from behind
     */
    buildBodyPath(ctx, p) {
        const { cx, cy, scaleX, scaleY, spineSway, earPerk, bass } = p;

        ctx.beginPath();

        // Start at bottom center base (resting flat on deck)
        const bX = cx;
        const bY = cy + 0.98 * scaleY;
        ctx.moveTo(bX, bY);

        // 1. Bottom center to Left Paw / Base (grounded flat on wooden deck)
        const lpX = cx - 0.54 * scaleX;
        const lpY = cy + 0.97 * scaleY;
        ctx.quadraticCurveTo(cx - 0.25 * scaleX, cy + 0.98 * scaleY, lpX, lpY);

        // 2. Left Paw around seated Thigh / Flank
        const lThighX = cx + (-0.66 - bass * 0.04) * scaleX;
        const lThighY = cy + 0.68 * scaleY;
        ctx.quadraticCurveTo(cx - 0.64 * scaleX, cy + 0.92 * scaleY, lThighX, lThighY);

        // 3. Left Thigh up to Mid-Back / Waist
        const lBackX = cx + (-0.42 + spineSway * 0.2) * scaleX;
        const lBackY = cy + 0.24 * scaleY;
        ctx.quadraticCurveTo(cx - 0.65 * scaleX, cy + 0.44 * scaleY, lBackX, lBackY);

        // 4. Left Mid-Back to Shoulder
        const lShX = cx + (-0.34 + spineSway * 0.4) * scaleX;
        const lShY = cy - 0.04 * scaleY;
        ctx.quadraticCurveTo(cx - 0.40 * scaleX, cy + 0.08 * scaleY, lShX, lShY);

        // 5. Left Shoulder to Neck & Head Nape
        const lNapeX = cx + (-0.32 + spineSway * 0.6) * scaleX;
        const lNapeY = cy - 0.36 * scaleY;
        ctx.quadraticCurveTo(cx - 0.28 * scaleX, cy - 0.20 * scaleY, lNapeX, lNapeY);

        // 6. Left Nape to Outer Ear Base
        const lEarOuterX = cx + (-0.36 + spineSway * 0.6) * scaleX;
        const lEarOuterY = cy - 0.52 * scaleY;
        ctx.lineTo(lEarOuterX, lEarOuterY);

        // 7. Outer Ear Base to LEFT EAR TIP
        const lEarTipX = cx + (-0.31 - earPerk * 0.2 + spineSway * 0.7) * scaleX;
        const lEarTipY = cy + (-0.98 - earPerk * 0.4) * scaleY;
        ctx.quadraticCurveTo(cx - 0.37 * scaleX, cy - 0.76 * scaleY, lEarTipX, lEarTipY);

        // 8. Left Ear Tip to Inner Ear Base
        const lEarInnerX = cx + (-0.13 + spineSway * 0.7) * scaleX;
        const lEarInnerY = cy - 0.64 * scaleY;
        ctx.quadraticCurveTo(cx - 0.20 * scaleX, cy - 0.78 * scaleY, lEarInnerX, lEarInnerY);

        // 9. Inner Left Ear Base across Top of Head
        const rEarInnerX = cx + (0.13 + spineSway * 0.7) * scaleX;
        const rEarInnerY = cy - 0.64 * scaleY;
        ctx.quadraticCurveTo(cx + (0.0 + spineSway * 0.7) * scaleX, cy - 0.67 * scaleY, rEarInnerX, rEarInnerY);

        // 10. Inner Right Ear Base to RIGHT EAR TIP
        const rEarTipX = cx + (0.31 + earPerk * 0.2 + spineSway * 0.7) * scaleX;
        const rEarTipY = cy + (-0.98 - earPerk * 0.4) * scaleY;
        ctx.quadraticCurveTo(cx + 0.20 * scaleX, cy - 0.78 * scaleY, rEarTipX, rEarTipY);

        // 11. Right Ear Tip to Outer Right Ear Base
        const rEarOuterX = cx + (0.36 + spineSway * 0.6) * scaleX;
        const rEarOuterY = cy - 0.52 * scaleY;
        ctx.quadraticCurveTo(cx + 0.37 * scaleX, cy - 0.76 * scaleY, rEarOuterX, rEarOuterY);

        // 12. Outer Right Ear Base to Right Nape
        const rNapeX = cx + (0.32 + spineSway * 0.6) * scaleX;
        const rNapeY = cy - 0.36 * scaleY;
        ctx.lineTo(rNapeX, rNapeY);

        // 13. Right Nape to Right Shoulder
        const rShX = cx + (0.34 + spineSway * 0.4) * scaleX;
        const rShY = cy - 0.04 * scaleY;
        ctx.quadraticCurveTo(cx + 0.28 * scaleX, cy - 0.20 * scaleY, rShX, rShY);

        // 14. Right Shoulder to Mid-Back
        const rBackX = cx + (0.42 + spineSway * 0.2) * scaleX;
        const rBackY = cy + 0.24 * scaleY;
        ctx.quadraticCurveTo(cx + 0.40 * scaleX, cy + 0.08 * scaleY, rBackX, rBackY);

        // 15. Right Mid-Back to Right Thigh
        const rThighX = cx + (0.66 + bass * 0.04) * scaleX;
        const rThighY = cy + 0.68 * scaleY;
        ctx.quadraticCurveTo(cx + 0.65 * scaleX, cy + 0.44 * scaleY, rThighX, rThighY);

        // 16. Right Thigh to Right Paw & back to Bottom Center
        const rpX = cx + 0.54 * scaleX;
        const rpY = cy + 0.97 * scaleY;
        ctx.quadraticCurveTo(cx + 0.64 * scaleX, cy + 0.92 * scaleY, rpX, rpY);
        ctx.quadraticCurveTo(cx + 0.25 * scaleX, cy + 0.98 * scaleY, bX, bY);

        ctx.closePath();

        // Update reusable landmarks
        const lm = this.landmarks;
        lm.tailAnchor[0] = cx - 0.14 * scaleX;
        lm.tailAnchor[1] = cy + 0.92 * scaleY;
        lm.leftEarTip[0] = lEarTipX;
        lm.leftEarTip[1] = lEarTipY;
        lm.leftEarOuter[0] = lEarOuterX;
        lm.leftEarOuter[1] = lEarOuterY;
        lm.leftEarInner[0] = lEarInnerX;
        lm.leftEarInner[1] = lEarInnerY;
        lm.rightEarTip[0] = rEarTipX;
        lm.rightEarTip[1] = rEarTipY;
        lm.rightEarOuter[0] = rEarOuterX;
        lm.rightEarOuter[1] = rEarOuterY;
        lm.rightEarInner[0] = rEarInnerX;
        lm.rightEarInner[1] = rEarInnerY;
        lm.headCenter[0] = cx + (0.0 + spineSway * 0.7) * scaleX;
        lm.headCenter[1] = cy - 0.45 * scaleY;
        lm.spineMid[0] = cx + (0.0 + spineSway * 0.3) * scaleX;
        lm.spineMid[1] = cy + 0.12 * scaleY;
        lm.baseCenter[0] = bX;
        lm.baseCenter[1] = bY;

        return lm;
    }

    /**
     * Render the ear glowing contours with enhanced luminosity (GPU accelerated)
     */
    renderEarContours(ctx, p, landmarks, palette) {
        const { leftEarTip, leftEarOuter, leftEarInner, rightEarTip, rightEarOuter, rightEarInner } = landmarks;
        const { beat, highs } = p;

        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Build ear path
        ctx.beginPath();
        // Left ear contour
        ctx.moveTo(leftEarOuter[0], leftEarOuter[1]);
        ctx.quadraticCurveTo((leftEarOuter[0] + leftEarTip[0]) * 0.5 - 4, (leftEarOuter[1] + leftEarTip[1]) * 0.5, leftEarTip[0], leftEarTip[1]);
        ctx.quadraticCurveTo((leftEarInner[0] + leftEarTip[0]) * 0.5 + 3, (leftEarInner[1] + leftEarTip[1]) * 0.5, leftEarInner[0], leftEarInner[1]);
        // Right ear contour
        ctx.moveTo(rightEarOuter[0], rightEarOuter[1]);
        ctx.quadraticCurveTo((rightEarOuter[0] + rightEarTip[0]) * 0.5 + 4, (rightEarOuter[1] + rightEarTip[1]) * 0.5, rightEarTip[0], rightEarTip[1]);
        ctx.quadraticCurveTo((rightEarInner[0] + rightEarTip[0]) * 0.5 - 3, (rightEarInner[1] + rightEarTip[1]) * 0.5, rightEarInner[0], rightEarInner[1]);

        // Inner glowing ear tufts (Vibrant theme accent)
        ctx.fillStyle = palette.accentAlpha(0.45 + beat * 0.35);
        ctx.fill();

        // Pass 1: Fine soft neon aura
        ctx.strokeStyle = palette.primaryAlpha(0.85 + beat * 0.15);
        ctx.lineWidth = 4.0;
        ctx.stroke();

        // Pass 2: Intense razor-sharp neon contour
        ctx.strokeStyle = palette.accentAlpha(1.0);
        ctx.lineWidth = 2.0;
        ctx.stroke();

        // Pass 3: Brilliant starlight core
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Internal ear ridge accent
        ctx.beginPath();
        ctx.moveTo(leftEarTip[0], leftEarTip[1]);
        ctx.quadraticCurveTo(leftEarTip[0] + 6, leftEarTip[1] + 25, (leftEarOuter[0] + leftEarInner[0]) * 0.5, (leftEarOuter[1] + leftEarInner[1]) * 0.5);
        ctx.moveTo(rightEarTip[0], rightEarTip[1]);
        ctx.quadraticCurveTo(rightEarTip[0] - 6, rightEarTip[1] + 25, (rightEarOuter[0] + rightEarInner[0]) * 0.5, (rightEarOuter[1] + rightEarInner[1]) * 0.5);

        ctx.strokeStyle = palette.accentAlpha(0.9 + highs * 0.1);
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.restore();
    }

    /**
     * Render the interior energy of the cat - luminous, bright, and intensely radiant
     */
    renderInterior(ctx, p, landmarks, palette, time) {
        const { scaleY, scaleX, bass, mids, highs, beat } = p;
        const { headCenter, spineMid, baseCenter } = landmarks;

        ctx.save();
        
        // 1. Ethereal, luminous celestial body gradient (Bright, crystal clear and radiant)
        const interiorGrad = ctx.createRadialGradient(
            spineMid[0], spineMid[1] - scaleY * 0.15, 10,
            spineMid[0], spineMid[1], scaleY * 1.05
        );
        interiorGrad.addColorStop(0, palette.primaryAlpha(0.65 + beat * 0.25));
        interiorGrad.addColorStop(0.35, palette.secondaryAlpha(0.55 + bass * 0.2));
        interiorGrad.addColorStop(0.75, palette.deepNebulaAlpha(0.75));
        interiorGrad.addColorStop(1.0, "rgba(8, 6, 22, 0.90)");

        ctx.fillStyle = interiorGrad;
        ctx.fill();

        // 2. High-vibrancy glowing chest and feline heart (Ultra-luminous pulsar)
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        const heartGlow = ctx.createRadialGradient(
            spineMid[0], spineMid[1] - scaleY * 0.2, 5,
            spineMid[0], spineMid[1] - scaleY * 0.1, scaleY * 0.75
        );
        heartGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        heartGlow.addColorStop(0.25, palette.accentAlpha(0.95));
        heartGlow.addColorStop(0.55, palette.primaryAlpha(0.75 + bass * 0.2));
        heartGlow.addColorStop(0.85, palette.secondaryAlpha(0.40));
        heartGlow.addColorStop(1.0, "transparent");

        ctx.fillStyle = heartGlow;
        ctx.fill();

        // 3. Flank and back starlight silk sheen
        const silkGrad = ctx.createLinearGradient(
            spineMid[0] - scaleX * 0.5, spineMid[1],
            spineMid[0] + scaleX * 0.5, spineMid[1]
        );
        silkGrad.addColorStop(0, palette.accentAlpha(0.50));
        silkGrad.addColorStop(0.3, palette.primaryAlpha(0.25));
        silkGrad.addColorStop(0.7, palette.primaryAlpha(0.25));
        silkGrad.addColorStop(1.0, palette.accentAlpha(0.50));

        ctx.fillStyle = silkGrad;
        ctx.fill();

        // 4. Luminous spine energy line with sparkling starlight
        ctx.beginPath();
        ctx.moveTo(headCenter[0], headCenter[1] + 10);
        ctx.quadraticCurveTo(spineMid[0] + Math.sin(time * 2.2) * 5, spineMid[1], baseCenter[0], baseCenter[1] - 8);
        ctx.strokeStyle = palette.accentAlpha(1.0);
        ctx.lineWidth = 2.8;
        ctx.stroke();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.4;
        ctx.stroke();

        ctx.restore();
        ctx.restore();
    }

    /**
     * Render the main glowing contour of the silhouette with sharp contrast mask
     */
    renderContour(ctx, p, palette) {
        const { bass, highs, beat } = p;

        ctx.save();

        // Pass 0: Crisp thin dark contrast edge
        ctx.strokeStyle = "rgba(1, 1, 4, 0.95)";
        ctx.lineWidth = 4.5;
        ctx.stroke();

        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Layer 1: Fine volumetric glow (high luminosity, narrow 5px stroke)
        ctx.strokeStyle = palette.primaryAlpha(0.85 + bass * 0.15);
        ctx.lineWidth = 5.2 + bass * 1.5;
        ctx.stroke();

        // Layer 2: Ultra-vibrant laser neon edge (2.2px)
        ctx.strokeStyle = palette.accentAlpha(1.0);
        ctx.lineWidth = 2.2;
        ctx.stroke();

        // Layer 3: Pure starlight white laser core (1.1px)
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 + highs * 0.05})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Layer 4: High-energy beat flash (crisp starlight pulse on beats)
        if (beat > 0.3) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${beat * 0.8})`;
            ctx.lineWidth = 2.0;
            ctx.stroke();
        }

        ctx.restore();
        ctx.restore();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = CatGeometry;
}

/**
 * TailPhysics.js
 * Realistic feline tail kinematics and organic rendering.
 * Simulates a cat's tail resting naturally on the wooden deck,
 * with authentic feline thickness tapering, gentle BPM-synchronized swish,
 * realistic deck contact, and rhythmic tip twitches.
 */

class TailPhysics {
    constructor(segmentCount = 20) {
        this.segmentCount = segmentCount;
        this.nodes = [];
        this.leftPoints = [];
        this.rightPoints = [];
        
        for (let i = 0; i < this.segmentCount; i++) {
            this.nodes.push({
                x: 0,
                y: 0,
                thickness: 1.0
            });
            this.leftPoints.push({ x: 0, y: 0 });
            this.rightPoints.push({ x: 0, y: 0 });
        }

        this.swayPhase = 0;
        this.tipTwitch = 0;
        this.deckTapImpulse = 0;
        this.initialized = false;
        this.sparkTrail = [];
    }

    /**
     * Update realistic feline tail physics
     */
    update(anchorPoint, baseScale, audioState, dt, time, deckY, isPlaying = true) {
        const bpm = audioState.bpm || 120;
        const energy = audioState.energy || 0;
        const bass = audioState.bass || 0;
        const highs = audioState.highs || 0;
        const beat = audioState.beatImpulse || 0;

        const rootX = anchorPoint[0];
        const rootY = anchorPoint[1];

        // 1. Natural Feline Sway Rhythm
        const tempoHz = isPlaying ? Math.max(0.5, Math.min(2.5, (bpm / 60) * 0.45)) : 0.12;
        const swaySpeed = isPlaying ? (tempoHz * (1.0 + energy * 0.4)) : 0.12;
        this.swayPhase += swaySpeed * dt;

        // 2. Beat Deck Tap & Tip Twitch
        if (isPlaying && beat > 0.4) {
            this.tipTwitch += (beat * 1.8) * (Math.sin(this.swayPhase) > 0 ? 1 : -1);
            this.deckTapImpulse = Math.min(1.0, this.deckTapImpulse + beat * 0.8);
        } else if (!isPlaying) {
            this.tipTwitch = 0;
            this.deckTapImpulse = 0;
        }
        this.tipTwitch *= Math.pow(0.86, dt * 60);
        this.deckTapImpulse *= Math.pow(0.88, dt * 60);
        if (isNaN(this.tipTwitch)) this.tipTwitch = 0;
        if (isNaN(this.deckTapImpulse)) this.deckTapImpulse = 0;

        // 3. Feline Tail Spine Kinematics
        const totalTailLength = 175 * baseScale;
        const segLen = totalTailLength / (this.segmentCount - 1);

        if (!this.initialized) {
            for (let i = 0; i < this.segmentCount; i++) {
                this.nodes[i].x = rootX - i * segLen * 0.8;
                this.nodes[i].y = rootY + i * segLen * 0.3;
                this.nodes[i].thickness = 11.0 * baseScale;
            }
            this.initialized = true;
        }

        // Set Root Node
        this.nodes[0].x = rootX;
        this.nodes[0].y = rootY;
        this.nodes[0].thickness = 11.0 * baseScale;

        const maxSwayAngle = isPlaying ? (0.35 + energy * 0.25 + bass * 0.2) : 0.05;

        for (let i = 1; i < this.segmentCount; i++) {
            const frac = i / (this.segmentCount - 1); // 0.0 at root, 1.0 at tip
            
            // Feline S-curve harmonic wave
            const wavePhase = this.swayPhase - frac * 2.2;
            const horizontalSway = Math.sin(wavePhase) * maxSwayAngle * (frac * 1.3);
            const secondaryHarmonic = isPlaying ? (Math.sin(wavePhase * 1.8) * 0.15 * frac) : 0;

            // Tip twitch & energetic whip
            const tipCurl = this.tipTwitch * Math.pow(frac, 2.5) * 1.4;

            // Target natural resting angle
            const baseDirAngle = Math.PI * 0.88; // extending towards left rear deck
            const currentAngle = baseDirAngle + horizontalSway + secondaryHarmonic + tipCurl;

            // Target position
            const prev = this.nodes[i - 1];
            let targetX = prev.x + Math.cos(currentAngle) * segLen;
            let targetY = prev.y + Math.sin(currentAngle) * segLen;

            // Deck constraint: tail rests gracefully on the wooden deck surface
            if (deckY && targetY > deckY + 12 * baseScale) {
                targetY = deckY + 12 * baseScale;
            }

            // Tip lifts gently off the deck when active
            if (isPlaying && frac > 0.75) {
                const tipLift = Math.sin(time * 3 + frac * 4) * (6 * baseScale * highs) - (this.deckTapImpulse * 8 * baseScale);
                targetY += tipLift;
            }

            // Smooth spring damping towards target
            const blend = 0.38 + (1 - frac) * 0.25;
            this.nodes[i].x += (targetX - this.nodes[i].x) * blend;
            this.nodes[i].y += (targetY - this.nodes[i].y) * blend;

            // Realistic Feline Thickness Profile
            const thicknessProfile = 1.0 - Math.pow(frac, 1.4) * 0.65;
            this.nodes[i].thickness = thicknessProfile * (11.0 * baseScale);
        }

        // 4. Precalculate Envelope Curves in pre-allocated buffers (Zero runtime GC)
        for (let i = 0; i < this.segmentCount; i++) {
            const curr = this.nodes[i];
            const next = i < this.segmentCount - 1 ? this.nodes[i + 1] : curr;
            const prev = i > 0 ? this.nodes[i - 1] : curr;

            const dx = next.x - prev.x;
            const dy = next.y - prev.y;
            const len = Math.sqrt(dx * dx + dy * dy) || 1;
            const nx = -dy / len;
            const ny = dx / len;

            const t = curr.thickness;
            this.leftPoints[i].x = curr.x + nx * t;
            this.leftPoints[i].y = curr.y + ny * t;
            this.rightPoints[i].x = curr.x - nx * t;
            this.rightPoints[i].y = curr.y - ny * t;
        }

        // 5. Tip Sparkle Trail (only when playing)
        const tip = this.nodes[this.segmentCount - 1];
        if (isPlaying && Math.random() < 0.35 + highs * 0.5 + beat * 0.3) {
            this.sparkTrail.push({
                x: tip.x + (Math.random() - 0.5) * 6,
                y: tip.y + (Math.random() - 0.5) * 6,
                vx: (Math.random() - 0.5) * 20 - 10,
                vy: (Math.random() - 0.5) * 20 - 10,
                life: 1.0,
                decay: 1.1 + Math.random() * 1.4,
                size: (1.5 + Math.random() * 2.5) * baseScale,
                color: Math.random() < 0.6 ? "accent" : "starlight"
            });
        }

        // Update sparks
        for (let i = this.sparkTrail.length - 1; i >= 0; i--) {
            const sp = this.sparkTrail[i];
            sp.x += sp.vx * dt;
            sp.y += sp.vy * dt;
            sp.life -= sp.decay * dt;
            if (sp.life <= 0 || !isPlaying) {
                this.sparkTrail.splice(i, 1);
            }
        }
    }

    /**
     * Build closed tail path on canvas (zero allocations)
     */
    buildTailPath(ctx, baseScale) {
        const lp = this.leftPoints;
        const rp = this.rightPoints;
        const n = this.segmentCount;

        ctx.beginPath();
        ctx.moveTo(lp[0].x, lp[0].y);

        // Left spine side (Smooth Catmull-Rom)
        for (let i = 0; i < n - 1; i++) {
            const p0 = i > 0 ? lp[i - 1] : lp[0];
            const p1 = lp[i];
            const p2 = lp[i + 1];
            const p3 = i < n - 2 ? lp[i + 2] : p2;

            const cp1x = p1.x + (p2.x - p0.x) * 0.1666666;
            const cp1y = p1.y + (p2.y - p0.y) * 0.1666666;
            const cp2x = p2.x - (p3.x - p1.x) * 0.1666666;
            const cp2y = p2.y - (p3.y - p1.y) * 0.1666666;

            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }

        // Rounded tip cap
        const tip = this.nodes[n - 1];
        const tipRight = rp[n - 1];
        ctx.quadraticCurveTo(tip.x - 4 * baseScale, tip.y + 2 * baseScale, tipRight.x, tipRight.y);

        // Right spine side (back to root)
        for (let i = n - 1; i > 0; i--) {
            const p0 = i < n - 1 ? rp[i + 1] : rp[n - 1];
            const p1 = rp[i];
            const p2 = rp[i - 1];
            const p3 = i > 1 ? rp[i - 2] : p2;

            const cp1x = p1.x + (p2.x - p0.x) * 0.1666666;
            const cp1y = p1.y + (p2.y - p0.y) * 0.1666666;
            const cp2x = p2.x - (p3.x - p1.x) * 0.1666666;
            const cp2y = p2.y - (p3.y - p1.y) * 0.1666666;

            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }

        ctx.closePath();
    }

    /**
     * Render the realistic feline tail with organic thickness envelope & fur glow
     */
    render(ctx, palette, audioState, baseScale, deckY) {
        if (this.nodes.length < 3) return;

        const bass = audioState.bass || 0;
        const highs = audioState.highs || 0;
        const beat = audioState.beatImpulse || 0;

        ctx.save();

        // 1. Tail Contact Shadow onto Wooden Deck
        if (deckY) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.nodes[0].x, deckY + 4);
            for (let i = 1; i < this.segmentCount; i++) {
                ctx.lineTo(this.nodes[i].x, deckY + 6);
            }
            ctx.lineWidth = 14 * baseScale;
            ctx.strokeStyle = "rgba(2, 1, 6, 0.45)";
            ctx.stroke();
            ctx.restore();
        }

        // 2. Tail Interior Cosmic Shimmer
        this.buildTailPath(ctx, baseScale);
        const rootNode = this.nodes[0];
        const tipNode = this.nodes[this.segmentCount - 1];
        const tailGrad = ctx.createLinearGradient(rootNode.x, rootNode.y, tipNode.x, tipNode.y);
        tailGrad.addColorStop(0, "rgba(16, 12, 32, 0.95)");
        tailGrad.addColorStop(0.5, "rgba(10, 8, 24, 0.98)");
        tailGrad.addColorStop(1.0, "rgba(6, 4, 16, 1.0)");
        ctx.fillStyle = tailGrad;
        ctx.fill();

        // Subtle inner energy core
        ctx.save();
        ctx.globalCompositeOperation = "screen";
        const innerEnergyGrad = ctx.createLinearGradient(rootNode.x, rootNode.y, tipNode.x, tipNode.y);
        innerEnergyGrad.addColorStop(0, palette.primaryAlpha(0.25 + bass * 0.2));
        innerEnergyGrad.addColorStop(0.6, palette.accentAlpha(0.20 + highs * 0.2));
        innerEnergyGrad.addColorStop(1.0, palette.accentAlpha(0.35 + beat * 0.3));
        ctx.fillStyle = innerEnergyGrad;
        ctx.fill();
        ctx.restore();

        // 3. Glowing Feline Fur Outer Contour (GPU Accelerated)
        ctx.save();
        ctx.globalCompositeOperation = "screen";

        // Outer soft glow
        this.buildTailPath(ctx, baseScale);
        ctx.strokeStyle = palette.primaryAlpha(0.75 + bass * 0.25);
        ctx.lineWidth = 3.5 * baseScale;
        ctx.stroke();

        // Vibrant neon rim
        this.buildTailPath(ctx, baseScale);
        ctx.strokeStyle = palette.accentAlpha(1.0);
        ctx.lineWidth = 1.8 * baseScale;
        ctx.stroke();

        // Starlight crisp highlight
        this.buildTailPath(ctx, baseScale);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.92 + highs * 0.08})`;
        ctx.lineWidth = 0.9 * baseScale;
        ctx.stroke();

        // Tip glowing energy tuft
        const tipGlow = ctx.createRadialGradient(tipNode.x, tipNode.y, 0, tipNode.x, tipNode.y, 16 * baseScale);
        tipGlow.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        tipGlow.addColorStop(0.35, palette.accentAlpha(0.85));
        tipGlow.addColorStop(0.75, palette.primaryAlpha(0.4));
        tipGlow.addColorStop(1.0, "transparent");

        ctx.fillStyle = tipGlow;
        ctx.beginPath();
        ctx.arc(tipNode.x, tipNode.y, 16 * baseScale, 0, Math.PI * 2);
        ctx.fill();

        // Spark trail
        for (let i = 0; i < this.sparkTrail.length; i++) {
            const sp = this.sparkTrail[i];
            ctx.fillStyle = sp.color === "starlight" ? `rgba(255, 255, 255, ${sp.life})` : palette.accentAlpha(sp.life);
            ctx.beginPath();
            ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
        ctx.restore();
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = TailPhysics;
}

/**
 * ColorPalettes.js
 * Harmonious, evolving cosmic palettes with smooth interpolation,
 * alpha helpers, and Spotify album art dynamic extraction.
 */

class ColorPalette {
    constructor() {
        this.themes = {
            aurora: {
                primary: [130, 45, 240],      // Electric Purple
                secondary: [20, 180, 220],   // Cyan Nebula
                accent: [0, 245, 210],       // Neon Teal / Aurora Green
                deepNebula: [15, 8, 35],     // Deep Space Violet
                starlight: [230, 245, 255]   // Starlight White
            },
            nebula: {
                primary: [235, 40, 150],     // Vibrant Magenta
                secondary: [140, 30, 230],   // Royal Purple
                accent: [255, 120, 210],     // Pink Plasma
                deepNebula: [25, 6, 30],     // Abyss Dark Wine
                starlight: [255, 235, 250]   // Soft Pearl
            },
            solar: {
                primary: [255, 95, 20],      // Solar Orange
                secondary: [240, 20, 90],    // Crimson Corona
                accent: [255, 210, 40],      // Gold Flare
                deepNebula: [30, 10, 5],     // Dark Ember
                starlight: [255, 250, 230]   // Warm White
            },
            cyber: {
                primary: [0, 160, 255],      // Cyber Blue
                secondary: [255, 0, 140],    // Laser Pink
                accent: [0, 255, 230],       // Neon Cyan
                deepNebula: [5, 10, 30],     // Deep Grid Abyss
                starlight: [220, 250, 255]   // Electric White
            },
            emerald: {
                primary: [10, 210, 140],     // Emerald Glow
                secondary: [30, 130, 230],   // Oceanic Blue
                accent: [120, 255, 170],     // Mint Sparkle
                deepNebula: [4, 25, 20],     // Deep Moss Abyss
                starlight: [230, 255, 245]   // Mint Starlight
            },
            twilight: {
                primary: [110, 70, 245],     // Mystic Violet
                secondary: [40, 100, 240],   // Cobalt Blue
                accent: [180, 140, 255],     // Luminous Lavender
                deepNebula: [12, 10, 28],    // Dark Midnight
                starlight: [240, 235, 255]   // Lavender Starlight
            }
        };

        this.currentThemeKey = "aurora";
        this.current = {
            primary: [130, 45, 240],
            secondary: [20, 180, 220],
            accent: [0, 245, 210],
            deepNebula: [15, 8, 35],
            starlight: [230, 245, 255]
        };

        this.target = {
            primary: [130, 45, 240],
            secondary: [20, 180, 220],
            accent: [0, 245, 210],
            deepNebula: [15, 8, 35],
            starlight: [230, 245, 255]
        };
        this.adaptiveActive = false;
    }

    setTheme(key, immediate = true) {
        const t = this.themes[key];
        if (t) {
            this.currentThemeKey = key;
            this.adaptiveActive = false;
            this.target.primary = [...t.primary];
            this.target.secondary = [...t.secondary];
            this.target.accent = [...t.accent];
            this.target.deepNebula = [...t.deepNebula];
            this.target.starlight = [...t.starlight];

            if (immediate) {
                this.current.primary = [...t.primary];
                this.current.secondary = [...t.secondary];
                this.current.accent = [...t.accent];
                this.current.deepNebula = [...t.deepNebula];
                this.current.starlight = [...t.starlight];
            }
        }
    }

    setAdaptiveFromColors(colors) {
        if (!colors) return;
        this.adaptiveActive = true;
        
        const hexToRgb = (hex) => {
            if (!hex) return null;
            hex = hex.replace("#", "");
            if (hex.length === 3) {
                hex = hex.split("").map(c => c + c).join("");
            }
            const num = parseInt(hex, 16);
            return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
        };

        const vibrant = hexToRgb(colors.VIBRANT) || hexToRgb(colors.PROMINENT) || [130, 45, 240];
        const lightVibrant = hexToRgb(colors.LIGHT_VIBRANT) || hexToRgb(colors.DESATURATED) || [0, 245, 210];
        const darkVibrant = hexToRgb(colors.DARK_VIBRANT) || [20, 180, 220];

        this.target.primary = vibrant;
        this.target.accent = lightVibrant;
        this.target.secondary = darkVibrant;
        this.target.deepNebula = [
            Math.floor(darkVibrant[0] * 0.15),
            Math.floor(darkVibrant[1] * 0.15),
            Math.floor(darkVibrant[2] * 0.15)
        ];
        this.target.starlight = [240, 245, 255];
    }

    update(dt) {
        // Smoothly interpolate RGB channels towards target
        const speed = Math.min(1.0, dt * 2.5);
        const keys = ["primary", "secondary", "accent", "deepNebula", "starlight"];

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const curr = this.current[key];
            const targ = this.target[key];
            curr[0] += (targ[0] - curr[0]) * speed;
            curr[1] += (targ[1] - curr[1]) * speed;
            curr[2] += (targ[2] - curr[2]) * speed;
        }
    }

    // Helper formatting
    get primary() {
        const c = this.current.primary;
        return `rgb(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0})`;
    }

    primaryAlpha(a) {
        const c = this.current.primary;
        return `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${Math.max(0, Math.min(1, a))})`;
    }

    get secondary() {
        const c = this.current.secondary;
        return `rgb(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0})`;
    }

    secondaryAlpha(a) {
        const c = this.current.secondary;
        return `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${Math.max(0, Math.min(1, a))})`;
    }

    get accent() {
        const c = this.current.accent;
        return `rgb(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0})`;
    }

    accentAlpha(a) {
        const c = this.current.accent;
        return `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${Math.max(0, Math.min(1, a))})`;
    }

    get deepNebula() {
        const c = this.current.deepNebula;
        return `rgb(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0})`;
    }

    deepNebulaAlpha(a) {
        const c = this.current.deepNebula;
        return `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${Math.max(0, Math.min(1, a))})`;
    }

    get starlight() {
        const c = this.current.starlight;
        return `rgb(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0})`;
    }

    starlightAlpha(a) {
        const c = this.current.starlight;
        return `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${Math.max(0, Math.min(1, a))})`;
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = ColorPalette;
}

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

/**
 * AudioAnalysisEngine.js
 * Comprehensive multi-level musical analysis engine.
 * Integrates Spotify Web API track analysis (segments, beats, tatums, sections),
 * real-time Web Audio API / FFT capture, and organic generative fallback.
 */

class AudioAnalysisEngine {
    constructor() {
        this.currentTrackId = null;
        this.analysisData = null;
        this.isLoading = false;

        // Current smoothed state
        this.state = {
            energy: 0.5,
            volume: 1.0,
            bass: 0.2,
            mids: 0.2,
            highs: 0.2,
            bpm: 120,
            beatImpulse: 0.0,
            beatPhase: 0.0,
            barPhase: 0.0,
            isBeatPulse: false, // Dispatched on EVERY beat (1 per beat)
            is4BeatPulse: false, // Dispatched every 4 beats (1 bar)
            pitches: new Float32Array(12),
            timbre: new Float32Array(12)
        };

        // Internal raw targets for smoothing
        this.targets = {
            energy: 0.5,
            bass: 0.2,
            mids: 0.2,
            highs: 0.2,
            beatImpulse: 0.0
        };

        this.lastBeatIndex = -1;
        this.lastBarIndex = -1;
        this.last4BeatIndex = -1;
        this.liveTime = 0;
        this.lastProgressSec = 0;

        // Fast index pointers for Spotify analysis playback
        this.beatCursor = 0;
        this.barCursor = 0;
        this.sectionCursor = 0;

        // Web Audio API hooks (optional live capture)
        this.audioContext = null;
        this.analyser = null;
        this.freqData = null;
        this.isLiveAudioActive = false;
    }

    /**
     * Load Spotify Audio Analysis for a track ID or URI
     */
    async loadSpotifyAnalysis(trackUriOrId) {
        if (!trackUriOrId) return;
        const trackId = trackUriOrId.replace("spotify:track:", "");
        if (this.currentTrackId === trackId && (this.analysisData || this.isLoading)) return;

        this.currentTrackId = trackId;
        this.isLoading = true;
        this.analysisData = null;
        this.beatCursor = 0;
        this.barCursor = 0;
        this.sectionCursor = 0;

        try {
            // Attempt 1: Spicetify CosmosAsync with Spotify API endpoint
            if (typeof Spicetify !== "undefined" && Spicetify.CosmosAsync) {
                try {
                    const res = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`);
                    if (res && res.track && res.segments) {
                        this.analysisData = res;
                        this.state.bpm = res.track.tempo || 120;
                        this.isLoading = false;
                        return;
                    }
                } catch (e) {
                    // Fallback to partner API
                    try {
                        const resPartner = await Spicetify.CosmosAsync.get(`https://api-partner.spotify.com/pathway/v1/web-player/analysis/${trackId}`);
                        if (resPartner && resPartner.track) {
                            this.analysisData = resPartner;
                            this.state.bpm = resPartner.track.tempo || 120;
                            this.isLoading = false;
                            return;
                        }
                    } catch (err2) {}
                }
            }

            // Attempt 2: Direct fetch (for local or mock server)
            const token = typeof Spicetify !== "undefined" && Spicetify.Platform ? await Spicetify.Platform.AuthorizationAPI.getAccessToken() : null;
            if (token) {
                const response = await fetch(`https://api.spotify.com/v1/audio-analysis/${trackId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.ok) {
                    this.analysisData = await response.json();
                    this.state.bpm = this.analysisData.track.tempo || 120;
                }
            }
        } catch (error) {
            // Silent fallback to organic synthesizer
        } finally {
            this.isLoading = false;
        }
    }

    /**
     * Connect Web Audio API Live Source (microphone, stream, or audio element)
     */
    connectAudioSource(audioSourceNodeOrElement) {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!this.audioContext) {
                this.audioContext = new AudioCtx();
            }
            if (this.audioContext.state === "suspended") {
                this.audioContext.resume();
            }

            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 512;
            this.analyser.smoothingTimeConstant = 0.75;
            this.freqData = new Uint8Array(this.analyser.frequencyBinCount);

            let source;
            if (audioSourceNodeOrElement instanceof HTMLMediaElement) {
                source = this.audioContext.createMediaElementSource(audioSourceNodeOrElement);
                source.connect(this.analyser);
                this.analyser.connect(this.audioContext.destination);
            } else if (audioSourceNodeOrElement instanceof MediaStream) {
                source = this.audioContext.createMediaStreamSource(audioSourceNodeOrElement);
                source.connect(this.analyser);
            } else if (audioSourceNodeOrElement instanceof AudioNode) {
                audioSourceNodeOrElement.connect(this.analyser);
            }

            this.isLiveAudioActive = true;
        } catch (e) {
            console.warn("Could not connect live audio analyser:", e);
        }
    }

    /**
     * Main update step called every frame (dt in seconds, progressMs in milliseconds)
     */
    update(dt, progressMs, isPlaying = true, volume = 1.0) {
        this.state.volume = Number.isFinite(volume) ? volume : 1.0;
        this.state.isBeatPulse = false;
        this.state.is4BeatPulse = false;

        const safeDt = Number.isFinite(dt) && dt > 0 ? Math.min(0.1, dt) : 0.016;
        this.liveTime += safeDt;

        if (!isPlaying) {
            // Tranquil, peaceful resting state during pause (soft ambient presence)
            this.targets.energy = 0.35;
            this.targets.bass = 0.2;
            this.targets.mids = 0.2;
            this.targets.highs = 0.2;
            this.targets.beatImpulse = 0.0;
            this.applySmoothing(safeDt);
            return this.state;
        }

        const progressSec = Number.isFinite(progressMs) && progressMs > 0 ? (progressMs / 1000) : this.liveTime;

        // Mode A: Live Web Audio FFT Analyser
        if (this.isLiveAudioActive && this.analyser) {
            this.processLiveFFT(safeDt);
        }
        // Mode B: Spotify Track Analysis Data
        else if (this.analysisData && this.analysisData.segments && this.analysisData.segments.length > 0) {
            this.processSpotifyAnalysis(progressSec, safeDt);
        }
        // Mode C: Generative Organic Synthesizer (Fallback / Offline / Local)
        else {
            this.processGenerativeFallback(this.liveTime, safeDt);
        }

        this.applySmoothing(safeDt);
        this.lastProgressSec = progressSec;
        return this.state;
    }

    /**
     * Process Spotify Track Analysis Data with microsecond precision & fast binary searches
     */
    processSpotifyAnalysis(progressSec, dt) {
        const segments = this.analysisData.segments;
        const beats = this.analysisData.beats || [];
        const bars = this.analysisData.bars || [];
        const sections = this.analysisData.sections || [];

        // 1. Find Current Segment (Fast Binary Search O(log N))
        let seg = null;
        let low = 0, high = segments.length - 1;
        while (low <= high) {
            const mid = (low + high) >> 1;
            const s = segments[mid];
            if (progressSec >= s.start && progressSec < s.start + s.duration) {
                seg = s;
                break;
            } else if (progressSec < s.start) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        if (seg) {
            // Segment loudness envelope (normalized 0..1 from dB -55 to 0)
            const segProgress = (progressSec - seg.start) / seg.duration;
            let currentLoudnessDb = seg.loudness_start;
            const maxTime = seg.loudness_max_time || 0.1;
            if (segProgress < maxTime) {
                currentLoudnessDb = seg.loudness_start + (seg.loudness_max - seg.loudness_start) * (segProgress / Math.max(0.01, maxTime));
            } else {
                currentLoudnessDb = seg.loudness_max + (seg.loudness_end - seg.loudness_max) * ((segProgress - maxTime) / Math.max(0.01, 1 - maxTime));
            }

            const rawLoudness = Math.max(0, Math.min(1, (currentLoudnessDb + 55) / 55));
            this.targets.energy = rawLoudness * this.state.volume;

            // Pitch bands (12 chroma values: 0 = C, 1 = C#, ..., 11 = B)
            const p = seg.pitches;
            const t = seg.timbre;

            const bassPitch = (p[0] + p[1] + p[2] + p[3]) * 0.25;
            const midPitch = (p[4] + p[5] + p[6] + p[7] + p[8]) * 0.2;
            const highPitch = (p[9] + p[10] + p[11]) * 0.3333;

            const timbreBass = Math.max(0, Math.min(1, (t[1] + 100) * 0.005));
            const timbreHigh = Math.max(0, Math.min(1, (t[2] + 100) * 0.005));

            this.targets.bass = Math.min(1.0, (bassPitch * 0.7 + timbreBass * 0.3) * rawLoudness * 1.3);
            this.targets.mids = Math.min(1.0, midPitch * rawLoudness * 1.2);
            this.targets.highs = Math.min(1.0, (highPitch * 0.6 + timbreHigh * 0.4) * rawLoudness * 1.3);

            for (let i = 0; i < 12; i++) {
                this.state.pitches[i] = p[i];
                this.state.timbre[i] = t[i];
            }
        }

        // 2. Find Current Beat & Bar using Fast Cursor (O(1) average time)
        if (this.beatCursor >= beats.length || (beats[this.beatCursor] && progressSec < beats[this.beatCursor].start)) {
            this.beatCursor = 0;
        }
        while (this.beatCursor < beats.length && progressSec >= beats[this.beatCursor].start + beats[this.beatCursor].duration) {
            this.beatCursor++;
        }
        const currentBeat = beats[this.beatCursor];
        const currentBeatIdx = (currentBeat && progressSec >= currentBeat.start) ? this.beatCursor : -1;
        if (currentBeatIdx !== -1) {
            this.state.beatPhase = (progressSec - currentBeat.start) / currentBeat.duration;
        }

        if (this.barCursor >= bars.length || (bars[this.barCursor] && progressSec < bars[this.barCursor].start)) {
            this.barCursor = 0;
        }
        while (this.barCursor < bars.length && progressSec >= bars[this.barCursor].start + bars[this.barCursor].duration) {
            this.barCursor++;
        }
        const currentBar = bars[this.barCursor];
        const currentBarIdx = (currentBar && progressSec >= currentBar.start) ? this.barCursor : -1;
        if (currentBarIdx !== -1) {
            this.state.barPhase = (progressSec - currentBar.start) / currentBar.duration;
        }

        // Detect Beat & 4-Beat boundary
        if (currentBeatIdx !== -1 && currentBeatIdx !== this.lastBeatIndex) {
            this.state.isBeatPulse = true; // 1 VAGUE PAR TEMPS !
            if (currentBeatIdx % 4 === 0 || (currentBarIdx !== -1 && currentBarIdx !== this.lastBarIndex)) {
                this.state.is4BeatPulse = true;
            }
            const beatConfidence = currentBeat.confidence || 0.8;
            const beatImpact = (0.55 + this.targets.energy * 0.45) * beatConfidence;
            
            this.targets.beatImpulse = Math.max(this.targets.beatImpulse, beatImpact);
            this.lastBeatIndex = currentBeatIdx;
            if (currentBarIdx !== -1) this.lastBarIndex = currentBarIdx;
        } else if (currentBarIdx !== -1 && currentBarIdx !== this.lastBarIndex) {
            this.state.is4BeatPulse = true;
            this.state.isBeatPulse = true;
            this.lastBarIndex = currentBarIdx;
        }

        // 3. Section tempo tracking (Fast Cursor)
        if (this.sectionCursor >= sections.length || (sections[this.sectionCursor] && progressSec < sections[this.sectionCursor].start)) {
            this.sectionCursor = 0;
        }
        while (this.sectionCursor < sections.length && progressSec >= sections[this.sectionCursor].start + sections[this.sectionCursor].duration) {
            this.sectionCursor++;
        }
        const currentSec = sections[this.sectionCursor];
        if (currentSec && currentSec.tempo) {
            this.state.bpm = currentSec.tempo;
        }
    }

    /**
     * Process Live Web Audio FFT
     */
    processLiveFFT(dt) {
        this.analyser.getByteFrequencyData(this.freqData);

        const binCount = this.analyser.frequencyBinCount;
        const bassEnd = Math.floor(binCount * 0.08);
        const midEnd = Math.floor(binCount * 0.45);

        let bassSum = 0, midSum = 0, highSum = 0, totalSum = 0;

        for (let i = 0; i < binCount; i++) {
            const val = this.freqData[i] * 0.0039215686; // / 255.0
            totalSum += val;
            if (i < bassEnd) bassSum += val;
            else if (i < midEnd) midSum += val;
            else highSum += val;
        }

        const avgBass = bassSum / Math.max(1, bassEnd);
        const avgMid = midSum / Math.max(1, midEnd - bassEnd);
        const avgHigh = highSum / Math.max(1, binCount - midEnd);
        const avgEnergy = totalSum / binCount;

        this.targets.energy = avgEnergy * this.state.volume;
        this.targets.bass = Math.min(1.0, avgBass * 1.5);
        this.targets.mids = Math.min(1.0, avgMid * 1.4);
        this.targets.highs = Math.min(1.0, avgHigh * 1.6);

        // Transient beat detection from sudden bass jump
        const bassDiff = this.targets.bass - this.state.bass;
        if (bassDiff > 0.18) {
            this.targets.beatImpulse = Math.min(1.0, bassDiff * 3.5);
        }

        // 1-beat & 4-beat bar timing
        const bpm = this.state.bpm || 120;
        const beatInterval = 60 / bpm;
        const barInterval = 4 * beatInterval;

        this.liveTime += dt;
        this.state.beatPhase = (this.liveTime % beatInterval) / beatInterval;
        this.state.barPhase = (this.liveTime % barInterval) / barInterval;

        const currentBeatIdx = Math.floor(this.liveTime / beatInterval);
        if (currentBeatIdx !== this.lastBeatIndex) {
            this.state.isBeatPulse = true;
            this.lastBeatIndex = currentBeatIdx;
        }

        const current4BeatIdx = Math.floor(this.liveTime / barInterval);
        if (current4BeatIdx !== this.last4BeatIndex) {
            this.state.is4BeatPulse = true;
            this.last4BeatIndex = current4BeatIdx;
        }
    }

    /**
     * Generative Organic Synthesizer (Fallback / Offline)
     */
    processGenerativeFallback(progressSec, dt) {
        const bpm = this.state.bpm || 120;
        const beatInterval = 60 / bpm;
        const barInterval = 4 * beatInterval;
        this.state.beatPhase = (progressSec % beatInterval) / beatInterval;
        this.state.barPhase = (progressSec % barInterval) / barInterval;

        // Organic energy wave
        const baseEnergy = 0.45 + Math.sin(progressSec * 0.2) * 0.25 + Math.sin(progressSec * 0.05) * 0.15;
        this.targets.energy = Math.max(0.15, Math.min(0.95, baseEnergy)) * this.state.volume;

        // Bass kick on beat onsets
        const isBeatOnset = this.state.beatPhase < 0.12;
        if (isBeatOnset && Math.random() < 0.85) {
            this.targets.beatImpulse = 0.75 + Math.random() * 0.25;
        }

        const bassWave = Math.sin(progressSec * (bpm / 60) * Math.PI) * 0.5 + 0.5;
        this.targets.bass = (bassWave * 0.4 + (isBeatOnset ? 0.5 : 0.0)) * this.targets.energy * 1.3;
        this.targets.mids = (0.3 + Math.sin(progressSec * 1.4) * 0.25) * this.targets.energy;
        this.targets.highs = (0.2 + Math.sin(progressSec * 3.8) * 0.2 + (Math.random() < 0.2 ? 0.3 : 0.0)) * this.targets.energy;

        // Trigger pulse on every beat (1 vague par temps)
        const currentBeatIdx = Math.floor(progressSec / beatInterval);
        if (currentBeatIdx !== this.lastBeatIndex) {
            this.state.isBeatPulse = true;
            this.lastBeatIndex = currentBeatIdx;
        }

        // Trigger pulse every 4 beats
        const current4BeatIdx = Math.floor(progressSec / barInterval);
        if (current4BeatIdx !== this.last4BeatIndex) {
            this.state.is4BeatPulse = true;
            this.last4BeatIndex = current4BeatIdx;
        }
    }

    /**
     * Apply asymmetric attack / decay smoothing
     */
    applySmoothing(dt) {
        const smooth = (current, target, attackSpeed, decaySpeed) => {
            const speed = target > current ? attackSpeed : decaySpeed;
            return current + (target - current) * Math.min(1.0, dt * speed);
        };

        this.state.energy = smooth(this.state.energy, this.targets.energy, 22.0, 7.0);
        this.state.bass = smooth(this.state.bass, this.targets.bass, 28.0, 9.0);
        this.state.mids = smooth(this.state.mids, this.targets.mids, 18.0, 8.0);
        this.state.highs = smooth(this.state.highs, this.targets.highs, 32.0, 14.0);

        // Fast impulse decay for crisp beat response
        this.state.beatImpulse = smooth(this.state.beatImpulse, 0.0, 30.0, 9.0);
        this.targets.beatImpulse = Math.max(0, this.targets.beatImpulse - dt * 6.5);
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = AudioAnalysisEngine;
}

/**
 * VisualizerEngine.js
 * 60/120 FPS high-performance modular visualizer engine.
 * Renders celestial starfield, sacred geometry fractals, compact wooden deck,
 * and sitting cat silhouette with zero frame drops and smart resource suspension.
 */

class VisualizerEngine {
    constructor(canvas, options = {}) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        
        // Modules
        this.audio = new AudioAnalysisEngine();
        this.palette = new ColorPalette();
        this.environment = new CosmicEnvironment(220);
        this.fractals = new CosmicFractals();
        this.deck = new WoodenDeck();
        this.cat = new CatGeometry();
        this.tail = new TailPhysics(20);

        // State & Timing
        this.isRunning = false;
        this.isPlaying = true;
        this.isPageVisible = typeof document === "undefined" || !document.hidden;
        this.animationFrameId = null;
        this.lastTime = performance.now();
        this.lastPausedFrameTime = 0;
        this.totalTime = 0;
        this.width = 0;
        this.height = 0;
        this.dpr = 1.0;

        // Customization settings
        this.settings = {
            sensitivity: options.sensitivity || 1.1,
            shockwavePower: options.shockwavePower || 1.2,
            theme: options.theme || "aurora",
            adaptiveColors: options.adaptiveColors === true
        };

        this.palette.setTheme(this.settings.theme, true);

        this.loop = this.loop.bind(this);
        this.resize = this.resize.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);

        if (typeof document !== "undefined") {
            document.addEventListener("visibilitychange", this.handleVisibilityChange);
        }

        this.resize();
    }

    handleVisibilityChange() {
        this.isPageVisible = !document.hidden;
        if (this.isPageVisible && this.isRunning && !this.animationFrameId) {
            this.lastTime = performance.now();
            this.animationFrameId = requestAnimationFrame(this.loop);
        }
    }

    resize() {
        if (!this.canvas) return;
        this.dpr = Math.min(window.devicePixelRatio || 1, 1.25);
        
        const w = window.innerWidth || document.documentElement.clientWidth || 800;
        const h = window.innerHeight || document.documentElement.clientHeight || 600;

        this.width = Math.max(300, Math.floor(w));
        this.height = Math.max(300, Math.floor(h));

        this.canvas.width = Math.floor(this.width * this.dpr);
        this.canvas.height = Math.floor(this.height * this.dpr);

        this.canvas.style.width = "100vw";
        this.canvas.style.height = "100vh";

        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.scale(this.dpr, this.dpr);
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        this.resize();
        if (this.isPageVisible && !this.animationFrameId) {
            this.animationFrameId = requestAnimationFrame(this.loop);
        }
    }

    stop() {
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    updateSpotifyState(trackUri, progressMs, isPlaying = true, volume = 1.0) {
        if (trackUri) {
            this.audio.loadSpotifyAnalysis(trackUri);
        }
        this.currentProgressMs = progressMs;
        this.isPlaying = isPlaying;
        this.currentVolume = volume;
    }

    setTheme(themeKey, immediate = true) {
        this.settings.theme = themeKey;
        this.settings.adaptiveColors = false;
        if (this.palette) {
            this.palette.setTheme(themeKey, immediate);
        }
    }

    updateTrackColors(extractedColors) {
        if (this.settings.adaptiveColors && extractedColors) {
            this.palette.setAdaptiveFromColors(extractedColors);
        }
    }

    loop(currentTime) {
        this.animationFrameId = null;
        if (!this.isRunning || !this.isPageVisible) return;

        try {
            if (!currentTime || isNaN(currentTime)) {
                currentTime = performance.now();
            }

            const isPlaying = this.isPlaying !== false;

            const dt = Math.min(0.1, Math.max(0.001, (currentTime - this.lastTime) * 0.001));
            this.lastTime = currentTime;

            // Smooth continuous time progression
            const effectiveDt = isPlaying ? dt : dt * 0.7;
            this.totalTime += effectiveDt;

            // 1. Audio analysis update
            const rawAudio = this.audio.update(dt, this.currentProgressMs, isPlaying, this.currentVolume);
            
            const audioState = {
                ...rawAudio,
                energy: Math.min(1.0, (rawAudio?.energy || 0.5) * this.settings.sensitivity),
                bass: Math.min(1.0, (rawAudio?.bass || 0.2) * this.settings.sensitivity),
                mids: Math.min(1.0, (rawAudio?.mids || 0.2) * this.settings.sensitivity),
                highs: Math.min(1.0, (rawAudio?.highs || 0.2) * this.settings.sensitivity),
                beatImpulse: Math.min(1.0, (rawAudio?.beatImpulse || 0.0) * this.settings.sensitivity * this.settings.shockwavePower)
            };

            // 2. Color palette update
            this.palette.update(effectiveDt);

            // 3. Layout Coordinates (Compact wooden deck at bottom ~15%)
            const deckY = this.height * 0.85;
            const cx = this.width * 0.5;
            const cy = deckY - this.height * 0.28;

            const maxCatW = this.width * 0.44;
            const maxCatH = this.height * 0.65;
            const baseDim = Math.min(maxCatW * 1.17647, maxCatH * 0.90909);

            const catW = baseDim * 0.85;
            const catH = baseDim * 1.1;

            // 4. Update Dynamics
            this.environment.update(effectiveDt, this.totalTime, audioState, cx, cy, baseDim * 0.5, this.palette, this.width, this.height, isPlaying);
            this.fractals.update(effectiveDt, this.totalTime, audioState, isPlaying);

            // 5. Compute Deformed Cat Silhouette
            const deformedParams = this.cat.getDeformedPath(cx, cy, catW, catH, audioState, this.totalTime, deckY, isPlaying);

            // 6. RENDER SCENE LAYERS (Strict Z-ordering)
            const ctx = this.ctx;

            // Layer 1: Deep Cosmic Space & Stationary Pulsating Starfield
            this.environment.renderBackground(ctx, this.width, this.height, this.palette);

            // Layer 2: Volumetric Nebula Clouds & Large Ultra-Luminous Ambient Aura
            this.environment.renderNebulaAndAura(ctx, this.width, this.height, cx, cy, baseDim * 0.5, audioState, this.palette, this.totalTime);

            // Layer 3: Sacred Geometry Fractal Mandala Circle (Behind the Cat)
            this.fractals.render(ctx, cx, cy, baseDim * 0.50, this.palette, audioState);

            // Layer 4: Powerful Pulsing Radial Energy Waves (Emanating from Cat)
            this.environment.renderEnergyWaves(ctx, this.palette, this.totalTime);

            // Layer 5: Compact Wooden Deck Platform
            this.deck.render(ctx, this.width, this.height, deckY, this.palette, audioState);

            // Landmarks for Cat & Tail
            const landmarks = this.cat.buildBodyPath(ctx, deformedParams);

            // Layer 6: Realistic Cat Tail (Resting on wooden deck)
            const tailScale = (baseDim * 0.002) * 1.05;
            this.tail.update(landmarks.tailAnchor, tailScale, audioState, effectiveDt, this.totalTime, deckY, isPlaying);
            this.tail.render(ctx, this.palette, audioState, tailScale, deckY);

            // Layer 7: Cat Body Interior
            this.cat.buildBodyPath(ctx, deformedParams);
            this.cat.renderInterior(ctx, deformedParams, landmarks, this.palette, this.totalTime);

            // Layer 8: Cat Body Main Glowing Contour
            this.cat.buildBodyPath(ctx, deformedParams);
            this.cat.renderContour(ctx, deformedParams, this.palette);

            // Layer 9: Luminous Cat Ears
            this.cat.renderEarContours(ctx, deformedParams, landmarks, this.palette);
        } catch (err) {
            console.error("Cosmic Cat Visualizer loop error:", err);
        } finally {
            if (this.isRunning && this.isPageVisible) {
                this.animationFrameId = requestAnimationFrame(this.loop);
            }
        }
    }

    destroy() {
        this.stop();
        if (typeof document !== "undefined") {
            document.removeEventListener("visibilitychange", this.handleVisibilityChange);
        }
        if (this.audio && this.audio.audioContext) {
            try {
                this.audio.audioContext.close();
            } catch (e) {}
        }
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = VisualizerEngine;
}



    if (!document.getElementById("cosmic-cat-styles")) {
        const style = document.createElement("style");
        style.id = "cosmic-cat-styles";
        style.textContent = "/* ==========================================================================\n   Cosmic Cat - Spotify Fully Transparent Live Background Wallpaper & Custom App\n   ========================================================================== */\n\n/* 1. Override Theme Variables to Transparent */\n:root, html, body {\n    --spice-main: transparent !important;\n    --spice-sidebar: transparent !important;\n    --spice-player: transparent !important;\n    --spice-card: rgba(255, 255, 255, 0.04) !important;\n    --spice-main-elevated: rgba(255, 255, 255, 0.04) !important;\n    --spice-highlight: rgba(255, 255, 255, 0.1) !important;\n    --spice-highlight-elevated: rgba(255, 255, 255, 0.15) !important;\n    background: #010104 !important;\n    background-color: #010104 !important;\n}\n\nhtml, body {\n    height: 100vh !important;\n    min-height: 100vh !important;\n    max-height: 100vh !important;\n    width: 100vw !important;\n    overflow: hidden !important;\n    margin: 0 !important;\n    padding: 0 !important;\n}\n\n/* 2. Background Canvas fixed behind all Spotify elements */\n#cosmic-cat-bg-canvas {\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100vw !important;\n    height: 100vh !important;\n    z-index: 0 !important;\n    pointer-events: none !important;\n    display: block !important;\n    background-color: #010104 !important;\n}\n\n/* 3. Spotify Main Container & Grid : Expanded to 100vh */\n#main,\n.Root__top-container {\n    position: relative !important;\n    z-index: 1 !important;\n    height: 100% !important;\n    min-height: 100vh !important;\n    max-height: 100vh !important;\n    width: 100vw !important;\n    background: transparent !important;\n    background-color: transparent !important;\n    box-sizing: border-box !important;\n}\n\n/* Expand the central main view to fill full height between top bar and player */\n.Root__main-view,\nmain,\n.main-view-container,\n.main-view-container__scroll-node,\n.main-view-container__scroll-node-child,\n.os-viewport,\n.os-host,\n.os-padding,\n.os-content,\n.under-main-view,\n.main-home-homeHeader,\n.main-actionBarBackground-background,\n.main-entityHeader-background,\n.main-entityHeader-overlay,\n.main-entityHeader-container,\n.main-trackList-trackListHeader,\n.main-trackList-trackListHeaderRow,\n.main-shelf-shelf,\n.main-gridContainer-gridContainer,\n.main-trackList-trackList {\n    height: 100% !important;\n    min-height: 100% !important;\n    flex: 1 1 auto !important;\n    background: transparent !important;\n    background-color: transparent !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* 4. Biblioth\u00e8que (Left Sidebar) : Expanded and Transparent */\n.Root__nav-bar,\n.main-yourLibraryX-navBar,\n.main-yourLibraryX-library,\n.main-yourLibraryX-libraryContainer,\n.main-yourLibraryX-header,\n.main-yourLibraryX-listContent,\n.main-yourLibraryX-isScrolled,\n.main-rootlist-rootlist,\n.main-rootlist-wrapper,\n.main-navBar-mainNav,\n.main-navBar-navBar {\n    height: 100% !important;\n    min-height: 100% !important;\n    background: transparent !important;\n    background-color: transparent !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* 5. Running (Right Sidebar / Now Playing View / Queue) : Expanded and Transparent */\n.Root__right-sidebar,\n.main-nowPlayingView-container,\n.main-nowPlayingView-content,\n.main-nowPlayingView-nowPlayingWidget,\n.main-nowPlayingView-section,\n.main-buddyFeed-container,\n.main-buddyFeed-content,\n.main-nowPlayingWidget-nowPlaying,\n.main-trackInfo-container,\n.main-trackInfo-trackInfo {\n    height: 100% !important;\n    min-height: 100% !important;\n    background: transparent !important;\n    background-color: transparent !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* 6. Top Bar : Transparent */\n.Root__top-bar,\n.main-topBar-container,\n.main-topBar-background,\n.main-topBar-overlay,\n.main-topBar-historyButtons {\n    background: transparent !important;\n    background-color: transparent !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* 7. Bottom Player Bar : Locked firmly at the bottom */\n.Root__now-playing-bar,\n.main-nowPlayingBar-container,\n.main-nowPlayingBar-nowPlayingBar {\n    grid-area: now-playing-bar !important;\n    margin-top: auto !important;\n    background: transparent !important;\n    background-color: transparent !important;\n    box-shadow: none !important;\n    border-color: transparent !important;\n}\n\n/* 8. Cards & Tracklist Rows */\n.main-card-card {\n    background: rgba(255, 255, 255, 0.05) !important;\n    backdrop-filter: blur(8px) !important;\n    -webkit-backdrop-filter: blur(8px) !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n}\n\n.main-card-card:hover {\n    background: rgba(255, 255, 255, 0.12) !important;\n    border-color: rgba(0, 240, 255, 0.35) !important;\n}\n\n.main-trackList-trackListRow {\n    background: transparent !important;\n}\n.main-trackList-trackListRow:hover {\n    background-color: rgba(255, 255, 255, 0.08) !important;\n}\n.main-trackList-trackListRow.main-trackList-selected {\n    background-color: rgba(255, 255, 255, 0.15) !important;\n}\n\n/* ==========================================================================\n   9. Foreground Immersion Mode Toggle (Premier Plan / Arri\u00e8re-Plan)\n   ========================================================================== */\nbody.cosmic-foreground-active #cosmic-cat-bg-canvas,\n#cosmic-cat-bg-canvas.foreground {\n    z-index: 999999 !important;\n    pointer-events: auto !important;\n    cursor: pointer !important;\n}\n\n.cosmic-foreground-surface {\n    position: fixed !important;\n    top: 0 !important;\n    left: 0 !important;\n    width: 100vw !important;\n    height: 100vh !important;\n    z-index: 999998 !important;\n    background: transparent !important;\n    pointer-events: auto !important;\n    cursor: pointer !important;\n}\n\n/* Playbar Quick Toggle Button */\n#cosmic-cat-playbar-btn {\n    position: relative !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    width: 32px !important;\n    height: 32px !important;\n    background: transparent !important;\n    border: 0 !important;\n    padding: 0 !important;\n    margin: 0 2px !important;\n    cursor: pointer !important;\n    border-radius: 50% !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    z-index: 9999 !important;\n    pointer-events: auto !important;\n}\n\n#cosmic-cat-playbar-btn:hover {\n    transform: scale(1.1) !important;\n    color: #00f0ff !important;\n}\n\n#cosmic-cat-playbar-btn.active {\n    color: #00f0ff !important;\n    filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.6)) !important;\n}\n\n#cosmic-cat-playbar-btn.active::after {\n    content: '' !important;\n    position: absolute !important;\n    bottom: -2px !important;\n    left: 50% !important;\n    transform: translateX(-50%) !important;\n    width: 4px !important;\n    height: 4px !important;\n    background: #00f0ff !important;\n    border-radius: 50% !important;\n    box-shadow: 0 0 6px #00f0ff !important;\n}\n\n/* Playbar Theme / Palette Button */\n#cosmic-cat-theme-btn {\n    position: relative !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    width: 32px !important;\n    height: 32px !important;\n    background: transparent !important;\n    border: 0 !important;\n    padding: 0 !important;\n    margin: 0 2px !important;\n    cursor: pointer !important;\n    border-radius: 50% !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    z-index: 9999 !important;\n    pointer-events: auto !important;\n    color: #00f0ff !important;\n}\n\n#cosmic-cat-theme-btn:hover {\n    transform: scale(1.15) rotate(15deg) !important;\n    filter: drop-shadow(0 0 8px #00f0ff) !important;\n}\n\n/* Floating Theme Selector HUD Pill */\n#cosmic-cat-theme-hud {\n    position: fixed !important;\n    top: 18px !important;\n    right: 80px !important;\n    z-index: 9999999 !important;\n    display: flex !important;\n    align-items: center !important;\n    background: rgba(12, 10, 28, 0.90) !important;\n    backdrop-filter: blur(14px) !important;\n    -webkit-backdrop-filter: blur(14px) !important;\n    border: 1px solid rgba(255, 255, 255, 0.2) !important;\n    border-radius: 20px !important;\n    padding: 6px 14px !important;\n    gap: 10px !important;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5) !important;\n    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    cursor: pointer !important;\n    user-select: none !important;\n    font-family: inherit !important;\n    pointer-events: auto !important;\n}\n\n#cosmic-cat-theme-hud:hover {\n    background: rgba(18, 14, 38, 0.98) !important;\n    border-color: rgba(0, 240, 255, 0.6) !important;\n    box-shadow: 0 6px 24px rgba(0, 240, 255, 0.35) !important;\n    transform: translateY(-1px) scale(1.02) !important;\n}\n\n#cosmic-cat-theme-hud .hud-title {\n    font-size: 12px !important;\n    font-weight: 600 !important;\n    letter-spacing: 0.4px !important;\n    color: #ffffff !important;\n    display: flex !important;\n    align-items: center !important;\n    gap: 6px !important;\n    white-space: nowrap !important;\n    pointer-events: auto !important;\n}\n\n#cosmic-cat-theme-hud .hud-swatches {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n    margin-left: 4px !important;\n    pointer-events: auto !important;\n}\n\n#cosmic-cat-theme-hud .theme-swatch {\n    width: 18px !important;\n    height: 18px !important;\n    border-radius: 50% !important;\n    border: 2px solid rgba(255, 255, 255, 0.35) !important;\n    padding: 0 !important;\n    margin: 0 !important;\n    outline: none !important;\n    cursor: pointer !important;\n    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    box-sizing: border-box !important;\n    display: inline-block !important;\n    pointer-events: auto !important;\n}\n\n#cosmic-cat-theme-hud .theme-swatch:hover {\n    transform: scale(1.4) !important;\n    border-color: #ffffff !important;\n    box-shadow: 0 0 12px currentColor !important;\n}\n\n#cosmic-cat-theme-hud .theme-swatch.active {\n    transform: scale(1.35) !important;\n    border-color: #ffffff !important;\n    box-shadow: 0 0 14px currentColor, 0 0 4px #ffffff !important;\n}\n\n";
        document.head.appendChild(style);
    }


/**
 * Cosmic Cat Spicetify Live Background & Foreground Extension
 * Runs the cosmic cat visualizer dynamically in the background of Spotify,
 * and allows clean 1-click toggle to foreground (premier plan) and back to background,
 * with visual color theme switcher and playbar controls.
 */

(function CosmicCatBackgroundExtension() {
    if (!Spicetify.Player || !Spicetify.Mousetrap) {
        setTimeout(CosmicCatBackgroundExtension, 250);
        return;
    }

    // 1. Inject Stylesheet if not present
    if (!document.getElementById("cosmic-cat-styles")) {
        const styleLink = document.createElement("link");
        styleLink.id = "cosmic-cat-styles";
        styleLink.rel = "stylesheet";
        styleLink.href = "/custom-apps/cat-visualizer/style.css";
        document.head.appendChild(styleLink);
    }

    // 2. Theme definitions
    const themeDefs = [
        { key: "aurora", name: "Aurora", icon: "🌌", color: "#00f5d4" },
        { key: "nebula", name: "Nebula", icon: "🔮", color: "#ff78d2" },
        { key: "solar", name: "Solar", icon: "🔥", color: "#ffd228" },
        { key: "cyber", name: "Cyber", icon: "⚡", color: "#00ffe6" },
        { key: "emerald", name: "Emerald", icon: "🌿", color: "#78ffaa" },
        { key: "twilight", name: "Twilight", icon: "💜", color: "#b48cff" }
    ];

    const savedTheme = localStorage.getItem("cosmic-cat-theme") || "aurora";
    let currentThemeIdx = themeDefs.findIndex(t => t.key === savedTheme);
    if (currentThemeIdx === -1) currentThemeIdx = 0;
    
    // Check saved state (defaults to true if first run)
    let isEnabled = localStorage.getItem("cosmic-cat-bg-enabled") !== "false";
    let isForeground = false;

    // 3. Create or reuse persistent canvas
    let bgCanvas = document.getElementById("cosmic-cat-bg-canvas");
    if (!bgCanvas) {
        bgCanvas = document.createElement("canvas");
        bgCanvas.id = "cosmic-cat-bg-canvas";
        const main = document.getElementById("main");
        if (main && main.parentNode) {
            main.parentNode.insertBefore(bgCanvas, main);
        } else {
            document.body.prepend(bgCanvas);
        }
    }
    bgCanvas.style.display = isEnabled ? "block" : "none";
    if (isEnabled) bgCanvas.classList.add("active");

    // 4. Visualizer Engine
    let engine = null;

    const getOrInitEngine = () => {
        if (!engine && typeof VisualizerEngine !== "undefined") {
            try {
                engine = new VisualizerEngine(bgCanvas, {
                    theme: themeDefs[currentThemeIdx].key,
                    sensitivity: 1.1,
                    shockwavePower: 1.2,
                    adaptiveColors: false
                });
                window.cosmicCatEngine = engine;
            } catch (err) {
                console.error("Failed to initialize Cosmic Cat VisualizerEngine:", err);
            }
        }
        return engine;
    };

    if (isEnabled) {
        const initialEngine = getOrInitEngine();
        if (initialEngine) {
            initialEngine.start();
        }
    }

    // 5. State Sync with Spotify Player
    let lastTrackUri = null;
    let cachedColors = null;

    const updateSpotifyState = async () => {
        if (!isEnabled || !Spicetify.Player) return;
        const eng = getOrInitEngine();
        if (!eng) return;

        const uri = Spicetify.Player.data?.item?.uri;
        const progress = Spicetify.Player.getProgress?.() || 0;
        const isPlaying = Spicetify.Player.isPlaying?.() ?? true;
        const volume = Spicetify.Player.getVolume?.() ?? 1.0;

        eng.updateSpotifyState(uri, progress, isPlaying, volume);

        if (uri && uri !== lastTrackUri) {
            lastTrackUri = uri;
            if (Spicetify.colorExtractor) {
                try {
                    cachedColors = await Spicetify.colorExtractor(uri);
                    if (cachedColors && eng) {
                        eng.updateTrackColors(cachedColors);
                    }
                } catch (e) {}
            }
        }
    };

    Spicetify.Player.addEventListener("songchange", () => {
        if (isEnabled) updateSpotifyState();
    });
    Spicetify.Player.addEventListener("onplaypause", () => {
        if (isEnabled) updateSpotifyState();
    });
    if (Spicetify.Player.addEventListener) {
        try {
            Spicetify.Player.addEventListener("onprogress", () => {
                if (isEnabled && !document.hidden) updateSpotifyState();
            });
        } catch (e) {}
    }

    setInterval(() => {
        if (isEnabled && !document.hidden) updateSpotifyState();
    }, 500);

    window.addEventListener("resize", () => {
        if (isEnabled && engine) engine.resize();
    });

    const CatSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C9.5 2 7.4 3.8 7 6.2 4.6 7.8 3 10.7 3 14c0 5 4 9 9 9s9-4 9-9c0-3.3-1.6-6.2-4-7.8C16.6 3.8 14.5 2 12 2zm-3.2 1.8l1.6 2.4c-.6.4-1.1.9-1.4 1.5L6.5 6.6l2.3-2.8zm6.4 0l2.3 2.8-2.5 1.1c-.3-.6-.8-1.1-1.4-1.5l1.6-2.4z"/></svg>`;
    const PaletteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 3.59 8 8 8 0.55 0 1-0.45 1-1 0-0.24-0.09-0.47-0.26-0.64-0.16-0.18-0.24-0.41-0.24-0.66 0-0.55 0.45-1 1-1h1.5c4.41 0 8-3.59 8-8 0-5.52-4.48-10-10-10zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5 0.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5 0.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5 0.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`;

    // 6. Floating Theme Selector HUD
    let hudElement = null;
    const initOrUpdateThemeHud = () => {
        if (!document.body) return;
        const curTheme = themeDefs[currentThemeIdx];

        if (!hudElement) {
            hudElement = document.createElement("div");
            hudElement.id = "cosmic-cat-theme-hud";

            let swatchesHtml = "";
            for (let i = 0; i < themeDefs.length; i++) {
                const t = themeDefs[i];
                const isActive = i === currentThemeIdx;
                swatchesHtml += `<button type="button" class="theme-swatch ${isActive ? 'active' : ''}" data-theme="${t.key}" style="background-color: ${t.color}; color: ${t.color};" title="${t.icon} ${t.name}"></button>`;
            }

            hudElement.innerHTML = `
                <div class="hud-title" title="Cliquez pour changer de couleur (Raccourci: T ou C)">
                    <span class="hud-icon">${curTheme.icon}</span>
                    <span class="hud-name">${curTheme.name}</span>
                </div>
                <div class="hud-swatches">
                    ${swatchesHtml}
                </div>
            `;

            hudElement.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const swatch = e.target.closest(".theme-swatch");
                if (swatch) {
                    const themeKey = swatch.getAttribute("data-theme");
                    if (themeKey) setTheme(themeKey);
                    return;
                }
                cycleTheme();
            });

            document.body.appendChild(hudElement);
        } else {
            const iconEl = hudElement.querySelector(".hud-icon");
            const nameEl = hudElement.querySelector(".hud-name");
            if (iconEl) iconEl.textContent = curTheme.icon;
            if (nameEl) nameEl.textContent = curTheme.name;

            const swatches = hudElement.querySelectorAll(".theme-swatch");
            swatches.forEach(sw => {
                const key = sw.getAttribute("data-theme");
                if (key === curTheme.key) {
                    sw.classList.add("active");
                } else {
                    sw.classList.remove("active");
                }
            });
        }

        hudElement.style.display = isEnabled ? "flex" : "none";
    };

    const updateBtnAppearance = () => {
        const curTheme = themeDefs[currentThemeIdx];
        const btn = document.getElementById("cosmic-cat-playbar-btn");
        if (btn) {
            if (isEnabled) {
                btn.classList.add("active");
                btn.style.color = curTheme.color;
                btn.title = `Cosmic Cat : ACTIF (Clic: Désactiver | Clic-droit: Thème [${curTheme.name}] | Double-clic: Premier plan)`;
            } else {
                btn.classList.remove("active");
                btn.style.color = "var(--spice-subtext, rgba(255,255,255,0.6))";
                btn.title = "Cosmic Cat : INACTIF (Clic pour Activer)";
            }
        }

        const themeBtn = document.getElementById("cosmic-cat-theme-btn");
        if (themeBtn) {
            themeBtn.style.color = curTheme.color;
            themeBtn.title = `Thème Cosmique : ${curTheme.name} (Clic: Changer de couleur | Raccourci: T ou C)`;
        }

        initOrUpdateThemeHud();
    };

    function setTheme(themeKey) {
        const idx = themeDefs.findIndex(t => t.key === themeKey);
        if (idx !== -1) {
            currentThemeIdx = idx;
        }
        const curTheme = themeDefs[currentThemeIdx];
        localStorage.setItem("cosmic-cat-theme", curTheme.key);

        const eng = getOrInitEngine() || window.cosmicCatEngine;
        if (eng) {
            if (eng.setTheme) {
                eng.setTheme(curTheme.key, true);
            } else if (eng.palette) {
                eng.palette.setTheme(curTheme.key, true);
            }
        }

        updateBtnAppearance();
    }

    function cycleTheme() {
        currentThemeIdx = (currentThemeIdx + 1) % themeDefs.length;
        setTheme(themeDefs[currentThemeIdx].key);
    }

    function toggleBackground() {
        isEnabled = !isEnabled;
        localStorage.setItem("cosmic-cat-bg-enabled", isEnabled ? "true" : "false");

        if (bgCanvas) {
            if (isEnabled) {
                bgCanvas.classList.add("active");
                bgCanvas.style.display = "block";
            } else {
                bgCanvas.classList.remove("active");
                bgCanvas.style.display = "none";
                if (isForeground) {
                    toggleForeground();
                }
            }
        }
        
        if (isEnabled) {
            const eng = getOrInitEngine();
            if (eng) {
                eng.start();
                updateSpotifyState();
            }
        } else {
            if (engine) engine.stop();
        }

        updateBtnAppearance();
        Spicetify.showNotification?.(isEnabled ? "Cosmic Cat Visualizer : ACTIVÉ ✨" : "Cosmic Cat Visualizer : DÉSACTIVÉ ⏸️");
    }

    function toggleForeground() {
        isForeground = !isForeground;
        if (isForeground) {
            if (!isEnabled) {
                isEnabled = true;
                localStorage.setItem("cosmic-cat-bg-enabled", "true");
                if (bgCanvas) {
                    bgCanvas.classList.add("active");
                    bgCanvas.style.display = "block";
                }
                const eng = getOrInitEngine();
                if (eng) {
                    eng.start();
                    updateSpotifyState();
                }
                updateBtnAppearance();
            }
            document.body.classList.add("cosmic-foreground-active");
            if (bgCanvas) {
                bgCanvas.classList.add("foreground");
            }
            Spicetify.showNotification?.("Cosmic Cat : Premier Plan ✨ (Clic n'importe où pour revenir en arrière-plan)");
        } else {
            document.body.classList.remove("cosmic-foreground-active");
            if (bgCanvas) {
                bgCanvas.classList.remove("foreground");
            }
            Spicetify.showNotification?.("Cosmic Cat : Arrière-Plan 🌌");
        }
    }

    // 7. Click on Canvas when in Foreground exits immediately to Background
    bgCanvas.addEventListener("click", (e) => {
        if (isForeground || document.body.classList.contains("cosmic-foreground-active")) {
            e.preventDefault();
            e.stopPropagation();
            toggleForeground();
        }
    });

    // 8. Intercept clicks on the top-left Cosmic Cat sidebar button / custom app link
    function isCosmicCatSidebarButton(el) {
        if (!el) return false;
        if (el.closest("#cosmic-cat-playbar-btn") || el.closest("#cosmic-cat-theme-btn") || el.closest("#cosmic-cat-theme-hud")) return false;

        const buttonOrLink = el.closest('a, button, [role="button"], [role="link"], li');
        if (!buttonOrLink) return false;

        const href = buttonOrLink.getAttribute("href") || buttonOrLink.querySelector("a")?.getAttribute("href") || "";
        if (href.includes("cat-visualizer")) return true;

        const label = (buttonOrLink.getAttribute("aria-label") || "").toLowerCase();
        const title = (buttonOrLink.getAttribute("title") || "").toLowerCase();
        const testid = (buttonOrLink.getAttribute("data-testid") || "").toLowerCase();

        if (label.includes("cosmic cat") || title.includes("cosmic cat") || testid.includes("cat-visualizer")) {
            return true;
        }

        const text = (buttonOrLink.innerText || buttonOrLink.textContent || "").trim().toLowerCase();
        if (text === "cosmic cat" || text.startsWith("cosmic cat")) {
            return true;
        }

        return false;
    }

    document.addEventListener("click", (e) => {
        if (isCosmicCatSidebarButton(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            toggleForeground();
        }
    }, true);

    // 9. Safe Playbar Buttons Injection (No recursion loops)
    let isInjecting = false;
    const injectPlaybarButtons = () => {
        if (isInjecting) return;
        isInjecting = true;
        try {
            const extraControls = document.querySelector(".main-nowPlayingBar-extraControls");
            if (!extraControls) return;

            let updated = false;

            if (!document.getElementById("cosmic-cat-playbar-btn")) {
                const btn = document.createElement("button");
                btn.id = "cosmic-cat-playbar-btn";
                btn.className = "main-genericButton-button";
                btn.setAttribute("aria-label", "Cosmic Cat Visualizer");
                btn.innerHTML = CatSvg;
                
                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleBackground();
                });

                btn.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cycleTheme();
                });

                btn.addEventListener("dblclick", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleForeground();
                });

                extraControls.insertBefore(btn, extraControls.firstChild);
                updated = true;
            }

            if (!document.getElementById("cosmic-cat-theme-btn")) {
                const themeBtn = document.createElement("button");
                themeBtn.id = "cosmic-cat-theme-btn";
                themeBtn.className = "main-genericButton-button";
                themeBtn.setAttribute("aria-label", "Changer le Thème de Couleur");
                themeBtn.innerHTML = PaletteSvg;

                themeBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cycleTheme();
                });

                themeBtn.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cycleTheme();
                });

                const catBtn = document.getElementById("cosmic-cat-playbar-btn");
                if (catBtn && catBtn.nextSibling) {
                    extraControls.insertBefore(themeBtn, catBtn.nextSibling);
                } else {
                    extraControls.appendChild(themeBtn);
                }
                updated = true;
            }

            if (updated) {
                updateBtnAppearance();
            }
        } finally {
            isInjecting = false;
        }
    };

    // Safe, targeted MutationObserver on playbar container only
    const initObserver = () => {
        const playbar = document.querySelector(".Root__now-playing-bar, .main-nowPlayingBar-container");
        if (playbar) {
            const obs = new MutationObserver(() => {
                if (!document.getElementById("cosmic-cat-playbar-btn")) {
                    injectPlaybarButtons();
                }
            });
            obs.observe(playbar, { childList: true, subtree: true });
        } else {
            setTimeout(initObserver, 500);
        }
    };

    injectPlaybarButtons();
    initObserver();
    initOrUpdateThemeHud();

    // Keyboard Shortcuts: B (Toggle background), T / C (Cycle theme), ESC / V (Toggle foreground)
    Spicetify.Mousetrap.bind("b", toggleBackground);
    Spicetify.Mousetrap.bind("t", cycleTheme);
    Spicetify.Mousetrap.bind("c", cycleTheme);
    Spicetify.Mousetrap.bind("v", toggleForeground);
    Spicetify.Mousetrap.bind("esc", () => {
        if (isForeground) toggleForeground();
    });

    if (Spicetify.Menu && Spicetify.Menu.Item) {
        try {
            new Spicetify.Menu.Item("Cosmic Cat : Thème Suivant (T/C)", false, () => {
                cycleTheme();
            }).register();
        } catch (e) {}
    }
})();

})();
