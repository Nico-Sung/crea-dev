"use client";

import Image from "next/image";
import { useState } from "react";
import type { Album } from "../data/albums";

interface FlipCardProps {
    album: Album;
}

export default function FlipCard({ album }: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="flip-card relative aspect-square max-w-md cursor-pointer"
            style={{ perspective: "1000px" }}
            onClick={() => setIsFlipped(!isFlipped)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    transform:
                        isHovered && !isFlipped
                            ? "translateX(40%)"
                            : "translateX(0%)",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: 0,
                }}
            >
                <div
                    className="w-[90%] h-[90%] rounded-full bg-black relative"
                    style={{
                        animation:
                            isHovered && !isFlipped
                                ? "spin 3s linear infinite"
                                : "none",
                    }}
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-900 via-black to-zinc-800" />

                    <div
                        className="absolute inset-[5%] rounded-full"
                        style={{
                            background:
                                "repeating-radial-gradient(circle at center, transparent 0px, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                        }}
                    />

                    <div
                        className="absolute inset-[35%] rounded-full flex items-center justify-center"
                        style={{
                            background: `linear-gradient(135deg, ${album.vinylColor}, ${album.vinylColor}99, ${album.vinylColor}66)`,
                        }}
                    >
                        <div className="w-[20%] h-[20%] rounded-full bg-zinc-900" />
                    </div>

                    <div
                        className="absolute inset-[8%] rounded-full opacity-30"
                        style={{
                            background:
                                "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.1) 10deg, transparent 20deg, transparent 90deg, rgba(255,255,255,0.05) 100deg, transparent 110deg, transparent 180deg, rgba(255,255,255,0.1) 190deg, transparent 200deg, transparent 270deg, rgba(255,255,255,0.05) 280deg, transparent 290deg)",
                        }}
                    />
                </div>
            </div>

            <div
                className="flip-card-inner relative w-full h-full transition-transform duration-700"
                style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    zIndex: 1,
                }}
            >
                <div
                    className="flip-card-front absolute inset-0 w-full h-full rounded-sm overflow-hidden"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <Image
                        src={album.image}
                        alt={album.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1">
                        <span className="font-dm text-[10px] text-white/80 tracking-wide">
                            Cliquer pour voir la tracklist
                        </span>
                    </div>
                </div>

                <div
                    className="flip-card-back absolute inset-0 w-full h-full bg-[var(--bg-deep)] rounded-sm overflow-hidden border border-white/10"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <div className="absolute inset-0 p-6 flex flex-col">
                        <h4 className="font-syne text-base md:text-lg text-white tracking-tight mb-1">
                            {album.title}
                        </h4>
                        <span className="font-space-mono text-xs text-[var(--text-muted)] mb-4">
                            {album.year}
                        </span>

                        <div className="flex-1 overflow-y-auto">
                            <ul className="space-y-1.5">
                                {album.tracklist.map((track, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center gap-3 group/track"
                                    >
                                        <span className="font-space-mono text-[10px] text-white/30 w-4">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="font-dm text-xs text-white/70 group-hover/track:text-white transition-colors">
                                            {track}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10">
                            <span className="font-dm text-[10px] text-[var(--text-muted)] tracking-wide">
                                Cliquer pour retourner
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
