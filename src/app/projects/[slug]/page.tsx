import { notFound } from "next/navigation";
import { getProject } from "@/lib/getProject";
import { mdxComponents } from "@/mdx-components"; // Import the components object
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Image from "next/image";
import {Tag} from "@/lib/tags";
import {TagPill} from "@/components/TagPill";
interface Frontmatter {
    title: string;
    date: string;
    description?: string;
    pinned: boolean;
    thumbnailUrl?: string;
    tags: Tag[];
    // Add an index signature to satisfy the constraint
    [key: string]: unknown;
}

export default async function ProjectPage({
                                              params,
                                          }: {
    params: Promise<{ slug: string }>
}) {
    const { slug }  = await params;
    const { frontmatter, content } = await getProject<Frontmatter>(slug, mdxComponents);

    if (!content) {
        return notFound();
    }


    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Setup breadcrumb with page name */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/projects">Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{frontmatter.title}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            {/* Project Thumbnail */}
            <Image src={frontmatter.thumbnailUrl || "/default/placeholder-thumbnail.jpg"} alt={"Thumbnail"} width={400} height={100} className="w-full h-auto max-h-100 rounded-md mt-4 mb-6 object-cover" />
            {/* Project title */}
            <h1 className="text-4xl font-bold">{frontmatter.title}</h1>
            {/* Project date */}
            <p className="text-sm text-gray-500 mb-2">{new Date(frontmatter.date).toLocaleDateString()}</p>
            {/* Project tags */}
            <div className="flex flex-row flex-wrap gap-2 mb-6">
                {frontmatter.tags && frontmatter.tags.map((tag) => (
                    <TagPill tag={tag} key={tag} />
                ))}
            </div>
            {/* Project content */}
            <article>{content}</article>
        </main>
    );
}
