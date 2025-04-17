import ProfileCard from "@/components/ProfileCard";
import LinkTree from "@/components/LinkTree";
import ProjectCarousel from "@/components/ProjectCarousel";
import { links } from "@/data/links";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-foreground bg-neutral-50">
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
          {/* Left Side: Project Carousel (Hidden on mobile, shown on left for desktop) */}
          <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-8">
            <ProjectCarousel projects={projects} isDesktop={true} />
          </div>
          
          {/* Center: Profile and Links */}
          <div className="w-full lg:w-1/2 mx-auto max-w-md lg:max-w-none">
            <ProfileCard />
            <LinkTree links={links} />
            
            {/* Mobile Carousel (Visible only on mobile) */}
            <div className="lg:hidden">
              <ProjectCarousel projects={projects} isDesktop={false} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Aakash Vaishnav. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
