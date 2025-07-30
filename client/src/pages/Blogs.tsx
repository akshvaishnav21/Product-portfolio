import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'wouter';
import AnimatedBackground from "@/components/AnimatedBackground";
import { blogPosts } from '@/data/blogPosts';

export default function Blogs() {
  return (
    <div className="min-h-screen font-sans text-foreground">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mb-10 flex items-center">
          <Link to="/">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">Tech Blog Articles</h1>
        </div>
        
        <div className="grid grid-cols-1 gap-8 pb-16">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-blue-300">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <CardDescription className="text-gray-600">{post.description}</CardDescription>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt-0">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100"
                  asChild
                >
                  <a href={post.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Read <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      <footer className="bg-white/80 backdrop-blur-sm py-5 mt-auto border-t border-blue-100 fixed bottom-0 w-full">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Aakash Vaishnav. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}