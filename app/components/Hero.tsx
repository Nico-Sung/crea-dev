"use client";

import Image from "next/image";
import {
    type CSSProperties,
    type MouseEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import { useLoading } from "../context/LoadingContext";

export default function Hero() {
    const { isLoaded } = useLoading();
    const [textReady, setTextReady] = useState(false);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scrollAnimationRef = useRef<number | null>(null);

    const smoothScrollTo = (targetId: string) => {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        if (scrollAnimationRef.current) {
            cancelAnimationFrame(scrollAnimationRef.current);
            scrollAnimationRef.current = null;
        }

        const startY = window.scrollY;
        const targetY =
            targetElement.getBoundingClientRect().top + window.scrollY;
        const distance = targetY - startY;
        const duration = 1400;
        const startTime = performance.now();

        const easeInOutCubic = (progress: number) => {
            return progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        };

        const animateScroll = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);
            window.scrollTo(0, startY + distance * easedProgress);

            if (progress < 1) {
                scrollAnimationRef.current =
                    requestAnimationFrame(animateScroll);
            } else {
                scrollAnimationRef.current = null;
            }
        };

        scrollAnimationRef.current = requestAnimationFrame(animateScroll);
    };

    const handleNavigation = (
        event: MouseEvent<HTMLAnchorElement>,
        targetId: string
    ) => {
        event.preventDefault();
        smoothScrollTo(targetId);
    };

    useEffect(() => {
        if (!isLoaded) return;
        window.scrollTo(0, 0);
        const timeout = setTimeout(() => setTextReady(true), 450);
        return () => clearTimeout(timeout);
    }, [isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;

        const handleScroll = () => {
            const progress = Math.min(
                window.scrollY / window.innerHeight,
                1
            );
            setLetterSpacing(progress * 0.8);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoaded]);

    useEffect(() => {
        if (!isLoaded || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        const flakeCount = 200;
        let flakes: Array<{
            x: number;
            y: number;
            radius: number;
            speedY: number;
            drift: number;
        }> = [];

        const initFlakes = () => {
            flakes = Array.from({ length: flakeCount }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.6 + 0.4,
                speedY: Math.random() * 0.9 + 0.3,
                drift: Math.random() * 0.6 - 0.3,
            }));
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initFlakes();
        };

        resize();
        window.addEventListener("resize", resize);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            flakes.forEach((flake) => {
                flake.y += flake.speedY;
                flake.x += flake.drift + Math.sin(flake.y * 0.01) * 0.4;

                if (flake.y > canvas.height) {
                    flake.y = -flake.radius;
                    flake.x = Math.random() * canvas.width;
                }

                if (flake.x > canvas.width) flake.x = 0;
                if (flake.x < 0) flake.x = canvas.width;

                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(255,255,255,0.85)";
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resize);
        };
    }, [isLoaded]);

    return (
        <section className="fixed inset-0 w-screen h-screen overflow-hidden bg-black z-10">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/heroo.png"
                    alt="PARTYNEXTDOOR landing background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full mix-blend-screen opacity-70"
                />
            </div>

            <div className="interactive z-20">
                <div
                    className="sticker"
                    style={{ "--r": "-5deg" } as CSSProperties}
                >
                    NOUVEL ALBUM !!
                </div>
                <div
                    className="marker-text mt-4 md:mt-5"
                    style={{ transform: "rotate(-5deg)" }}
                >
                    2026-04-16
                </div>
            </div>

            <div className="absolute top-0 left-0 z-20 p-4 md:p-6">
                <Image
                    src="/logo.png"
                    alt="PARTYNEXTDOOR Logo"
                    width={200}
                    height={60}
                    className="w-auto h-12 md:h-16 opacity-90"
                    priority
                />
            </div>

            <nav className="absolute right-0 top-0 z-20 pr-6 md:pr-8 pt-4 md:pt-6">
                <ul className="flex flex-row gap-6 md:gap-8 lg:gap-10">
                    <li>
                        <a
                            href="#discography"
                            onClick={(event) =>
                                handleNavigation(event, "discography")
                            }
                            className="text-white text-[0.65rem] md:text-xs font-navcaps hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            Discography
                        </a>
                    </li>
                    <li>
                        <a
                            href="#cover-generator"
                            onClick={(event) =>
                                handleNavigation(event, "cover-generator")
                            }
                            className="text-white text-[0.65rem] md:text-xs font-navcaps hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            Cover Generator
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="relative z-10 flex items-center justify-center w-full h-full px-6 text-center">
                <h1
                    className={`font-rubik-mono font-black text-5xl md:text-7xl lg:text-9xl xl:text-[9rem] uppercase text-[#c61a1a] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-[1200ms] ease-out ${
                        textReady
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-10"
                    }`}
                    style={{ letterSpacing: `${letterSpacing}em` }}
                >
                    PARTYNEXTDOOR
                </h1>
            </div>

            <a
                href="#cover-generator"
                aria-label="Aller au générateur de cover"
                onClick={(event) => handleNavigation(event, "cover-generator")}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-white text-xs md:text-sm font-medium tracking-wide"
            >
                <span className="px-4 py-2 rounded-xl border border-white/10 bg-white/[0.03] transform transition-all backdrop-blur-xl">
                    <span className="flex flex-col items-center text-center leading-tight text-[0.55rem] md:text-xs uppercase tracking-[0.08em] text-white/90 font-navcaps font-semibold">
                        <span>Cliquez ici pour</span>
                        <span>faire votre propre cover !</span>
                    </span>
                </span>
                <span className="hero-arrow">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 md:w-6 md:h-6 text-white/90 drop-shadow-[0_5px_15px_rgba(0,0,0,0.7)]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 5v14m0 0-5-5m5 5 5-5" />
                    </svg>
                </span>
            </a>
        </section>
    );
}
