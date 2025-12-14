import { notFound } from "next/navigation";
import { getProject } from "@/lib/getProject";
import { mdxComponents } from "@/mdx-components";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { Tag } from "@/lib/tags";
import { TagPill } from "@/components/TagPill";
import { FaRegClock } from "react-icons/fa";
import { TOC } from "@/components/TOC";

interface Frontmatter {
    title: string;
    date: string;
    description?: string;
    pinned: boolean;
    thumbnailUrl?: string;
    tags: Tag[];
    [key: string]: unknown;
}

export default async function ProjectPage({
                                              params,
                                          }: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const { frontmatter, content, time, toc } = await getProject<Frontmatter>(slug, mdxComponents);
    const timeMinutes = time ? Math.ceil(time.minutes) : null;

    if (!content) {
        return notFound();
    }

    return (
        <main>
            {/* Hero section - full width */}
            <div className="relative w-full h-[70vh] min-h-[28rem] overflow-hidden">
                {/* Background image */}
                <Image
                    src={frontmatter.thumbnailUrl || "/default/placeholder-thumbnail.jpg"}
                    alt={"Thumbnail"}
                    fill
                    className="object-cover object-top"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-12 max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <Breadcrumb id="top" className="mb-6">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/" className="text-gray-300 hover:text-white">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-gray-400" />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/projects" className="text-gray-300 hover:text-white">Projects</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="text-gray-400" />
                            <BreadcrumbItem>
                                <BreadcrumbPage className="text-white">{frontmatter.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    {/* Project title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
                        {frontmatter.title}
                    </h1>

                    {/* Date and reading time */}
                    <div className="flex flex-row items-center gap-4 mb-4">
                        <p className="text-base text-gray-200">
                            {new Date(frontmatter.date).toLocaleDateString()}
                        </p>
                        {time && (
                            <div className="flex items-center gap-1 text-base text-gray-200">
                                <FaRegClock />
                                <p>{timeMinutes}m read</p>
                            </div>
                        )}
                    </div>

                    {/* Project tags */}
                    <div className="flex flex-row flex-wrap gap-2">
                        {frontmatter.tags && frontmatter.tags.map((tag) => (
                            <TagPill tag={tag} key={tag} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Content section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Table of Contents */}
                <TOC toc={toc} />

                {/* Project content */}
                <article>{content}</article>
            </div>
        </main>
    );

}
