import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import {Button} from "@/components/ui/button";
import Link from "next/link";
export default function NotFound() {

    return (
        <div className="h-screen rounded-md bg-background flex flex-col items-center justify-center  w-full">
            <div className="relative z-10 flex-col mx-auto text-center tracking-tight font-medium flex items-center gap-2 md:gap-8">
            <h2 className="text-3xl md:text-5xl md:leading-tight max-w-5xl">
                404 - Page Not Found
            </h2>
            <p>
                Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button
                variant="secondary"
                className="mt-4"
                asChild
            >
                <Link href="/">
                    Go back to Home
                </Link>
            </Button>
            </div>
            <ShootingStars />
            <StarsBackground />
        </div>
    );
}