# Aakash Vaishnav Portfolio - Project Documentation

## Overview
A responsive personal portfolio website with advanced interactive features, leveraging Azure AI services for enhanced user engagement and modern web design techniques.

**Current Status**: Production-ready with comprehensive analytics system and AI-powered chatbot

## Tech Stack
- **Frontend**: React 18 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Node.js + Express + TypeScript + Drizzle ORM
- **Database**: PostgreSQL with comprehensive analytics tracking
- **AI Integration**: Azure AI Foundry (DeepSeek-V3 model)
- **Build Tool**: Vite with optimized configuration
- **Deployment**: Replit (current) + GitHub ready

## Project Architecture

### Frontend Structure (`client/`)
- **Components**: Reusable UI components built with shadcn/ui
  - `ProfileCard.tsx` - Professional profile display
  - `LinkTree.tsx` - Central navigation links with click tracking
  - `ProjectCarousel.tsx` - Interactive project showcase with embedded media
  - `Chatbot.tsx` - AI-powered assistant with session management
- **Pages**: Route-based page components using Wouter
  - `Home.tsx` - Main portfolio landing page
  - `Blogs.tsx` - Technical articles showcase
- **Data**: Static configuration and content
  - `projects.ts` - Project definitions with media assets
  - `links.ts` - External link configurations
- **Library**: Utility functions and services
  - `analytics.ts` - Comprehensive user interaction tracking
  - `queryClient.ts` - TanStack Query configuration

### Backend Structure (`server/`)
- **API Routes**: RESTful endpoints for data and analytics
  - `routes/analytics.ts` - Analytics data collection and reporting
- **Services**: Business logic and integrations
  - `analytics.ts` - Analytics data processing service
  - `chatbot.ts` - Azure AI integration for conversational AI
  - `db.ts` - Database connection and configuration
  - `storage.ts` - Data access layer with proper interfaces
- **Configuration**: Server setup and middleware
  - `index.ts` - Express server configuration
  - `vite.ts` - Vite development server integration

### Shared Resources (`shared/`)
- **Schemas**: Type-safe database schemas using Drizzle ORM
  - `schema.ts` - Analytics table definitions and TypeScript types

## Recent Changes

### Analytics System Implementation (Latest)
- ✅ Created PostgreSQL database schema for analytics tracking
- ✅ Implemented backend API endpoints for data collection
- ✅ Added client-side tracking for page views, link clicks, project interactions, and chatbot usage
- ✅ Integrated visitor identification with unique UUIDs
- ✅ Added comprehensive error handling to prevent analytics from disrupting user experience
- ✅ Implemented reporting endpoints for analytics dashboard functionality

### Error Handling & Overlay Management
- ✅ Created `disableOverlay.js` to suppress Vite HMR error overlays
- ✅ Enhanced analytics error handling to prevent unhandled promise rejections
- ✅ Added multiple safeguards for non-critical system failures
- ✅ Implemented graceful fallbacks throughout the application

### Project Showcase Enhancement
- ✅ Enhanced project carousel with three showcased projects:
  - "Call Your AI" Chrome extension with embedded YouTube demo
  - "StockInsight AI" real-time stock analysis dashboard
  - "Habit Tracker" productivity application
- ✅ Added interactive elements with proper analytics tracking
- ✅ Implemented responsive design for all device types

### AI Chatbot Integration
- ✅ Integrated Azure AI Foundry's DeepSeek-V3 model
- ✅ Implemented 3-question session limit for abuse prevention
- ✅ Added professional context awareness about Aakash's background
- ✅ Created floating chat interface with smooth animations

## User Preferences
- **Design Style**: Modern, professional with colorful gradients and smooth animations
- **Communication**: Clean, concise technical documentation
- **Code Style**: TypeScript with strict typing, component-based architecture
- **Error Handling**: Graceful degradation, non-blocking analytics, user experience priority

## Key Features

### Interactive Elements
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Project Carousel**: Touch-friendly carousel with embedded media
- **Link Tree**: Central hub for external links with click tracking
- **AI Chatbot**: Context-aware assistant with rate limiting
- **Smooth Animations**: Framer Motion for enhanced user experience

### Analytics & Tracking
- **Comprehensive Tracking**: Page views, interactions, and user behavior
- **Privacy-Conscious**: UUID-based visitor identification
- **Real-time Data**: Live analytics collection and reporting
- **Error-Resilient**: Non-blocking implementation with fallback handling

### Performance Optimizations
- **Code Splitting**: Lazy loading for optimal bundle sizes
- **Image Optimization**: Responsive images with proper loading strategies
- **Database Efficiency**: Optimized queries with connection pooling
- **Caching**: Strategic caching for improved performance

## Environment Configuration
```bash
# Required environment variables
DATABASE_URL=postgresql://...
AZURE_OPENAI_ENDPOINT=https://...
AZURE_OPENAI_KEY=...

# Auto-configured by Replit
PGHOST=...
PGPORT=5432
PGUSER=...
PGPASSWORD=...
PGDATABASE=...
```

## Development Workflow
1. **Local Development**: `npm run dev` for hot reloading
2. **Database Updates**: `npm run db:push` for schema changes
3. **Build Process**: `npm run build` for production optimization
4. **Analytics Monitoring**: Built-in dashboard at `/api/analytics/*`

## Deployment Status
- **Current Platform**: Replit with full production configuration
- **GitHub Ready**: All files prepared for version control
- **Documentation**: Comprehensive README, LICENSE, and deployment guides
- **CI/CD Ready**: Prepared for automated deployment pipelines

## GitHub Preparation Completed
- ✅ Comprehensive README.md with full project documentation
- ✅ MIT LICENSE file for open-source distribution
- ✅ Updated .gitignore with comprehensive exclusions
- ✅ DEPLOYMENT.md with multi-platform deployment instructions
- ✅ Project structure documentation
- ✅ Environment variable documentation
- ✅ Troubleshooting guides

## Next Steps for GitHub Push
Since direct git operations are restricted in this environment, you'll need to:

1. **Manual Git Setup**: Initialize git repository locally or via GitHub interface
2. **Repository Creation**: Create new repository on GitHub
3. **File Upload**: Add all project files (excluding node_modules and .env files)
4. **Environment Setup**: Configure secrets and environment variables on chosen deployment platform
5. **Deploy**: Use GitHub Actions, Vercel, or similar for automated deployment

The project is fully prepared and production-ready for GitHub hosting and deployment.