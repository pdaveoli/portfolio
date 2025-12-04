import type {ProjectMeta} from "@/lib/getProject";
import Link from "next/link";
import Image from "next/image";
import {TagPill} from "@/components/TagPill";
import React from "react";


export default function ProjectList({projects, pinned}: { projects: ProjectMeta[], pinned?: boolean }) {
    return (
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project)  => (
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
                    <p className="text-gray-600 mb-4">{project.description} {pinned}</p>
                </Link>
            ))}
        </div>
    )
}