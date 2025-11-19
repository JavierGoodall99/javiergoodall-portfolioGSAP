"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const skillsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text Reveal
            gsap.from(textRef.current, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            });

            // Skills Stagger
            const skills = skillsRef.current?.querySelectorAll(".skill-item");
            if (skills) {
                gsap.from(skills, {
                    scrollTrigger: {
                        trigger: skillsRef.current,
                        start: "top 85%",
                    },
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out"
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const skills = [
        "React / Next.js", "TypeScript / JavaScript", "Figma",
        "GSAP", "Tailwind CSS", "ShadCN UI",
        "Git", "Azure DevOps"
    ];

    return (
        <section id="about" ref={sectionRef} className="relative w-full min-h-screen bg-[#080808] text-white py-32 px-4 md:px-[10%] z-20 overflow-hidden flex items-center">

            <div className="w-full max-w-4xl mx-auto">

                {/* Content */}
                <div className="flex flex-col justify-center">
                    <div ref={textRef}>
                        <div className="flex items-center gap-4 mb-8">
                            <span className="h-px w-12 bg-white/50" />
                            <span className="text-xs tracking-[0.2em] uppercase opacity-80">About The Developer</span>
                        </div>

                        <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-8">
                            DIGITAL <br />
                            <span className="text-transparent stroke-text">ALCHEMY</span>
                        </h2>

                        <p className="text-gray-400 leading-relaxed mb-8 font-light text-lg">
                            I am a Frontend Software Developer specialized in building scalable, high-performance web applications.
                            My focus is on bridging the gap between design and engineering using modern technologies like React, Next.js, and TypeScript.
                        </p>

                        <p className="text-gray-400 leading-relaxed mb-12 font-light text-lg">
                            With a strong foundation in UI/UX principles and a mastery of tools like Figma and GSAP, I craft digital experiences that are not only functional but visually stunning.
                            I leverage Azure DevOps and Git for robust CI/CD pipelines and efficient collaboration.
                        </p>
                    </div>

                    {/* Skills Grid */}
                    <div ref={skillsRef}>
                        <h3 className="text-sm font-bold tracking-widest uppercase mb-6 border-b border-white/10 pb-2 inline-block">
                            Technical Arsenal
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {skills.map((skill, index) => (
                                <div key={index} className="skill-item flex items-center gap-2 text-sm text-gray-300">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
