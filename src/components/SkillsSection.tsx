"use client";
import React from "react";
import { RiTailwindCssFill, RiJavascriptFill, RiNextjsFill } from "react-icons/ri";
import { FaHtml5, FaCss3Alt, FaReact, FaUnity, FaPython, FaGitAlt} from "react-icons/fa6";
import { PiFileCSharp, PiFileSql } from "react-icons/pi";
import { Badge } from "@/components/ui/badge";
import {BlurFade} from "@/components/ui/blur-fade";

const skillLevels = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced"
};

export default function SkillsSection() {

    const categories = [
        {
            name: "Web Development",
            skills: [
                {
                    name: "HTML5",
                    icon: <FaHtml5 className="h-8 w-8 text-orange-600" />,
                    description: "Making websites in HTML5 with accessible UI structure.",
                    level: skillLevels.advanced,
                },
                {
                    name: "CSS3",
                    icon: <FaCss3Alt className="h-8 w-8 text-blue-600" />,
                    description: "Styling web pages using modern CSS techniques including Flexbox and Grid.",
                    level: skillLevels.intermediate
                },
                {
                    name: "JavaScript",
                    icon: <RiJavascriptFill className="h-8 w-8 text-yellow-500" />,
                    description: "Proficient in JavaScript for creating dynamic and interactive web applications.",
                    level: skillLevels.intermediate
                }
                ],
        },
        {
            name: "Frameworks & Libraries",
            skills: [
                {
                    name: "React",
                    icon: <FaReact className="h-8 w-8 text-cyan-500" />,
                    description: "Building experience in making web applications using React.js.",
                    level: skillLevels.intermediate
                },
                {
                    name: "Next.js",
                    icon: <RiNextjsFill className="h-8 w-8 text-black dark:text-white" />,
                    description: "The main framework I use for React websites.",
                    level: skillLevels.intermediate
                },
                {
                    name: "Tailwind CSS",
                    icon: <RiTailwindCssFill className="h-8 w-8 text-teal-400" />,
                    description: "Proficient in utility-first CSS framework for rapid UI development.",
                    level: skillLevels.intermediate
                }
            ]
        },
        {
            name: "Game Development",
            skills: [
                {
                    name: "Unity",
                    icon: <FaUnity className="h-8 w-8 text-gray-800" />,
                    description: "Experienced in creating 2D and 3D games using the Unity engine.",
                    level: skillLevels.advanced
                },
                {
                    name: "C#",
                    icon: <PiFileCSharp className="h-8 w-8 text-purple-600" />,
                    description: "Proficient in C# programming for game development in Unity and some .NET applications.",
                    level: skillLevels.intermediate
                }
            ]
        },
        {
            name: "Other Skills",
            skills: [
                {
                    name: "Python",
                    icon: <FaPython className="h-8 w-8 text-blue-600" />,
                    description: "Familiar with Python for scripting and automation tasks.",
                    level: skillLevels.intermediate
                },
                {
                    name: "Git",
                    icon: <FaGitAlt className="h-8 w-8 text-red-600" />,
                    description: "Experienced in version control using Git and GitHub.",
                    level: skillLevels.intermediate
                },
                {
                    name: "SQL",
                    icon: <PiFileSql className="h-8 w-8 text-blue-600" />,
                    description: "Basic knowledge of SQL for database management and queries.",
                    level: skillLevels.beginner
                },
            ]
        }
    ]
    const getLevelBadgeClass = (level: string) => {
        switch (level) {
            case skillLevels.advanced:
                return "border border-red-500/40 bg-red-500/10  text-red-500";
            case skillLevels.intermediate:
                return "border border-yellow-500/40 bg-yellow-500/10  text-yellow-500";
            case skillLevels.beginner:
                return "border border-blue-500/40 bg-blue-500/10 text-blue-500";
        }
    };
    return (
        <div className="min-h-screen w-full py-16 px-6 flex flex-col items-center justify-center gap-8" id="skills">
            <h2 className="text-red text-3xl md:text-5xl font-bold leading-tight mb-4">
                My Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl">
                {categories.map((category, index) => (
                    <BlurFade
                        key={category.name}
                        className="bg-card shadow-md rounded-lg p-6"
                        delay={index * 0.2}
                        inView
                        blur="6px"
                        duration={0.4}>
                        <h3 className="text-xl font-semibold mb-4 text-center">{category.name}</h3>
                        <ul className="space-y-4">
                            {category.skills.map((skill) => (
                                <li key={skill.name} className="flex items-start gap-4">
                                    <div>{skill.icon}</div>
                                    <div>
                                        <div className="flex flex-row gap-3 mb-2">
                                            <h4 className="font-semibold">{skill.name}</h4>
                                            <Badge className={`${getLevelBadgeClass(skill.level)}`}>
                                                {skill.level}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}

/*
{categories.map((category, index) => (
                    <motion.div
                        key={category.name}
                        className="bg-card shadow-md rounded-lg p-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.2,
                            ease: "easeOut"
                        }}
                    >
                        <h3 className="text-xl font-semibold mb-4 text-center">{category.name}</h3>
                        <ul className="space-y-4">
                            {category.skills.map((skill) => (
                                <li key={skill.name} className="flex items-start gap-4">
                                    <div>{skill.icon}</div>
                                    <div>
                                        <div className="flex flex-row gap-3 mb-2">
                                            <h4 className="font-semibold">{skill.name}</h4>
                                            <Badge className={`${getLevelBadgeClass(skill.level)}`}>
                                                {skill.level}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{skill.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
 */