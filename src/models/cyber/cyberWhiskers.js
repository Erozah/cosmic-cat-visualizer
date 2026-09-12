// src/models/cyber/cyberWhiskers.js - Audio-reactive vibrating cyber whiskers with multi-harmonic flex & snare response

function renderCyberWhiskers(ctx, time, audio, palette) {
    ctx.save();
    ctx.globalCompositeOperation = 'screen';

    const treble = audio.treble || 0;
    const mid = audio.mid || 0;
    const snare = audio.snareImpulse || 0;
    const energy = audio.energy || 0.35;
    const energyScale = 0.35 + energy * 0.65;
    const isDrop = audio.isDrop || false;
    const dropMultiplier = isDrop ? 1.4 : 1.0;

    // Gentle slow breathing flex on calm music; rapid sensory flutter only on distinct treble/snare transients
    const fastFlutter = (treble > 0.38 || snare > 0.45) 
        ? Math.sin(time * 24.0) * (Math.max(0, treble - 0.38) * 3.5 + snare * 4.0) 
        : 0;
    const slowBreath = Math.sin(time * 1.6) * (mid * 1.2 * energyScale);
    const vibe = (fastFlutter + slowBreath) * dropMultiplier;

    const leftWhiskers = [
        { startX: -14, startY: 14, cpX: -32, cpY: 10 + vibe * 0.7, endX: -50, endY: 7 + vibe },
        { startX: -15, startY: 17, cpX: -34, cpY: 17 + vibe * 0.3, endX: -55, endY: 17 + vibe * 0.4 },
        { startX: -14, startY: 20, cpX: -32, cpY: 23 - vibe * 0.6, endX: -48, endY: 27 - vibe }
    ];

    const rightWhiskers = [
        { startX: 14, startY: 14, cpX: 32, cpY: 10 + vibe * 0.7, endX: 50, endY: 7 + vibe },
        { startX: 15, startY: 17, cpX: 34, cpY: 17 + vibe * 0.3, endX: 55, endY: 17 + vibe * 0.4 },
        { startX: 14, startY: 20, cpX: 32, cpY: 23 - vibe * 0.6, endX: 48, endY: 27 - vibe }
    ];

    const whiskerAlpha = Math.min(1.0, (0.55 + treble * 0.35 + snare * 0.3) * dropMultiplier);
    const tipRadius = 1.0 + treble * 1.5 + snare * 2.0;

    // Render left whiskers
    for (let i = 0; i < leftWhiskers.length; i++) {
        const w = leftWhiskers[i];
        ctx.strokeStyle = palette.primaryAlpha ? palette.primaryAlpha(whiskerAlpha) : palette.primary;
        ctx.lineWidth = 1.0 + snare * 0.6;
        ctx.beginPath();
        ctx.moveTo(w.startX, w.startY);
        ctx.quadraticCurveTo(w.cpX, w.cpY, w.endX, w.endY);
        ctx.stroke();

        // Neon tip on transients
        if (treble > 0.3 || snare > 0.4 || isDrop) {
            ctx.fillStyle = palette.core;
            ctx.beginPath();
            ctx.arc(w.endX, w.endY, tipRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Render right whiskers
    for (let i = 0; i < rightWhiskers.length; i++) {
        const w = rightWhiskers[i];
        ctx.strokeStyle = palette.primaryAlpha ? palette.primaryAlpha(whiskerAlpha) : palette.primary;
        ctx.lineWidth = 1.0 + snare * 0.6;
        ctx.beginPath();
        ctx.moveTo(w.startX, w.startY);
        ctx.quadraticCurveTo(w.cpX, w.cpY, w.endX, w.endY);
        ctx.stroke();

        // Neon tip on transients
        if (treble > 0.3 || snare > 0.4 || isDrop) {
            ctx.fillStyle = palette.core;
            ctx.beginPath();
            ctx.arc(w.endX, w.endY, tipRadius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}
