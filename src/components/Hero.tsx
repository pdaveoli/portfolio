import {FlickeringGrid} from "@/components/ui/flickering-grid";
import {TextAnimate} from "@/components/ui/text-animate";
import {RainbowButton} from "@/components/ui/rainbow-button";
import { FaArrowRight } from "react-icons/fa6";

export default function Hero() {
    return (
        <div className="bg-background relative min-h-screen w-full overflow-hidden border items-center justify-center flex">
            <FlickeringGrid
                className="absolute w-full h-full"
                squareSize={4}
                gridGap={6}
                color="#6B7280"
                maxOpacity={0.5}
                flickerChance={0.1}
            />
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-4 text-center">
                <TextAnimate animation="blurInUp" as="h1" className="mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
                Oliver Dave
                </TextAnimate>
                <p className="mb-8 max-w-2xl text-lg sm:text-xl md:text-2xl text-muted-foreground">
                    Web and Game Development
                </p>
                <RainbowButton size="lg" className="rounded-full px-6 py-3  hover:bg-primary/80 transition">
                    Learn More
                    <FaArrowRight className="text-lg" />
                </RainbowButton>
            </div>
        </div>
    );
}
