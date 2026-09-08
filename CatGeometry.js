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
