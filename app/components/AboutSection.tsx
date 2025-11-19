"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bgTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Background Text
            gsap.to(bgTextRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
                x: "-20%",
                ease: "none"
            });

            // Content Reveal
            gsap.from(contentRef.current?.children || [], {
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const skills = [
        { name: "React", category: "Core" },
        { name: "Next.js", category: "Framework" },
        { name: "TypeScript", category: "Language" },
        { name: "GSAP", category: "Animation" },
        { name: "Tailwind", category: "Styling" },
        { name: "Three.js", category: "WebGL" },
        { name: "Figma", category: "Design" },
        { name: "Azure", category: "DevOps" },
    ];

    return (
        <section id="about" ref={sectionRef} className="relative w-full min-h-screen bg-[#080808] text-white py-32 px-4 md:px-[10%] z-20 overflow-hidden flex items-center justify-center">

            {/* Background Parallax Text */}
            <div ref={bgTextRef} className="absolute top-1/2 left-0 transform -translate-y-1/2 whitespace-nowrap pointer-events-none opacity-[0.03] z-0">
                <span className="font-display font-bold text-[40vw] leading-none">DEVELOPER</span>
            </div>

            <div ref={contentRef} className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">

                {/* Left: Title & Bio */}
                <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="h-px w-12 bg-white/50" />
                        <span className="text-xs tracking-[0.2em] uppercase opacity-80">Who I Am</span>
                    </div>

                    <h2 className="font-display text-5xl md:text-7xl font-bold leading-[0.9] mb-12">
                        CODE <span className="text-gray-600">&</span> <br />
                        <span className="text-transparent stroke-text">CREATIVITY</span>
                    </h2>

                    <div className="space-y-8 text-lg md:text-xl font-light text-gray-400 leading-relaxed max-w-2xl">
                        <p>
                            I am a <span className="text-white font-medium">Frontend Software Developer</span> who doesn&apos;t just write code—I architect digital experiences.
                        </p>
                        <p>
                            Specializing in <span className="text-white">React</span> and <span className="text-white">Next.js</span>, I build applications that are as performant as they are beautiful. My mission is to bridge the gap between rigid engineering and fluid design.
                        </p>
                    </div>
                </div>

                {/* Right: Tech Stack / Stats */}
                <div className="md:col-span-5 flex flex-col justify-center w-full">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl w-full">
                        <h3 className="font-display text-xl font-bold mb-8 flex items-center gap-3">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            TECH STACK
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            {skills.map((skill, index) => (
                                <div key={index} className="group flex flex-col p-4 border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-lg cursor-default">
                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{skill.category}</span>
                                    <span className="font-sans text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{skill.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center text-xs text-gray-500 font-mono">
                            <span>LOCATION: CYBERSPACE</span>
                            <span>AVAILABLE FOR HIRE</span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
