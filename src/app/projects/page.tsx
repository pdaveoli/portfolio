import { getAllProjects } from "@/lib/getProject";
import Link from "next/link";
import Image from "next/image";
import {TagPill} from "@/components/TagPill";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export default async function ProjectsPage() {
    const projects = await getAllProjects();
    const pinnedProjects = projects.filter(project => project.pinned);
    const otherProjects = projects.filter(project => !project.pinned);

    return (
        <main className="min-h-screen p-12">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink>Projects</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-4xl font-bold mb-8">Projects</h1>

            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pinnedProjects.map((project)  => (
                    <Link href={`/projects/${project.slug}`} key={project.slug} className="border rounded-lg p-4 shadow-lg ">
                        <div className="w-full min-h-50 aspect-video relative rounded-md overflow-hidden mb-4 flex items-center justify-center">
                            <Image
                                src={project.thumbnailUrl || "/default/placeholder-thumbnail.jpg"}
                                alt={"Thumbnail for " + project.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                        <p className="text-sm text-gray-300 font-light mb-2">{new Date(project.date).toLocaleDateString()}</p>
                        <div className="flex flex-row flex-wrap gap-2 mb-4">
                            {project.tags && project.tags.map((tag) => (
                                <TagPill tag={tag} key={tag} />
                            ))}
                        </div>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                    </Link>
                ))}
                {otherProjects.map((project) => (
                    <Link href={`/projects/${project.slug}`} key={project.slug} className="border rounded-lg p-4 shadow-lg ">
                        <div className="w-full min-h-50 aspect-video relative rounded-md overflow-hidden mb-4 flex items-center justify-center">
                            <Image
                                src={project.thumbnailUrl || "/default/placeholder-thumbnail.jpg"}
                                alt={"Thumbnail for " + project.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h2 className="text-2xl font-semibold mb-1">{project.title}</h2>
                        <p className="text-sm text-gray-300 font-light mb-2">{new Date(project.date).toLocaleDateString()}</p>
                        <div className="flex flex-row flex-wrap gap-2 mb-4">
                            {project.tags && project.tags.map((tag) => (
                                <TagPill tag={tag} key={tag} />
                            ))}
                        </div>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                    </Link>
                ))}
            </div>
        </main>
    );
}
