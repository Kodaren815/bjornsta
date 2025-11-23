# Björnsta Consulting Group - Company Portfolio# Björnsta Consulting Group - Company PortfolioThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A modern, responsive, and SEO-optimized portfolio website for Björnsta Consulting Group, a professional accounting and tax services firm in Stockholm, Sweden.



## 🚀 FeaturesA modern, responsive, and SEO-optimized portfolio website for Björnsta Consulting Group, a professional accounting and tax services firm in Stockholm, Sweden.## Getting Started



- **Modern Design**: Beautiful purple/white/black color scheme with smooth animations

- **Fully Responsive**: Mobile-first design that works on all devices

- **SEO Optimized**: ## 🚀 FeaturesFirst, run the development server:

  - Meta tags and Open Graph tags

  - Structured data (JSON-LD)

  - Sitemap and robots.txt

  - Semantic HTML5- **Modern Design**: Beautiful purple/white/black color scheme with smooth animations```bash

- **Performance Optimized**: 

  - Fast page loads- **Fully Responsive**: Mobile-first design that works on all devicesnpm run dev

  - Optimized animations with Framer Motion

  - Next.js 16 with App Router- **SEO Optimized**: # or

- **Netlify Forms**: Contact form integrated with Netlify Forms

- **Accessibility**: WCAG compliant with keyboard navigation support  - Meta tags and Open Graph tagsyarn dev



## 🛠️ Tech Stack  - Structured data (JSON-LD)# or



- **Framework**: Next.js 16 (App Router)  - Sitemap and robots.txtpnpm dev

- **Language**: TypeScript

- **Styling**: Tailwind CSS v4  - Semantic HTML5# or

- **Animations**: Framer Motion

- **Icons**: Lucide React- **Performance Optimized**: bun dev

- **Image Optimization**: Next.js Image component

- **Deployment**: Netlify with Forms integration  - Fast page loads```



## 📦 Installation  - Optimized animations with Framer Motion



1. Install dependencies:  - Next.js 15 with App RouterOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash

npm install- **Accessibility**: WCAG compliant with keyboard navigation support

```

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

2. Run the development server:

```bash## 🛠️ Tech Stack

npm run dev

```This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



3. Open [http://localhost:3000](http://localhost:3000) in your browser- **Framework**: Next.js 15 (App Router)



## 🏗️ Build for Production- **Language**: TypeScript## Learn More



```bash- **Styling**: Tailwind CSS

npm run build

npm start- **Animations**: Framer MotionTo learn more about Next.js, take a look at the following resources:

```

- **Icons**: Lucide React

## 🌐 Deploy to Netlify

- **Image Optimization**: Next.js Image component- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

### Quick Deploy

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

1. **Install Netlify CLI**:

```bash## 📦 Installation

npm install -g netlify-cli

```You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!



2. **Login and Deploy**:1. Install dependencies:

```bash

netlify login```bash## Deploy on Vercel

netlify init

netlify deploy --prodnpm install

```

```The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Or use the deployment script:

```bash

./deploy.sh

```2. Run the development server:Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



### Alternative: GitHub Integration```bash

npm run dev

1. Push to GitHub:```

```bash

git init3. Open [http://localhost:3000](http://localhost:3000) in your browser

git add .

git commit -m "Initial commit"## 🏗️ Build for Production

git push -u origin main

``````bash

npm run build

2. Connect to Netlify Dashboard and import repositorynpm start

```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 📁 Project Structure

## 📋 Contact Form

```

The contact form is configured with **Netlify Forms**:bjornsta-portfolio/

- ✅ Automatic spam protection├── app/

- ✅ Email notifications│   ├── layout.tsx          # Root layout with SEO metadata

- ✅ Form submissions dashboard│   ├── page.tsx            # Home page

- ✅ No backend code required│   ├── globals.css         # Global styles

│   ├── sitemap.ts          # Auto-generated sitemap

After deployment, configure form notifications in Netlify Dashboard → Forms.│   └── robots.ts           # Robots.txt configuration

├── components/

## 📁 Project Structure│   ├── Navbar.tsx          # Navigation bar

│   ├── Hero.tsx            # Hero section with image

```│   ├── Services.tsx        # Services showcase

bjornsta-portfolio/│   ├── Stats.tsx           # Company statistics

├── app/│   ├── About.tsx           # About section

│   ├── layout.tsx          # Root layout with SEO metadata│   ├── Contact.tsx         # Contact form

│   ├── page.tsx            # Home page│   ├── Footer.tsx          # Footer

│   ├── globals.css         # Global styles│   └── JsonLd.tsx          # Structured data

│   ├── sitemap.ts          # Auto-generated sitemap├── public/

│   └── robots.ts           # Robots.txt configuration│   └── hero-image.jpg      # Hero section image

├── components/└── tailwind.config.ts      # Tailwind configuration

│   ├── Navbar.tsx          # Navigation bar```

│   ├── Hero.tsx            # Hero section with image

│   ├── Services.tsx        # Services showcase## 🎨 Color Scheme

│   ├── Stats.tsx           # Company statistics

│   ├── About.tsx           # About section- Primary Purple: `#9333ea` to `#7e22ce`

│   ├── Contact.tsx         # Contact form (Netlify Forms)- Secondary Purple: `#8b5cf6` to `#6d28d9`

│   ├── Footer.tsx          # Footer- White: `#ffffff`

│   └── JsonLd.tsx          # Structured data- Black: `#000000`

├── public/- Gray shades for text and backgrounds

│   ├── hero-image.jpg      # Hero section image

│   └── _redirects          # Netlify redirects## 📱 Sections

├── netlify.toml            # Netlify configuration

├── deploy.sh               # Deployment script1. **Hero**: Eye-catching hero section with company tagline and CTA

├── DEPLOYMENT.md           # Detailed deployment guide2. **Services**: Four main services with detailed descriptions

└── tailwind.config.ts      # Tailwind configuration3. **Stats**: Company statistics and achievements

```4. **About**: Company values and team information

5. **Contact**: Contact form and company information

## 🎨 Color Scheme6. **Footer**: Links, services, and social media



- Primary Purple: `purple-600` (Tailwind)## 🔧 Customization

- Secondary Violet: `violet-600` (Tailwind)

- White: `#ffffff`### Update Company Information

- Black: `#000000`

- Gray shades for text and backgroundsEdit the content in:

- `components/Hero.tsx` - Hero section text

## 📱 Sections- `components/Services.tsx` - Service descriptions

- `components/Stats.tsx` - Statistics

1. **Hero**: Eye-catching hero section with company tagline and CTA- `components/About.tsx` - Company information

2. **Services**: Four main services with detailed descriptions- `components/Contact.tsx` - Contact details

3. **Stats**: Company statistics and achievements- `components/Footer.tsx` - Footer information

4. **About**: Company values and team information

5. **Contact**: Contact form with Netlify Forms integration### Update SEO Metadata

6. **Footer**: Links, services, and social media

Edit `app/layout.tsx` to update:

## 🔧 Customization- Page title and description

- Keywords

### Update Company Information- Open Graph tags

- Twitter card data

Edit the content in:

- `components/Hero.tsx` - Hero section text### Update Colors

- `components/Services.tsx` - Service descriptions

- `components/Stats.tsx` - StatisticsEdit `tailwind.config.ts` to customize the color palette.

- `components/About.tsx` - Company information

- `components/Contact.tsx` - Contact details## 📊 Performance Features

- `components/Footer.tsx` - Footer information

- Lazy loading for images

### Update SEO Metadata- Optimized animations with `useInView` hook

- CSS-based animations with reduced motion support

Edit `app/layout.tsx` to update:- Minimal JavaScript bundle size

- Page title and description

- Keywords## 🌐 Deployment

- Open Graph tags

- Twitter card dataThis project is ready to deploy on Vercel, Netlify, or any hosting platform that supports Next.js.

- Site URL (change from bjornsta.se to your domain)

### Vercel (Recommended)

### Update Colors

```bash

The site uses Tailwind's built-in purple and violet colors. To change:vercel

- Replace `purple-*` classes with your preferred color```

- Replace `violet-*` classes with your preferred color

### Other Platforms

## 📊 Performance Features

Build the project and serve the `.next` directory:

- Lazy loading for images

- Optimized animations with `useInView` hook```bash

- CSS-based animations with reduced motion supportnpm run build

- Minimal JavaScript bundle sizenpm start

- Next.js automatic code splitting```



## 🔍 SEO Features## 📝 License



- Comprehensive meta tags© 2025 Björnsta Consulting Group. All rights reserved.

- Open Graph for social sharing

- Twitter Card optimization## 🤝 Support

- JSON-LD structured data

- Automatic sitemap generationFor support or inquiries, contact:

- Robots.txt configuration- Email: info@bjornsta.se

- Swedish language declaration- Phone: +46 (0) 123 456 789


## 📈 After Deployment

1. **Test the contact form** - Submit a test message
2. **Check form submissions** - Netlify Dashboard → Forms
3. **Configure email notifications** - Get notified of new submissions
4. **Set up custom domain** - Point your domain to Netlify
5. **Enable HTTPS** - Automatic with Netlify
6. **Monitor performance** - Use Lighthouse and PageSpeed Insights

## 📝 License

© 2025 Björnsta Consulting Group. All rights reserved.

## 🤝 Support

For support or inquiries, contact:
- Email: info@bjornsta.se
- Phone: +46 (0) 123 456 789

---

Built with ❤️ using Next.js and Tailwind CSS
