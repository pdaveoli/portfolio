import { TextAnimate } from "@/components/ui/text-animate"
import { Badge } from "@/components/ui/badge"
import {BentoGrid, BentoGridItem} from "@/components/ui/bento-grid";
import { FaCircleInfo } from "react-icons/fa6"
import {RainbowButton} from "@/components/ui/rainbow-button";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
const items = [
    {
        title: "Project 1",
        description: (
            <>
                <div className="flex flex-row items-center gap-2">
                    <Badge className="border border-sky-500/40 bg-sky-500/10 text-sky-500">
                        React.JS
                    </Badge>
                    <Badge className="border border-indigo-500/40 bg-indigo-500/10 text-indigo-500">
                        TypeScript
                    </Badge>
                    <Badge className="border border-emerald-500/40 bg-emerald-500/10 text-emerald-500">
                        TailwindCSS
                    </Badge>
                </div>
                <p className="mt-2">
                    A project description with technology badges.
                </p>
            </>
        ),
        header: <Skeleton />,
        className: "md:col-span-2",
        icon: <FaCircleInfo className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Project 2",
        description: (
            <>
                <div className="flex flex-row items-center gap-2">
                    <Badge className="border border-sky-500/40 bg-sky-500/10 text-sky-500">
                        React.JS
                    </Badge>
                    <Badge className="border border-indigo-500/40 bg-indigo-500/10 text-indigo-500">
                        TypeScript
                    </Badge>
                    <Badge className="border border-emerald-500/40 bg-emerald-500/10 text-emerald-500">
                        TailwindCSS
                    </Badge>
                </div>
                <p className="mt-2">
                    A project description with technology badges.
                </p>
            </>
        ),
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <FaCircleInfo className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Project 3",
        description: (
            <>
                <div className="flex flex-row items-center gap-2">
                    <Badge className="border border-sky-500/40 bg-sky-500/10 text-sky-500">
                        React.JS
                    </Badge>
                    <Badge className="border border-indigo-500/40 bg-indigo-500/10 text-indigo-500">
                        TypeScript
                    </Badge>
                    <Badge className="border border-emerald-500/40 bg-emerald-500/10 text-emerald-500">
                        TailwindCSS
                    </Badge>
                </div>
                <p className="mt-2">
                    A project description with technology badges.
                </p>
            </>
        ),
        header: <Skeleton />,
        className: "md:col-span-1",
        icon: <FaCircleInfo className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Project 4",
        description:
            (
                <>
                    <div className="flex flex-row items-center gap-2">
                        <Badge className="border border-sky-500/40 bg-sky-500/10 text-sky-500">
                            React.JS
                        </Badge>
                        <Badge className="border border-indigo-500/40 bg-indigo-500/10 text-indigo-500">
                            TypeScript
                        </Badge>
                        <Badge className="border border-emerald-500/40 bg-emerald-500/10 text-emerald-500">
                            TailwindCSS
                        </Badge>
                    </div>
                    <p className="mt-2">
                        A project description with technology badges.
                    </p>
                </>
            ),
        header: <Skeleton />,
        className: "md:col-span-2",
        icon: <FaCircleInfo className="h-4 w-4 text-neutral-500" />,
    },
];


export default function FeaturedProjects() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-2 p-6">
            <TextAnimate
                animation="blurInUp"
                as="h2"
                className="mb-6 mt-12 text-4xl font-bold sm:text-4xl md:text-4xl"
                once={true}
            >
                Featured Projects
            </TextAnimate>
            <BentoGrid className="max-w-6xl w-full mx-auto md:auto-rows-[20rem]">
                {items.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        className={item.className}
                        icon={item.icon}
                    />
                ))}
            </BentoGrid>
            <RainbowButton variant="outline" className="mt-5 mb-6" asChild>
                <Link href="/projects">
                    All Projects <FaArrowRight />
                </Link>
            </RainbowButton>
        </div>
    )
}
