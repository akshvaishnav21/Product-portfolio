import { LinkItem } from "@/data/links";
import { ChevronRightIcon } from "lucide-react";

interface LinkTreeProps {
  links: LinkItem[];
}

export default function LinkTree({ links }: LinkTreeProps) {
  return (
    <div className="flex flex-col gap-4 mb-8">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-item block bg-white rounded-lg shadow-sm p-4 flex items-center border-l-4 border-primary hover:bg-blue-50 transition-all transform hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="bg-blue-100 rounded-full p-2 mr-4">
            <link.icon className="text-primary h-5 w-5" />
          </div>
          <div>
            <h3 className="font-heading font-medium text-lg">{link.title}</h3>
            <p className="text-gray-500 text-sm">{link.description}</p>
          </div>
          <ChevronRightIcon className="ml-auto text-gray-400 h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
