import React from "react";
import ProjectDetail from "../../components/ProjectDetail";

// This would typically come from a CMS or database
const projectsData: Record<string, any> = {
    "fliply": {
        title: "FLIPLY",
        category: "GAME DEV / ARCADE",
        year: "2024",
        description: "Fast-paced arcade survival game with streaks, challenges, and multiple worlds.",
        image: "/images/fliply.png",
        content: `Fliply is a fast paced arcade survival game where you tap to dodge obstacles, unlock skins, and push for higher scores across multiple worlds and game modes. It mixes the simplicity of Flappy Bird with modern upgrades, streaks, and challenges, turning quick runs into addictive one more try moments.
    
    The game features multiple dynamic worlds, boss battles, and a competitive leaderboard system that keeps players engaged.`
    },
    "ruilmijnwoning": {
        title: "RUILMIJNWONING",
        category: "WEB APP / PLATFORM",
        year: "2024",
        description: "Housing exchange platform for social housing swaps.",
        image: "/images/ruilmijnwoning.png",
        content: `Ruilmijnwoning is a Dutch housing exchange platform where tenants can swap homes with one another instead of moving through the normal rental waiting list. It solves a common problem in the social housing system, which is long wait times and limited availability.
    
    The platform features a smart matching algorithm, secure messaging, and a verified user system to ensure safe and efficient home swaps. By facilitating direct exchanges, we empower tenants to take control of their living situation.`
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
