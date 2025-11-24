// `src/components/FeaturedProjects.tsx`
import { TextAnimate } from "@/components/ui/text-animate"
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid"
import { LightRays } from "@/components/ui/light-rays"
import { FaCircleInfo } from "react-icons/fa6"

const projects = [
    {
        Icon: FaCircleInfo,
        name: "Project One",
        description: "Description of Project One",
        href: "#",
        cta: "Learn More",
        className: "col-span-full md:col-span-3 md:row-span-1 lg:min-h-[360px]",
        background: <LightRays />,
    },
    {
        Icon: FaCircleInfo,
        name: "Project Two",
        description: "Description of Project Two",
        href: "#",
        cta: "Learn More",
        className: "col-span-full md:col-span-1 md:row-span-1 lg:min-h-[300px]",
        background: <LightRays />,
    },
    {
        Icon: FaCircleInfo,
        name: "Project Three",
        description: "Description of Project Three",
        href: "#",
        cta: "Learn More",
        className: "col-span-full md:col-span-2 md:row-span-1",
        background: <LightRays />,
    },
    {
        Icon: FaCircleInfo,
        name: "Project Four",
        description: "Description of Project Four",
        href: "#",
        cta: "Learn More",
        className: "col-span-full md:col-span-2 md:row-span-1",
        background: <LightRays />,
    },
]

export default function FeaturedProjects() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2 p-6">
            <TextAnimate
                animation="blurInUp"
                as="h2"
                className="mb-6 mt-12 text-4xl font-bold sm:text-4xl md:text-4xl"
            >
                Featured Projects
            </TextAnimate>
            <BentoGrid className="mx-auto w-full max-w-6xl grid-cols-1 md:grid-cols-4 md:auto-rows-[minmax(220px,1fr)]">
                {projects.map((project, idx) => (
                    <BentoCard key={idx} {...project} />
                ))}
            </BentoGrid>
        </div>
    )
}
