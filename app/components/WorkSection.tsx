"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const projects = [
    {
        id: 1,
        title: "RUILMIJNWONING",
        category: "WEB APP / PLATFORM",
        description: "Housing exchange platform solving rental waiting lists.",
        image: "/images/projects/ruilmijnwoning.png",
        slug: "ruilmijnwoning"
    },
    {
        id: 2,
        title: "RETRO RISE",
        category: "GAME DEV / ARCADE",
        description: "Fast-paced arcade survival game with streaks, challenges, and multiple worlds.",
        image: "/images/projects/retrorise.png",
        slug: "retro-rise"
    },
    {
        id: 3,
        title: "NEWGEN MARKETING",
        category: "MARKETING / AGENCY",
        description: "Next-generation digital marketing agency platform.",
        image: "/images/projects/newgenmarketing.png",
        slug: "newgen-marketing"
    },
    {
        id: 4,
        title: "ICON LIBRARY",
        category: "RESOURCES / DESIGN",
        description: "A comprehensive, open-source icon collection for modern interfaces.",
        image: "/images/projects/iconlibrary.png",
        slug: "icon-library"
    }
];

export default function WorkSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    const [activeImage, setActiveImage] = useState<string | null>(null);

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

    // Mouse move handler for the floating image
    useEffect(() => {
        const moveImage = (e: MouseEvent) => {
            if (!imageContainerRef.current) return;

            // Calculate position relative to the viewport
            const x = e.clientX;
            const y = e.clientY;

            gsap.to(imageContainerRef.current, {
                x: x,
                y: y,
                duration: 0.4,
                ease: "power2.out"
            });
        };

        window.addEventListener("mousemove", moveImage);
        return () => window.removeEventListener("mousemove", moveImage);
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, image: string) => {
        setActiveImage(image);
        const target = e.currentTarget;
        gsap.to(target, { x: 20, duration: 0.3, ease: "power2.out" });
        gsap.to(target.querySelector('.project-arrow'), { x: 10, opacity: 1, duration: 0.3 });
        gsap.to(target.querySelector('.project-cat'), { opacity: 1, x: 0, duration: 0.3 });

        // Scale up image container
        if (imageContainerRef.current) {
            gsap.to(imageContainerRef.current, { scale: 1, opacity: 1, duration: 0.3 });
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        setActiveImage(null);
        const target = e.currentTarget;
        gsap.to(target, { x: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(target.querySelector('.project-arrow'), { x: 0, opacity: 0, duration: 0.3 });
        gsap.to(target.querySelector('.project-cat'), { opacity: 0.6, x: -10, duration: 0.3 });

        // Scale down image container
        if (imageContainerRef.current) {
            gsap.to(imageContainerRef.current, { scale: 0, opacity: 0, duration: 0.3 });
        }
    };

    return (
        <section id="work" ref={sectionRef} className="relative w-full min-h-screen bg-[#080808] text-white py-32 px-4 md:px-[10%] z-20">

            {/* Floating Image Container */}
            <div
                ref={imageContainerRef}
                className="fixed top-0 left-0 w-[400px] h-[300px] pointer-events-none z-50 hidden md:block mix-blend-difference overflow-hidden rounded-lg transform -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0"
            >
                {activeImage && (
                    <div className="relative w-full h-full">
                        <Image
                            src={activeImage}
                            alt="Project Preview"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-blue-500/20 mix-blend-overlay"></div>
                    </div>
                )}
            </div>

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
                    <Link href={`/work/${project.slug}`} key={project.id} passHref>
                        <div
                            ref={(el) => { if (el) projectRefs.current[index] = el; }}
                            className="group relative border-b border-white/10 py-12 cursor-pointer transition-colors hover:bg-white/5"
                            onMouseEnter={(e) => handleMouseEnter(e, project.image)}
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
                    </Link>
                ))}
            </div>


        </section>
    );
}
