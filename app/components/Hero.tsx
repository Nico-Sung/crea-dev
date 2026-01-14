"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Hero() {
    const boxRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    const randomGlitch = (
        element: HTMLElement | null,
        intensity: number = 1
    ) => {
        if (!element) return;

        const randomDelay = Math.random() * 2000 + 1000;
        const randomDuration = Math.random() * 100 + 50;

        setTimeout(() => {
            gsap.to(element, {
                x: (Math.random() - 0.5) * 10 * intensity,
                y: (Math.random() - 0.5) * 10 * intensity,
                rotation: (Math.random() - 0.5) * 5 * intensity,
                filter: `hue-rotate(${(Math.random() - 0.5) * 60}deg)`,
                duration: randomDuration / 1000,
                ease: "power2.out",
                onComplete: () => {
                    gsap.to(element, {
                        x: 0,
                        y: 0,
                        rotation: 0,
                        filter: "hue-rotate(0deg)",
                        duration: randomDuration / 1000,
                        ease: "power2.out",
                    });
                },
            });
        }, randomDelay);
    };

    const colorGlitch = (element: HTMLElement | null) => {
        if (!element) return;

        const randomDelay = Math.random() * 3000 + 2000;

        setTimeout(() => {
            const colors = ["#ff00de", "#00fff9", "#ff0000", "#00ff00"];
            const randomColor =
                colors[Math.floor(Math.random() * colors.length)];

            gsap.to(element, {
                textShadow: `2px 0 ${randomColor}, -2px 0 ${randomColor}`,
                duration: 0.05,
                onComplete: () => {
                    gsap.to(element, {
                        textShadow: "none",
                        duration: 0.05,
                    });
                },
            });
        }, randomDelay);
    };

    useEffect(() => {
        const timeline = gsap.timeline({ delay: 0.3 });

        if (boxRef.current && textRef.current) {
            timeline
                .fromTo(
                    boxRef.current,
                    {
                        scaleX: 0,
                        scaleY: 0.1,
                    },
                    {
                        scaleX: 1,
                        scaleY: 0.1,
                        duration: 0.6,
                        ease: "power2.inOut",
                    }
                )
                .to(boxRef.current, {
                    scaleY: 1,
                    duration: 0.5,
                    ease: "power2.out",
                })
                .fromTo(
                    textRef.current,
                    {
                        opacity: 0,
                        scale: 0.9,
                        filter: "blur(8px)",
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.3"
                );
        }

        const glitchInterval = setInterval(() => {
            if (boxRef.current) {
                randomGlitch(boxRef.current, 0.3);
            }

            if (textRef.current) {
                randomGlitch(textRef.current, 0.4);
                colorGlitch(textRef.current);
            }

            if (navRef.current) {
                const links = navRef.current.querySelectorAll("a");
                const randomLink =
                    links[Math.floor(Math.random() * links.length)];
                if (randomLink) {
                    randomGlitch(randomLink as HTMLElement, 0.2);
                }
            }
        }, 2000);

        return () => clearInterval(glitchInterval);
    }, []);

    return (
        <section className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center overflow-hidden z-10">
            <div className="partynextdoor-gradient absolute inset-0 w-full h-full pointer-events-none z-0"></div>

            <div className="noise-overlay absolute inset-0 w-full h-full pointer-events-none z-[1]"></div>

            <div
                ref={logoRef}
                className="absolute top-0 left-0 z-[2] p-4 md:p-6 sm:p-4"
            >
                <Image
                    src="/logo.png"
                    alt="PARTYNEXTDOOR Logo"
                    width={200}
                    height={60}
                    className="w-auto h-12 md:h-16 sm:h-12 opacity-90"
                    priority
                />
            </div>

            <nav
                ref={navRef}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-[2] pl-6 md:pl-8 sm:pl-6"
            >
                <ul className="flex flex-col gap-3 md:gap-4 sm:gap-3">
                    <li>
                        <a
                            href="#about"
                            className="text-white text-sm md:text-base sm:text-xs font-rubik-mono font-bold tracking-wider uppercase hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            ABOUT
                        </a>
                    </li>
                    <li>
                        <a
                            href="#discography"
                            className="text-white text-sm md:text-base sm:text-xs font-rubik-mono font-bold tracking-wider uppercase hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            DISCOGRAPHY
                        </a>
                    </li>
                    <li>
                        <a
                            href="#cover-generator"
                            className="text-white text-sm md:text-base sm:text-xs font-rubik-mono font-bold tracking-wider uppercase hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            COVER GENERATOR
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="relative z-[2] flex items-center justify-center distortion">
                <div
                    ref={boxRef}
                    className="bg-white px-1 py-1 md:px-4 md:py-3 sm:px-3 sm:py-2 inline-block shadow-[0_0_50px_rgba(255,255,255,0.2)] blur-text origin-center"
                >
                    <h1
                        ref={textRef}
                        className="font-rubik-mono font-extrabold text-5xl md:text-4xl sm:text-2xl text-black tracking-wider uppercase leading-tight sm:tracking-normal glitch"
                        data-text="PARTYNEXTDOOR"
                    >
                        PARTYNEXTDOOR
                    </h1>
                </div>
            </div>
        </section>
    );
}
