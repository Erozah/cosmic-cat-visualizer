// src/models/cosmic/catEarRenderer.js - Ear glowing contours, tufts, and ridges

function renderCatEars(ctx, p, landmarks, palette) {
    const { leftEarTip, leftEarOuter, leftEarInner, rightEarTip, rightEarOuter, rightEarInner } = landmarks;
    const { beat, highs } = p;

    ctx.save();
    ctx.globalCompositeOperation = "screen";

    // Build ear path
    ctx.beginPath();
    ctx.moveTo(leftEarOuter[0], leftEarOuter[1]);
    ctx.quadraticCurveTo((leftEarOuter[0] + leftEarTip[0]) * 0.5 - 4, (leftEarOuter[1] + leftEarTip[1]) * 0.5, leftEarTip[0], leftEarTip[1]);
    ctx.quadraticCurveTo((leftEarInner[0] + leftEarTip[0]) * 0.5 + 3, (leftEarInner[1] + leftEarTip[1]) * 0.5, leftEarInner[0], leftEarInner[1]);

    ctx.moveTo(rightEarOuter[0], rightEarOuter[1]);
    ctx.quadraticCurveTo((rightEarOuter[0] + rightEarTip[0]) * 0.5 + 4, (rightEarOuter[1] + rightEarTip[1]) * 0.5, rightEarTip[0], rightEarTip[1]);
    ctx.quadraticCurveTo((rightEarInner[0] + rightEarTip[0]) * 0.5 - 3, (rightEarInner[1] + rightEarTip[1]) * 0.5, rightEarInner[0], rightEarInner[1]);

    // Inner glowing ear tufts
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
