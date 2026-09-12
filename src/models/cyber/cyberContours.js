// src/models/cyber/cyberContours.js - Neon cyber body outline contours and markings

function renderCyberBodyContours(ctx, audio, palette) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 0.85 + audio.energy * 0.15;

    // Left flank contour
    ctx.beginPath();
    ctx.moveTo(-10, -50);
    ctx.bezierCurveTo(-26, -30, -44, 0, -42, 45);
    ctx.bezierCurveTo(-40, 75, -58, 92, -38, 98);
    ctx.stroke();

    // Right flank contour
    ctx.beginPath();
    ctx.moveTo(10, -50);
    ctx.bezierCurveTo(26, -30, 44, 0, 42, 45);
    ctx.bezierCurveTo(40, 75, 58, 92, 38, 98);
    ctx.stroke();

    // Base paw rests
    ctx.beginPath();
    ctx.moveTo(-38, 98);
    ctx.lineTo(-12, 98);
    ctx.moveTo(12, 98);
    ctx.lineTo(38, 98);
    ctx.stroke();

    // Chest chevron cyber accent
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 1.2;
    ctx.globalAlpha = 0.5 + audio.mid * 0.3;
    ctx.beginPath();
    ctx.moveTo(-16, -18);
    ctx.lineTo(0, -6);
    ctx.lineTo(16, -18);
    ctx.stroke();

    ctx.restore();
}
