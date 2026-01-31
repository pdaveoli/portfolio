import { TextAnimate } from "@/components/ui/text-animate"
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { FaCircleInfo } from "react-icons/fa6"
import { TagPill } from "@/components/TagPill";
import { Tag } from "@/lib/tags";
import { getProject } from "@/lib/getProject";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

interface Frontmatter {
    title: string;
    date: string;
    description?: string;
    pinned: boolean;
    thumbnailUrl?: string;
    tags: Tag[];
    [key: string]: unknown;
}

interface BentoItem {
    title: string;
    tags: Tag[];
    description: string;
    header: ReactNode;
    className: string;
    icon: ReactNode;
    slug?: string;
    isWide?: boolean;
}

const featuredProjectConfigs = [
    { slug: "freestream", className: "md:col-span-2", isWide: true },
    { slug: "tinyletters", className: "md:col-span-1", isWide: false },
    { slug: "portfolio", className: "md:col-span-2", isWide: true },
];

async function getFeaturedItems(): Promise<BentoItem[]> {
    const items: BentoItem[] = [];

    for (const config of featuredProjectConfigs) {
        const { frontmatter } = await getProject<Frontmatter>(config.slug);
        items.push({
            title: frontmatter.title,
            tags: frontmatter.tags,
            description: frontmatter.description || "",
            header: frontmatter.thumbnailUrl ? (
                <div className={`w-full min-h-50 relative rounded-md overflow-hidden mb-4 flex items-center justify-center aspect-video ${!config.isWide ? 'md:aspect-[3/4]' : ''}`}>
                    <Image src={frontmatter.thumbnailUrl} alt={frontmatter.title} fill className="object-cover object-top" />
                </div>
            ) : (
                <Skeleton />
            ),
            className: config.className,
            icon: <FaCircleInfo className="h-4 w-4 text-neutral-500" />,
            slug: config.slug,
            isWide: config.isWide,
        });
    }

    return items;
}

export default async function FeaturedProjects() {
    const items = await getFeaturedItems();

    const descriptionSection = (tags: Tag[], description: string) => (
        <div className="flex flex-wrap flex-col gap-2">
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <TagPill key={i} tag={tag} />
                ))}
            </div>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
        </div>
    );

    return (
        <div id="featuredProjects" className="flex bg-accent/40 min-h-screen w-full flex-col items-center justify-center gap-2 p-2">
            <TextAnimate
                animation="blurInUp"
                as="h2"
                className="mb-6 mt-12 text-4xl font-bold sm:text-4xl md:text-4xl"
                once={true}
            >
                Featured Projects
            </TextAnimate>
            <BentoGrid className="max-w-6xl w-full mx-auto md:auto-rows-[30rem]">
                {items.map((item, i) => (
                    <Link key={i} href={`/projects/${item.slug}`} className={item.className}>
                        <BentoGridItem
                            title={item.title}
                            description={descriptionSection(item.tags, item.description)}
                            header={item.header}
                            className="h-full"
                            icon={item.icon}
                        />
                    </Link>
                ))}
            </BentoGrid>

        </div>
    );
}
