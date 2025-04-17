import { useState, useEffect, useRef } from "react";
import { Project } from "@/data/projects";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ChevronLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCarouselProps {
  projects: Project[];
  isDesktop: boolean;
}

export default function ProjectCarousel({ projects, isDesktop }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const autoPlayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const navigateToSlide = (index: number) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
    }
    
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
  
  const handleNext = () => {
    navigateToSlide((currentIndex + 1) % projects.length);
  };
  
  const handlePrev = () => {
    navigateToSlide((currentIndex - 1 + projects.length) % projects.length);
  };
  
  // Handle auto-scrolling
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      navigateToSlide((currentIndex + 1) % projects.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, projects.length]);
  
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
      <h2 className="font-heading font-bold text-2xl mb-4 text-primary">My Projects</h2>
      
      {/* Carousel Controls */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">
          <span>{currentIndex + 1}</span> of <span>{projects.length}</span>
        </p>
        <div className="flex gap-2">
          <Button 
            onClick={handlePrev} 
            variant="outline" 
            size="icon" 
            className="h-9 w-9 rounded-full"
            aria-label="Previous project"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            onClick={handleNext} 
            variant="outline" 
            size="icon" 
            className="h-9 w-9 rounded-full"
            aria-label="Next project"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <div 
          ref={carouselRef}
          className="flex gap-4 snap-x snap-mandatory overflow-x-hidden pb-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`snap-start min-w-full bg-neutral rounded-xl overflow-hidden shadow-sm flex flex-col transition-transform duration-300 transform ${
                currentIndex === index ? "scale-100" : "scale-95 opacity-80"
              }`}
            >
              <div className="h-48 bg-secondary relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="flex items-center justify-center h-full">
                  {/* Project thumbnail or icon representation */}
                  <div className="text-white text-6xl">
                    <project.icon className="h-24 w-24 text-white/70" />
                  </div>
                </div>
              </div>
              <CardContent className="p-5 flex-grow">
                <h3 className="font-heading font-semibold text-xl mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, tIndex) => (
                    <Badge key={tIndex} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="bg-secondary hover:bg-primary text-white">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    View Project <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Dots Navigation */}
      <div className="flex justify-center mt-4 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => navigateToSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
