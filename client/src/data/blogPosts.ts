export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  imageUrl: string;
  url: string;
}

// Real blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'GPU performance optimization through undervolting using Konabess for S24 Ultra',
    description: 'A guide on optimizing GPU performance for Samsung S24 Ultra through undervolting with detailed benchmarks showing 27% performance improvements.',
    date: 'April 17, 2025',
    readTime: '2 min read',
    imageUrl: 'https://miro.medium.com/v2/resize:fit:700/0*72Hfzj56Qe3uz9fV',
    url: 'https://medium.com/@aakashvaishnav/gpu-performance-optimization-through-undervolting-using-konabess-for-s24-ultra-54450c44d542'
  }
];