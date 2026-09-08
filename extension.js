/**
 * Cosmic Cat Spicetify Live Background & Foreground Extension
 * Runs the cosmic cat visualizer dynamically in the background of Spotify,
 * and allows clean 1-click toggle to foreground (premier plan) and back to background,
 * with visual color theme switcher and playbar controls.
 */

(function CosmicCatBackgroundExtension() {
    if (!Spicetify.Player || !Spicetify.Mousetrap) {
        setTimeout(CosmicCatBackgroundExtension, 250);
        return;
    }

    // 1. Inject Stylesheet if not present
    if (!document.getElementById("cosmic-cat-styles")) {
        const styleLink = document.createElement("link");
        styleLink.id = "cosmic-cat-styles";
        styleLink.rel = "stylesheet";
        styleLink.href = "/custom-apps/cat-visualizer/style.css";
        document.head.appendChild(styleLink);
    }

    // 2. Theme definitions
    const themeDefs = [
        { key: "aurora", name: "Aurora", icon: "🌌", color: "#00f5d4" },
        { key: "nebula", name: "Nebula", icon: "🔮", color: "#ff78d2" },
        { key: "solar", name: "Solar", icon: "🔥", color: "#ffd228" },
        { key: "cyber", name: "Cyber", icon: "⚡", color: "#00ffe6" },
        { key: "emerald", name: "Emerald", icon: "🌿", color: "#78ffaa" },
        { key: "twilight", name: "Twilight", icon: "💜", color: "#b48cff" }
    ];

    const savedTheme = localStorage.getItem("cosmic-cat-theme") || "aurora";
    let currentThemeIdx = themeDefs.findIndex(t => t.key === savedTheme);
    if (currentThemeIdx === -1) currentThemeIdx = 0;
    
    // Check saved state (defaults to true if first run)
    let isEnabled = localStorage.getItem("cosmic-cat-bg-enabled") !== "false";
    let isForeground = false;

    // 3. Create or reuse persistent canvas
    let bgCanvas = document.getElementById("cosmic-cat-bg-canvas");
    if (!bgCanvas) {
        bgCanvas = document.createElement("canvas");
        bgCanvas.id = "cosmic-cat-bg-canvas";
        const main = document.getElementById("main");
        if (main && main.parentNode) {
            main.parentNode.insertBefore(bgCanvas, main);
        } else {
            document.body.prepend(bgCanvas);
        }
    }
    bgCanvas.style.display = isEnabled ? "block" : "none";
    if (isEnabled) bgCanvas.classList.add("active");

    // 4. Visualizer Engine
    let engine = null;

    const getOrInitEngine = () => {
        if (!engine && typeof VisualizerEngine !== "undefined") {
            try {
                engine = new VisualizerEngine(bgCanvas, {
                    theme: themeDefs[currentThemeIdx].key,
                    sensitivity: 1.1,
                    shockwavePower: 1.2,
                    adaptiveColors: false
                });
                window.cosmicCatEngine = engine;
            } catch (err) {
                console.error("Failed to initialize Cosmic Cat VisualizerEngine:", err);
            }
        }
        return engine;
    };

    if (isEnabled) {
        const initialEngine = getOrInitEngine();
        if (initialEngine) {
            initialEngine.start();
        }
    }

    // 5. State Sync with Spotify Player
    let lastTrackUri = null;
    let cachedColors = null;

    const updateSpotifyState = async () => {
        if (!isEnabled || !Spicetify.Player) return;
        const eng = getOrInitEngine();
        if (!eng) return;

        const uri = Spicetify.Player.data?.item?.uri;
        const progress = Spicetify.Player.getProgress?.() || 0;
        const isPlaying = Spicetify.Player.isPlaying?.() ?? true;
        const volume = Spicetify.Player.getVolume?.() ?? 1.0;

        eng.updateSpotifyState(uri, progress, isPlaying, volume);

        if (uri && uri !== lastTrackUri) {
            lastTrackUri = uri;
            if (Spicetify.colorExtractor) {
                try {
                    cachedColors = await Spicetify.colorExtractor(uri);
                    if (cachedColors && eng) {
                        eng.updateTrackColors(cachedColors);
                    }
                } catch (e) {}
            }
        }
    };

    Spicetify.Player.addEventListener("songchange", () => {
        if (isEnabled) updateSpotifyState();
    });
    Spicetify.Player.addEventListener("onplaypause", () => {
        if (isEnabled) updateSpotifyState();
    });
    if (Spicetify.Player.addEventListener) {
        try {
            Spicetify.Player.addEventListener("onprogress", () => {
                if (isEnabled && !document.hidden) updateSpotifyState();
            });
        } catch (e) {}
    }

    setInterval(() => {
        if (isEnabled && !document.hidden) updateSpotifyState();
    }, 500);

    window.addEventListener("resize", () => {
        if (isEnabled && engine) engine.resize();
    });

    const CatSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C9.5 2 7.4 3.8 7 6.2 4.6 7.8 3 10.7 3 14c0 5 4 9 9 9s9-4 9-9c0-3.3-1.6-6.2-4-7.8C16.6 3.8 14.5 2 12 2zm-3.2 1.8l1.6 2.4c-.6.4-1.1.9-1.4 1.5L6.5 6.6l2.3-2.8zm6.4 0l2.3 2.8-2.5 1.1c-.3-.6-.8-1.1-1.4-1.5l1.6-2.4z"/></svg>`;
    const PaletteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.41 3.59 8 8 8 0.55 0 1-0.45 1-1 0-0.24-0.09-0.47-0.26-0.64-0.16-0.18-0.24-0.41-0.24-0.66 0-0.55 0.45-1 1-1h1.5c4.41 0 8-3.59 8-8 0-5.52-4.48-10-10-10zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 8 6.5 8 8 8.67 8 9.5 7.33 11 6.5 11zm3-4C8.67 7 8 6.33 8 5.5S8.67 4 9.5 4s1.5 0.67 1.5 1.5S10.33 7 9.5 7zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 4 14.5 4s1.5 0.67 1.5 1.5S15.33 7 14.5 7zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 8 17.5 8s1.5 0.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`;

    // 6. Floating Theme Selector HUD
    let hudElement = null;
    const initOrUpdateThemeHud = () => {
        if (!document.body) return;
        const curTheme = themeDefs[currentThemeIdx];

        if (!hudElement) {
            hudElement = document.createElement("div");
            hudElement.id = "cosmic-cat-theme-hud";

            let swatchesHtml = "";
            for (let i = 0; i < themeDefs.length; i++) {
                const t = themeDefs[i];
                const isActive = i === currentThemeIdx;
                swatchesHtml += `<button type="button" class="theme-swatch ${isActive ? 'active' : ''}" data-theme="${t.key}" style="background-color: ${t.color}; color: ${t.color};" title="${t.icon} ${t.name}"></button>`;
            }

            hudElement.innerHTML = `
                <div class="hud-title" title="Cliquez pour changer de couleur (Raccourci: T ou C)">
                    <span class="hud-icon">${curTheme.icon}</span>
                    <span class="hud-name">${curTheme.name}</span>
                </div>
                <div class="hud-swatches">
                    ${swatchesHtml}
                </div>
            `;

            hudElement.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const swatch = e.target.closest(".theme-swatch");
                if (swatch) {
                    const themeKey = swatch.getAttribute("data-theme");
                    if (themeKey) setTheme(themeKey);
                    return;
                }
                cycleTheme();
            });

            document.body.appendChild(hudElement);
        } else {
            const iconEl = hudElement.querySelector(".hud-icon");
            const nameEl = hudElement.querySelector(".hud-name");
            if (iconEl) iconEl.textContent = curTheme.icon;
            if (nameEl) nameEl.textContent = curTheme.name;

            const swatches = hudElement.querySelectorAll(".theme-swatch");
            swatches.forEach(sw => {
                const key = sw.getAttribute("data-theme");
                if (key === curTheme.key) {
                    sw.classList.add("active");
                } else {
                    sw.classList.remove("active");
                }
            });
        }

        hudElement.style.display = isEnabled ? "flex" : "none";
    };

    const updateBtnAppearance = () => {
        const curTheme = themeDefs[currentThemeIdx];
        const btn = document.getElementById("cosmic-cat-playbar-btn");
        if (btn) {
            if (isEnabled) {
                btn.classList.add("active");
                btn.style.color = curTheme.color;
                btn.title = `Cosmic Cat : ACTIF (Clic: Désactiver | Clic-droit: Thème [${curTheme.name}] | Double-clic: Premier plan)`;
            } else {
                btn.classList.remove("active");
                btn.style.color = "var(--spice-subtext, rgba(255,255,255,0.6))";
                btn.title = "Cosmic Cat : INACTIF (Clic pour Activer)";
            }
        }

        const themeBtn = document.getElementById("cosmic-cat-theme-btn");
        if (themeBtn) {
            themeBtn.style.color = curTheme.color;
            themeBtn.title = `Thème Cosmique : ${curTheme.name} (Clic: Changer de couleur | Raccourci: T ou C)`;
        }

        initOrUpdateThemeHud();
    };

    function setTheme(themeKey) {
        const idx = themeDefs.findIndex(t => t.key === themeKey);
        if (idx !== -1) {
            currentThemeIdx = idx;
        }
        const curTheme = themeDefs[currentThemeIdx];
        localStorage.setItem("cosmic-cat-theme", curTheme.key);

        const eng = getOrInitEngine() || window.cosmicCatEngine;
        if (eng) {
            if (eng.setTheme) {
                eng.setTheme(curTheme.key, true);
            } else if (eng.palette) {
                eng.palette.setTheme(curTheme.key, true);
            }
        }

        updateBtnAppearance();
    }

    function cycleTheme() {
        currentThemeIdx = (currentThemeIdx + 1) % themeDefs.length;
        setTheme(themeDefs[currentThemeIdx].key);
    }

    function toggleBackground() {
        isEnabled = !isEnabled;
        localStorage.setItem("cosmic-cat-bg-enabled", isEnabled ? "true" : "false");

        if (bgCanvas) {
            if (isEnabled) {
                bgCanvas.classList.add("active");
                bgCanvas.style.display = "block";
            } else {
                bgCanvas.classList.remove("active");
                bgCanvas.style.display = "none";
                if (isForeground) {
                    toggleForeground();
                }
            }
        }
        
        if (isEnabled) {
            const eng = getOrInitEngine();
            if (eng) {
                eng.start();
                updateSpotifyState();
            }
        } else {
            if (engine) engine.stop();
        }

        updateBtnAppearance();
        Spicetify.showNotification?.(isEnabled ? "Cosmic Cat Visualizer : ACTIVÉ ✨" : "Cosmic Cat Visualizer : DÉSACTIVÉ ⏸️");
    }

    function toggleForeground() {
        isForeground = !isForeground;
        if (isForeground) {
            if (!isEnabled) {
                isEnabled = true;
                localStorage.setItem("cosmic-cat-bg-enabled", "true");
                if (bgCanvas) {
                    bgCanvas.classList.add("active");
                    bgCanvas.style.display = "block";
                }
                const eng = getOrInitEngine();
                if (eng) {
                    eng.start();
                    updateSpotifyState();
                }
                updateBtnAppearance();
            }
            document.body.classList.add("cosmic-foreground-active");
            if (bgCanvas) {
                bgCanvas.classList.add("foreground");
            }
            Spicetify.showNotification?.("Cosmic Cat : Premier Plan ✨ (Clic n'importe où pour revenir en arrière-plan)");
        } else {
            document.body.classList.remove("cosmic-foreground-active");
            if (bgCanvas) {
                bgCanvas.classList.remove("foreground");
            }
            Spicetify.showNotification?.("Cosmic Cat : Arrière-Plan 🌌");
        }
    }

    // 7. Click on Canvas when in Foreground exits immediately to Background
    bgCanvas.addEventListener("click", (e) => {
        if (isForeground || document.body.classList.contains("cosmic-foreground-active")) {
            e.preventDefault();
            e.stopPropagation();
            toggleForeground();
        }
    });

    // 8. Intercept clicks on the top-left Cosmic Cat sidebar button / custom app link
    function isCosmicCatSidebarButton(el) {
        if (!el) return false;
        if (el.closest("#cosmic-cat-playbar-btn") || el.closest("#cosmic-cat-theme-btn") || el.closest("#cosmic-cat-theme-hud")) return false;

        const buttonOrLink = el.closest('a, button, [role="button"], [role="link"], li');
        if (!buttonOrLink) return false;

        const href = buttonOrLink.getAttribute("href") || buttonOrLink.querySelector("a")?.getAttribute("href") || "";
        if (href.includes("cat-visualizer")) return true;

        const label = (buttonOrLink.getAttribute("aria-label") || "").toLowerCase();
        const title = (buttonOrLink.getAttribute("title") || "").toLowerCase();
        const testid = (buttonOrLink.getAttribute("data-testid") || "").toLowerCase();

        if (label.includes("cosmic cat") || title.includes("cosmic cat") || testid.includes("cat-visualizer")) {
            return true;
        }

        const text = (buttonOrLink.innerText || buttonOrLink.textContent || "").trim().toLowerCase();
        if (text === "cosmic cat" || text.startsWith("cosmic cat")) {
            return true;
        }

        return false;
    }

    document.addEventListener("click", (e) => {
        if (isCosmicCatSidebarButton(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            toggleForeground();
        }
    }, true);

    // 9. Safe Playbar Buttons Injection (No recursion loops)
    let isInjecting = false;
    const injectPlaybarButtons = () => {
        if (isInjecting) return;
        isInjecting = true;
        try {
            const extraControls = document.querySelector(".main-nowPlayingBar-extraControls");
            if (!extraControls) return;

            let updated = false;

            if (!document.getElementById("cosmic-cat-playbar-btn")) {
                const btn = document.createElement("button");
                btn.id = "cosmic-cat-playbar-btn";
                btn.className = "main-genericButton-button";
                btn.setAttribute("aria-label", "Cosmic Cat Visualizer");
                btn.innerHTML = CatSvg;
                
                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleBackground();
                });

                btn.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cycleTheme();
                });

                btn.addEventListener("dblclick", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleForeground();
                });

                extraControls.insertBefore(btn, extraControls.firstChild);
                updated = true;
            }

            if (!document.getElementById("cosmic-cat-theme-btn")) {
                const themeBtn = document.createElement("button");
                themeBtn.id = "cosmic-cat-theme-btn";
                themeBtn.className = "main-genericButton-button";
                themeBtn.setAttribute("aria-label", "Changer le Thème de Couleur");
                themeBtn.innerHTML = PaletteSvg;

                themeBtn.addEventListener("click", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cycleTheme();
                });

                themeBtn.addEventListener("contextmenu", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cycleTheme();
                });

                const catBtn = document.getElementById("cosmic-cat-playbar-btn");
                if (catBtn && catBtn.nextSibling) {
                    extraControls.insertBefore(themeBtn, catBtn.nextSibling);
                } else {
                    extraControls.appendChild(themeBtn);
                }
                updated = true;
            }

            if (updated) {
                updateBtnAppearance();
            }
        } finally {
            isInjecting = false;
        }
    };

    // Safe, targeted MutationObserver on playbar container only
    const initObserver = () => {
        const playbar = document.querySelector(".Root__now-playing-bar, .main-nowPlayingBar-container");
        if (playbar) {
            const obs = new MutationObserver(() => {
                if (!document.getElementById("cosmic-cat-playbar-btn")) {
                    injectPlaybarButtons();
                }
            });
            obs.observe(playbar, { childList: true, subtree: true });
        } else {
            setTimeout(initObserver, 500);
        }
    };

    injectPlaybarButtons();
    initObserver();
    initOrUpdateThemeHud();

    // Keyboard Shortcuts: B (Toggle background), T / C (Cycle theme), ESC / V (Toggle foreground)
    Spicetify.Mousetrap.bind("b", toggleBackground);
    Spicetify.Mousetrap.bind("t", cycleTheme);
    Spicetify.Mousetrap.bind("c", cycleTheme);
    Spicetify.Mousetrap.bind("v", toggleForeground);
    Spicetify.Mousetrap.bind("esc", () => {
        if (isForeground) toggleForeground();
    });

    if (Spicetify.Menu && Spicetify.Menu.Item) {
        try {
            new Spicetify.Menu.Item("Cosmic Cat : Thème Suivant (T/C)", false, () => {
                cycleTheme();
            }).register();
        } catch (e) {}
    }
})();
