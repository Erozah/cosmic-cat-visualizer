// src/models/cyber/cyberEyes.js - Animated cyber cat eyes with audio-reactive pupils

function renderCyberEyes(ctx, isBlinking, blinkProgress, audio, palette) {
    ctx.save();
    const headY = -72;
    ctx.translate(0, headY);

    const blink = isBlinking ? Math.sin(blinkProgress) : 0;
    const eyeHeightScale = Math.max(0.08, 1.0 - blink * 0.95);
    const pupilWidth = 2.0 + audio.bass * 2.5;

    // Left Eye
    ctx.save();
    ctx.translate(-14, 2);
    ctx.scale(1.0, eyeHeightScale);

    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = palette.primary;
    ctx.beginPath();
    ctx.ellipse(0, 0, 7.5, 5.0, -0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = palette.core;
    ctx.beginPath();
    ctx.ellipse(0, 0, 4.5, 3.0, -0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#010108';
    ctx.beginPath();
    ctx.ellipse(0, 0, pupilWidth, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(2, -1.8, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right Eye
    ctx.save();
    ctx.translate(14, 2);
    ctx.scale(1.0, eyeHeightScale);

    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = palette.primary;
    ctx.beginPath();
    ctx.ellipse(0, 0, 7.5, 5.0, 0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = palette.core;
    ctx.beginPath();
    ctx.ellipse(0, 0, 4.5, 3.0, 0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#010108';
    ctx.beginPath();
    ctx.ellipse(0, 0, pupilWidth, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(2, -1.8, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
}
