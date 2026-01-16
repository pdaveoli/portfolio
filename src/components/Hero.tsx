import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import {RainbowButton} from "@/components/ui/rainbow-button";
import { FaArrowRight, FaCode } from "react-icons/fa6";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Hero() {
    return (
        <div className="bg-accent/40 relative min-h-screen w-full overflow-hidden flex">
            {/* Name in top left corner */}
            <div className="absolute top-8 left-8">
                <h1 className="text-3xl font-medium tracking-wide">
                    Oliver Dave
                </h1>
            </div>

            {/* Centered animated text - now truly centered */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-7xl md:text-8xl font-bold text-center space-y-4 tracking-normal pointer-events-auto">
                    Building
                    <br />
                    <div className="relative inline-block">
                        {/* Blurred background layer */}
                        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-[#4ade80] via-[#06b6d4] to-[#4ade80] bg-[length:200%_200%] blur-md opacity-10" />

                        {/* Sharp text layer */}
                        <AnimatedGradientText
                            className="relative tracking-wide font-extrabold"
                            colorFrom="#4ade80"
                            colorTo="#06b6d4"
                        >
                            Worlds
                        </AnimatedGradientText>
                    </div>
                    <br />
                    {/* Learn more button for small screens */}
                    <div className="md:hidden flex justify-center mt-6">
                        <button className="inline-block text-lg font-light">
                            <Link href="#about" className="flex flex-row gap-2 justify-center items-center ">
                                Learn More <FaArrowRight />
                            </Link>
                        </button>
                    </div>
                </div>
            </div>

            {/* Brief about me in bottom left corner */}
            <div className="absolute bottom-30 left-8 p-2 max-w-md invisible md:visible">
                <p className="text-md md:text-lg text-muted-foreground mb-4">
                    I&#39;m Oliver, a Student Web and Game Developer focusing on expanding my skill set and creating projects that are meaningful to me.
                </p>
                <button className="inline-block">
                    <Link href="#about" className="flex flex-row gap-2 justify-center items-center no-underline hover:underline">
                        Learn More <FaArrowRight />
                    </Link>
                </button>
            </div>

            {/* Short projects link in bottom right corner */}
            <div className="absolute bottom-30 right-24 text-right p-2 max-w-md invisible md:visible">
                <Link href="/projects" className="flex flex-row gap-2 justify-center items-center">
                    <div className="flex p-3 border-[5px] border-accent/90 justify-center items-center rounded-full bg-accent/70 hover:bg-accent/30 transition-colors drop-shadow-xl">
                        <FaCode className="text-4xl" />
                    </div>
                    View Projects
                </Link>
            </div>

        </div>
    );
}
