"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const [showText, setShowText] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const { setIsLoaded } = useLoading();

    useEffect(() => {
        const textTimer = setTimeout(() => {
            setShowText(true);
        }, 400);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + Math.random() * 5 + 2;
            });
        }, 120);

        return () => {
            clearInterval(interval);
            clearTimeout(textTimer);
        };
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            setShowImage(true);

            const timer = setTimeout(() => {
                setIsExiting(true);
                setTimeout(() => {
                    setIsLoaded(true);
                }, 600);
                setTimeout(() => {
                    setIsVisible(false);
                }, 1000);
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [progress, setIsLoaded]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden bg-black">
            <div
                className="absolute inset-0 bg-black"
                style={{
                    clipPath: isExiting
                        ? "polygon(0 0, 100% -15%, 100% -15%, 0 0)"
                        : "polygon(0 0, 100% 0, 100% 115%, 0 100%)",
                    transition: "clip-path 0.9s cubic-bezier(0.76, 0, 0.24, 1)",
                }}
            />

            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    opacity: isExiting ? 0 : 1,
                    transform: isExiting
                        ? "translateY(-50px)"
                        : "translateY(0)",
                    transition:
                        "opacity 0.4s ease-out, transform 0.5s ease-out",
                }}
            >
                <div
                    className="flex items-center gap-6 md:gap-8"
                    style={{
                        transform: showImage
                            ? "translateX(-50px)"
                            : showText
                            ? "translateX(0)"
                            : "translateX(0)",
                        transition:
                            "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <div
                        className="relative shrink-0"
                        style={{
                            transform: showText
                                ? "translateX(0)"
                                : "translateX(100px)",
                            transition:
                                "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        <Image
                            src="/logo.png"
                            alt="PARTYNEXTDOOR Logo"
                            width={180}
                            height={54}
                            className="w-auto h-14 md:h-16"
                            priority
                        />
                    </div>

                    <div
                        className="flex flex-col gap-2 overflow-hidden justify-center"
                        style={{
                            clipPath: showText
                                ? "inset(0 0 0 0)"
                                : "inset(0 100% 0 0)",
                            transition:
                                "clip-path 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
                        }}
                    >
                        <p className="font-space-mono text-[10px] md:text-xs text-white/70 uppercase tracking-wider leading-relaxed whitespace-nowrap italic">
                            &quot;I know myself, I&apos;m learning myself.
                            <br />
                            I&apos;m growing, I&apos;m maturing.&quot;
                            <span className="block mt-1 not-italic text-white/50">
                                — PartyNextDoor
                            </span>
                        </p>
                        <div className="flex items-center gap-8 mt-1">
                            <span className="font-space-mono text-[10px] md:text-xs text-white/50 tracking-wider">
                                LOADING...
                            </span>
                            <span className="font-space-mono text-[10px] md:text-xs text-white/50 tracking-wider tabular-nums">
                                {String(
                                    Math.min(Math.round(progress), 100)
                                ).padStart(3, "0")}
                                %
                            </span>
                        </div>
                    </div>

                    <div
                        className="overflow-hidden shrink-0"
                        style={{
                            clipPath: showImage
                                ? "inset(0 0 0 0)"
                                : "inset(0 100% 0 0)",
                            transition:
                                "clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                    >
                        <Image
                            src="/loading-logo.png"
                            alt="sign"
                            width={100}
                            height={70}
                            className="w-auto h-16 md:h-20 opacity-60"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
