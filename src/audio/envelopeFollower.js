// src/audio/envelopeFollower.js - Energy envelope calculation & audio bands smoothing

function updateAudioEnvelope(engine, t, beatPhase) {
    if (engine.isPlaying) {
        const beatDecay = Math.max(0, 1 - Math.pow(beatPhase, 0.4) * 1.5);
        const subBeat = Math.sin(t * Math.PI * 4) * 0.15;

        const targetBass = 0.4 + beatDecay * 0.6 + Math.max(0, subBeat);
        const targetMid = 0.3 + Math.sin(t * 3.2) * 0.2 + (engine.isBeat ? 0.4 : 0);
        const targetTreble = 0.25 + Math.cos(t * 6.5) * 0.25 + beatDecay * 0.3;

        engine.bass += (targetBass - engine.bass) * 0.25;
        engine.mid += (targetMid - engine.mid) * 0.18;
        engine.treble += (targetTreble - engine.treble) * 0.22;
    } else {
        // Serene resting breathing when paused
        const breath = 0.15 + (Math.sin(engine.liveTime * 1.5) * 0.5 + 0.5) * 0.12;
        engine.bass += (breath - engine.bass) * 0.08;
        engine.mid += (breath * 0.8 - engine.mid) * 0.08;
        engine.treble += (breath * 0.5 - engine.treble) * 0.08;
    }

    engine.energy = (engine.bass * 0.5) + (engine.mid * 0.3) + (engine.treble * 0.2);

    // Multi-model aliases
    engine.mids = engine.mid;
    engine.highs = engine.treble;
    engine.bpm = engine.tempo;
    engine.beatImpulse = (engine.isBeat ? 1.0 : 0.0) + Math.max(0, 1.0 - engine.beatProgress * 2.5) * 0.4;
    engine.isBeatPulse = engine.isBeat;
    engine.is4BeatPulse = engine.isBeat && (engine.beatCount % 4 === 0);
}
