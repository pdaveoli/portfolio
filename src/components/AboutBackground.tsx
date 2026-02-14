"use client";
import {useEffect, useState} from "react";
import {Code2, Cpu, Dumbbell, Gamepad2, Headphones, MonitorPlay, Music, Terminal} from "lucide-react";
import { motion } from "framer-motion";
const ICONS = [Music, Gamepad2, Dumbbell, Code2, Headphones, Terminal, Cpu, MonitorPlay];

const warmGradients = [
    { top: "#ffb86b", bottom: "#d946ef" },
    { top: "#ffa26b", bottom: "#ec4899" },
    { top: "#ff9a76", bottom: "#c026d3" },
    { top: "#ffbe7a", bottom: "#db2777" },
    { top: "#ffb05f", bottom: "#a855f7" },
    { top: "#ff9966", bottom: "#e11d48" },
    { top: "#ffb56b", bottom: "#c026d3" },
    { top: "#ff8f66", bottom: "#d946ef" },
];

export function  FloatingBackground () {
    // We use state to ensure this only renders on the client, preventing Next.js SSR hydration errors
    const [isMounted, setIsMounted] = useState(false);
    const [icons, setIcons] = useState<{left: number, top: number, size: number, duration: number, iconIndex: number, colorIndex: number}[]>([]);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsMounted(true);
            const generated = Array.from({ length: 15 }, (_, i) => ({
                left: Math.floor(Math.random() * 100),
                top: Math.floor(Math.random() * 100),
                size: Math.floor(Math.random() * 24) + 8,
                duration: Math.floor(Math.random() * 14) + 30,
                iconIndex: i % ICONS.length,
                colorIndex: i % warmGradients.length,
            }));
            setIcons(generated);
        }, 100); // Delay to ensure it only runs on the client

        return () => clearTimeout(timeout);
    }, []);

    if (!isMounted) return <div className="absolute inset-0 -z-10 bg-background" />;
    return (
        <div className="absolute inset-0 max-w-screen overflow-hidden pointer-events-none -z-10 bg-background">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[52vmin] w-[60vmin] rounded-full bg-gradient-to-r from-fuchsia-500/20 via-rose-500/20 to-orange-500/25 blur-3xl" />
                <div className="absolute h-[32vmin] w-[36vmin] rounded-full bg-gradient-to-br from-pink-500/15 via-red-500/20 to-amber-400/15 blur-2xl" />
            </div>
            {/* Generates 15 random icons floating in the background */}
            {icons.map((pos, i) => {
                const Icon = ICONS[pos.iconIndex];
                const gradient = warmGradients[pos.colorIndex];
                return (
                    <motion.div
                        key={i}
                        className="absolute inline-block opacity-35"
                        style={{ left: `${pos.left}%`, top: `${pos.top}%` }}
                        initial={{ y: 0 }}
                        animate={{
                            y: [0, -70, 0], // Float up and down
                            rotate: [0, 180, 360], // Spin slowly
                        }}
                        transition={{
                            duration: pos.duration,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        <div className="relative" style={{ width: pos.size, height: pos.size }}>
                            <Icon size={pos.size} strokeWidth={1.8} style={{ color: gradient.bottom }} />
                            <div className="absolute inset-0 overflow-hidden" style={{ height: "58%" }}>
                                <Icon size={pos.size} strokeWidth={1.8} style={{ color: gradient.top }} />
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
