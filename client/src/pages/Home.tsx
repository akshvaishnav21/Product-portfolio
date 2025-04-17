import ProfileCard from "@/components/ProfileCard";
import LinkTree from "@/components/LinkTree";
import ProjectCarousel from "@/components/ProjectCarousel";
import { links } from "@/data/links";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-foreground relative overflow-hidden">
      {/* Background animation blobs */}
      <div className="absolute top-[-300px] right-[-300px] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100/30 to-purple-100/30 blur-3xl -z-10 animate-blob-slow"></div>
      <div className="absolute top-[400px] left-[-200px] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pink-100/20 to-blue-100/20 blur-3xl -z-10 animate-blob"></div>
      <div className="absolute bottom-[-300px] right-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-100/30 to-purple-100/30 blur-3xl -z-10 animate-blob-delayed"></div>
      
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-10">
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
      <footer className="bg-white/80 backdrop-blur-sm py-5 mt-auto border-t border-blue-100">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Aakash Vaishnav. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
