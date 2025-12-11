import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import AboutPage from "@/components/About";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import LastFmWidget from "@/components/LastFmWidget";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center flex-col">
        <Hero />
        <AboutPage />
        <FeaturedProjects />
        <SkillsSection />
        <LastFmWidget />
        <ContactSection />
    </div>
  );
}
