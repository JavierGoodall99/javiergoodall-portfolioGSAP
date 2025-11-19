"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);

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

            // Link Animation
            gsap.from(linkRef.current, {
                scrollTrigger: {
                    trigger: linkRef.current,
                    start: "top 85%",
                },
                scale: 0.9,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "elastic.out(1, 0.5)"
            });

            // Footer Animation
            gsap.from(footerRef.current, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 95%",
                },
                y: 20,
                opacity: 0,
                duration: 1,
                delay: 0.4,
                ease: "power2.out"
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;
        gsap.to(target, { scale: 1.1, duration: 0.3, ease: "power2.out" });
        gsap.to(target.querySelector('.arrow'), { x: 10, y: -10, duration: 0.3 });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;
        gsap.to(target, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(target.querySelector('.arrow'), { x: 0, y: 0, duration: 0.3 });
    };

    return (
        <section id="contact" ref={sectionRef} className="relative w-full min-h-[80vh] bg-[#080808] text-white flex flex-col justify-between pt-32 px-4 md:px-[10%] pb-12 overflow-hidden">

            {/* Background Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />

            <div className="flex-grow flex flex-col justify-center items-center text-center z-10">
                <div className="overflow-hidden mb-8">
                    <h2 ref={titleRef} className="font-display text-5xl md:text-8xl font-bold tracking-tighter">
                        HAVE AN <span className="text-transparent stroke-text">IDEA?</span>
                    </h2>
                </div>

                <a
                    ref={linkRef}
                    href="mailto:hello@javiergoodall.dev"
                    className="group relative inline-flex items-center gap-4 text-2xl md:text-4xl font-light tracking-widest hover:text-gray-300 transition-colors"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <span className="border-b border-white/30 pb-2 group-hover:border-white transition-colors">hello@javiergoodall.dev</span>
                    <span className="arrow text-2xl transition-transform duration-300">↗</span>
                </a>
            </div>

            {/* Footer / Socials */}
            <div ref={footerRef} className="flex flex-col md:flex-row justify-between items-end md:items-center border-t border-white/10 pt-8 z-10 gap-8 md:gap-0">

                <div className="flex flex-col">
                    <span className="font-display font-bold text-xl tracking-tight">JG©</span>
                    <span className="text-xs text-gray-500 mt-1">DESIGNED & DEVELOPED IN 2025</span>
                </div>

                <div className="flex gap-8 text-xs tracking-widest uppercase">
                    {['LINKEDIN', 'GITHUB', 'TWITTER', 'INSTAGRAM'].map((social) => (
                        <a key={social} href="#" className="hover:text-gray-400 transition-colors relative group">
                            {social}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>

                <button
                    className="hidden md:block text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    Back to Top ↑
                </button>

            </div>
        </section>
    );
}
