"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useLoading } from "../context/LoadingContext";

export default function Hero() {
    const textRef = useRef<HTMLHeadingElement>(null);
    const { isLoaded } = useLoading();

    useEffect(() => {
        if (!isLoaded || !textRef.current) return;

        gsap.fromTo(
            textRef.current,
            {
                opacity: 0,
                y: 50,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.2,
            }
        );
    }, [isLoaded]);

    useEffect(() => {
        if (!isLoaded || !textRef.current) return;

        const handleScroll = () => {
            if (!textRef.current) return;
            const maxSpacing = 1;
            const progress = Math.min(
                window.scrollY / window.innerHeight,
                1
            );
            const targetSpacing = progress * maxSpacing;

            gsap.to(textRef.current, {
                letterSpacing: `${targetSpacing}em`,
                duration: 0.4,
                ease: "power2.out",
                overwrite: "auto",
            });
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoaded]);

    useEffect(() => {
        if (!isLoaded) return;
        window.scrollTo(0, 0);
    }, [isLoaded]);

    return (
        <section className="fixed inset-0 w-screen h-screen overflow-hidden bg-black z-10">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/hero.png"
                    alt="PARTYNEXTDOOR landing background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
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
                    ref={textRef}
                    className="font-rubik-mono font-black text-5xl md:text-7xl lg:text-9xl xl:text-[9rem] tracking-[0em] uppercase text-[#c61a1a] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                    style={{ opacity: 0, letterSpacing: "0em" }}
                >
                    PARTYNEXTDOOR
                </h1>
            </div>
        </section>
    );
}
