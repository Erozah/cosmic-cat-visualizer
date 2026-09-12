// src/models/cyber/cyberEyes.js - Animated cyber cat eyes with audio-reactive pupil dilation & drop radiance

function renderCyberEyes(ctx, isBlinking, blinkProgress, audio, palette) {
    ctx.save();
    const headY = -72;
    ctx.translate(0, headY);

    const blink = isBlinking ? Math.sin(blinkProgress) : 0;
    const eyeHeightScale = Math.max(0.08, 1.0 - blink * 0.95);

    const bass = audio.bass || 0;
    const beat = audio.beatImpulse || 0;
    const energy = audio.energy || 0.4;
    const isDrop = audio.isDrop || false;

    // Feline pupil dilation: from narrow slit on calm to large dilated aperture on bass/drops
    const pupilDilate = Math.min(1.0, bass * 0.65 + beat * 0.45 + (isDrop ? 0.35 : 0));
    const pupilWidth = 1.5 + pupilDilate * 4.2; // 1.5px (sharp feline slit) up to 5.7px (wide dilated hunt aperture)
    const pupilHeight = 4.2 + pupilDilate * 0.6;

    // Outer Ocular Halo Flare during high energy / drops
    if (isDrop || energy > 0.65) {
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const haloRadius = 14 + (isDrop ? 8 : 0) + beat * 4;
        const haloAlpha = isDrop ? 0.5 : 0.3;

        [-14, 14].forEach(eyeX => {
            const haloGrad = ctx.createRadialGradient(eyeX, 2, 2, eyeX, 2, haloRadius);
            haloGrad.addColorStop(0, palette.core);
            haloGrad.addColorStop(0.4, palette.accentAlpha ? palette.accentAlpha(haloAlpha) : palette.accent);
            haloGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = haloGrad;
            ctx.beginPath();
            ctx.arc(eyeX, 2, haloRadius, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.restore();
    }

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
    ctx.ellipse(0, 0, pupilWidth, pupilHeight, 0, 0, Math.PI * 2);
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
    ctx.ellipse(0, 0, pupilWidth, pupilHeight, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(2, -1.8, 1.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore();
}
