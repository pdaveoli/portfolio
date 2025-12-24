import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import { FaLinkedinIn } from "react-icons/fa";

export default function ContactSection() {
    return (
        <div id="contact" className="p-15 w-full flex flex-col items-center justify-center  px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-red">
                Get in Touch
            </h2>
            <p className="max-w-2xl mb-8 text-lg md:text-xl text-muted-foreground">
                I&#39;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out to me via email or connect with me on LinkedIn.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <RainbowButton size="lg" variant="default" asChild>
                    <Link href="mailto:contact@oliverdave.dev">
                        Email Me
                    </Link>
                </RainbowButton>
            </div>
        </div>
    )
}