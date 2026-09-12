// src/core/panelBounds.js - Full viewport canvas sizing & central cat placement

function syncPanelBounds(engine) {
    if (!engine.canvas) return;

    engine.dpr = window.devicePixelRatio || 1;
    engine.width = window.innerWidth;
    engine.height = window.innerHeight;

    const targetW = Math.floor(engine.width * engine.dpr);
    const targetH = Math.floor(engine.height * engine.dpr);

    if (engine.canvas.width !== targetW || engine.canvas.height !== targetH) {
        engine.canvas.width = targetW;
        engine.canvas.height = targetH;
        engine.ctx.setTransform(engine.dpr, 0, 0, engine.dpr, 0, 0);
        engine.env.resize(engine.width, engine.height);
    }

    // Measure the central main-view area between the sidebars
    const mainView = document.querySelector('.Root__main-view') || document.querySelector('main');
    if (mainView) {
        const rect = mainView.getBoundingClientRect();
        if (rect.width > 20 && rect.height > 20) {
            engine.catCenterX = rect.left + rect.width * 0.5;
            engine.catCenterY = rect.top + rect.height * 0.52;

            // Align floating control bar with central area
            const bar = document.getElementById('cyber-cat-control-bar');
            if (bar) {
                bar.style.left = `${Math.round(rect.left + rect.width * 0.5)}px`;
            }
            return;
        }
    }

    engine.catCenterX = engine.width * 0.5;
    engine.catCenterY = engine.height * 0.52;
}

function setupResizeHandling(engine) {
    const handleResize = () => {
        syncPanelBounds(engine);
        if (engine.isFrozen) {
            engine.renderFrame(0.016, true);
        }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const mainView = document.querySelector('.Root__main-view') || document.querySelector('main');
    if (typeof ResizeObserver !== 'undefined' && mainView) {
        const ro = new ResizeObserver(() => handleResize());
        ro.observe(mainView);
        engine.ro = ro;
    }

    handleResize();
}
