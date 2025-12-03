import { compileMDX, MDXRemoteProps } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Tag } from "./tags"

export interface ProjectMeta {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: Tag[];
    thumbnailUrl?: string;
    pinned: boolean;
}



export async function getAllProjects(): Promise<ProjectMeta[]> {
    const projectsDir = path.join(process.cwd(), "src/projects-md");
    const files = fs.readdirSync(projectsDir);

    const projects = files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => {
            const slug = file.replace(/\.mdx$/, "");
            const filePath = path.join(projectsDir, file);
            const fileContent = fs.readFileSync(filePath, "utf8");
            const { data } = matter(fileContent);

            return {
                slug,
                ...(data as Omit<ProjectMeta, "slug">),
            };
        })
        .sort((a, b) => {
            // Sort by pinned first, then by date (newest first)
            if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    return projects;
}

export async function getProject<TFrontmatter extends Record<string, unknown>>(
    slug: string,
    components?: MDXRemoteProps['components']
) {
    const filePath = path.join(process.cwd(), "src/projects-md/", `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Use gray-matter to extract frontmatter
    const { data: frontmatter, content: mdxContent } = matter(fileContent);

    // Compile the MDX content without frontmatter
    const { content } = await compileMDX<TFrontmatter>({
        source: mdxContent,
        components,
        options: {
            parseFrontmatter: false, // We already parsed it
            mdxOptions: {
                remarkPlugins: [],
                rehypePlugins: [],
            },
        },
    });

    console.log("Frontmatter:", frontmatter);
    return { content, frontmatter: frontmatter as TFrontmatter };
}
