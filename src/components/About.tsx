import {Button} from "@/components/ui/button";
import Link from "next/link";
import {FaUserCircle} from "react-icons/fa";

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