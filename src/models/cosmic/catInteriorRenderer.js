// src/models/cosmic/catInteriorRenderer.js - Celestial body gradient, pulsar heart, and spine starlight

function renderCatInterior(ctx, p, landmarks, palette, time) {
    const { scaleY, scaleX, bass, beat } = p;
    const { headCenter, spineMid, baseCenter } = landmarks;

    ctx.save();

    // 1. Ethereal, luminous celestial body gradient
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

    const dropBloom = p.isDrop ? 1.45 : 1.0;
    const heartPulseRadius = scaleY * (0.75 + beat * 0.35 * dropBloom + (p.mids || 0) * 0.2);
    const heartGlow = ctx.createRadialGradient(
        spineMid[0], spineMid[1] - scaleY * 0.2, 5,
        spineMid[0], spineMid[1] - scaleY * 0.1, heartPulseRadius
    );
    heartGlow.addColorStop(0, "rgba(255, 255, 255, 0.98)");
    heartGlow.addColorStop(0.25, palette.accentAlpha(0.95 * dropBloom));
    heartGlow.addColorStop(0.55, palette.primaryAlpha((0.75 + bass * 0.25) * dropBloom));
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
    const spineLineWidth = (2.4 + beat * 1.8 + (p.mids || 0) * 1.2) * (p.isDrop ? 1.4 : 1.0);
    ctx.beginPath();
    ctx.moveTo(headCenter[0], headCenter[1] + 10);
    ctx.quadraticCurveTo(spineMid[0] + Math.sin(time * 2.2) * (5 + beat * 6), spineMid[1], baseCenter[0], baseCenter[1] - 8);
    ctx.strokeStyle = palette.accentAlpha(1.0);
    ctx.lineWidth = spineLineWidth;
    ctx.stroke();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(1.0, spineLineWidth * 0.45);
    ctx.stroke();

    ctx.restore();
    ctx.restore();
}
