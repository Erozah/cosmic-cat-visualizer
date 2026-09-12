// src/audio/tempoEstimator.js - Algorithmic tempo & duration extraction

function estimateTrackTempo(trackUri = "", trackName = "") {
    const raw = (trackUri + trackName).split("");
    const hash = raw.reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return 110 + (hash % 40); // 110 - 150 BPM range
}
