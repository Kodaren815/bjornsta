# Netlify Deployment Checklist

## ✅ Pre-Deployment Checklist

### Code & Configuration
- [x] Contact form configured with Netlify Forms
- [x] `data-netlify="true"` attribute added to form
- [x] Hidden `form-name` field included
- [x] Honeypot spam protection enabled
- [x] Form success message handling
- [x] netlify.toml configuration file created
- [x] _redirects file in public folder
- [x] @netlify/plugin-nextjs installed
- [x] All color variables replaced with Tailwind classes
- [x] Responsive design tested
- [x] SEO metadata configured

### Files Created
- [x] `netlify.toml` - Netlify configuration
- [x] `public/_redirects` - Routing configuration
- [x] `DEPLOYMENT.md` - Deployment guide
- [x] `deploy.sh` - Deployment script
- [x] Updated `README.md` - Project documentation

### Required Updates Before Deployment
- [ ] Update `NEXT_PUBLIC_SITE_URL` in metadata (app/layout.tsx)
  - Change from `https://bjornsta.se` to your actual domain
- [ ] Update Google verification code (if using Google Search Console)
- [ ] Replace placeholder phone number with real one
- [ ] Replace placeholder email with real one
- [ ] Update social media links in Footer
- [ ] Review and update all company information

## 🚀 Deployment Steps

### Option 1: Netlify CLI (Fastest)

```bash
# 1. Install Netlify CLI globally
npm install -g netlify-cli

# 2. Login to Netlify
netlify login

# 3. Initialize site
netlify init

# 4. Deploy to production
netlify deploy --prod
```

### Option 2: GitHub + Netlify Dashboard

```bash
# 1. Initialize git repository
git init
git add .
git commit -m "Initial commit: Björnsta Consulting Group website"

# 2. Create GitHub repository and push
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main

# 3. Go to Netlify Dashboard
# 4. Import from GitHub
# 5. Configure build settings:
#    - Build command: npm run build
#    - Publish directory: .next
# 6. Deploy!
```

### Option 3: Use Deployment Script

```bash
./deploy.sh
```

## 📋 Post-Deployment Tasks

### Immediate (After First Deploy)
- [ ] Test website on live URL
- [ ] Test contact form submission
- [ ] Verify form submission appears in Netlify Dashboard
- [ ] Check mobile responsiveness
- [ ] Test all navigation links
- [ ] Verify images load correctly

### Form Configuration (In Netlify Dashboard)
- [ ] Go to Site Settings → Forms
- [ ] Set up email notifications
  - Add notification recipients
  - Customize notification email
- [ ] Enable spam filtering (if not using default)
- [ ] Test form and check email notification

### Domain & SSL
- [ ] Set up custom domain (if applicable)
  - Add domain in Netlify
  - Update DNS records
  - Verify domain ownership
- [ ] Enable HTTPS (automatic with Netlify)
- [ ] Force HTTPS redirect
- [ ] Update metadata with production URL

### Performance & SEO
- [ ] Run Google PageSpeed Insights
- [ ] Run Lighthouse audit
- [ ] Submit sitemap to Google Search Console
  - `https://yourdomain.com/sitemap.xml`
- [ ] Verify structured data with Google Rich Results Test
- [ ] Set up Google Analytics (optional)

### Monitoring
- [ ] Enable Netlify Analytics (optional paid add-on)
- [ ] Set up uptime monitoring
- [ ] Configure error tracking

## 🔍 Testing Checklist

### Functionality
- [ ] All navigation links work
- [ ] Smooth scroll to sections works
- [ ] Mobile menu opens/closes correctly
- [ ] Contact form submits successfully
- [ ] Form validation works (required fields)
- [ ] Success message displays after submission
- [ ] Form submissions appear in Netlify Dashboard
- [ ] Email notifications are received

### Responsiveness
- [ ] Mobile (320px - 768px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1024px+)
- [ ] Large screens (1920px+)

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Performance
- [ ] Page load time < 3 seconds
- [ ] Images load properly
- [ ] Animations are smooth
- [ ] No console errors

## 📞 Support & Troubleshooting

### Form Not Submitting
1. Check browser console for errors
2. Verify `data-netlify="true"` is present
3. Ensure hidden `form-name` field exists
4. Check Netlify Dashboard → Forms for submissions

### Build Failures
1. Review build logs in Netlify Dashboard
2. Test `npm run build` locally
3. Verify all dependencies are installed
4. Check Node version compatibility

### 404 Errors
1. Verify `_redirects` file exists in public folder
2. Check netlify.toml configuration
3. Ensure Next.js plugin is properly configured

## 📚 Documentation References

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Full deployment guide
- [README.md](./README.md) - Project overview
- [PERFORMANCE.md](./PERFORMANCE.md) - Performance optimization details

## 🎉 Ready to Launch!

Once all items are checked, your Björnsta Consulting Group website is ready for production! 

Your live site will be at:
- Netlify: `https://[your-site-name].netlify.app`
- Custom domain: `https://bjornsta.se` (after DNS configuration)

Good luck! 🚀
