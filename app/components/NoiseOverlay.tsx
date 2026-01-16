"use client";

import { useEffect, useRef } from "react";

interface NoiseOverlayProps {
    opacity?: number;
    className?: string;
}

export default function NoiseOverlay({
    opacity = 0.05,
    className = "",
}: NoiseOverlayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const size = 128;
        canvas.width = size;
        canvas.height = size;

        const generateNoise = () => {
            const imageData = ctx.createImageData(size, size);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                const value = Math.random() * 255;
                data[i] = value;
                data[i + 1] = value;
                data[i + 2] = value;
                data[i + 3] = 255;
            }

            ctx.putImageData(imageData, 0, 0);
        };

        generateNoise();

        const interval = setInterval(() => {
            generateNoise();
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`fixed inset-0 w-full h-full pointer-events-none z-[9999] ${className}`}
            style={{ opacity }}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{
                    imageRendering: "pixelated",
                    backgroundRepeat: "repeat",
                }}
            />
            <style jsx>{`
                canvas {
                    background-size: 128px 128px;
                    animation: noise-shift 0.5s steps(10) infinite;
                }
                @keyframes noise-shift {
                    0% {
                        transform: translate(0, 0);
                    }
                    10% {
                        transform: translate(-5%, -5%);
                    }
                    20% {
                        transform: translate(5%, 5%);
                    }
                    30% {
                        transform: translate(-5%, 5%);
                    }
                    40% {
                        transform: translate(5%, -5%);
                    }
                    50% {
                        transform: translate(-2%, 2%);
                    }
                    60% {
                        transform: translate(2%, -2%);
                    }
                    70% {
                        transform: translate(-3%, -3%);
                    }
                    80% {
                        transform: translate(3%, 3%);
                    }
                    90% {
                        transform: translate(-1%, 1%);
                    }
                    100% {
                        transform: translate(0, 0);
                    }
                }
            `}</style>
        </div>
    );
}
