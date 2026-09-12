// src/models/cosmic/tailSparks.js - Tail tip cosmic sparkle emitter and renderer

function updateTailSparks(sparkTrail, tipNode, baseScale, audioState, dt, isPlaying) {
    const highs = audioState.highs || 0;
    const beat = audioState.beatImpulse || 0;
    const snare = audioState.snareImpulse || 0;
    const isDrop = !!audioState.isDrop;

    // Burst of sparks on snare / clap hit
    if (isPlaying && snare > 0.4) {
        const burstCount = Math.floor(3 + snare * 4 + (isDrop ? 3 : 0));
        for (let b = 0; b < burstCount; b++) {
            const angle = Math.random() * Math.PI * 2;
            const spd = 30 + Math.random() * 60;
            sparkTrail.push({
                x: tipNode.x,
                y: tipNode.y,
                vx: Math.cos(angle) * spd,
                vy: Math.sin(angle) * spd,
                life: 1.0,
                decay: 1.2 + Math.random() * 1.5,
                size: (2.0 + Math.random() * 3.0) * baseScale,
                color: Math.random() < 0.5 ? "accent" : "starlight"
            });
        }
    }

    // Continuous trailing sparks
    if (isPlaying && Math.random() < (0.35 + highs * 0.5 + beat * 0.35 + (isDrop ? 0.3 : 0))) {
        sparkTrail.push({
            x: tipNode.x + (Math.random() - 0.5) * 8,
            y: tipNode.y + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 25 - 12,
            vy: (Math.random() - 0.5) * 25 - 12,
            life: 1.0,
            decay: 1.1 + Math.random() * 1.4,
            size: (1.5 + Math.random() * 2.8) * baseScale,
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
