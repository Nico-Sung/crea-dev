"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const menuItems = [
    "DISCOGRAPHY",
    "LIVE",
    "PROJECTS",
    "STORE",
    "PRESS",
    "FANS' ZONE",
    "JOIN NOW",
];

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const hero = heroRef.current;
        const title = titleRef.current;
        const subtitle = subtitleRef.current;
        const menu = menuRef.current;

        if (!hero || !title || !subtitle || !menu) return;

        // Animation du logo header (en haut à gauche)
        const headerLogo = document.querySelector("header img");
        if (headerLogo) {
            gsap.set(headerLogo, {
                opacity: 0,
                scale: 0.8,
            });

            gsap.to(headerLogo, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.2,
            });
        }

        // Animation initiale - tout invisible
        gsap.set([title, subtitle, menu], {
            opacity: 0,
            y: 30,
        });

        // Timeline principale
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Animation du titre
        tl.to(title, {
            opacity: 1,
            y: 0,
            duration: 1.2,
        })
            // Animation du sous-titre
            .to(
                subtitle,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                },
                "-=0.6"
            )
            // Animation du menu (chaque item avec délai)
            .to(
                menu,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                },
                "-=0.4"
            );

        // Animation des items du menu un par un
        const menuItems = menu.querySelectorAll("li");
        menuItems.forEach((item, index) => {
            gsap.set(item, {
                opacity: 0,
                x: -20,
            });

            gsap.to(item, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: 1.2 + index * 0.1,
                ease: "power2.out",
            });
        });
    }, []);

    return (
        <section
            ref={heroRef}
            className="fixed w-screen h-screen bg-[#0e0e0e] top-0 left-0 overflow-hidden z-[3] flex items-center"
        >
            {/* Menu vertical à gauche */}
            <nav className="absolute left-8 md:left-12 lg:left-16 top-1/2 -translate-y-1/2 z-20">
                <ul
                    ref={menuRef}
                    className="flex flex-col gap-4 md:gap-5 list-none p-0 m-0"
                >
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <a
                                href="#"
                                className="text-white no-underline text-sm md:text-base tracking-[0.15em] uppercase transition-all duration-300 ease-in-out hover:opacity-60 hover:translate-x-2 font-[var(--font-rubik-mono),monospace]"
                            >
                                {item === "STORE" ? (
                                    <>
                                        STORE
                                        <span className="block text-xs mt-1 opacity-70">
                                            SOON
                                        </span>
                                    </>
                                ) : (
                                    item
                                )}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Contenu central */}
            <div className="w-full flex flex-col items-center justify-center px-8 md:px-12 lg:px-16">
                {/* Titre principal */}
                <h1
                    ref={titleRef}
                    className="text-white text-[clamp(3rem,12vw,10rem)] md:text-[clamp(4rem,15vw,12rem)] uppercase leading-[0.9] mb-4 md:mb-6 text-center font-[var(--font-rubik-mono),Arial_Black,Helvetica_Neue,Arial,monospace] tracking-[0.02em]"
                    style={{
                        textShadow: "0 0 30px rgba(255, 255, 255, 0.1)",
                        letterSpacing: "0.02em",
                    }}
                >
                    PARTYNEXTDOOR
                </h1>

                {/* Sous-titre */}
                <p
                    ref={subtitleRef}
                    className="text-white/80 text-sm md:text-base lg:text-lg uppercase tracking-[0.3em] text-center font-[var(--font-rubik-mono),monospace]"
                >
                    THE OFFICIAL PARTYNEXTDOOR PLATFORM
                </p>
            </div>
        </section>
    );
}
