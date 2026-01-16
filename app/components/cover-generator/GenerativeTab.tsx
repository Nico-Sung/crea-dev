import type { GenParams, PaletteKey } from "../../types/coverGenerator";
import { PALETTE_LABELS, PALETTES } from "../../constants/coverGenerator";

interface GenerativeTabProps {
    params: GenParams;
    imageOpacity: number;
    onParamsChange: (params: Partial<GenParams>) => void;
    onImageOpacityChange: (opacity: number) => void;
    onRegenerateLines: () => void;
}

export const GenerativeTab = ({
    params,
    imageOpacity,
    onParamsChange,
    onImageOpacityChange,
    onRegenerateLines,
}: GenerativeTabProps) => {
    const handleParamChange = (
        key: keyof GenParams,
        value: number | string
    ) => {
        onParamsChange({ [key]: value });
        if (key !== "glitchIntensity") {
            setTimeout(onRegenerateLines, 0);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block font-space-mono text-xs uppercase tracking-wider mb-3 text-[var(--text-muted)]">
                    Palette
                </label>
                <div className="grid grid-cols-4 gap-2">
                    {(Object.keys(PALETTES) as PaletteKey[]).map((key) => (
                        <button
                            key={key}
                            onClick={() => {
                                handleParamChange("palette", key);
                            }}
                            className={`h-12 border transition-all flex flex-col items-center justify-center gap-1 ${
                                params.palette === key
                                    ? "border-white ring-1 ring-white"
                                    : "border-white/20 hover:border-white/50"
                            }`}
                            style={{
                                background: PALETTES[key].bg,
                            }}
                        >
                            <span className="font-space-mono text-[9px] text-white/80 uppercase tracking-wider">
                                {PALETTE_LABELS[key]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-5 pt-4 border-t border-white/10">
                <SliderControl
                    label="Courbure"
                    value={params.curviness}
                    unit="%"
                    min={0}
                    max={100}
                    step={1}
                    onChange={(v) => handleParamChange("curviness", v)}
                />

                <SliderControl
                    label="Nb. Traits"
                    value={params.count}
                    min={3}
                    max={20}
                    step={1}
                    onChange={(v) => handleParamChange("count", v)}
                />

                <SliderControl
                    label="Épaisseur"
                    value={params.lineWidth}
                    unit="px"
                    min={5}
                    max={80}
                    step={5}
                    onChange={(v) => handleParamChange("lineWidth", v)}
                />

                <SliderControl
                    label="Glitch"
                    value={params.glitchIntensity}
                    unit="%"
                    min={0}
                    max={100}
                    step={5}
                    onChange={(v) => onParamsChange({ glitchIntensity: v })}
                />
            </div>

            <div className="pt-4 border-t border-white/10">
                <SliderControl
                    label="Opacité Image"
                    value={imageOpacity}
                    unit="%"
                    min={0}
                    max={100}
                    step={1}
                    onChange={onImageOpacityChange}
                />
            </div>
        </div>
    );
};

interface SliderControlProps {
    label: string;
    value: number;
    unit?: string;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}

const SliderControl = ({
    label,
    value,
    unit = "",
    min,
    max,
    step,
    onChange,
}: SliderControlProps) => {
    return (
        <div>
            <div className="flex justify-between mb-2">
                <label className="font-space-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    {label}
                </label>
                <span className="font-space-mono text-xs text-white/60">
                    {value}
                    {unit}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full slider-range"
            />
        </div>
    );
};
