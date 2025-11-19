"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                delay: 0.2
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-screen bg-[#080808] text-[#e2e2e2] flex flex-col items-center justify-center overflow-hidden font-sans">

            {/* Background Noise */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20200%20200%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />

            <div className="z-10 text-center px-4">
                <h1 ref={textRef} className="font-display text-[15vw] leading-none font-bold text-transparent stroke-text opacity-50">
                    404
                </h1>

                <div className="mt-8 space-y-6">
                    <p className="text-xl md:text-2xl font-light tracking-wide text-gray-400">
                        The page you are looking for has drifted into the void.
                    </p>

                    <Link href="/" className="inline-block group">
                        <div className="flex items-center gap-4 text-sm tracking-[0.2em] uppercase hover:text-white text-gray-400 transition-colors">
                            <span className="text-xl transform group-hover:-translate-x-2 transition-transform">←</span>
                            <span className="border-b border-gray-600 group-hover:border-white pb-1 transition-colors">Return to Base</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Decorative Grid */}
            <div className="fixed w-px h-screen top-0 left-[10%] bg-white/5 z-[1]" />
            <div className="fixed w-px h-screen top-0 right-[10%] bg-white/5 z-[1]" />
            <div className="fixed h-px w-screen top-[15%] left-0 bg-white/5 z-[1]" />
            <div className="fixed h-px w-screen bottom-[15%] left-0 bg-white/5 z-[1]" />

        </div>
    );
}
