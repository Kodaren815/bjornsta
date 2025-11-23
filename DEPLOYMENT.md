# Netlify Deployment Guide

## 🚀 Deploy to Netlify

This project is fully configured for Netlify deployment with Netlify Forms integration.

### Option 1: Deploy via Netlify CLI (Recommended)

1. **Install Netlify CLI** (if not already installed):
```bash
npm install -g netlify-cli
```

2. **Login to Netlify**:
```bash
netlify login
```

3. **Initialize and Deploy**:
```bash
cd bjornsta-portfolio
netlify init
```

Follow the prompts:
- Choose "Create & configure a new site"
- Select your team
- Enter site name (e.g., `bjornsta-consulting`)
- Build command: `npm run build`
- Publish directory: `.next`

4. **Deploy**:
```bash
netlify deploy --prod
```

### Option 2: Deploy via Netlify Dashboard

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Connect to Netlify**:
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and authorize
   - Select your repository

3. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Deploy site"

### Option 3: Drag and Drop Deploy

1. **Build the project locally**:
```bash
npm run build
```

2. **Deploy to Netlify**:
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag and drop the `.next` folder

## 📋 Netlify Forms Configuration

The contact form is already configured with:
- ✅ `data-netlify="true"` attribute
- ✅ `name="contact"` attribute
- ✅ Hidden `form-name` field
- ✅ Honeypot spam protection
- ✅ Success message handling

### Accessing Form Submissions

1. Go to your Netlify Dashboard
2. Click on your site
3. Navigate to "Forms" tab
4. View all submissions

### Email Notifications

To receive email notifications for form submissions:

1. In Netlify Dashboard → Site Settings → Forms
2. Click "Form notifications"
3. Add "Email notification"
4. Enter your email address

## 🔧 Environment Variables (Optional)

If you need to add environment variables:

1. **Via Netlify Dashboard**:
   - Site Settings → Environment variables
   - Add variables like:
     - `NEXT_PUBLIC_SITE_URL=https://bjornsta.se`
     - `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` (if using Google Analytics)

2. **Via Netlify CLI**:
```bash
netlify env:set NEXT_PUBLIC_SITE_URL "https://bjornsta.se"
```

## 🌐 Custom Domain Setup

1. **In Netlify Dashboard**:
   - Domain settings → Add custom domain
   - Enter your domain (e.g., `bjornsta.se`)
   - Follow DNS configuration instructions

2. **DNS Configuration**:
   - Add A record pointing to Netlify's load balancer
   - Or add CNAME record pointing to your Netlify subdomain
   - Enable HTTPS (automatic with Let's Encrypt)

## 📊 Build Settings in netlify.toml

The project includes a `netlify.toml` file with:
- Build command and publish directory
- Next.js plugin configuration
- Security headers
- Cache optimization
- Redirect rules

## ✅ Pre-Deployment Checklist

- [x] Contact form configured with Netlify Forms
- [x] netlify.toml configuration file
- [x] _redirects file for routing
- [x] Netlify Next.js plugin installed
- [x] SEO metadata configured
- [x] Images optimized
- [x] Responsive design tested
- [ ] Update site URL in metadata (app/layout.tsx)
- [ ] Update Google verification code (if applicable)
- [ ] Test form submissions after deployment

## 🔍 Testing the Form

After deployment:

1. Visit your live site
2. Navigate to the Contact section
3. Fill out and submit the form
4. Check Netlify Dashboard → Forms for the submission
5. Verify email notification (if configured)

## 🐛 Troubleshooting

### Form Not Working
- Ensure the form has `data-netlify="true"`
- Check that `name="contact"` is set
- Verify the hidden `form-name` field exists
- Look for submissions in Netlify Dashboard → Forms

### Build Failures
- Check build logs in Netlify Dashboard
- Verify Node version (set to 20 in netlify.toml)
- Ensure all dependencies are in package.json
- Run `npm run build` locally to test

### 404 Errors
- Ensure `_redirects` file is in the `public` folder
- Check netlify.toml redirect configuration
- Verify Next.js plugin is installed

## 📱 Continuous Deployment

Once connected to GitHub, Netlify will automatically:
- Deploy on every push to main branch
- Create preview deployments for pull requests
- Run build checks before deploying

## 🎉 Your Site is Live!

After deployment, your site will be available at:
- Netlify subdomain: `https://your-site-name.netlify.app`
- Custom domain: `https://bjornsta.se` (if configured)

## 📈 Performance Monitoring

Monitor your site's performance:
- Netlify Analytics (add-on)
- Google PageSpeed Insights
- Lighthouse scores

Your Björnsta Consulting Group website is now ready for the world! 🚀
