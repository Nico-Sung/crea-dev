"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { NOISE_SVG, NOISE_SIZE, NOISE_OPACITY } from "../utils/constants";

export default function Hero() {
    const boxRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

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
    }, []);

    return (
        <section className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center overflow-hidden z-10">
            <div className="partynextdoor-gradient absolute inset-0 w-full h-full pointer-events-none z-0"></div>

            <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20">
                <Image
                    src="/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                style={{
                    backgroundImage: NOISE_SVG,
                    backgroundSize: NOISE_SIZE,
                    opacity: NOISE_OPACITY,
                    mixBlendMode: "overlay",
                }}
            />

            <div className="noise-overlay absolute inset-0 w-full h-full pointer-events-none z-1"></div>

            <div className="absolute top-0 left-0 z-2 p-4 md:p-6">
                <Image
                    src="/logo.png"
                    alt="PARTYNEXTDOOR Logo"
                    width={200}
                    height={60}
                    className="w-auto h-12 md:h-16 opacity-90"
                    priority
                />
            </div>

            <nav className="absolute right-0 top-0 z-2 pr-6 md:pr-8 pt-4 md:pt-6">
                <ul className="flex flex-row gap-4 md:gap-6 lg:gap-8">
                    <li>
                        <a
                            href="#about"
                            className="text-white text-sm md:text-base font-rubik-mono font-bold tracking-wider uppercase hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            ABOUT
                        </a>
                    </li>
                    <li>
                        <a
                            href="#discography"
                            className="text-white text-sm md:text-base font-rubik-mono font-bold tracking-wider uppercase hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            DISCOGRAPHY
                        </a>
                    </li>
                    <li>
                        <a
                            href="#cover-generator"
                            className="text-white text-sm md:text-base font-rubik-mono font-bold tracking-wider uppercase hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            COVER GENERATOR
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="relative z-2 flex items-center justify-center w-full px-8 md:px-16">
                <div
                    ref={boxRef}
                    className="bg-white px-4 py-2 md:px-8 md:py-4 inline-block shadow-[0_0_50px_rgba(255,255,255,0.2)] origin-center"
                >
                    <h1
                        ref={textRef}
                        className="font-rubik-mono font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black tracking-wider uppercase leading-none glitch whitespace-nowrap"
                        data-text="PARTYNEXTDOOR"
                    >
                        PARTYNEXTDOOR
                    </h1>
                </div>
            </div>
        </section>
    );
}
