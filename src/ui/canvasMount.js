// src/ui/canvasMount.js - Persistent global wallpaper canvas mounting

function mountGlobalCanvas() {
    let canvas = document.getElementById('cyber-cat-canvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'cyber-cat-canvas';
        canvas.className = 'cyber-cat-canvas';
        document.body.prepend(canvas);
    }
    return canvas;
}
