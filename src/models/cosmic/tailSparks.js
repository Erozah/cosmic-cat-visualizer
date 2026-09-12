// src/models/cosmic/tailSparks.js - Tail tip cosmic sparkle emitter and renderer

function updateTailSparks(sparkTrail, tipNode, baseScale, audioState, dt, isPlaying) {
    const highs = audioState.highs || 0;
    const beat = audioState.beatImpulse || 0;

    // Spawn sparks
    if (isPlaying && Math.random() < 0.35 + highs * 0.5 + beat * 0.3) {
        sparkTrail.push({
            x: tipNode.x + (Math.random() - 0.5) * 6,
            y: tipNode.y + (Math.random() - 0.5) * 6,
            vx: (Math.random() - 0.5) * 20 - 10,
            vy: (Math.random() - 0.5) * 20 - 10,
            life: 1.0,
            decay: 1.1 + Math.random() * 1.4,
            size: (1.5 + Math.random() * 2.5) * baseScale,
            color: Math.random() < 0.6 ? "accent" : "starlight"
        });
    }

    // Update sparks
    for (let i = sparkTrail.length - 1; i >= 0; i--) {
        const sp = sparkTrail[i];
        sp.x += sp.vx * dt;
        sp.y += sp.vy * dt;
        sp.life -= sp.decay * dt;
        if (sp.life <= 0 || !isPlaying) {
            sparkTrail.splice(i, 1);
        }
    }
}

function renderTailSparks(ctx, sparkTrail, palette) {
    for (let i = 0; i < sparkTrail.length; i++) {
        const sp = sparkTrail[i];
        ctx.fillStyle = sp.color === "starlight" ? `rgba(255, 255, 255, ${sp.life})` : palette.accentAlpha(sp.life);
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
        ctx.fill();
    }
}
