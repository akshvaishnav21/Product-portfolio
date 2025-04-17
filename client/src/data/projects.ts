import { LucideIcon, Chrome, CalendarCheck, LineChart } from "lucide-react";

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
    title: "StockInsight AI",
    description: "A real-time stock analysis dashboard with AI-powered insights, technical analysis, and financial data visualization. Features include price tracking, financial metrics, news sentiment analysis, insider trading monitoring, and institutional ownership tracking.",
    technologies: ["React", "TypeScript", "Express.js", "MarketStack API", "Tailwind CSS"],
    url: "https://stock-insight-ai-akshvaishnav219.replit.app/",
    icon: LineChart
  },
  {
    title: "Habit Tracker",
    description: "A modern web application for tracking daily, weekly, and custom habits with a clean UI and reminder system. Features include visual progress tracking, streak tracking, and a responsive design that works on both desktop and mobile.",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    url: "https://habit-tracker-akshvaishnav219.replit.app/",
    icon: CalendarCheck
  }
];
