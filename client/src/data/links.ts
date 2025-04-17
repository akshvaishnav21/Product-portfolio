import { LucideIcon, Mail, Linkedin, Github, BookOpen } from "lucide-react";

export interface LinkItem {
  title: string;
  description: string;
  url: string;
  icon: LucideIcon;
  color?: string;
}

export const links: LinkItem[] = [
  {
    title: "LinkedIn",
    description: "Connect with me professionally",
    url: "https://www.linkedin.com/in/aakashvaishnav1/",
    icon: Linkedin,
    color: "from-blue-500 to-blue-700"
  },
  {
    title: "GitHub",
    description: "Check out my code repositories",
    url: "https://github.com/akshvaishnav21",
    icon: Github,
    color: "from-gray-700 to-gray-900"
  },
  {
    title: "Email",
    description: "Get in touch with me directly",
    url: "mailto:aakashvaishnav@gmail.com",
    icon: Mail,
    color: "from-green-500 to-green-700"
  },
  {
    title: "Tech Blogs",
    description: "Read my articles on tech and product management",
    url: "/blogs",
    icon: BookOpen,
    color: "from-purple-500 to-purple-700"
  }
];
