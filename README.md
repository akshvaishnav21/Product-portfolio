# Aakash Vaishnav - Personal Portfolio

A modern, responsive personal portfolio website featuring a Linktree-inspired design with interactive elements, AI-powered chatbot, and comprehensive analytics tracking.

## 🚀 Live Demo

Visit the portfolio at: [Your GitHub Pages URL or deployment URL]

## ✨ Features

### Core Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with colorful gradients and animations
- **Interactive Project Carousel**: Showcases projects with embedded videos and screenshots
- **AI-Powered Chatbot**: Uses Azure AI Foundry's DeepSeek-V3 model for visitor engagement
- **Real-time Analytics**: Comprehensive tracking of user interactions and page views
- **Blog Integration**: Displays technical articles from Medium

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Server-Side Rendering**: Fast loading with proper SEO optimization
- **Database Integration**: PostgreSQL for analytics and data persistence
- **Azure AI Integration**: Advanced AI capabilities for chatbot functionality
- **Modern Architecture**: Clean separation of concerns with shared schemas

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Wouter** - Lightweight routing
- **TanStack Query** - Data fetching and caching
- **Framer Motion** - Smooth animations
- **shadcn/ui** - Beautiful component library

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type-safe server development
- **Drizzle ORM** - Type-safe database operations
- **PostgreSQL** - Primary database
- **Azure AI Foundry** - AI model integration

### Development Tools
- **Vite** - Fast build tool and dev server
- **ESBuild** - Fast bundling
- **PostCSS** - CSS processing
- **Drizzle Kit** - Database migration tool

## 📁 Project Structure

```
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── data/          # Static data and configuration
│   │   ├── lib/           # Utility functions and services
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend application
│   ├── routes/           # API route handlers
│   ├── analytics.ts      # Analytics service
│   ├── chatbot.ts        # AI chatbot implementation
│   ├── db.ts             # Database configuration
│   └── storage.ts        # Data access layer
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schemas and types
└── attached_assets/      # Static assets and media
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Azure AI Foundry account (for chatbot features)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aakash-portfolio.git
cd aakash-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file with the following variables:
DATABASE_URL=your_postgresql_connection_string
AZURE_OPENAI_ENDPOINT=your_azure_endpoint
AZURE_OPENAI_KEY=your_azure_api_key
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📊 Analytics Features

The portfolio includes comprehensive analytics tracking:

- **Page Views**: Track visitor navigation patterns
- **Link Clicks**: Monitor external link engagement
- **Project Interactions**: Analyze project carousel usage
- **Chatbot Usage**: Track AI assistant engagement
- **Visitor Identification**: Unique visitor tracking with UUIDs

Analytics data is stored in PostgreSQL and can be accessed via the admin API endpoints.

## 🤖 AI Chatbot

The integrated chatbot powered by Azure AI Foundry's DeepSeek-V3 model:

- **Smart Responses**: Answers questions about Aakash's background and experience
- **Rate Limiting**: 3 questions per session to prevent abuse
- **Context Awareness**: Understands portfolio content and professional background
- **Professional Tone**: Maintains appropriate business communication style

## 🎨 Customization

### Theming
The application uses a centralized theme system via `theme.json`:

```json
{
  "primary": "#6366f1",
  "variant": "professional",
  "appearance": "light",
  "radius": 0.5
}
```

### Content Updates
- **Projects**: Edit `client/src/data/projects.ts`
- **Links**: Modify `client/src/data/links.ts`
- **Profile Information**: Update `client/src/components/ProfileCard.tsx`

## 📈 Performance

- **Fast Loading**: Optimized bundle sizes and code splitting
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Error Handling**: Comprehensive error boundaries and fallbacks
- **Analytics**: Non-blocking tracking that doesn't impact user experience

## 🔐 Security Features

- **Environment Variables**: Secure handling of API keys and secrets
- **Rate Limiting**: Chatbot usage limits to prevent abuse
- **Error Boundaries**: Graceful error handling throughout the application
- **Secure Analytics**: Privacy-conscious visitor tracking

## 🚀 Deployment

The application is ready for deployment on various platforms:

### Replit (Recommended)
- Already configured with proper build scripts
- Environment variables configured
- Database provisioned and ready

### Vercel/Netlify
```bash
npm run build
# Deploy the dist/ directory
```

### Docker
```dockerfile
# Dockerfile included for containerized deployment
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run db:push` - Push database schema changes
- `npm run db:generate` - Generate database migrations

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Aakash Vaishnav**
- Email: aakashvaishnav@gmail.com
- LinkedIn: [Connect with me](https://linkedin.com/in/aakashvaishnav)
- Portfolio: [Visit my website](https://your-domain.com)

---

Built with ❤️ by Aakash Vaishnav | © 2025 All rights reserved