# 🚀 Netlify Deployment Guide for SkillTree Frontend

## Prerequisites
- Netlify account (free at netlify.com)
- GitHub repository with your code
- Backend API deployed (optional for demo mode)

## 📁 Files Created for Deployment
- `netlify.toml` - Netlify configuration
- `.env.netlify` - Environment variables template
- `client/src/config/environment.ts` - Environment configuration
- Updated `client/vite.config.ts` - Production build optimization

## 🔧 Step-by-Step Deployment

### Option 1: Deploy via Git (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Netlify deployment configuration"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Branch: `main`
   - Build command: `npm run build`
   - Publish directory: `client/dist`

3. **Configure Environment Variables**
   Go to Site Settings > Environment Variables and add:
   ```
   VITE_API_URL=https://your-backend-domain.com
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   VITE_ENABLE_MOCK_AUTH=true
   NODE_VERSION=18
   CI=true
   ```

### Option 2: Manual Deploy

1. **Build the project locally**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Drag and drop the `client/dist` folder

## 🌐 Configuration Options

### Environment Variables

#### Required for Production:
- `VITE_API_URL` - Your backend API URL
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

#### Optional:
- `VITE_ENABLE_MOCK_AUTH=true` - Enable demo mode (no real authentication)
- `VITE_ENABLE_ANALYTICS=true` - Enable analytics (if implemented)

### Backend Integration

The `netlify.toml` includes API proxy configuration. Update the redirect rule:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR_BACKEND_URL/api/:splat"
  status = 200
  force = true
```

Replace `YOUR_BACKEND_URL` with your actual backend deployment URL.

## 📦 Build Optimizations

The Vite config includes:
- **Code splitting** for better loading performance
- **Source maps** for easier debugging
- **Manual chunks** for vendor libraries
- **Environment variable handling**

## 🔧 Demo Mode Deployment

For a demo deployment without a backend:

1. Set `VITE_ENABLE_MOCK_AUTH=true`
2. Set `VITE_API_URL=https://demo-api.skilltree.com` (placeholder)
3. The app will run in mock authentication mode

## 🚨 Common Issues & Solutions

### Build Errors
- Ensure all TypeScript errors are resolved
- Check that all dependencies are installed
- Verify environment variables are set correctly

### Routing Issues
- The `netlify.toml` includes SPA redirect rules
- All routes will fallback to `index.html`

### API Connection Issues
- Verify `VITE_API_URL` points to your deployed backend
- Check CORS settings on your backend
- Ensure backend is deployed and accessible

## 📈 Performance Tips

1. **Enable Netlify's Edge caching**
2. **Use Netlify's Image optimization**
3. **Enable Brotli compression**
4. **Set up Netlify Analytics** (optional)

## 🔐 Security Headers

The `netlify.toml` includes security headers:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Referrer-Policy

## 🎯 Next Steps After Deployment

1. **Custom Domain**: Configure your custom domain in Netlify
2. **SSL Certificate**: Netlify provides free SSL automatically
3. **Forms**: Set up Netlify Forms for contact/feedback
4. **Functions**: Deploy backend API using Netlify Functions (optional)

## 📊 Monitoring

Monitor your deployment:
- Netlify Analytics (traffic, performance)
- Build logs (for debugging failed deployments)
- Function logs (if using Netlify Functions)

Your SkillTree frontend will be live at: `https://your-site-name.netlify.app`