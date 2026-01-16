"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLoading } from "../context/LoadingContext";

export default function Hero() {
    const { isLoaded } = useLoading();
    const [textReady, setTextReady] = useState(false);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
                            href="#about"
                            className="text-white text-xs md:text-sm font-dm font-medium tracking-widest uppercase hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            About
                        </a>
                    </li>
                    <li>
                        <a
                            href="#discography"
                            className="text-white text-xs md:text-sm font-dm font-medium tracking-widest uppercase hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            Discography
                        </a>
                    </li>
                    <li>
                        <a
                            href="#cover-generator"
                            className="text-white text-xs md:text-sm font-dm font-medium tracking-widest uppercase hover:opacity-80 transition-opacity cursor-pointer"
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
        </section>
    );
}
