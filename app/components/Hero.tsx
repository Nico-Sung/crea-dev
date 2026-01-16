"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLoading } from "../context/LoadingContext";

export default function Hero() {
    const boxRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const { isLoaded } = useLoading();

    useEffect(() => {
        if (!isLoaded) return;

        const timeline = gsap.timeline({ delay: 0.2 });

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
    }, [isLoaded]);

    return (
        <section className="fixed inset-0 w-screen h-screen bg-[#1a1a1a] flex items-center justify-center overflow-hidden z-10">
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <Image
                    src="/image.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/70" />
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

            <div className="relative z-10 flex items-center justify-center w-full">
                <div
                    ref={boxRef}
                    className="relative origin-center"
                    style={{ transform: "scaleX(0) scaleY(0.1)" }}
                >
                    <div
                        className="relative"
                        style={{
                            backgroundColor: "white",
                        }}
                    >
                        <h1
                            ref={textRef}
                            className="font-rubik-mono text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-wider uppercase leading-none whitespace-nowrap px-4 py-2 md:px-6 md:py-3"
                            style={{
                                background: "url('/image.png') center/cover",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                                opacity: 0,
                            }}
                        >
                            PARTYNEXTDOOR
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
}
