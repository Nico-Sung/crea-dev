import type { BlendMode, GenParams, Palette, PaletteKey } from "../types/coverGenerator";

export const PALETTES: Record<PaletteKey, Palette> = {
    pnd: {
        bg: "#1a1a2e",
        lines: ["#e8b4b8", "#f5d0c5", "#d4a5a5", "#f0e6d3"],
    },
    midnight: {
        bg: "#0a192f",
        lines: ["#64ffda", "#8892b0", "#ccd6f6", "#a8b2d1"],
    },
    ember: {
        bg: "#1a0505",
        lines: ["#ff6b6b", "#ffa07a", "#ff4757", "#ff7f50"],
    },
    gold: {
        bg: "#0f0f0f",
        lines: ["#ffd700", "#daa520", "#f0e68c", "#ffb347"],
    },
};

export const PALETTE_LABELS: Record<PaletteKey, string> = {
    pnd: "P3",
    midnight: "Nuit",
    ember: "Braise",
    gold: "Or",
};

export const BLEND_MODES: BlendMode[] = [
    { key: "lighten", label: "Lumière" },
    { key: "screen", label: "Écran" },
    { key: "multiply", label: "Produit" },
    { key: "overlay", label: "Incrust." },
    { key: "soft-light", label: "Lum. Douce" },
    { key: "hard-light", label: "Lum. Crue" },
];

export const DEFAULT_PARAMS: GenParams = {
    count: 3,
    lineWidth: 5,
    palette: "pnd",
    curviness: 60,
    glitchIntensity: 50,
};

export const CANVAS_CONFIG = {
    width: 1000,
    height: 1000,
    exportSize: 3000,
} as const;

export const FONT_CONFIG = {
    "font-montserrat": "Montserrat",
    "font-courier-prime": "Courier Prime",
    "font-playfair": "Playfair Display",
} as const;
