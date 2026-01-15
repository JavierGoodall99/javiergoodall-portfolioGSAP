"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

type ProjectDetailProps = {
    title: string;
    category: string;
    description: string;
    image: string;
    url?: string;
    content: string;
};

export default function ProjectDetail({ title, category, description, image, url, content }: ProjectDetailProps) {
    const heroRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(heroRef.current, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            })
                .from(imageRef.current, {
                    scale: 0.9,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.5")
                .from(textRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.5");
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen bg-[#080808] text-white pt-32 px-4 md:px-[10%] pb-20" style={{ backgroundColor: '#080808', color: '#ffffff' }}>
            <Link href="/" className="inline-block mb-12 text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity" style={{ color: '#ffffff' }}>
                ← Back to Home
            </Link>

            <div ref={heroRef} className="mb-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 mb-8" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                    <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-4 md:mb-0 text-white" style={{ color: '#ffffff' }}>
                        {title}
                    </h1>
                    <div className="text-right text-gray-300" style={{ color: '#d1d5db' }}>
                        <div className="text-xs tracking-widest uppercase opacity-60 mb-1">{category}</div>
                    </div>
                </div>
                <p className="text-xl md:text-2xl font-light max-w-2xl text-gray-300" style={{ color: '#d1d5db' }}>
                    {description}
                </p>
            </div>

            <div ref={imageRef} className="relative w-full aspect-video mb-20 overflow-hidden rounded-lg">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            <div ref={textRef} className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1">
                    <h3 className="text-sm tracking-widest uppercase border-b border-white/20 pb-4 mb-6" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>Project Overview</h3>
                    <div className="flex flex-col gap-4 text-sm text-gray-400" style={{ color: '#9ca3af' }}>
                        <div>
                            <span className="block text-white mb-1" style={{ color: '#ffffff' }}>Role</span>
                            Design & Development
                        </div>
                        <div>
                            <span className="block text-white mb-1" style={{ color: '#ffffff' }}>Tools</span>
                            Next.js, WebGL, GSAP
                        </div>
                        {url && (
                            <div>
                                <span className="block text-white mb-1" style={{ color: '#ffffff' }}>Live Site</span>
                                <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline decoration-white/30 underline-offset-4">
                                    Visit Website ↗
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:col-span-2">
                    <div className="prose prose-invert max-w-none">
                        <p className="text-lg leading-relaxed text-gray-300 whitespace-pre-line" style={{ color: '#d1d5db' }}>
                            {content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
