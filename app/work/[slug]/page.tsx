import React from "react";
import ProjectDetail from "../../components/ProjectDetail";

// This would typically come from a CMS or database
const projectsData: Record<string, any> = {
    "ruilmijnwoning": {
        title: "RUILMIJNWONING",
        category: "WEB APP / PLATFORM",
        description: "Housing exchange platform solving rental waiting lists.",
        image: "/images/projects/ruilmijnwoning.png",
        url: "https://www.ruilmijnwoning.nl/",
        content: `Ruilmijnwoning is a Dutch housing exchange platform where tenants can swap homes with one another instead of moving through the normal rental waiting list. It solves a common problem in the social housing system, which is long wait times and limited availability.

    The platform features a smart matching algorithm, secure messaging, and a verified user system to ensure safe and efficient home swaps. By facilitating direct exchanges, we empower tenants to take control of their living situation.`
    },
    "retro-rise": {
        title: "RETRO RISE",
        category: "GAME DEV / ARCADE",
        description: "Fast-paced arcade survival game with streaks, challenges, and multiple worlds.",
        image: "/images/projects/retrorise.png",
        url: "https://fliply-dba75.web.app/",
        content: `Retro Rise (formerly Fliply) is a fast-paced arcade survival game where you tap to dodge obstacles, unlock skins, and push for higher scores across multiple worlds and game modes. It mixes the simplicity of classic arcade games with modern upgrades, streaks, and challenges.

    The game features multiple dynamic worlds, boss battles, and a competitive leaderboard system that keeps players engaged. It's designed for quick sessions but deep mastery.`
    },
    "newgen-marketing": {
        title: "NEWGEN MARKETING",
        category: "MARKETING / AGENCY",
        description: "Next-generation digital marketing agency platform.",
        image: "/images/projects/newgenmarketing.png",
        url: "https://new-gen-marketing.vercel.app/",
        content: `NewGen Marketing is a cutting-edge digital agency platform designed to elevate brands in the modern digital landscape. The site showcases a suite of marketing services through a premium, interactive interface.

    Built with performance and aesthetics in mind, the platform utilizes smooth transitions and engaging micro-interactions to demonstrate the agency's creative capabilities while providing a seamless user experience for potential clients.`
    },
    "icon-library": {
        title: "ICON LIBRARY",
        category: "RESOURCES / DESIGN",
        description: "A comprehensive, open-source icon collection for modern interfaces.",
        image: "/images/projects/iconlibrary.png",
        url: "https://iconlib.vercel.app/",
        content: `Icon Library is a vast collection of beautifully crafted SVG icons designed for modern web applications. The library focuses on consistency, clarity, and ease of integration for developers and designers.

    The project features a searchable interface, one-click copy functionality (JSX/SVG), and customization options. It serves as a go-to resource for rapid prototyping and production-ready designs.`
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
