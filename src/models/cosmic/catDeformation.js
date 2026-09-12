// src/models/cosmic/catDeformation.js - Feline audio-reactive deformation & breath kinematics

function computeCatDeformation(cx, cy, width, height, audioState, time, deckY, isPlaying = true) {
    const bass = Number.isFinite(audioState?.bass) ? audioState.bass : 0.2;
    const mids = Number.isFinite(audioState?.mids) ? audioState.mids : 0.2;
    const highs = Number.isFinite(audioState?.highs) ? audioState.highs : 0.2;
    const beat = Number.isFinite(audioState?.beatImpulse) ? audioState.beatImpulse : 0.0;
    const bpm = Number.isFinite(audioState?.bpm) ? audioState.bpm : 120;

    // Peaceful resting breath or audio-reactive respiration
    const breathSpeed = isPlaying ? (1.6 + (bpm / 60) * 0.4) : 0.8;
    const breath = Math.sin(time * breathSpeed) * (isPlaying ? 0.028 : 0.012);

    // Bass expansion & beat pop
    const bassExpansionX = isPlaying ? (bass * 0.07 + beat * 0.05) : 0;
    const bassExpansionY = isPlaying ? (bass * 0.04 + beat * 0.03) : 0;

    // High frequency micro-vibration
    const vibration = isPlaying ? Math.sin(time * 45) * highs * 0.012 : 0;

    const currentScaleX = (1.0 + breath + bassExpansionX + vibration) * (width * 0.5);
    const currentScaleY = (1.0 - breath * 0.5 + bassExpansionY) * (height * 0.5);

    // Spine organic swaying
    const spineSway = isPlaying ? (Math.sin(time * 2.0) * (0.015 + mids * 0.025)) : (Math.sin(time * 0.8) * 0.005);

    // Ear perk intensity
    const earPerk = isPlaying ? (highs * 0.06 + beat * 0.05) : 0;

    // Ground base firmly at deckY
    const actualCy = deckY ? (deckY - currentScaleY * 0.96) : cy;

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
        deckY
    };
}
