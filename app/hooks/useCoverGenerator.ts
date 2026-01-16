"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
    BlendModeKey,
    FlowLine,
    FontKey,
    GenParams,
    PaletteKey,
    TabType,
} from "../types/coverGenerator";
import {
    CANVAS_CONFIG,
    DEFAULT_PARAMS,
    FONT_CONFIG,
    PALETTES,
} from "../constants/coverGenerator";
import {
    createFlowLines,
    drawBackground,
    drawFlowLines,
    drawGlobalGlitchEffects,
} from "../utils/canvasDrawing";

export interface UseCoverGeneratorReturn {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    captureRef: React.RefObject<HTMLDivElement | null>;
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
    setActiveTab: (tab: TabType) => void;
    setParams: React.Dispatch<React.SetStateAction<GenParams>>;
    setArtistName: (name: string) => void;
    setAlbumTitle: (title: string) => void;
    setImageOpacity: (opacity: number) => void;
    setNoiseOpacity: (opacity: number) => void;
    setGlobalBlur: (blur: number) => void;
    setBlendMode: (mode: BlendModeKey) => void;
    setFontClass: (font: FontKey) => void;
    setShowAdvisory: (show: boolean) => void;
    setUserImage: (image: string | null) => void;
    randomize: () => void;
    handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    downloadCover: () => Promise<void>;
    showToast: (message: string) => void;
    regenerateLines: () => void;
}

export const useCoverGenerator = (): UseCoverGeneratorReturn => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const captureRef = useRef<HTMLDivElement | null>(null);
    const animationRef = useRef<number | null>(null);
    const flowLinesRef = useRef<FlowLine[]>([]);

    const [activeTab, setActiveTab] = useState<TabType>("gen");
    const [params, setParams] = useState<GenParams>(DEFAULT_PARAMS);
    const [artistName, setArtistName] = useState("PARTYNEXTDOOR");
    const [albumTitle, setAlbumTitle] = useState("LIQUID");
    const [imageOpacity, setImageOpacity] = useState(30);
    const [noiseOpacity, setNoiseOpacity] = useState(30);
    const [globalBlur, setGlobalBlur] = useState(0);
    const [blendMode, setBlendMode] = useState<BlendModeKey>("lighten");
    const [fontClass, setFontClass] = useState<FontKey>("font-montserrat");
    const [showAdvisory, setShowAdvisory] = useState(false);
    const [userImage, setUserImage] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = useCallback((msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    }, []);

    const regenerateLines = useCallback(() => {
        flowLinesRef.current = createFlowLines(
            params.count,
            params.palette as PaletteKey,
            params.curviness,
            params.lineWidth
        );
    }, [params.count, params.palette, params.curviness, params.lineWidth]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        drawBackground(
            ctx,
            params.palette as PaletteKey,
            params.glitchIntensity
        );
        drawFlowLines(
            ctx,
            flowLinesRef.current,
            params.glitchIntensity,
            Date.now() * 0.001
        );
        drawGlobalGlitchEffects(
            ctx,
            params.palette as PaletteKey,
            params.glitchIntensity
        );
    }, [params.palette, params.glitchIntensity]);

    const animate = useCallback(() => {
        draw();
        animationRef.current = requestAnimationFrame(animate);
    }, [draw]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = CANVAS_CONFIG.width;
            canvas.height = CANVAS_CONFIG.height;
        }
        regenerateLines();
        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animate, regenerateLines]);

    const randomize = useCallback(() => {
        regenerateLines();
    }, [regenerateLines]);

    const handleImageUpload = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setUserImage(event.target?.result as string);
                    if (imageOpacity === 0) {
                        setImageOpacity(50);
                    }
                };
                reader.readAsDataURL(file);
            }
        },
        [imageOpacity]
    );

    const downloadCover = useCallback(async () => {
        if (!captureRef.current || !canvasRef.current) return;

        showToast("Calcul du rendu...");
        await new Promise((r) => setTimeout(r, 300));

        try {
            const finalCanvas = document.createElement("canvas");
            const size = CANVAS_CONFIG.exportSize;
            finalCanvas.width = size;
            finalCanvas.height = size;
            const ctx = finalCanvas.getContext("2d", {
                willReadFrequently: true,
            });

            if (!ctx) {
                showToast("Erreur: Impossible de créer le canvas");
                return;
            }

            ctx.drawImage(canvasRef.current, 0, 0, size, size);

            if (userImage) {
                const img = new Image();
                img.crossOrigin = "anonymous";
                await new Promise<void>((resolve, reject) => {
                    img.onload = () => resolve();
                    img.onerror = () => reject();
                    img.src = userImage;
                });

                ctx.globalCompositeOperation = blendMode;
                ctx.globalAlpha = imageOpacity / 100;
                ctx.filter = `grayscale(100%) contrast(120%) brightness(75%)`;
                ctx.drawImage(img, 0, 0, size, size);
                ctx.globalCompositeOperation = "source-over";
                ctx.globalAlpha = 1;
                ctx.filter = "none";
            }

            if (noiseOpacity > 0) {
                ctx.globalAlpha = noiseOpacity / 100;
                const noiseCanvas = document.createElement("canvas");
                noiseCanvas.width = size;
                noiseCanvas.height = size;
                const noiseCtx = noiseCanvas.getContext("2d");
                if (noiseCtx) {
                    const imageData = noiseCtx.createImageData(size, size);
                    for (let i = 0; i < imageData.data.length; i += 4) {
                        const val = Math.random() * 255;
                        imageData.data[i] = val;
                        imageData.data[i + 1] = val;
                        imageData.data[i + 2] = val;
                        imageData.data[i + 3] = 30;
                    }
                    noiseCtx.putImageData(imageData, 0, 0);
                    ctx.globalCompositeOperation = "overlay";
                    ctx.drawImage(noiseCanvas, 0, 0);
                    ctx.globalCompositeOperation = "source-over";
                }
                ctx.globalAlpha = 1;
            }

            const gradient = ctx.createRadialGradient(
                size / 2,
                size / 2,
                0,
                size / 2,
                size / 2,
                size * 0.7
            );
            gradient.addColorStop(0, "transparent");
            gradient.addColorStop(1, "rgba(0,0,0,0.8)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, size, size);

            ctx.globalCompositeOperation = "difference";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            const fontFamily = FONT_CONFIG[fontClass];

            ctx.fillStyle = "rgba(255,255,255,0.9)";
            ctx.font = `bold ${size * 0.02}px ${fontFamily}`;
            ctx.letterSpacing = `${size * 0.015}px`;
            ctx.fillText(
                (artistName || "PARTYNEXTDOOR").toUpperCase(),
                size / 2,
                size * 0.42
            );

            ctx.fillStyle = "white";
            ctx.font = `900 ${size * 0.1}px ${fontFamily}`;
            ctx.letterSpacing = `${size * 0.005}px`;
            ctx.fillText(
                (albumTitle || "LIQUID").toUpperCase(),
                size / 2,
                size * 0.52
            );

            ctx.globalCompositeOperation = "source-over";

            if (showAdvisory) {
                const advisoryImg = new Image();
                advisoryImg.crossOrigin = "anonymous";
                await new Promise<void>((resolve) => {
                    advisoryImg.onload = () => resolve();
                    advisoryImg.onerror = () => resolve();
                    advisoryImg.src =
                        "https://upload.wikimedia.org/wikipedia/commons/3/33/Parental_Advisory_Label_-_Black_Background.svg";
                });
                const advisorySize = size * 0.12;
                ctx.globalCompositeOperation = "screen";
                ctx.globalAlpha = 0.9;
                ctx.drawImage(
                    advisoryImg,
                    size - advisorySize - size * 0.04,
                    size - advisorySize - size * 0.04,
                    advisorySize,
                    advisorySize * 0.6
                );
            }

            const link = document.createElement("a");
            link.download = `${albumTitle || "PND_ART"}_GenerativeCover.png`;
            link.href = finalCanvas.toDataURL("image/png", 1.0);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast("Image téléchargée !");
        } catch (error) {
            console.error("Export error:", error);
            showToast("Erreur lors de l'export");
        }
    }, [
        showToast,
        userImage,
        blendMode,
        imageOpacity,
        noiseOpacity,
        fontClass,
        artistName,
        albumTitle,
        showAdvisory,
    ]);

    return {
        canvasRef,
        captureRef,
        activeTab,
        params,
        artistName,
        albumTitle,
        imageOpacity,
        noiseOpacity,
        globalBlur,
        blendMode,
        fontClass,
        showAdvisory,
        userImage,
        toastMessage,
        setActiveTab,
        setParams,
        setArtistName,
        setAlbumTitle,
        setImageOpacity,
        setNoiseOpacity,
        setGlobalBlur,
        setBlendMode,
        setFontClass,
        setShowAdvisory,
        setUserImage,
        randomize,
        handleImageUpload,
        downloadCover,
        showToast,
        regenerateLines,
    };
};
