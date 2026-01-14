"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Album {
    id: number;
    image: string;
    title: string;
    year: string;
    description: string;
}

interface YearSection {
    year: string;
    albums: Album[];
}

export default function Discography() {
    const sectionRef = useRef<HTMLElement>(null);
    const yearSectionsRef = useRef<HTMLDivElement>(null);

    const yearSections: YearSection[] = [
        {
            year: "2013",
            albums: [
                {
                    id: 1,
                    image: "/album1.png",
                    title: "PARTYNEXTDOOR",
                    year: "2013",
                    description: "Premier album studio de PARTYNEXTDOOR",
                },
            ],
        },
        {
            year: "2014",
            albums: [
                {
                    id: 2,
                    image: "/album2.png",
                    title: "PARTYNEXTDOOR TWO",
                    year: "2014",
                    description: "Deuxième album studio",
                },
            ],
        },
        {
            year: "2016",
            albums: [
                {
                    id: 3,
                    image: "/album3.png",
                    title: "PARTYNEXTDOOR 3",
                    year: "2016",
                    description: "Troisième album studio",
                },
            ],
        },
        {
            year: "2020",
            albums: [
                {
                    id: 4,
                    image: "/album4.png",
                    title: "PARTYMOBILE",
                    year: "2020",
                    description: "Quatrième album studio",
                },
            ],
        },
    ];

    useEffect(() => {
        if (!sectionRef.current || !yearSectionsRef.current) return;

        const yearSections =
            yearSectionsRef.current.querySelectorAll(".year-section");

        yearSections.forEach((section, index) => {
            const sectionElement = section as HTMLElement;
            const lineElement = sectionElement.querySelector(".timeline-line");
            const lineFill = sectionElement.querySelector(
                ".timeline-line-fill"
            );
            const contentElement =
                sectionElement.querySelector(".year-content");
            const albumElement =
                sectionElement.querySelector(".album-container");

            if (lineFill) {
                gsap.fromTo(
                    lineFill,
                    {
                        scaleY: 0,
                    },
                    {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: sectionElement,
                            start: "top center",
                            end: "bottom center",
                            scrub: 1,
                        },
                    }
                );
            }

            if (contentElement) {
                gsap.fromTo(
                    contentElement,
                    {
                        opacity: 0,
                        y: 40,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: sectionElement,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            if (albumElement) {
                gsap.fromTo(
                    albumElement,
                    {
                        opacity: 0,
                        x: 40,
                        scale: 0.95,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        delay: 0.2,
                        scrollTrigger: {
                            trigger: sectionElement,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
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
            <div className="noise-overlay absolute inset-0 w-full h-full pointer-events-none z-[1]"></div>

            <div className="relative z-[2] container mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-32">
                <h2 className="font-rubik-mono font-extrabold text-4xl md:text-5xl text-white tracking-wider uppercase mb-16 md:mb-20 text-center">
                    DISCOGRAPHY
                </h2>

                <div ref={yearSectionsRef} className="space-y-0">
                    {yearSections.map((yearSection, sectionIndex) => (
                        <div
                            key={yearSection.year}
                            className="year-section relative flex min-h-screen"
                        >
                            <div className="w-1/2 flex-shrink-0 relative">
                                <div className="sticky top-0 h-screen flex items-center justify-end pr-8 md:pr-12">
                                    <div className="timeline-date">
                                        <span
                                            className="font-rubik-mono text-6xl md:text-7xl lg:text-8xl font-bold text-white block leading-none"
                                            style={{
                                                writingMode: "sideways-lr",
                                                textOrientation: "mixed",
                                            }}
                                        >
                                            {yearSection.year}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-px flex-shrink-0 relative">
                                <div className="timeline-line sticky top-0 h-screen flex items-center justify-center">
                                    <div className="relative w-full h-full">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-white/20 origin-top" />
                                        <div
                                            className="timeline-line-fill absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full origin-top scale-y-0"
                                            style={{
                                                background:
                                                    "linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0.8))",
                                            }}
                                        />
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white z-10" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-1/2 flex-shrink-0 pl-8 md:pl-12 py-20 md:py-32">
                                <div className="year-content max-w-2xl">
                                    <div className="mb-8 md:mb-12">
                                        {yearSection.albums.map(
                                            (album, albumIndex) => (
                                                <motion.div
                                                    key={album.id}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 40,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                        margin: "-100px",
                                                    }}
                                                    transition={{
                                                        duration: 0.8,
                                                        delay: albumIndex * 0.2,
                                                        ease: [
                                                            0.25, 0.1, 0.25, 1,
                                                        ],
                                                    }}
                                                    className="mb-12 last:mb-0"
                                                >
                                                    <h3 className="font-rubik-mono text-xl md:text-2xl lg:text-3xl text-white/90 uppercase tracking-wider mb-4">
                                                        {album.title}
                                                    </h3>
                                                    <p className="font-rubik-mono text-sm md:text-base text-white/70 leading-relaxed mb-6">
                                                        {album.description}
                                                    </p>
                                                </motion.div>
                                            )
                                        )}
                                    </div>

                                    <div className="space-y-8">
                                        {yearSection.albums.map(
                                            (album, albumIndex) => (
                                                <motion.div
                                                    key={album.id}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 40,
                                                    }}
                                                    whileInView={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    viewport={{
                                                        once: true,
                                                        margin: "-100px",
                                                    }}
                                                    transition={{
                                                        duration: 0.8,
                                                        delay:
                                                            albumIndex * 0.2 +
                                                            0.3,
                                                        ease: [
                                                            0.25, 0.1, 0.25, 1,
                                                        ],
                                                    }}
                                                    className="album-container group cursor-pointer"
                                                >
                                                    <div className="relative aspect-square overflow-hidden bg-white/5 rounded-sm max-w-md">
                                                        <Image
                                                            src={album.image}
                                                            alt={album.title}
                                                            fill
                                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                    </div>
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
