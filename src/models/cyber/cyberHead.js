// src/models/cyber/cyberHead.js - Cyber cat polygonal head, twitching ears, and forehead gem

function renderCyberHead(ctx, leftEarAngle, rightEarAngle, time, audio, palette) {
    ctx.save();
    const headY = -72;
    ctx.translate(0, headY);

    // Left Ear
    ctx.save();
    ctx.translate(-24, -14);
    ctx.rotate(leftEarAngle);
    
    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 2.0;
    ctx.globalCompositeOperation = 'screen';
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(-12, -28);
    ctx.lineTo(14, -6);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = palette.accent;
    ctx.globalAlpha = 0.3 + audio.bass * 0.3;
    ctx.beginPath();
    ctx.moveTo(-2, 6);
    ctx.lineTo(-9, -20);
    ctx.lineTo(9, -4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Right Ear
    ctx.save();
    ctx.translate(24, -14);
    ctx.rotate(rightEarAngle);

    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 2.0;
    ctx.globalCompositeOperation = 'screen';
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(12, -28);
    ctx.lineTo(-14, -6);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = palette.accent;
    ctx.globalAlpha = 0.3 + audio.bass * 0.3;
    ctx.beginPath();
    ctx.moveTo(2, 6);
    ctx.lineTo(9, -20);
    ctx.lineTo(-9, -4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Head polygon
    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 2.0;
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.95;

    ctx.beginPath();
    ctx.moveTo(-16, -14);
    ctx.lineTo(16, -14);
    ctx.lineTo(32, 4);
    ctx.lineTo(18, 22);
    ctx.lineTo(0, 26);
    ctx.lineTo(-18, 22);
    ctx.lineTo(-32, 4);
    ctx.closePath();
    ctx.stroke();

    ctx.fillStyle = 'rgba(8, 6, 24, 0.75)';
    ctx.fill();

    // Forehead diamond gem
    const gemPulse = 1 + audio.bass * 0.4;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = palette.core;
    ctx.beginPath();
    ctx.moveTo(0, -10 * gemPulse);
    ctx.lineTo(5 * gemPulse, -4 * gemPulse);
    ctx.lineTo(0, 2 * gemPulse);
    ctx.lineTo(-5 * gemPulse, -4 * gemPulse);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 1.0;
    ctx.stroke();
    ctx.restore();

    // Whiskers
    renderCyberWhiskers(ctx, time, audio, palette);

    // Cyber nose & mouth
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 1.2;
    ctx.globalCompositeOperation = 'screen';
    ctx.beginPath();
    ctx.moveTo(-3, 14);
    ctx.lineTo(3, 14);
    ctx.lineTo(0, 17);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, 17);
    ctx.lineTo(0, 20);
    ctx.moveTo(-5, 21);
    ctx.bezierCurveTo(-2, 23, 0, 20, 0, 20);
    ctx.bezierCurveTo(0, 20, 2, 23, 5, 21);
    ctx.stroke();

    ctx.restore();
}
