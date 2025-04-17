export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  imageUrl: string;
  url: string;
}

// Sample blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Leveraging AI in Product Development',
    description: 'How AI is transforming the way we build and deliver products, with insights from my experience at Microsoft.',
    date: 'April 10, 2025',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url: 'https://medium.com'
  },
  {
    id: '2',
    title: 'The Future of Subscription Models',
    description: 'Analyzing trends and predicting the future of subscription-based services across industries.',
    date: 'March 22, 2025',
    readTime: '6 min read',
    imageUrl: 'https://images.unsplash.com/photo-1553484771-047a44eee7a1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url: 'https://medium.com'
  },
  {
    id: '3',
    title: 'Chrome Extensions: A Developer\'s Guide',
    description: 'A comprehensive guide to building Chrome extensions, with practical tips from my experience developing Call Your AI.',
    date: 'February 15, 2025',
    readTime: '10 min read',
    imageUrl: 'https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url: 'https://medium.com'
  },
  {
    id: '4',
    title: 'Data-Driven Product Management',
    description: 'Using data effectively to make product decisions that drive growth and user engagement.',
    date: 'January 30, 2025',
    readTime: '7 min read',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url: 'https://medium.com'
  }
];