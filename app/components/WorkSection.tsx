"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "NEURAL SYMPHONY",
        category: "WEBGL / INTERACTIVE",
        year: "2024",
        description: "A real-time audio visualizer using Three.js and WebAudio API."
    },
    {
        id: 2,
        title: "CYBERPUNK ARCHIVES",
        category: "UI/UX / DEVELOPMENT",
        year: "2023",
        description: "Immersive storytelling platform with glitched aesthetics."
    },
    {
        id: 3,
        title: "AETHER LENS",
        category: "CREATIVE DEV",
        year: "2023",
        description: "Photography portfolio featuring liquid distortion effects."
    },
    {
        id: 4,
        title: "VOID COMMERCE",
        category: "E-COMMERCE",
        year: "2022",
        description: "Minimalist shopping experience with micro-interactions."
    }
];

export default function WorkSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Title Animation
            gsap.from(titleRef.current, {
                scrollTrigger: {
                    trigger: titleRef.current,
                    start: "top 80%",
                },
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            });

            // Projects Animation
            projectRefs.current.forEach((project, index) => {
                if (!project) return;

                gsap.from(project, {
                    scrollTrigger: {
                        trigger: project,
                        start: "top 85%",
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "power3.out"
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        gsap.to(target, { x: 20, duration: 0.3, ease: "power2.out" });
        gsap.to(target.querySelector('.project-arrow'), { x: 10, opacity: 1, duration: 0.3 });
        gsap.to(target.querySelector('.project-cat'), { opacity: 1, x: 0, duration: 0.3 });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        gsap.to(target, { x: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(target.querySelector('.project-arrow'), { x: 0, opacity: 0, duration: 0.3 });
        gsap.to(target.querySelector('.project-cat'), { opacity: 0.6, x: -10, duration: 0.3 });
    };

    return (
        <section ref={sectionRef} className="relative w-full min-h-screen bg-[#080808] text-white py-32 px-4 md:px-[10%] z-20">
            {/* Section Header */}
            <div className="mb-24 border-b border-white/10 pb-8 flex justify-between items-end">
                <h2 ref={titleRef} className="font-display text-5xl md:text-7xl font-bold tracking-tighter">
                    SELECTED <span className="text-transparent stroke-text">WORKS</span>
                </h2>
                <span className="hidden md:block text-xs tracking-widest opacity-50 mb-2">
                    (002) — RECENT PROJECTS
                </span>
            </div>

            {/* Projects List */}
            <div className="flex flex-col gap-0">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        ref={(el) => { if (el) projectRefs.current[index] = el; }}
                        className="group relative border-b border-white/10 py-12 cursor-pointer transition-colors hover:bg-white/5"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

                            {/* Left: Title & Year */}
                            <div className="flex items-baseline gap-6">
                                <span className="text-xs font-mono text-gray-500">0{project.id}</span>
                                <h3 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight group-hover:text-white transition-colors">
                                    {project.title}
                                </h3>
                            </div>

                            {/* Right: Category & Arrow */}
                            <div className="flex items-center gap-8 md:pr-8">
                                <div className="flex flex-col items-end text-right">
                                    <span className="project-cat text-xs tracking-widest uppercase text-gray-400 opacity-60 transform -translate-x-2 transition-all duration-300">
                                        {project.category}
                                    </span>
                                    <span className="text-[10px] text-gray-600 font-mono mt-1">{project.year}</span>
                                </div>

                                <div className="project-arrow opacity-0 transform translate-x-[-10px] transition-all duration-300 text-2xl text-white">
                                    →
                                </div>
                            </div>
                        </div>

                        {/* Hidden Description (Optional Reveal) */}
                        <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500 ease-in-out">
                            <p className="pt-4 pl-10 text-sm text-gray-400 max-w-md font-light">
                                {project.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* More Button */}
            <div className="mt-24 flex justify-center">
                <button className="px-8 py-4 border border-white/20 rounded-full text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300">
                    View All Projects
                </button>
            </div>
        </section>
    );
}
