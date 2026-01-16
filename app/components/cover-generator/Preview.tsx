import type { BlendModeKey, FontKey } from "../../types/coverGenerator";

interface PreviewProps {
    captureRef: React.RefObject<HTMLDivElement | null>;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    globalBlur: number;
    userImage: string | null;
    imageOpacity: number;
    blendMode: BlendModeKey;
    noiseOpacity: number;
    fontClass: FontKey;
    artistName: string;
    albumTitle: string;
}

export const Preview = ({
    captureRef,
    canvasRef,
    globalBlur,
    userImage,
    imageOpacity,
    blendMode,
    noiseOpacity,
    fontClass,
    artistName,
    albumTitle,
}: PreviewProps) => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center">
            <div
                ref={captureRef}
                className="relative w-full max-w-[550px] aspect-square bg-[var(--bg-deep)] overflow-hidden select-none"
                style={{
                    boxShadow:
                        "0 25px 100px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)",
                }}
            >
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        filter: `blur(${globalBlur}px)`,
                    }}
                />

                {userImage && (
                    <img
                        src={userImage}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-300 grayscale"
                        style={{
                            opacity: imageOpacity / 100,
                            filter: `blur(${globalBlur}px) grayscale(100%) contrast(120%) brightness(75%)`,
                            mixBlendMode: blendMode,
                        }}
                    />
                )}

                <div
                    className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay transition-opacity"
                    style={{
                        opacity: noiseOpacity / 100,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center pointer-events-none z-30 mix-blend-difference">
                    <h2
                        className={`text-white/90 tracking-[0.4em] text-sm uppercase mb-4 font-bold ${fontClass}`}
                    >
                        {artistName || "PARTYNEXTDOOR"}
                    </h2>
                    <h1
                        className={`text-white tracking-[0.15em] text-5xl lg:text-7xl uppercase leading-none font-black ${fontClass}`}
                        style={{ filter: "blur(0.5px)" }}
                    >
                        {albumTitle || "LIQUID"}
                    </h1>
                </div>
            </div>
        </div>
    );
};
