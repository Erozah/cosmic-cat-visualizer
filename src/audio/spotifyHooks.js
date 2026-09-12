// src/audio/spotifyHooks.js - Spicetify Player lifecycle hooks and event listeners

function setupSpotifyHooks(engine) {
    if (typeof Spicetify === "undefined" || !Spicetify.Player) return;

    try {
        engine.isPlaying = Spicetify.Player.isPlaying();

        Spicetify.Player.addEventListener("onplaypause", () => {
            engine.isPlaying = Spicetify.Player.isPlaying();
        });

        Spicetify.Player.addEventListener("onprogress", (e) => {
            if (e && e.data) {
                engine.progress = e.data;
            }
        });

        Spicetify.Player.addEventListener("songchange", () => {
            engine.updateTrackInfo();
        });

        engine.updateTrackInfo();
    } catch (err) {
        console.warn("[AudioEngine] Spotify hooks warning:", err);
    }
}
