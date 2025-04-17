import { LucideIcon, LayoutDashboard, CalendarCheck, Cloud, Activity } from "lucide-react";

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  url: string;
  icon: LucideIcon;
}

export const projects: Project[] = [
  {
    title: "E-commerce Dashboard",
    description: "A comprehensive dashboard for managing online sales, inventory, and customer data with real-time analytics.",
    technologies: ["React", "Redux", "Tailwind"],
    url: "https://github.com/akshvaishnav21",
    icon: LayoutDashboard
  },
  {
    title: "Task Manager App",
    description: "A collaborative task management application with drag-and-drop functionality, reminders, and team assignments.",
    technologies: ["Vue.js", "Firebase", "Vuetify"],
    url: "https://github.com/akshvaishnav21",
    icon: CalendarCheck
  },
  {
    title: "Weather Forecast App",
    description: "A beautiful weather application featuring 5-day forecasts, location-based services, and weather alerts.",
    technologies: ["JavaScript", "API", "Chart.js"],
    url: "https://github.com/akshvaishnav21",
    icon: Cloud
  },
  {
    title: "Fitness Tracker",
    description: "An activity tracking application that monitors workouts, nutrition, and progress with personalized recommendations.",
    technologies: ["React Native", "Node.js", "MongoDB"],
    url: "https://github.com/akshvaishnav21",
    icon: Activity
  }
];
