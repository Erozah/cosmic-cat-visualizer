// src/models/cyber/cyberWhiskers.js - Audio-reactive vibrating cyber whiskers

function renderCyberWhiskers(ctx, time, audio, palette) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 1.0;

    const whiskerVibe = Math.sin(time * 12) * (audio.treble * 4.0);

    const leftWhiskers = [
        { startX: -14, startY: 14, endX: -48, endY: 8 + whiskerVibe },
        { startX: -15, startY: 17, endX: -52, endY: 17 },
        { startX: -14, startY: 20, endX: -46, endY: 26 - whiskerVibe }
    ];
    for (let i = 0; i < leftWhiskers.length; i++) {
        const w = leftWhiskers[i];
        ctx.globalAlpha = 0.5 + audio.treble * 0.4;
        ctx.beginPath();
        ctx.moveTo(w.startX, w.startY);
        ctx.lineTo(w.endX, w.endY);
        ctx.stroke();
    }

    const rightWhiskers = [
        { startX: 14, startY: 14, endX: 48, endY: 8 + whiskerVibe },
        { startX: 15, startY: 17, endX: 52, endY: 17 },
        { startX: 14, startY: 20, endX: 46, endY: 26 - whiskerVibe }
    ];
    for (let i = 0; i < rightWhiskers.length; i++) {
        const w = rightWhiskers[i];
        ctx.globalAlpha = 0.5 + audio.treble * 0.4;
        ctx.beginPath();
        ctx.moveTo(w.startX, w.startY);
        ctx.lineTo(w.endX, w.endY);
        ctx.stroke();
    }

    ctx.restore();
}
