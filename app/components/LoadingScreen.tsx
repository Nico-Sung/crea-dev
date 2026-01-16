"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const { setIsLoaded } = useLoading();

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 15 + 5;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => {
                    setIsLoaded(true);
                }, 600);
                setTimeout(() => {
                    setIsVisible(false);
                }, 1000);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [progress, setIsLoaded]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">
            <div
                className="absolute inset-0 bg-[var(--bg-deep)]"
                style={{
                    clipPath: isExiting
                        ? "polygon(0 0, 100% -15%, 100% -15%, 0 0)"
                        : "polygon(0 0, 100% 0, 100% 115%, 0 100%)",
                    transition: "clip-path 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
                }}
            />

            <div
                className="absolute inset-0 flex flex-col items-center justify-center"
                style={{
                    opacity: isExiting ? 0 : 1,
                    transform: isExiting
                        ? "translateY(-50px)"
                        : "translateY(0)",
                    transition:
                        "opacity 0.4s ease-out, transform 0.5s ease-out",
                }}
            >
                <div className="relative mb-8">
                    <Image
                        src="/logo.png"
                        alt="PARTYNEXTDOOR Logo"
                        width={300}
                        height={90}
                        className="w-auto h-16 md:h-20"
                        priority
                    />
                </div>

                <div className="w-48 md:w-64 h-[2px] bg-white/10 overflow-hidden">
                    <div
                        className="h-full bg-white transition-all duration-100 ease-out"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                </div>

                <span className="font-space-mono text-xs text-white/40 mt-4">
                    {Math.min(Math.round(progress), 100)}%
                </span>
            </div>
        </div>
    );
}
