# Quick Netlify Deploy - Drag & Drop Method

## 🚀 Easiest Way to Deploy

### Step 1: Build the Project (Already Done!)

The project is already built and ready to deploy!

If you need to rebuild:
```bash
npm run build
```

This creates a `.next` folder with your production-ready site.

### Step 2: Deploy to Netlify

1. **Go to Netlify Drop**: https://app.netlify.com/drop

2. **Drag and drop the entire project folder** onto the Netlify Drop page
   - Drag the whole `bjornsta-portfolio` folder
   - OR just drag the `.next` folder (if you want minimal upload)

3. **Wait for deployment** - It takes about 1-2 minutes

4. **Your site is live!** You'll get a URL like: `https://random-name-123.netlify.app`

### Step 3: Configure the Contact Form

After deployment:

1. Go to your site's dashboard on Netlify
2. Click **"Forms"** in the left menu
3. You should see your "contact" form listed
4. Click **"Form notifications"** → **"Add notification"**
5. Choose **"Email notification"**
6. Enter the email where you want to receive form submissions

### Step 4: (Optional) Set a Custom Domain

1. In Netlify Dashboard → **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `bjornsta.se`)
4. Follow DNS instructions to point your domain to Netlify

## ⚡ That's It!

Your website is now live with:
- ✅ Working contact form
- ✅ Automatic spam protection
- ✅ Email notifications for submissions
- ✅ Free HTTPS certificate
- ✅ Global CDN

## 📝 Important Notes

- The form will only work on the live Netlify URL (not localhost)
- After first deployment, you can update by dragging the folder again
- Each drag creates a new deployment (keeps history)

## 🔗 Your Live Site

After deployment, you'll receive:
- **Live URL**: `https://your-site-name.netlify.app`
- **Deploy preview**: See changes before going live
- **Form submissions**: View in Netlify Dashboard

Enjoy your new website! 🎉
