import { useState, useEffect, useRef } from "react";
import { Project } from "@/data/projects";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import habitTrackerImage from "../assets/images/habit-tracker.png";
import stockInsightImage from "../assets/images/stockinsight-ai.png";

interface ProjectCarouselProps {
  projects: Project[];
  isDesktop: boolean;
}

export default function ProjectCarousel({ projects, isDesktop }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Direct slide navigation function
  const navigateToSlide = (index: number) => {
    // Ensure the index is within bounds
    const safeIndex = ((index % projects.length) + projects.length) % projects.length;
    
    // Update state
    setCurrentIndex(safeIndex);
    
    // Pause autoplay temporarily when user navigates manually
    setAutoPlay(false);
    if (autoPlayTimeoutRef.current) {
      clearTimeout(autoPlayTimeoutRef.current);
    }
    
    // Resume autoplay after 10 seconds of inactivity
    autoPlayTimeoutRef.current = setTimeout(() => {
      setAutoPlay(true);
    }, 10000);
  };
  
  // Handle next button click
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % projects.length;
    navigateToSlide(nextIndex);
  };
  
  // Handle previous button click
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    navigateToSlide(prevIndex);
  };
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Initialize card positions when component mounts
  useEffect(() => {
    // Set initial positions
    navigateToSlide(currentIndex);
  }, []);

  // Handle auto-scrolling
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      navigateToSlide((currentIndex + 1) % projects.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, projects.length]);
  
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-white/20 relative overflow-hidden">
      {/* Background animation effects */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-pink-500/10 to-blue-500/10 rounded-full blur-3xl"></div>
      
      <h2 className="font-heading font-bold text-2xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 inline-block text-transparent bg-clip-text">My Projects</h2>
      
      {/* Carousel Controls */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600 font-medium">
          <span className="text-primary">{currentIndex + 1}</span> of <span>{projects.length}</span>
        </p>
        <div className="flex gap-2">
          <Button 
            onClick={handlePrev} 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full border-2 border-blue-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:border-blue-400 transition-all duration-300 cursor-pointer z-10"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-5 w-5 text-blue-600" />
          </Button>
          <Button 
            onClick={handleNext} 
            variant="outline" 
            size="icon" 
            className="h-10 w-10 rounded-full border-2 border-blue-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:border-blue-400 transition-all duration-300 cursor-pointer z-10"
            aria-label="Next project"
          >
            <ChevronRight className="h-5 w-5 text-blue-600" />
          </Button>
        </div>
      </div>
      
      {/* Carousel Container */}
      <div className="relative overflow-hidden rounded-xl min-h-[600px]">
        {projects.map((project, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-all duration-500 transform ${
              currentIndex === index 
                ? "opacity-100 translate-x-0" 
                : index < currentIndex 
                  ? "opacity-0 -translate-x-full" 
                  : "opacity-0 translate-x-full"
            }`}
          >
            <Card className="project-card w-full h-full bg-white/70 rounded-xl overflow-hidden border border-white/40 shadow-lg flex flex-col">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 relative overflow-hidden">
                {index === 0 ? (
                  // YouTube embed for Call Your AI
                  <div className="w-full aspect-video">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube.com/embed/nAclGbekAYU"
                      title="Call Your AI Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : index === 1 ? (
                  // StockInsight AI screenshot
                  <div className="w-full h-[250px]">
                    <img 
                      src={stockInsightImage} 
                      alt="StockInsight AI Screenshot" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : index === 2 ? (
                  // Habit Tracker screenshot
                  <div className="w-full h-[250px]">
                    <img 
                      src={habitTrackerImage} 
                      alt="Habit Tracker Screenshot" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  // Fallback for any other projects
                  <div className="h-48 flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]"></div>
                    {/* Animated background elements */}
                    <div className="absolute w-24 h-24 rounded-full bg-white/10 top-6 left-6 blur-md animate-float-slow"></div>
                    <div className="absolute w-16 h-16 rounded-full bg-white/10 bottom-4 right-10 blur-md animate-float"></div>
                    
                    {/* Project icon with glow */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 blur-lg rounded-full"></div>
                      <project.icon className="h-24 w-24 text-white relative z-10" />
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-6 flex-grow">
                <h3 className="font-heading font-semibold text-xl mb-2 text-gray-800">{project.title}</h3>
                <p className="text-gray-600 mb-5 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech, tIndex) => (
                    <Badge 
                      key={tIndex} 
                      variant="secondary" 
                      className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200/50 hover:from-blue-200 hover:to-purple-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-none hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    View Project <ExternalLink className="ml-1.5 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      {/* Dots Navigation */}
      <div className="flex justify-center mt-5 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-gradient-to-r from-blue-500 to-purple-500 shadow-md transform scale-110" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Add these animations to your index.css
/* 
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes float-slow {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}
*/
