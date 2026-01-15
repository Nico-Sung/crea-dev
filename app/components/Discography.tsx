"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { yearSections } from "../data/albums";
import { NOISE_SVG, NOISE_SIZE, NOISE_OPACITY } from "../utils/constants";
import FlipCard from "./FlipCard";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Discography() {
    const sectionRef = useRef<HTMLElement>(null);
    const yearSectionsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !yearSectionsRef.current) return;

        const sections =
            yearSectionsRef.current.querySelectorAll(".year-section");

        sections.forEach((section) => {
            const sectionElement = section as HTMLElement;
            const dateElement = sectionElement.querySelector(
                ".date-container"
            ) as HTMLElement;
            const contentElement = sectionElement.querySelector(
                ".content-container"
            ) as HTMLElement;
            const lineFill = sectionElement.querySelector(
                ".line-fill"
            ) as HTMLElement;

            if (dateElement && contentElement) {
                ScrollTrigger.create({
                    trigger: sectionElement,
                    start: "top center",
                    end: () =>
                        `+=${
                            contentElement.offsetHeight - window.innerHeight / 2
                        }`,
                    pin: dateElement,
                    pinSpacing: false,
                    markers: false,
                    id: `pin-${sectionElement.dataset.year}`,
                });
            }

            if (lineFill) {
                gsap.fromTo(
                    lineFill,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionElement,
                            start: "top center",
                            end: "bottom center",
                            scrub: 0.5,
                            markers: false,
                        },
                    }
                );
            }

            const contentItems =
                sectionElement.querySelectorAll(".content-item");
            contentItems.forEach((item) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            const flipCards = sectionElement.querySelectorAll(".flip-card");
            flipCards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { y: 0 },
                    {
                        y: -30,
                        ease: "none",
                        scrollTrigger: {
                            trigger: card,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    }
                );
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            id="discography"
            ref={sectionRef}
            className="relative w-screen min-h-screen bg-black overflow-hidden z-20"
            style={{ marginTop: "100vh" }}
        >
            <div
                className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20"
                style={{
                    backgroundImage: "url('/bg-disco2.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                }}
            />

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

            <div className="relative z-2 container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32">
                <h2 className="font-rubik-mono font-extrabold text-2xl md:text-3xl text-white tracking-wider uppercase mb-12 md:mb-16 text-center">
                    DISCOGRAPHY
                </h2>

                <div ref={yearSectionsRef}>
                    {yearSections.map((yearSection) => (
                        <div
                            key={yearSection.year}
                            data-year={yearSection.year}
                            className="year-section relative"
                        >
                            <div className="flex">
                                <div className="w-32 md:w-48 lg:w-56 shrink-0 relative">
                                    <div className="date-container">
                                        <span
                                            className="font-rubik-mono text-4xl md:text-5xl lg:text-6xl font-bold text-white block leading-none"
                                            style={{
                                                writingMode: "sideways-lr",
                                                textOrientation: "mixed",
                                            }}
                                        >
                                            {yearSection.year}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-px shrink-0 relative mx-4 md:mx-8">
                                    <div className="absolute top-0 left-0 w-0.5 h-full bg-white/20" />
                                    <div
                                        className="line-fill absolute top-0 left-0 w-0.5 h-full bg-white origin-top"
                                        style={{ transform: "scaleY(0)" }}
                                    />
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white" />
                                </div>

                                <div className="content-container flex-1 pl-4 md:pl-8 pb-32 md:pb-48">
                                    {yearSection.albums.map((album) => (
                                        <div
                                            key={album.id}
                                            className="content-item mb-8"
                                        >
                                            <h3 className="font-rubik-mono text-lg md:text-xl lg:text-2xl text-white/90 uppercase tracking-wider mb-3">
                                                {album.title}
                                            </h3>
                                            <p className="font-rubik-mono text-xs md:text-sm text-white/70 leading-relaxed mb-6 max-w-xl">
                                                {album.description}
                                            </p>
                                            <FlipCard album={album} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
