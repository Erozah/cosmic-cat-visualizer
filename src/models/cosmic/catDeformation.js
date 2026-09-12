// src/models/cosmic/catDeformation.js - Feline audio-reactive deformation & breath kinematics

function computeCatDeformation(cx, cy, width, height, audioState, time, deckY, isPlaying = true) {
    const bass = Number.isFinite(audioState?.bass) ? audioState.bass : 0.2;
    const mids = Number.isFinite(audioState?.mids) ? audioState.mids : 0.2;
    const highs = Number.isFinite(audioState?.highs) ? audioState.highs : 0.2;
    const beat = Number.isFinite(audioState?.beatImpulse) ? audioState.beatImpulse : 0.0;
    const bpm = Number.isFinite(audioState?.bpm) ? audioState.bpm : 120;
    const isDrop = !!audioState?.isDrop;
    const snare = Number.isFinite(audioState?.snareImpulse) ? audioState.snareImpulse : 0.0;

    // Peaceful resting breath or audio-reactive respiration
    const breathSpeed = isPlaying ? (1.5 + (bpm / 60) * 0.5) : 0.8;
    const breath = Math.sin(time * breathSpeed) * (isPlaying ? 0.035 : 0.012);

    // Dynamic Feline Squash & Stretch on beat impacts
    // On kick impact: body compresses down (squash) and widens (stretchX)
    const dropMultiplier = isDrop ? 1.45 : 1.0;
    const squashCompressY = isPlaying ? (-beat * 0.09 * dropMultiplier + bass * 0.05) : 0;
    const stretchWidenX = isPlaying ? (beat * 0.12 * dropMultiplier + bass * 0.08) : 0;

    // High frequency micro-vibration on cymbal / hi-hat
    const vibration = isPlaying ? Math.sin(time * 50) * highs * 0.018 : 0;

    const currentScaleX = (1.0 + breath + stretchWidenX + vibration) * (width * 0.5);
    const currentScaleY = (1.0 - breath * 0.5 + squashCompressY) * (height * 0.5);

    // Spine organic swaying (amplified on melody & drops)
    const spineSwaySpeed = isPlaying ? (bpm / 60) * 1.5 : 0.8;
    const spineSway = isPlaying 
        ? (Math.sin(time * spineSwaySpeed) * (0.025 + mids * 0.04 * dropMultiplier)) 
        : (Math.sin(time * 0.8) * 0.005);

    // Ear perk intensity on snare, claps, and high frequencies
    const earPerk = isPlaying ? (highs * 0.08 + snare * 0.12 + beat * 0.06) : 0;

    // Ground base firmly at deckY with dynamic springy bounce
    const bounceOffset = isPlaying ? (-Math.sin((audioState?.beatProgress || 0) * Math.PI) * (4.0 * bass + 8.0 * beat) * dropMultiplier) : 0;
    const actualCy = deckY ? (deckY - currentScaleY * 0.96 + bounceOffset) : (cy + bounceOffset);

    return {
        cx,
        cy: actualCy,
        scaleX: currentScaleX,
        scaleY: currentScaleY,
        spineSway,
        earPerk,
        breath,
        bass,
        beat,
        highs,
        mids,
        isDrop,
        deckY
    };
}

