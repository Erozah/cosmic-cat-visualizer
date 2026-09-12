// src/models/cosmic/tailKinematics.js - Realistic feline tail kinematics and spine physics

function updateTailKinematics(tail, anchorPoint, baseScale, audioState, dt, time, deckY, isPlaying) {
    const bpm = audioState.bpm || 120;
    const energy = audioState.energy || 0;
    const bass = audioState.bass || 0;
    const highs = audioState.highs || 0;
    const beat = audioState.beatImpulse || 0;

    const rootX = anchorPoint[0];
    const rootY = anchorPoint[1];

    // 1. Natural Feline Sway Rhythm
    const tempoHz = isPlaying ? Math.max(0.5, Math.min(2.5, (bpm / 60) * 0.45)) : 0.12;
    const swaySpeed = isPlaying ? (tempoHz * (1.0 + energy * 0.4)) : 0.12;
    tail.swayPhase += swaySpeed * dt;

    // 2. Beat Deck Tap & Tip Twitch
    if (isPlaying && beat > 0.4) {
        tail.tipTwitch += (beat * 1.8) * (Math.sin(tail.swayPhase) > 0 ? 1 : -1);
        tail.deckTapImpulse = Math.min(1.0, tail.deckTapImpulse + beat * 0.8);
    } else if (!isPlaying) {
        tail.tipTwitch = 0;
        tail.deckTapImpulse = 0;
    }
    tail.tipTwitch *= Math.pow(0.86, dt * 60);
    tail.deckTapImpulse *= Math.pow(0.88, dt * 60);
    if (isNaN(tail.tipTwitch)) tail.tipTwitch = 0;
    if (isNaN(tail.deckTapImpulse)) tail.deckTapImpulse = 0;

    // 3. Feline Tail Spine Kinematics
    const totalTailLength = 175 * baseScale;
    const segLen = totalTailLength / (tail.segmentCount - 1);

    if (!tail.initialized) {
        for (let i = 0; i < tail.segmentCount; i++) {
            tail.nodes[i].x = rootX - i * segLen * 0.8;
            tail.nodes[i].y = rootY + i * segLen * 0.3;
            tail.nodes[i].thickness = 11.0 * baseScale;
        }
        tail.initialized = true;
    }

    // Set Root Node
    tail.nodes[0].x = rootX;
    tail.nodes[0].y = rootY;
    tail.nodes[0].thickness = 11.0 * baseScale;

    const maxSwayAngle = isPlaying ? (0.35 + energy * 0.25 + bass * 0.2) : 0.05;

    for (let i = 1; i < tail.segmentCount; i++) {
        const frac = i / (tail.segmentCount - 1);
        
        // Feline S-curve harmonic wave
        const wavePhase = tail.swayPhase - frac * 2.2;
        const horizontalSway = Math.sin(wavePhase) * maxSwayAngle * (frac * 1.3);
        const secondaryHarmonic = isPlaying ? (Math.sin(wavePhase * 1.8) * 0.15 * frac) : 0;

        // Tip twitch & energetic whip
        const tipCurl = tail.tipTwitch * Math.pow(frac, 2.5) * 1.4;

        // Target natural resting angle
        const baseDirAngle = Math.PI * 0.88;
        const currentAngle = baseDirAngle + horizontalSway + secondaryHarmonic + tipCurl;

        // Target position
        const prev = tail.nodes[i - 1];
        let targetX = prev.x + Math.cos(currentAngle) * segLen;
        let targetY = prev.y + Math.sin(currentAngle) * segLen;

        // Deck constraint: tail rests gracefully on the wooden deck surface
        if (deckY && targetY > deckY + 12 * baseScale) {
            targetY = deckY + 12 * baseScale;
        }

        // Tip lifts gently off the deck when active
        if (isPlaying && frac > 0.75) {
            const tipLift = Math.sin(time * 3 + frac * 4) * (6 * baseScale * highs) - (tail.deckTapImpulse * 8 * baseScale);
            targetY += tipLift;
        }

        // Smooth spring damping towards target
        const blend = 0.38 + (1 - frac) * 0.25;
        tail.nodes[i].x += (targetX - tail.nodes[i].x) * blend;
        tail.nodes[i].y += (targetY - tail.nodes[i].y) * blend;

        // Realistic Feline Thickness Profile
        const thicknessProfile = 1.0 - Math.pow(frac, 1.4) * 0.65;
        tail.nodes[i].thickness = thicknessProfile * (11.0 * baseScale);
    }

    // 4. Precalculate Envelope Curves in pre-allocated buffers
    for (let i = 0; i < tail.segmentCount; i++) {
        const curr = tail.nodes[i];
        const next = i < tail.segmentCount - 1 ? tail.nodes[i + 1] : curr;
        const prev = i > 0 ? tail.nodes[i - 1] : curr;

        const dx = next.x - prev.x;
        const dy = next.y - prev.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        const t = curr.thickness;
        tail.leftPoints[i].x = curr.x + nx * t;
        tail.leftPoints[i].y = curr.y + ny * t;
        tail.rightPoints[i].x = curr.x - nx * t;
        tail.rightPoints[i].y = curr.y - ny * t;
    }
}
