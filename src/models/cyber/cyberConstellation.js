// src/models/cyber/cyberConstellation.js - Constellation nodes, lines, and frequency-mapped pulsar heart

function renderCyberConstellation(ctx, nodes, links, time, audio, palette) {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    const bass = audio.bass || 0;
    const mid = audio.mid || 0;
    const treble = audio.treble || 0;
    const beat = audio.beatImpulse || 0;
    const snare = audio.snareImpulse || 0;
    const isDrop = audio.isDrop || false;
    const dropMultiplier = isDrop ? 1.5 : 1.0;

    const nodeMap = {};
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        nodeMap[n.id] = n;
    }

    // Dynamic link rendering with drop intensity
    const linkAlpha = Math.min(1.0, (0.45 + mid * 0.35 + beat * 0.2) * dropMultiplier);
    ctx.strokeStyle = isDrop && palette.accentAlpha ? palette.accentAlpha(linkAlpha) : (palette.primaryAlpha ? palette.primaryAlpha(linkAlpha) : palette.primary);
    ctx.lineWidth = (1.0 + snare * 0.8 + (isDrop ? 0.6 : 0));

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

    // Dynamic frequency-mapped nodes
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = Math.sin(time * 3.5 + i * 0.8) * 0.25 + 0.75;

        // Frequency mapping by anatomical position:
        // Lower body (hips, tailBase, flanks) -> Bass
        // Core (heart, spine) -> Mids
        // Upper body (throat, shoulders) -> Treble & Snare
        let freqBand = mid;
        if (n.relY >= 35) {
            freqBand = bass * 1.3 + beat * 0.6;
        } else if (n.relY <= -20) {
            freqBand = treble * 1.2 + snare * 0.8;
        } else {
            freqBand = mid * 1.1 + beat * 0.3;
        }

        const size = n.size * (pulse + freqBand * 0.5) * dropMultiplier;

        if (n.isHeart) {
            const heartPulse = (1.0 + bass * 0.9 + beat * 0.5) * dropMultiplier;
            const heartRadius = 18 * heartPulse;

            // Outer radiant corona
            const heartGrad = ctx.createRadialGradient(n.relX, n.relY, 1, n.relX, n.relY, heartRadius);
            heartGrad.addColorStop(0, palette.core);
            heartGrad.addColorStop(0.35, palette.accentAlpha ? palette.accentAlpha(0.9) : palette.accent);
            heartGrad.addColorStop(0.7, palette.primaryAlpha ? palette.primaryAlpha(0.4) : palette.primary);
            heartGrad.addColorStop(1, 'rgba(255, 0, 127, 0)');

            ctx.fillStyle = heartGrad;
            ctx.globalAlpha = Math.min(1.0, 0.85 + bass * 0.2);
            ctx.beginPath();
            ctx.arc(n.relX, n.relY, heartRadius, 0, Math.PI * 2);
            ctx.fill();

            // Inner intense pulsar core
            ctx.fillStyle = palette.core;
            ctx.globalAlpha = 1.0;
            ctx.beginPath();
            ctx.arc(n.relX, n.relY, 4.5 * heartPulse, 0, Math.PI * 2);
            ctx.fill();

            // Extra flash during drops or high beats
            if (isDrop || beat > 0.7) {
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(n.relX, n.relY, 2.5 * heartPulse, 0, Math.PI * 2);
                ctx.fill();
            }
        } else {
            // Node color modulation according to frequency band
            ctx.fillStyle = (freqBand > 0.45 || isDrop) ? palette.core : palette.accent;
            ctx.globalAlpha = Math.min(1.0, 0.7 + freqBand * 0.3);
            ctx.beginPath();
            ctx.arc(n.relX, n.relY, size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}
