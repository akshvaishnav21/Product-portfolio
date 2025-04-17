import { LucideIcon } from "lucide-react";
import { LinkedInIcon, GitHubIcon, FileIcon, PortfolioIcon, BlogIcon } from "@/assets/icons";

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
    url: "https://github.com/akshvaishnav21",
    icon: FileIcon
  },
  {
    title: "Portfolio",
    description: "View my detailed project portfolio",
    url: "https://github.com/akshvaishnav21",
    icon: PortfolioIcon
  },
  {
    title: "Blog",
    description: "Read my articles on tech & development",
    url: "https://github.com/akshvaishnav21",
    icon: BlogIcon
  }
];
