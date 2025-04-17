import { LinkItem } from "@/data/links";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useRef } from "react";

interface LinkTreeProps {
  links: LinkItem[];
}

export default function LinkTree({ links }: LinkTreeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Add animation effect when component mounts
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const items = container.querySelectorAll('.link-item');
    items.forEach((item, index) => {
      const element = item as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100 + index * 100);
    });
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-4 mb-8">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-item block bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-5 flex items-center 
                     border border-white/30 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 
                     transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          style={{ transition: 'all 0.3s ease, opacity 0.5s ease, transform 0.5s ease' }}
        >
          <div className={`bg-gradient-to-br ${link.color || 'from-blue-400 to-purple-500'} rounded-full p-3 mr-4 shadow-md`}>
            <link.icon className="text-white h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-lg text-gray-800">{link.title}</h3>
            <p className="text-gray-600 text-sm">{link.description}</p>
          </div>
          <div className="ml-auto bg-gradient-to-r from-blue-100 to-purple-100 rounded-full p-2">
            <ChevronRightIcon className="text-primary h-5 w-5" />
          </div>
        </a>
      ))}
    </div>
  );
}
