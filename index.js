/**
 * Cosmic Cat Spicetify Custom App Route Handler
 * Clean foreground immersion toggle:
 * 1st click: Brings Cosmic Cat visualizer to Foreground (Premier Plan).
 * 2nd click / ESC / Screen click: Returns Cosmic Cat to Background (Arrière-Plan).
 */

(function CosmicCatCustomApp() {
    if (!Spicetify.React) {
        setTimeout(CosmicCatCustomApp, 100);
        return;
    }

    const { React: react, useEffect } = Spicetify;

    function CosmicCatApp() {
        useEffect(() => {
            // Bring Cosmic Cat to the absolute foreground
            document.body.classList.add("cosmic-foreground-active");

            const onKeyDown = (e) => {
                if (e.key === "Escape" || e.key === "v" || e.key === "V" || e.key === "b" || e.key === "B" || e.key === "f" || e.key === "F" || e.key === "F11") {
                    exitForeground();
                }
            };
            window.addEventListener("keydown", onKeyDown);

            return () => {
                document.body.classList.remove("cosmic-foreground-active");
                window.removeEventListener("keydown", onKeyDown);
            };
        }, []);

        const exitForeground = () => {
            document.body.classList.remove("cosmic-foreground-active");
            if (Spicetify.Platform && Spicetify.Platform.History) {
                if (Spicetify.Platform.History.entries?.length > 1) {
                    Spicetify.Platform.History.goBack();
                } else {
                    Spicetify.Platform.History.push("/");
                }
            }
        };

        // Fullscreen interactive surface: clicking anywhere returns immediately to background
        return react.createElement("div", {
            className: "cosmic-foreground-surface",
            onClick: exitForeground,
            title: "Cosmic Cat (Premier Plan) - Cliquez n'importe où pour repasser en arrière-plan"
        });
    }

    window.render = function () {
        return react.createElement(CosmicCatApp);
    };
})();
