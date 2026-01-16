"use client";
import {useState, useMemo} from "react";
import type { ProjectMeta } from "@/lib/getProject";
import {Tag} from "@/lib/tags";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { FaFilter } from "react-icons/fa6";
import {Button} from "@/components/ui/button";
import React from "react";
import {useEffect, useRef} from "react";
import ProjectList from "@/components/ProjectList";


export const SearchKeyboardShortcut = (onKeyPressed: () => void) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                onKeyPressed();
            }
        }
        console.log("Adding keyboard shortcut listener");
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            console.log("Removing keyboard shortcut listener");
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onKeyPressed]);

    return null;
}

export default function ProjectView({projects }: {projects: ProjectMeta[]}) {
    const [query, setQuery] = useState("");
   const [filteredProjects, setFilteredProjects] = useState<ProjectMeta[]>(projects);
    const [filteredTags, setFilteredTags] = useState<Tag[]|null>(null);
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const allTags = useMemo(() => {
        const tagSet = new Set<Tag>();
        projects.forEach(project => {
            project.tags?.forEach(tag => tagSet.add(tag));
        });
        return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
    }, [projects]);

    const toggleTag = (tag: Tag) => {
        setFilteredTags(prev => {
            if (!prev) {
                return [tag];
            }
            return prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag];
        });
    };

    useEffect(() => {
        const q = query.toLowerCase();

        const filterFunc = (project: ProjectMeta) => {
            const matchesQuery =
                project.title.toLowerCase().includes(q) ||
                project.description.toLowerCase().includes(q) ||
                project.tags?.some(tag => tag.toLowerCase().includes(q));
            const matchesTags =
                !filteredTags ||
                filteredTags.length === 0 ||
                (project.tags && filteredTags.some(tag => project.tags!.includes(tag)));
            return matchesQuery && matchesTags;
        };

        if (q === "" && (!filteredTags || filteredTags.length === 0)) {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(filterFunc));
        }
    }, [query, filteredTags, projects]);


    const updateSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }

    const handleSearchShortcut = () => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }

    SearchKeyboardShortcut(handleSearchShortcut);

    return (
        <div>
            <div className='w-full mb-4 flex gap-3 items-stretch'>
                <div className='relative flex-1'>
                    <Input
                        id='project-search'
                        type='search'
                        placeholder='Search...'
                        value={query}
                        onChange={(e) => updateSearch(e)}
                        className='peer h-11 pr-11 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none'
                        ref={searchInputRef}
                    />
                    <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center justify-center pr-3 peer-disabled:opacity-50'>
                        <kbd className='text-muted-foreground bg-accent inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium'>
                            ⌘k
                        </kbd>
                    </div>
                </div>
                <Button
                    variant='secondary'
                    aria-label='Filter projects'
                    className='h-11 w-11 shrink-0 justify-center rounded-full border border-border/60'
                    onClick={() => setFilterMenuOpen(!filterMenuOpen)}>
                    <FaFilter className='h-4 w-4' />
                </Button>
            </div>
            {filterMenuOpen && (
                <div className='mb-4 rounded-lg border border-border/60 bg-card/50 p-4'>
                    <Label className='mb-3 block text-sm font-semibold text-foreground'>Filter by tags</Label>
                    <div className='flex flex-wrap gap-2'>
                        {allTags.length ? (
                            allTags.map(tag => {
                                const isActive = filteredTags?.includes(tag);
                                return (
                                    <button
                                        key={tag}
                                        type='button'
                                        onClick={() => toggleTag(tag)}
                                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition ${
                                            isActive
                                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                                : "border-border/70 bg-muted/60 text-muted-foreground hover:bg-muted"
                                        }`}>
                                        {tag}
                                    </button>
                                );
                            })
                        ) : (
                            <p className='text-sm text-muted-foreground'>No tags available.</p>
                        )}
                    </div>
                </div>
            )}
            <ProjectList projects={filteredProjects} pinned={false} />
        </div>
    );
}