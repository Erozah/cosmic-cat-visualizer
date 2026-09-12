// src/audio/envelopeFollower.js - Energy envelope calculation & audio bands smoothing

function updateAudioEnvelope(engine, t, beatPhase) {
    if (engine.isPlaying) {
        const beatDecay = Math.max(0, 1 - Math.pow(beatPhase, 0.4) * 1.5);
        const subBeat = Math.sin(t * Math.PI * 4) * 0.15;

        const targetBass = 0.35 + beatDecay * 0.65 + Math.max(0, subBeat);
        const targetMid = 0.25 + Math.sin(t * 3.2) * 0.25 + (engine.isBeat ? 0.35 : 0);
        const targetTreble = 0.2 + Math.cos(t * 6.5) * 0.3 + beatDecay * 0.4;

        engine.bass += (targetBass - engine.bass) * 0.28;
        engine.mid += (targetMid - engine.mid) * 0.20;
        engine.treble += (targetTreble - engine.treble) * 0.24;

        // Snare impulse on beat 2 and 4
        const beatInBar = (engine.beatCount % 4);
        if (engine.isBeat && (beatInBar === 1 || beatInBar === 3)) {
            engine.snareImpulse = 0.85;
        } else {
            engine.snareImpulse = (engine.snareImpulse || 0) * 0.85;
        }
    } else {
        // Serene resting breathing when paused
        const breath = 0.12 + (Math.sin(engine.liveTime * 1.5) * 0.5 + 0.5) * 0.1;
        engine.bass += (breath - engine.bass) * 0.08;
        engine.mid += (breath * 0.8 - engine.mid) * 0.08;
        engine.treble += (breath * 0.5 - engine.treble) * 0.08;
        engine.snareImpulse = 0;
    }

    engine.energy = (engine.bass * 0.5) + (engine.mid * 0.3) + (engine.treble * 0.2);

    // Multi-model aliases
    engine.mids = engine.mid;
    engine.highs = engine.treble;
    engine.bpm = engine.tempo;
    engine.beatImpulse = (engine.isBeat ? 1.0 : 0.0) + Math.max(0, 1.0 - engine.beatProgress * 2.2) * 0.5;
    engine.isBeatPulse = engine.isBeat;
    engine.is4BeatPulse = engine.isBeat && (engine.beatCount % 4 === 0);
    engine.barPhase = (engine.beatCount % 4 + engine.beatProgress) / 4;
}

