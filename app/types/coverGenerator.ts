export interface FlowLine {
    points: { x: number; y: number }[];
    color: string;
    lineWidth: number;
    speed: number;
    phase: number;
    edge: EdgeType;
}

export interface GenParams {
    count: number;
    lineWidth: number;
    palette: PaletteKey;
    curviness: number;
    glitchIntensity: number;
}

export type EdgeType = "top" | "bottom" | "left" | "right";

export type PaletteKey = "pnd" | "midnight" | "ember" | "gold";

export type FontKey = "font-montserrat" | "font-courier-prime" | "font-playfair";

export type BlendModeKey =
    | "lighten"
    | "screen"
    | "multiply"
    | "overlay"
    | "soft-light"
    | "hard-light";

export type TabType = "gen" | "content";

export interface Palette {
    bg: string;
    lines: string[];
}

export interface BlendMode {
    key: BlendModeKey;
    label: string;
}

export interface CoverGeneratorState {
    activeTab: TabType;
    params: GenParams;
    artistName: string;
    albumTitle: string;
    imageOpacity: number;
    noiseOpacity: number;
    globalBlur: number;
    blendMode: BlendModeKey;
    fontClass: FontKey;
    showAdvisory: boolean;
    userImage: string | null;
    toastMessage: string | null;
}
