# Aayu Sehgal Portfolio

Personal portfolio website built with React + TypeScript + Vite, with premium UI interactions, glassmorphism styling, animated sections, and a responsive carousel-based project showcase.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Features

- Scroll-reactive glass navbar
- Responsive hero, projects, quote, experience, stats, CTA, and footer sections
- Circular testimonial-style project carousel with keyboard and autoplay support
- Lightweight reveal animations that replay on scroll
- Optimized logo cloud with self-hosted icon assets
- Footer social links with icon buttons

## Local Development

Prerequisites:

- Node.js 20+
- npm 10+

Install and run:

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
   App.tsx
   main.tsx
   index.css
components/ui/
   navbar-1.tsx
   glass-button.tsx
   logo-cloud-3.tsx
   infinite-slider.tsx
   circular-testimonials.tsx
public/
   logos/
   project-pngs/
```

## Deployment

### GitHub

Repository target:

- https://github.com/sehgalaayu/aayu-sehgal-portfolio

Push flow:

```bash
git add .
git commit -m "feat: optimize portfolio performance and deployment docs"
git push origin main
```

### Vercel

Option 1: Import GitHub repo in Vercel dashboard

1. Go to https://vercel.com/new
2. Import `sehgalaayu/aayu-sehgal-portfolio`
3. Framework preset: Vite
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy

Option 2: CLI deploy

```bash
npx vercel
npx vercel --prod
```

## Performance Notes

- Unused demo files and dependencies removed
- External stack logos replaced with self-hosted local SVG files
- Animations pause in background tabs where applicable
- Images use lazy loading and async decoding
