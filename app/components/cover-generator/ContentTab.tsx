import type { BlendModeKey, FontKey } from "../../types/coverGenerator";
import { BLEND_MODES } from "../../constants/coverGenerator";

interface ContentTabProps {
    artistName: string;
    albumTitle: string;
    blendMode: BlendModeKey;
    fontClass: FontKey;
    showAdvisory: boolean;
    noiseOpacity: number;
    globalBlur: number;
    onArtistNameChange: (name: string) => void;
    onAlbumTitleChange: (title: string) => void;
    onBlendModeChange: (mode: BlendModeKey) => void;
    onFontClassChange: (font: FontKey) => void;
    onShowAdvisoryChange: (show: boolean) => void;
    onNoiseOpacityChange: (opacity: number) => void;
    onGlobalBlurChange: (blur: number) => void;
    onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContentTab = ({
    artistName,
    albumTitle,
    blendMode,
    fontClass,
    showAdvisory,
    noiseOpacity,
    globalBlur,
    onArtistNameChange,
    onAlbumTitleChange,
    onBlendModeChange,
    onFontClassChange,
    onShowAdvisoryChange,
    onNoiseOpacityChange,
    onGlobalBlurChange,
    onImageUpload,
}: ContentTabProps) => {
    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <label className="block font-space-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Textes
                </label>
                <input
                    type="text"
                    value={artistName}
                    onChange={(e) => onArtistNameChange(e.target.value)}
                    placeholder="ARTISTE"
                    className="w-full font-dm bg-[var(--accent-haze)]/50 border border-white/10 px-4 py-3 text-sm uppercase tracking-widest focus:border-white outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
                <input
                    type="text"
                    value={albumTitle}
                    onChange={(e) => onAlbumTitleChange(e.target.value)}
                    placeholder="ALBUM"
                    className="w-full font-dm bg-[var(--accent-haze)]/50 border border-white/10 px-4 py-3 text-sm uppercase tracking-widest focus:border-white outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
            </div>

            <div>
                <label className="block font-space-mono text-xs uppercase tracking-wider mb-3 text-[var(--text-muted)]">
                    Image de fond
                </label>
                <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={onImageUpload}
                />
                <label
                    htmlFor="imageUpload"
                    className="flex items-center justify-center w-full py-4 border border-dashed border-white/20 hover:border-white/50 cursor-pointer transition-colors bg-[var(--accent-haze)]/30 font-space-mono text-xs tracking-widest text-[var(--text-muted)] hover:text-white"
                >
                    UPLOAD IMAGE
                </label>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
                <label className="block font-space-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Double Exposition
                </label>
                <div className="grid grid-cols-3 gap-2">
                    {BLEND_MODES.map((mode) => (
                        <button
                            key={mode.key}
                            onClick={() => onBlendModeChange(mode.key)}
                            className={`py-2 border font-space-mono text-[10px] uppercase transition-colors ${
                                blendMode === mode.key
                                    ? "bg-white text-[var(--bg-deep)] border-white"
                                    : "border-white/20 text-[var(--text-muted)] hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {mode.label}
                        </button>
                    ))}
                </div>
                <p className="font-dm text-[10px] text-[var(--text-muted)]/60 leading-relaxed">
                    Change la façon dont l&apos;image se mélange avec l&apos;art
                    génératif.
                </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
                <label className="block font-space-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Style Texte
                </label>
                <div className="grid grid-cols-3 gap-2">
                    <FontButton
                        label="Clean"
                        fontKey="font-montserrat"
                        currentFont={fontClass}
                        onClick={onFontClassChange}
                    />
                    <FontButton
                        label="Raw"
                        fontKey="font-courier-prime"
                        currentFont={fontClass}
                        onClick={onFontClassChange}
                    />
                    <FontButton
                        label="Serif"
                        fontKey="font-playfair"
                        currentFont={fontClass}
                        onClick={onFontClassChange}
                    />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <label className="font-space-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                        Parental Advisory
                    </label>
                    <button
                        onClick={() => onShowAdvisoryChange(!showAdvisory)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${
                            showAdvisory ? "bg-white" : "bg-white/20"
                        }`}
                    >
                        <div
                            className={`w-3 h-3 rounded-full absolute top-1 transition-all ${
                                showAdvisory
                                    ? "left-6 bg-[var(--bg-deep)]"
                                    : "left-1 bg-white"
                            }`}
                        />
                    </button>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
                <label className="block font-space-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
                    Effets
                </label>
                <SliderControl
                    label="Grain"
                    value={noiseOpacity}
                    unit="%"
                    min={0}
                    max={100}
                    onChange={onNoiseOpacityChange}
                />
                <SliderControl
                    label="Flou"
                    value={globalBlur}
                    unit="px"
                    min={0}
                    max={10}
                    step={0.5}
                    onChange={onGlobalBlurChange}
                />
            </div>
        </div>
    );
};

interface FontButtonProps {
    label: string;
    fontKey: FontKey;
    currentFont: FontKey;
    onClick: (font: FontKey) => void;
}

const FontButton = ({
    label,
    fontKey,
    currentFont,
    onClick,
}: FontButtonProps) => {
    const isActive = currentFont === fontKey;
    return (
        <button
            onClick={() => onClick(fontKey)}
            className={`py-2.5 border ${fontKey} text-xs uppercase transition-colors ${
                isActive
                    ? "bg-white text-[var(--bg-deep)] border-white"
                    : "border-white/20 text-[var(--text-muted)] hover:bg-white hover:text-[var(--bg-deep)]"
            }`}
        >
            {label}
        </button>
    );
};

interface SliderControlProps {
    label: string;
    value: number;
    unit?: string;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
}

const SliderControl = ({
    label,
    value,
    unit = "",
    min,
    max,
    step = 1,
    onChange,
}: SliderControlProps) => {
    return (
        <div>
            <div className="flex justify-between mb-2">
                <span className="font-space-mono text-xs text-[var(--text-muted)]">
                    {label}
                </span>
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
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full slider-range"
            />
        </div>
    );
};
