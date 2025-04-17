import { LucideIcon, LayoutDashboard, CalendarCheck, Cloud, Sparkles, Braces, Database, Chrome } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  url: string;
  icon: LucideIcon;
}

export const projects: Project[] = [
  {
    title: "Call Your AI - Chrome Extension",
    description: "A Chrome extension that lets you access AI services directly from your address bar. Simply type @ followed by the service name and your query to quickly use ChatGPT, Claude, Gemini, Perplexity, or Copilot.",
    technologies: ["JavaScript", "Chrome Extensions", "AI Integration"],
    url: "https://github.com/akshvaishnav21/CallYourAI",
    icon: Chrome
  },
  {
    title: "Microsoft 365 Growth Platform",
    description: "Led subscription growth initiatives for Microsoft 365 and Copilot, implementing data-driven strategies to increase user acquisition and reduce churn.",
    technologies: ["Data Analytics", "Growth Strategy", "A/B Testing"],
    url: "https://github.com/akshvaishnav21",
    icon: Sparkles
  },
  {
    title: "Microsoft Shopping Platform",
    description: "Developed the product strategy for Microsoft Shopping on Bing and Edge, significantly boosting revenue through strategic ad integration and user engagement.",
    technologies: ["Product Strategy", "User Research", "Revenue Growth"],
    url: "https://github.com/akshvaishnav21",
    icon: LayoutDashboard
  },
  {
    title: "AI-Powered Comparison Tool",
    description: "Led the development of AI-powered smart comparison features in Microsoft Copilot, enhancing user experience with intelligent product recommendations.",
    technologies: ["AI Integration", "UX Design", "Product Development"],
    url: "https://github.com/akshvaishnav21",
    icon: Braces
  },
  {
    title: "Data Analytics Dashboard",
    description: "Created comprehensive analytics dashboards tracking key performance metrics for subscription services, enabling data-driven decision making across teams.",
    technologies: ["Power BI", "SQL", "Data Visualization"],
    url: "https://github.com/akshvaishnav21",
    icon: Database
  }
];
