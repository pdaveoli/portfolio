"use client";
import React from "react"
import Link from "next/link"
import { FaHouse, FaComputer, FaGithub, FaItchIo } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Dock, DockIcon } from "@/components/ui/dock"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export type IconProps = React.HTMLAttributes<SVGElement>
const Icons = {
    home: (props: IconProps) => <FaHouse {...props} />,
    projects: (props: IconProps) => <FaComputer  {...props} />,
    email: (props: IconProps) => ( <IoMail {...props} /> ),
    itchIo: (props: IconProps) => ( <FaItchIo {...props} /> ),
    github: (props: IconProps) => ( <FaGithub {...props} /> ),
}
const DATA = {
    navbar: [
        { href: "/", icon: Icons.home, label: "Home" },
        { href: "/projects", icon: Icons.projects, label: "Projects" },
        { href: "mailto:contact@oliverdave.dev", icon: Icons.email, label: "Email" },
    ],
    contact: {
        social: {
            GitHub: {
                name: "GitHub",
                url: "https://github.com/pdaveoli/",
                icon: Icons.github,
            },
            itchIo: {
                name: "Itch.io",
                url: "https://oliverdf1.itch.io/",
                icon: Icons.itchIo,
            }
        },
    },
}
export function DockComponent() {
    return (
        <div className="flex flex-col items-center justify-center">
            <TooltipProvider>
                <Dock direction="middle">
                    {DATA.navbar.map((item) => (
                        <DockIcon key={item.label}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={item.href}
                                        aria-label={item.label}
                                        className={cn(
                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                            "size-12 rounded-full"
                                        )}
                                    >
                                        <item.icon className="size-4" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}

                    <Separator orientation="vertical" className="h-full" />
                    {Object.entries(DATA.contact.social).map(([name, social]) => (
                        <DockIcon key={name}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={social.url}
                                        aria-label={social.name}
                                        target="_blank"
                                        className={cn(
                                            buttonVariants({ variant: "ghost", size: "icon" }),
                                            "size-12 rounded-full"
                                        )}
                                    >
                                        <social.icon className="size-4" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </DockIcon>
                    ))}
                    <Separator orientation="vertical" className="h-full" />
                    <DockIcon key="Theme">
                        <AnimatedThemeToggler
                            aria-label="Change Theme"
                            className={cn(
                                buttonVariants({ variant: "ghost", size: "icon" }),
                                "size-12 rounded-full"
                            )}
                        />
                    </DockIcon>
                </Dock>
            </TooltipProvider>
        </div>
    )
}

