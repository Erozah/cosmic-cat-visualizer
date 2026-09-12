// src/models/cyber/cyberTail.js - Cyberpunk segmented neon tail kinematics & rendering

function renderCyberTail(ctx, tailPoints, tailSegments, time, audio, palette) {
    ctx.save();
    const rootX = 0;
    const rootY = 78;
    const swayFreq = 1.8 + (audio.isPlaying ? audio.tempo / 120 : 0.8);
    const swayAmp = 42 + audio.bass * 25;

    ctx.beginPath();
    ctx.moveTo(rootX, rootY);

    for (let i = 0; i < tailSegments; i++) {
        const frac = (i + 1) / tailSegments;
        const wave = Math.sin(time * swayFreq - frac * 3.2);
        const curl = Math.pow(frac, 1.4) * (swayAmp * wave);
        const segX = rootX + curl + Math.sin(frac * Math.PI) * 25;
        const segY = rootY + frac * 65 - Math.pow(frac, 2) * 20;

        tailPoints[i] = { x: segX, y: segY };
        ctx.lineTo(segX, segY);
    }

    ctx.globalCompositeOperation = 'screen';
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 3.5 + audio.bass * 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = palette.core;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    const pulsePos = (time * 1.5) % 1.0;
    const pulseIndex = Math.min(tailSegments - 1, Math.floor(pulsePos * tailSegments));
    const pulsePt = tailPoints[pulseIndex];
    if (pulsePt) {
        ctx.fillStyle = palette.core;
        ctx.beginPath();
        ctx.arc(pulsePt.x, pulsePt.y, 3.5 + audio.bass * 2.0, 0, Math.PI * 2);
        ctx.fill();
    }

    const tip = tailPoints[tailSegments - 1];
    if (tip) {
        ctx.fillStyle = palette.primary;
        ctx.beginPath();
        ctx.arc(tip.x, tip.y, 4.0 + audio.treble * 3.0, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}
