// src/models/cyber/cyberConstellation.js - Constellation nodes, lines, and pulsar heart rendering

function renderCyberConstellation(ctx, nodes, links, time, audio, palette) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    const nodeMap = {};
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        nodeMap[n.id] = n;
    }

    ctx.strokeStyle = palette.primary;
    ctx.lineWidth = 1.0;
    ctx.globalAlpha = 0.45 + audio.mid * 0.35;

    for (let i = 0; i < links.length; i++) {
        const [idA, idB] = links[i];
        const a = nodeMap[idA];
        const b = nodeMap[idB];
        if (a && b) {
            ctx.beginPath();
            ctx.moveTo(a.relX, a.relY);
            ctx.lineTo(b.relX, b.relY);
            ctx.stroke();
        }
    }

    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(time * 3.5 + i * 0.8) * 0.3 + 0.7;
        const size = n.size * (pulse + audio.energy * 0.4);

        if (n.isHeart) {
            const heartPulse = 1.0 + (audio.bass * 0.8);
            const heartGrad = ctx.createRadialGradient(n.relX, n.relY, 1, n.relX, n.relY, 18 * heartPulse);
            heartGrad.addColorStop(0, palette.core);
            heartGrad.addColorStop(0.4, palette.accent);
            heartGrad.addColorStop(1, 'rgba(255, 0, 127, 0)');

            ctx.fillStyle = heartGrad;
            ctx.globalAlpha = 0.85;
            ctx.beginPath();
            ctx.arc(n.relX, n.relY, 18 * heartPulse, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = palette.core;
            ctx.beginPath();
            ctx.arc(n.relX, n.relY, 4.5 * heartPulse, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillStyle = palette.core;
            ctx.globalAlpha = 0.8;
            ctx.beginPath();
            ctx.arc(n.relX, n.relY, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}
