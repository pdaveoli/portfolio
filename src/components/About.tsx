import {Button} from "@/components/ui/button";
import {getMostRecentProjects} from "@/lib/getProject";
import {Music, ArrowRight, Dumbbell, Activity} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FloatingBackground } from "@/components/AboutBackground";
import {PiStudent} from "react-icons/pi";
import Link from "next/link";
import { TagPill} from "@/components/TagPill";
import { Tag } from "@/lib/tags";
export default async function AboutPage() {
    const projects = await getMostRecentProjects(1);
    const latestProject = projects[0];
    return (
        <section className="relative w-screen mx-auto py-20 md:py-40 px-4 min-h-screen flex items-center justify-center overflow-hidden" id="about">
            <FloatingBackground />

            {/* The Bento Box Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl">

                {/* CARD 1: The Elevator Pitch (Spans 2 columns, 2 rows) */}
                <Card className="md:col-span-2 md:row-span-2 flex flex-col justify-center border-muted bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-4xl font-bold tracking-tight">A Passionate Web & Game Developer</CardTitle>
                        <CardDescription className="text-lg mt-4 leading-relaxed">
                            I&#39;m Oliver, a teen developer who builds high-performance applications with Next.js and creates immersive experiences in Unity. I love turning complex problems into clean, usable software.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4 mt-2">
                        <Button asChild><Link href="/projects">See Projects</Link></Button>
                        <Button variant="secondary" asChild><Link href="#contact">Contact Me</Link></Button>
                    </CardContent>
                </Card>

                {/* CARD 2: Currently Building (Top Right) */}
                <Card className="md:col-span-1 flex flex-col justify-center border-muted bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
                            <span className="text-xs font-medium text-emerald-500 uppercase tracking-wider">Currently Building</span>
                        </div>
                        <CardTitle className="text-xl">LyricAnnotator</CardTitle>
                        <CardDescription className="mt-2">
                            A song lyric annotation platform focused on unpacking mental health themes in music.
                        </CardDescription>
                    </CardHeader>
                </Card>

                {/* CARD 3: Tech Stack (Middle Right) */}
                <Card className="md:col-span-1 flex flex-col justify-center border-muted bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">My Stack</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                        <TagPill tag={"Next.Js"}/>
                        <TagPill tag={"React.Js"}/>
                        <TagPill tag={"Tailwind CSS"}/>
                        <TagPill tag={"Unity"} />
                        <TagPill tag={"GitHub"} />
                        <TagPill tag={"Itch.io"} />
                    </CardContent>
                </Card>

                {/* CARD 4: Stats & Hobbies (Bottom Left & Middle) */}
                <Card className="md:col-span-2 flex flex-col justify-center border-muted bg-card/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-xl">Beyond the Screen</CardTitle>
                        <CardDescription>When I&#39;m not writing code or debugging CSS.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                        <div className="flex flex-col items-center justify-center p-4 bg-muted/40 rounded-xl">
                            <Music className="w-6 h-6 mb-2 text-primary" />
                            <span className="text-sm font-medium">Guitarist</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-muted/40 rounded-xl">
                            <Activity className="w-6 h-6 mb-2 text-primary" />
                            <span className="text-sm font-medium">Tennis</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-muted/40 rounded-xl">
                            <Dumbbell className="w-6 h-6 mb-2 text-primary" />
                            <span className="text-sm font-medium">Gym</span>
                        </div>
                        <div className="flex flex-col items-center justify-center p-4 bg-muted/40 rounded-xl">
                            <PiStudent className="w-6 h-6 mb-2 text-primary" />
                            <span className="text-sm font-medium">Student</span>
                        </div>
                    </CardContent>
                </Card>

                {/* CARD 5: Latest MDX Teaser (Bottom Right) */}
                {latestProject && (
                    <Link href={"/projects/" + latestProject.slug}>
                        <Card className="md:col-span-1 flex flex-col justify-between group cursor-pointer hover:border-primary/50 transition-colors border-muted bg-card/50 backdrop-blur-sm overflow-hidden">
                            <CardHeader>
                                <CardDescription>Latest Project</CardDescription>
                                <CardTitle className="text-xl mt-1 group-hover:text-primary transition-colors flex items-center justify-between">
                                    {latestProject.title} <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-3">
                                    {latestProject.description}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                    )}

            </div>
        </section>
    );
}
/*
export default function AboutPage() {
    return (
        <section
            className="min-h-screen w-full py-16 px-6 flex flex-col md:flex-row items-center justify-between gap-8 bg-linear-to-b from-background to-accent/40"
            id="about">
            <div className="w-full md:w-5/12 flex justify-center h-full md:justify-end">
                <FaUserCircle className="text-secondary dark:text-tertiary w-72 h-96 md:w-80 lg:w-96 drop-shadow-lg" />
            </div>

            <div className="w-full md:w-7/12 text-center md:text-left relative">

                <div
                    className="absolute left-[40%] -top-6 md:-left-16  lg:top-0 md:top-6 rotate-0 md:rotate-[-90deg] text-sm tracking-widest">
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-[2px] bg-black dark:bg-white"></div>
                        <p className="font-light">MORE ABOUT</p>
                    </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-4 pl-10">
                    A Passionate <br/> Web & Game Developer
                </h2>

                <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base leading-relaxed max-w-2xl mx-auto md:mx-0">
                    I’m Oliver Dave, a teen developer who is interested in web and game development.
                    I work mainly with Next.JS, React and Unity to create my projects.
                    I love learning new technologies and improving my skills to create better and more efficient applications.
                    My main inspiration for projects is from personal experiences or interests.
                    My favourite project I made is a song streaming website.
                </p>



                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button className="font-semibold py-2 px-4 rounded-lg text-center" asChild>
                        <Link href="/projects">
                            See Projects
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                       className="font-semibold py-2 px-4 rounded-lg hover:bg-tertiary/10 text-center" asChild>
                        <Link href="#contact">
                            Contact Me
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
 */