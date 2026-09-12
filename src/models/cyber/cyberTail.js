// src/models/cyber/cyberTail.js - Cyberpunk segmented neon tail kinematics & rendering

function renderCyberTail(ctx, tailPoints, tailSegments, time, audio, palette) {
    ctx.save();
    const rootX = 0;
    const rootY = 78;
    const energy = audio.energy || 0.35;
    const tempoNorm = Math.max(0.4, Math.min(2.0, (audio.bpm || audio.tempo || 120) / 120));
    const isPlaying = audio.isPlaying !== false;

    // Slow, lazy cyber tail sway on chill songs (0.15 - 0.25 Hz)
    const swayFreq = isPlaying ? (0.65 + tempoNorm * 0.45 * (0.35 + energy * 0.65)) : 0.35;
    const swayAmp = isPlaying ? (16 + energy * 20 + (audio.bass || 0) * 16) : 12;

    ctx.beginPath();
    ctx.moveTo(rootX, rootY);

    for (let i = 0; i < tailSegments; i++) {
        const frac = (i + 1) / tailSegments;
        const wave = Math.sin(time * swayFreq - frac * 2.5);
        const curl = Math.pow(frac, 1.3) * (swayAmp * wave);
        const segX = rootX + curl + Math.sin(frac * Math.PI) * (15 + energy * 10);
        const segY = rootY + frac * 65 - Math.pow(frac, 2) * 18;

        tailPoints[i] = { x: segX, y: segY };
        ctx.lineTo(segX, segY);
    }

    ctx.globalCompositeOperation = 'screen';
    ctx.strokeStyle = palette.accent;
    ctx.lineWidth = 3.0 + (audio.bass || 0) * 1.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = palette.core;
    ctx.lineWidth = 1.4;
    ctx.stroke();

    // Data pulse along tail spine: relaxed cruise on chill songs
    const pulseSpeed = 0.5 + tempoNorm * 0.5 * (0.4 + energy * 0.6);
    const pulsePos = (time * pulseSpeed) % 1.0;
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
