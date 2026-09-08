/**
 * ColorPalettes.js
 * Harmonious, evolving cosmic palettes with smooth interpolation,
 * alpha helpers, and Spotify album art dynamic extraction.
 */

class ColorPalette {
    constructor() {
        this.themes = {
            aurora: {
                primary: [130, 45, 240],      // Electric Purple
                secondary: [20, 180, 220],   // Cyan Nebula
                accent: [0, 245, 210],       // Neon Teal / Aurora Green
                deepNebula: [15, 8, 35],     // Deep Space Violet
                starlight: [230, 245, 255]   // Starlight White
            },
            nebula: {
                primary: [235, 40, 150],     // Vibrant Magenta
                secondary: [140, 30, 230],   // Royal Purple
                accent: [255, 120, 210],     // Pink Plasma
                deepNebula: [25, 6, 30],     // Abyss Dark Wine
                starlight: [255, 235, 250]   // Soft Pearl
            },
            solar: {
                primary: [255, 95, 20],      // Solar Orange
                secondary: [240, 20, 90],    // Crimson Corona
                accent: [255, 210, 40],      // Gold Flare
                deepNebula: [30, 10, 5],     // Dark Ember
                starlight: [255, 250, 230]   // Warm White
            },
            cyber: {
                primary: [0, 160, 255],      // Cyber Blue
                secondary: [255, 0, 140],    // Laser Pink
                accent: [0, 255, 230],       // Neon Cyan
                deepNebula: [5, 10, 30],     // Deep Grid Abyss
                starlight: [220, 250, 255]   // Electric White
            },
            emerald: {
                primary: [10, 210, 140],     // Emerald Glow
                secondary: [30, 130, 230],   // Oceanic Blue
                accent: [120, 255, 170],     // Mint Sparkle
                deepNebula: [4, 25, 20],     // Deep Moss Abyss
                starlight: [230, 255, 245]   // Mint Starlight
            },
            twilight: {
                primary: [110, 70, 245],     // Mystic Violet
                secondary: [40, 100, 240],   // Cobalt Blue
                accent: [180, 140, 255],     // Luminous Lavender
                deepNebula: [12, 10, 28],    // Dark Midnight
                starlight: [240, 235, 255]   // Lavender Starlight
            }
        };

        this.currentThemeKey = "aurora";
        this.current = {
            primary: [130, 45, 240],
            secondary: [20, 180, 220],
            accent: [0, 245, 210],
            deepNebula: [15, 8, 35],
            starlight: [230, 245, 255]
        };

        this.target = {
            primary: [130, 45, 240],
            secondary: [20, 180, 220],
            accent: [0, 245, 210],
            deepNebula: [15, 8, 35],
            starlight: [230, 245, 255]
        };
        this.adaptiveActive = false;
    }

    setTheme(key, immediate = true) {
        const t = this.themes[key];
        if (t) {
            this.currentThemeKey = key;
            this.adaptiveActive = false;
            this.target.primary = [...t.primary];
            this.target.secondary = [...t.secondary];
            this.target.accent = [...t.accent];
            this.target.deepNebula = [...t.deepNebula];
            this.target.starlight = [...t.starlight];

            if (immediate) {
                this.current.primary = [...t.primary];
                this.current.secondary = [...t.secondary];
                this.current.accent = [...t.accent];
                this.current.deepNebula = [...t.deepNebula];
                this.current.starlight = [...t.starlight];
            }
        }
    }

    setAdaptiveFromColors(colors) {
        if (!colors) return;
        this.adaptiveActive = true;
        
        const hexToRgb = (hex) => {
            if (!hex) return null;
            hex = hex.replace("#", "");
            if (hex.length === 3) {
                hex = hex.split("").map(c => c + c).join("");
            }
            const num = parseInt(hex, 16);
            return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
        };

        const vibrant = hexToRgb(colors.VIBRANT) || hexToRgb(colors.PROMINENT) || [130, 45, 240];
        const lightVibrant = hexToRgb(colors.LIGHT_VIBRANT) || hexToRgb(colors.DESATURATED) || [0, 245, 210];
        const darkVibrant = hexToRgb(colors.DARK_VIBRANT) || [20, 180, 220];

        this.target.primary = vibrant;
        this.target.accent = lightVibrant;
        this.target.secondary = darkVibrant;
        this.target.deepNebula = [
            Math.floor(darkVibrant[0] * 0.15),
            Math.floor(darkVibrant[1] * 0.15),
            Math.floor(darkVibrant[2] * 0.15)
        ];
        this.target.starlight = [240, 245, 255];
    }

    update(dt) {
        // Smoothly interpolate RGB channels towards target
        const speed = Math.min(1.0, dt * 2.5);
        const keys = ["primary", "secondary", "accent", "deepNebula", "starlight"];

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const curr = this.current[key];
            const targ = this.target[key];
            curr[0] += (targ[0] - curr[0]) * speed;
            curr[1] += (targ[1] - curr[1]) * speed;
            curr[2] += (targ[2] - curr[2]) * speed;
        }
    }

    // Helper formatting
    get primary() {
        const c = this.current.primary;
        return `rgb(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0})`;
    }

    primaryAlpha(a) {
        const c = this.current.primary;
        return `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${Math.max(0, Math.min(1, a))})`;
    }

    get secondary() {
        const c = this.current.secondary;
        return `rgb(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0})`;
    }

    secondaryAlpha(a) {
        const c = this.current.secondary;
        return `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${Math.max(0, Math.min(1, a))})`;
    }

    get accent() {
        const c = this.current.accent;
        return `rgb(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0})`;
    }

    accentAlpha(a) {
        const c = this.current.accent;
        return `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${Math.max(0, Math.min(1, a))})`;
    }

    get deepNebula() {
        const c = this.current.deepNebula;
        return `rgb(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0})`;
    }

    deepNebulaAlpha(a) {
        const c = this.current.deepNebula;
        return `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${Math.max(0, Math.min(1, a))})`;
    }

    get starlight() {
        const c = this.current.starlight;
        return `rgb(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0})`;
    }

    starlightAlpha(a) {
        const c = this.current.starlight;
        return `rgba(${c[0] | 0}, ${c[1] | 0}, ${c[2] | 0}, ${Math.max(0, Math.min(1, a))})`;
    }
}

if (typeof module !== "undefined" && module.exports) {
    module.exports = ColorPalette;
}
