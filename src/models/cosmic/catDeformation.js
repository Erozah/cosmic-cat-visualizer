// src/models/cosmic/catDeformation.js - Feline audio-reactive deformation & breath kinematics

function computeCatDeformation(cx, cy, width, height, audioState, time, deckY, isPlaying = true) {
    const bass = Number.isFinite(audioState?.bass) ? audioState.bass : 0.2;
    const mids = Number.isFinite(audioState?.mids) ? audioState.mids : 0.2;
    const highs = Number.isFinite(audioState?.highs) ? audioState.highs : 0.2;
    const beat = Number.isFinite(audioState?.beatImpulse) ? audioState.beatImpulse : 0.0;
    const bpm = Number.isFinite(audioState?.bpm) ? audioState.bpm : 120;
    const isDrop = !!audioState?.isDrop;
    const snare = Number.isFinite(audioState?.snareImpulse) ? audioState.snareImpulse : 0.0;

    const energy = Number.isFinite(audioState?.energy) ? audioState.energy : 0.4;
    const tempoNorm = Math.max(0.4, Math.min(2.0, bpm / 120));

    // Peaceful resting breath or audio-reactive respiration (slow, calm cadence on chill tracks)
    const breathSpeed = isPlaying ? (0.65 + tempoNorm * 0.5 * (0.35 + energy * 0.65)) : 0.4;
    const breathAmp = isPlaying ? (0.018 + energy * 0.022) : 0.010;
    const breath = Math.sin(time * breathSpeed) * breathAmp;

    // Dynamic Feline Squash & Stretch on beat impacts
    const dropMultiplier = isDrop ? 1.45 : 1.0;
    const energyScale = 0.35 + energy * 0.65;
    const squashCompressY = isPlaying ? (-beat * 0.07 * dropMultiplier * energyScale + bass * 0.04 * energyScale) : 0;
    const stretchWidenX = isPlaying ? (beat * 0.09 * dropMultiplier * energyScale + bass * 0.05 * energyScale) : 0;

    // High frequency micro-vibration on distinct cymbal / hi-hat attacks only (not on quiet ambient)
    const vibration = (isPlaying && highs > 0.35) ? Math.sin(time * 35) * (highs - 0.35) * 0.015 : 0;

    const currentScaleX = (1.0 + breath + stretchWidenX + vibration) * (width * 0.5);
    const currentScaleY = (1.0 - breath * 0.5 + squashCompressY) * (height * 0.5);

    // Spine organic swaying (slow, hypnotic, majestic on chill tracks)
    const spineSwaySpeed = isPlaying ? (0.35 + tempoNorm * 0.45 * (0.4 + energy * 0.6)) : 0.25;
    const spineSwayAmp = (0.012 + mids * 0.035 * dropMultiplier) * energyScale;
    const spineSway = isPlaying 
        ? (Math.sin(time * spineSwaySpeed) * spineSwayAmp) 
        : (Math.sin(time * 0.4) * 0.005);

    // Ear perk intensity on snare, claps, and high frequencies
    const earPerk = isPlaying ? (highs * 0.06 + snare * 0.10 + beat * 0.05) * energyScale : 0;

    // Ground base firmly at deckY with dynamic springy bounce (gentle and cushioned on chill tracks)
    const bounceOffset = isPlaying ? (-Math.sin((audioState?.beatProgress || 0) * Math.PI) * (2.5 * bass + 5.5 * beat) * dropMultiplier * energyScale) : 0;
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

