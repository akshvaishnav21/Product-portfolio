# Deployment Guide

This guide covers how to deploy the Aakash Vaishnav Portfolio to various platforms.

## 🚀 Quick Deploy Options

### 1. Replit (Current Platform)
The application is already configured and running on Replit with:
- ✅ Environment variables configured
- ✅ PostgreSQL database provisioned
- ✅ Azure AI integration active
- ✅ Analytics tracking enabled

**To deploy publicly:**
1. Click the "Deploy" button in Replit
2. Configure your custom domain (optional)
3. Your portfolio will be live at `https://your-repl-name.your-username.replit.app`

### 2. Vercel (Recommended for GitHub)
Perfect for modern web applications with PostgreSQL support.

**Prerequisites:**
- GitHub repository
- Vercel account
- PostgreSQL database (use Vercel Postgres or external provider)

**Steps:**
1. Push your code to GitHub
2. Connect Vercel to your GitHub repository
3. Set environment variables in Vercel dashboard:
   ```
   DATABASE_URL=your_postgresql_url
   AZURE_OPENAI_ENDPOINT=your_azure_endpoint
   AZURE_OPENAI_KEY=your_azure_key
   ```
4. Deploy automatically on every push

### 3. Netlify
Great for static deployment with serverless functions.

**Steps:**
1. Build the application: `npm run build`
2. Deploy the `dist/` folder to Netlify
3. Configure environment variables
4. Set up serverless functions for API routes

### 4. Railway
Modern platform with excellent PostgreSQL integration.

**Steps:**
1. Connect your GitHub repository
2. Add PostgreSQL service
3. Configure environment variables
4. Deploy with automatic builds

## 🔧 Environment Variables

Ensure these are set in your deployment platform:

```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Azure AI (for chatbot)
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_KEY=your-api-key

# Optional: Analytics
PGHOST=your-db-host
PGPORT=5432
PGUSER=your-db-user
PGPASSWORD=your-db-password
PGDATABASE=your-db-name
```

## 📊 Database Setup

### PostgreSQL Schema
The application will automatically create the required tables:

```sql
-- Analytics table for tracking user interactions
CREATE TABLE analytics (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50),
  event_category VARCHAR(50),
  event_action VARCHAR(50),
  event_label VARCHAR(255),
  visitor_id VARCHAR(100),
  page_path VARCHAR(255),
  referrer VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  additional_data JSONB
);
```

### Migration Command
Run after deployment:
```bash
npm run db:push
```

## 🌐 Custom Domain Setup

### Vercel
1. Go to your project settings
2. Add your custom domain
3. Configure DNS records as instructed

### Replit
1. Purchase Replit hosting plan
2. Add custom domain in deployment settings
3. Update DNS records with your domain provider

## 📈 Monitoring & Analytics

### Built-in Analytics
The portfolio includes comprehensive analytics tracking:
- Page views and navigation patterns
- Project interaction rates
- Chatbot usage statistics
- Link click tracking

### External Analytics (Optional)
Add Google Analytics or other tracking:

1. Create analytics account
2. Add tracking ID to environment variables
3. Update the analytics service to include external tracking

## 🔐 Security Considerations

### API Keys
- Never commit API keys to repository
- Use environment variables for all sensitive data
- Rotate keys regularly

### Database Security
- Use connection pooling
- Enable SSL connections
- Implement proper access controls

### Rate Limiting
The chatbot includes built-in rate limiting (3 questions per session).

## 🚀 Performance Optimization

### Built-in Optimizations
- ✅ Code splitting and lazy loading
- ✅ Image optimization
- ✅ Efficient database queries
- ✅ Caching strategies

### Additional Optimizations
1. **CDN**: Use Cloudflare or similar for static assets
2. **Compression**: Enable gzip/brotli compression
3. **Caching**: Implement Redis for session storage
4. **Monitoring**: Add performance monitoring tools

## 🐛 Troubleshooting

### Common Issues

**Database Connection Errors:**
- Verify DATABASE_URL format
- Check network connectivity
- Ensure database server is running

**Azure AI Errors:**
- Verify API endpoint and key
- Check rate limits and quotas
- Ensure proper model deployment

**Build Failures:**
- Check Node.js version (18+ required)
- Verify all dependencies are installed
- Review build logs for specific errors

### Debug Mode
Enable debug logging:
```bash
NODE_ENV=development npm run dev
```

## 📞 Support

For deployment issues:
1. Check the troubleshooting section above
2. Review platform-specific documentation
3. Contact support for your chosen platform

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: npm install
    - run: npm run build
    - name: Deploy to Vercel
      uses: vercel/action@v1
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

Choose the deployment option that best fits your needs and technical requirements. All options will provide a fast, reliable hosting solution for your portfolio.