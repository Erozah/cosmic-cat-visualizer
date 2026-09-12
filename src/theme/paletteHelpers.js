// src/theme/paletteHelpers.js - Dynamic color alpha decorators for palettes

function decoratePalette(raw) {
    const rgb = raw.rgb || {
        primary: [0, 240, 255],
        accent: [255, 0, 127],
        secondary: [157, 78, 221],
        deepNebula: [12, 6, 28],
        starlight: [255, 255, 255]
    };

    const p = { ...raw };
    const clampAlpha = (a) => Math.max(0, Math.min(1, a));

    p.primaryAlpha = (a) => `rgba(${rgb.primary[0]}, ${rgb.primary[1]}, ${rgb.primary[2]}, ${clampAlpha(a)})`;
    p.accentAlpha = (a) => `rgba(${rgb.accent[0]}, ${rgb.accent[1]}, ${rgb.accent[2]}, ${clampAlpha(a)})`;
    p.secondaryAlpha = (a) => `rgba(${rgb.secondary[0]}, ${rgb.secondary[1]}, ${rgb.secondary[2]}, ${clampAlpha(a)})`;
    p.deepNebulaAlpha = (a) => `rgba(${rgb.deepNebula[0]}, ${rgb.deepNebula[1]}, ${rgb.deepNebula[2]}, ${clampAlpha(a)})`;
    p.starlightAlpha = (a) => `rgba(${rgb.starlight[0]}, ${rgb.starlight[1]}, ${rgb.starlight[2]}, ${clampAlpha(a)})`;

    return p;
}
