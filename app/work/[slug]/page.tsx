import React from "react";
import ProjectDetail from "../../components/ProjectDetail";

// This would typically come from a CMS or database
const projectsData: Record<string, any> = {
    "neural-symphony": {
        title: "NEURAL SYMPHONY",
        category: "WEBGL / INTERACTIVE",
        year: "2024",
        description: "A real-time audio visualizer using Three.js and WebAudio API.",
        image: "/images/neural-symphony.png",
        content: `Neural Symphony represents the convergence of auditory and visual perception. By leveraging the WebAudio API, we analyze audio frequencies in real-time and map them to a particle system built with Three.js.
    
    The challenge was to create a visualizer that feels organic rather than mechanical. We achieved this by using Perlin noise to influence particle movement, creating fluid, wave-like structures that react dynamically to bass and treble frequencies.
    
    The result is an immersive experience where users can 'see' the music, exploring a 3D space that pulses and shifts with every beat.`
    },
    "cyberpunk-archives": {
        title: "CYBERPUNK ARCHIVES",
        category: "UI/UX / DEVELOPMENT",
        year: "2023",
        description: "Immersive storytelling platform with glitched aesthetics.",
        image: "/images/cyberpunk-archives.png",
        content: `Cyberpunk Archives is a digital anthology of dystopian narratives. The design philosophy centers on 'controlled chaos'—using glitch effects, chromatic aberration, and terminal-like typography to immerse the user in a high-tech, low-life atmosphere.
    
    Key features include a custom CRT monitor shader effect, non-linear navigation, and hidden easter eggs that unlock supplementary lore. The site was built with Next.js for performance, ensuring that the heavy visual effects don't compromise load times.`
    },
    "aether-lens": {
        title: "AETHER LENS",
        category: "CREATIVE DEV",
        year: "2023",
        description: "Photography portfolio featuring liquid distortion effects.",
        image: "/images/aether-lens.png",
        content: `Aether Lens is a portfolio designed for a conceptual photographer. The goal was to treat the interface itself as a lens, distorting and refracting the content beneath it.
    
    We implemented a custom WebGL distortion pass that reacts to mouse movement, creating a liquid-like trail that warps images as you hover over them. This adds a tactile, ethereal quality to the browsing experience, perfectly mirroring the artist's surrealist style.`
    },
    "void-commerce": {
        title: "VOID COMMERCE",
        category: "E-COMMERCE",
        year: "2022",
        description: "Minimalist shopping experience with micro-interactions.",
        image: "/images/void-commerce.png",
        content: `Void Commerce strips away the noise of traditional e-commerce. It embraces negative space, stark typography, and subtle micro-interactions to create a premium shopping experience.
    
    The focus is on the product. We used smooth page transitions and a persistent cart state to make navigation feel seamless. The 'Add to Cart' interaction features a custom particle explosion effect, adding a moment of delight to the conversion point.`
    }
};

export async function generateStaticParams() {
    return Object.keys(projectsData).map((slug) => ({
        slug,
    }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projectsData[slug];

    if (!project) {
        return <div className="text-white pt-32 text-center">Project not found</div>;
    }

    return <ProjectDetail {...project} />;
}
