import { LucideIcon } from "lucide-react";
import { 
  LinkedInIcon, 
  GitHubIcon, 
  FileIcon, 
  PortfolioIcon, 
  BlogIcon, 
  EnvelopeIcon, 
  ChatbotIcon 
} from "@/assets/icons";

export interface LinkItem {
  title: string;
  description: string;
  url: string;
  icon: LucideIcon;
}

export const links: LinkItem[] = [
  {
    title: "LinkedIn",
    description: "Connect with me professionally",
    url: "https://www.linkedin.com/in/aakashvaishnav1/",
    icon: LinkedInIcon
  },
  {
    title: "GitHub",
    description: "Check out my code repositories",
    url: "https://github.com/akshvaishnav21",
    icon: GitHubIcon
  },
  {
    title: "Resume",
    description: "Download my CV (PDF)",
    url: "/assets/resume.pdf",
    icon: FileIcon
  },
  {
    title: "Email",
    description: "Get in touch with me directly",
    url: "mailto:aakashvaishnav@gmail.com",
    icon: EnvelopeIcon
  },
  {
    title: "Chat with me",
    description: "Try my AI-powered virtual assistant",
    url: "#chat",
    icon: ChatbotIcon
  }
];
