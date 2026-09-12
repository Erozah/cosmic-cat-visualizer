// src/ui/playbarButtons.js - Injects legacy playbar buttons into Spotify extra controls

const CatSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C9.5 2 7.4 3.8 7 6.2 4.6 7.8 3 10.7 3 14c0 5 4 9 9 9s9-4 9-9c0-3.3-1.6-6.2-4-7.8C16.6 3.8 14.5 2 12 2zm-3.2 1.8l1.6 2.4c-.6.4-1.1.9-1.4 1.5L6.5 6.6l2.3-2.8zm6.4 0l2.3 2.8-2.5 1.1c-.3-.6-.8-1.1-1.4-1.5l1.6-2.4z"/></svg>`;
const PaletteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 3.59 8 8 8 0.55 0 1-0.45 1-1 0-0.24-0.09-0.47-0.26-0.64-0.16-0.18-0.24-0.41-0.24-0.66 0-0.55 0.45-1 1-1h1.5c4.41 0 8-3.59 8-8 0-5.52-4.48-10-10-10zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5 0.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5 0.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5 0.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`;

let isInjectingPlaybar = false;

function mountPlaybarButtons(engineGetter) {
    if (isInjectingPlaybar) return;
    isInjectingPlaybar = true;

    try {
        const extraControls = document.querySelector(".main-nowPlayingBar-extraControls");
        if (!extraControls) {
            setTimeout(() => mountPlaybarButtons(engineGetter), 500);
            return;
        }

        // 1. Playbar Cat Button (Legacy)
        if (!document.getElementById("cosmic-cat-playbar-btn")) {
            const btn = document.createElement("button");
            btn.id = "cosmic-cat-playbar-btn";
            btn.className = "main-genericButton-button";
            btn.setAttribute("aria-label", "Visualiseur Chat");
            btn.innerHTML = CatSvg;

            btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const eng = engineGetter();
                if (eng) eng.toggleActive();
            });

            btn.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const eng = engineGetter();
                if (eng) eng.nextPalette();
            });

            btn.addEventListener("dblclick", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const eng = engineGetter();
                if (eng) eng.nextCat();
            });

            extraControls.insertBefore(btn, extraControls.firstChild);
        }

        // 2. Playbar Palette Button (Legacy)
        if (!document.getElementById("cosmic-cat-theme-btn")) {
            const themeBtn = document.createElement("button");
            themeBtn.id = "cosmic-cat-theme-btn";
            themeBtn.className = "main-genericButton-button";
            themeBtn.setAttribute("aria-label", "Changer le Thème");
            themeBtn.innerHTML = PaletteSvg;

            themeBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const eng = engineGetter();
                if (eng) eng.nextPalette();
            });

            themeBtn.addEventListener("contextmenu", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const eng = engineGetter();
                if (eng) eng.nextBackground();
            });

            const catBtn = document.getElementById("cosmic-cat-playbar-btn");
            if (catBtn && catBtn.nextSibling) {
                extraControls.insertBefore(themeBtn, catBtn.nextSibling);
            } else {
                extraControls.appendChild(themeBtn);
            }
        }
    } finally {
        isInjectingPlaybar = false;
    }
}

// Re-observe playbar safely
function initPlaybarObserver(engineGetter) {
    const playbar = document.querySelector(".Root__now-playing-bar, .main-nowPlayingBar-container");
    if (playbar) {
        const obs = new MutationObserver(() => {
            if (!document.getElementById("cosmic-cat-playbar-btn")) {
                mountPlaybarButtons(engineGetter);
            }
        });
        obs.observe(playbar, { childList: true, subtree: true });
    } else {
        setTimeout(() => initPlaybarObserver(engineGetter), 500);
    }
}
