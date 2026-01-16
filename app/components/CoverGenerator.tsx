"use client";

import { useMemo, useState } from "react";

const palettes = [
    {
        id: "night",
        name: "PND I",
        background:
            "linear-gradient(135deg, #050505 0%, #19172f 45%, #ff1265 100%)",
        accent: "#f6d8ff",
    },
    {
        id: "emerald",
        name: "PARTYMOBILE",
        background:
            "linear-gradient(120deg, #01090f 0%, #0c2c34 50%, #16ffd2 100%)",
        accent: "#c8fff4",
    },
    {
        id: "sunset",
        name: "COLOURS",
        background:
            "linear-gradient(140deg, #080403 0%, #2b0f0c 45%, #ff8a2f 100%)",
        accent: "#ffe0cc",
    },
] as const;

const figureShapes = ["halo", "bars", "diamond"] as const;
type FigureShape = (typeof figureShapes)[number];

const pndPresets = [
    {
        title: "SAVAGE ANTHEM",
        subtitle: "PARTYMOBILE LIVE CUT",
        paletteId: "night",
        shape: "bars" as FigureShape,
        grain: 26,
    },
    {
        title: "BREAK FROM TORONTO",
        subtitle: "LATE SESSION",
        paletteId: "emerald",
        shape: "halo" as FigureShape,
        grain: 18,
    },
    {
        title: "P3 TOUR",
        subtitle: "NEON RENDITION",
        paletteId: "sunset",
        shape: "diamond" as FigureShape,
        grain: 30,
    },
];

export default function CoverGenerator() {
    const [title, setTitle] = useState("CREATIVE DEVELOPMENT");
    const [subtitle, setSubtitle] = useState("PARTYNEXTDOOR");
    const [paletteId, setPaletteId] = useState<string>(palettes[0].id);
    const [shape, setShape] = useState<FigureShape>("halo");
    const [grain, setGrain] = useState(20);
    const [glow, setGlow] = useState(true);

    const palette = useMemo(
        () => palettes.find((option) => option.id === paletteId)!,
        [paletteId]
    );

    const applyPNDPreset = () => {
        const preset =
            pndPresets[Math.floor(Math.random() * pndPresets.length)];
        setTitle(preset.title);
        setSubtitle(preset.subtitle);
        setPaletteId(preset.paletteId);
        setShape(preset.shape);
        setGrain(preset.grain);
        setGlow(true);
    };

    return (
        <section
            className="relative w-full min-h-screen bg-[var(--bg-deep)] text-white py-24 overflow-hidden"
            id="cover-generator"
        >
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-950" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: "url('/hero.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "grayscale(1)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
                        backgroundSize: "60px 60px",
                    }}
                />
                <div 
                    className="absolute top-0 left-1/4 w-96 h-96 opacity-20 pointer-events-none"
                    style={{
                        background: "radial-gradient(circle, rgba(100,150,200,0.3) 0%, transparent 70%)",
                        filter: "blur(80px)",
                    }}
                />
                <div 
                    className="absolute bottom-0 right-1/4 w-96 h-96 opacity-15 pointer-events-none"
                    style={{
                        background: "radial-gradient(circle, rgba(150,100,200,0.2) 0%, transparent 70%)",
                        filter: "blur(100px)",
                    }}
                />
            </div>
            <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 space-y-12">
                <div className="text-center space-y-4">
                    <p className="text-xs uppercase tracking-[0.4em] text-white/60">
                        PARTYNEXTDOOR • simple cover generator
                    </p>
                    <h2 className="text-4xl font-syne">Forge a cover</h2>
                    <p className="text-white/70 text-base">
                        Minimal PARTYNEXTDOOR playground. Choisis un mood gradient, un motif qui rappelle ses visuels (halo, signal bars, diamond) et baptise ta cover avec les vibes du crew OVO.
                    </p>
                    <button
                        type="button"
                        onClick={applyPNDPreset}
                        className="px-6 py-2 rounded-full border border-white/30 text-xs uppercase tracking-[0.3em] text-white/80 hover:text-white hover:border-white transition"
                    >
                        PND mood preset
                    </button>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="flex justify-center">
                        <div className="relative aspect-[4/5] w-full max-w-sm rounded-[36px] overflow-hidden border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] bg-black">
                            <div className="absolute inset-0" style={{ background: palette.background }} />
                            {glow && (
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: "radial-gradient(circle at 40% 20%, rgba(255,255,255,0.15), transparent 60%)",
                                    }}
                                />
                            )}
                            <FigureOverlay shape={shape} />
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage:
                                        "url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.8\'/%3E%3C/svg%3E')",
                                    opacity: grain / 60,
                                }}
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-8 space-y-2">
                                <p className="text-xs uppercase tracking-[0.3em] text-white/60">
                                    2025 · PARTYNEXTDOOR
                                </p>
                                <h3 className="text-3xl font-syne leading-tight">
                                    {title}
                                </h3>
                                <p
                                    className="text-sm font-space-mono tracking-[0.3em]"
                                    style={{ color: palette.accent }}
                                >
                                    {subtitle}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6 space-y-6">
                        <div className="space-y-4">
                            <label className="block text-xs uppercase tracking-[0.3em] text-white/50">
                                Title
                                <input
                                    className="mt-2 w-full rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </label>
                            <label className="block text-xs uppercase tracking-[0.3em] text-white/50">
                                Subtitle
                                <input
                                    className="mt-2 w-full rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm"
                                    value={subtitle}
                                    onChange={(event) => setSubtitle(event.target.value)}
                                />
                            </label>
                        </div>

                        <label className="block text-xs uppercase tracking-[0.3em] text-white/50">
                            Palette
                            <select
                                className="mt-2 w-full rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm"
                                value={paletteId}
                                onChange={(event) => setPaletteId(event.target.value)}
                            >
                                {palettes.map((paletteOption) => (
                                    <option key={paletteOption.id} value={paletteOption.id}>
                                        {paletteOption.name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="block text-xs uppercase tracking-[0.3em] text-white/50">
                            Figure overlay
                            <div className="mt-3 flex gap-3">
                                {figureShapes.map((figure) => (
                                    <button
                                        type="button"
                                        key={figure}
                                        onClick={() => setShape(figure)}
                                        className={`flex-1 rounded-full border px-4 py-2 text-sm uppercase tracking-[0.2em] ${
                                            shape === figure
                                                ? "border-white bg-white text-black"
                                                : "border-white/20 text-white/70"
                                        }`}
                                    >
                                        {figure}
                                    </button>
                                ))}
                            </div>
                        </label>

                        <label className="block text-xs uppercase tracking-[0.3em] text-white/50">
                            Grain
                            <input
                                type="range"
                                min={0}
                                max={60}
                                value={grain}
                                onChange={(event) => setGrain(Number(event.target.value))}
                                className="mt-2 w-full"
                            />
                        </label>

                        <label className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
                            <input
                                type="checkbox"
                                checked={glow}
                                onChange={(event) => setGlow(event.target.checked)}
                                className="w-4 h-4 accent-white/80"
                            />
                            Radial glow
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
}

interface FigureOverlayProps {
    shape: FigureShape;
}

function FigureOverlay({ shape }: FigureOverlayProps) {
    if (shape === "bars") {
        return (
            <div className="absolute inset-8 flex flex-col justify-between opacity-60">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className="h-1 rounded-full bg-white/40"
                        style={{ opacity: 1 - index * 0.2 }}
                    />
                ))}
            </div>
        );
    }

    if (shape === "diamond") {
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <div
                    className="w-40 h-40 border border-white/30"
                    style={{ transform: "rotate(45deg)", opacity: 0.7 }}
                />
            </div>
        );
    }

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border border-white/35" />
            <div className="absolute w-28 h-28 rounded-full bg-white/15" />
        </div>
    );
}
