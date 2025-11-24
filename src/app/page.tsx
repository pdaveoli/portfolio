import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center flex-col">
        <Hero />
        <FeaturedProjects />
    </div>
  );
}
