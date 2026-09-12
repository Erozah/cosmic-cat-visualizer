// src/models/cyber/cyberAura.js - Cyber cat diffuse body aura gradient

function renderCyberBodyAura(ctx, audio, palette) {
    ctx.save();
    const bodyGrad = ctx.createRadialGradient(0, 0, 10, 0, 20, 95);
    bodyGrad.addColorStop(0, palette.primary);
    bodyGrad.addColorStop(0.5, palette.secondary);
    bodyGrad.addColorStop(1, 'rgba(5, 5, 20, 0.45)');

    ctx.fillStyle = bodyGrad;
    ctx.globalAlpha = 0.35 + audio.bass * 0.25;

    ctx.beginPath();
    ctx.moveTo(0, -50);
    ctx.bezierCurveTo(-25, -35, -45, 0, -42, 45);
    ctx.bezierCurveTo(-40, 75, -55, 92, -35, 98);
    ctx.lineTo(35, 98);
    ctx.bezierCurveTo(55, 92, 40, 75, 42, 45);
    ctx.bezierCurveTo(45, 0, 25, -35, 0, -50);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
}
