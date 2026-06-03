# Cletus Blaze Capture — Luxury Photography Website

A modern, dark-themed luxury photography portfolio website built with vanilla HTML, CSS, and JavaScript. Designed for **Cletus Blaze Capture**, a professional photography studio specializing in weddings, portraits, events, baby showers, and interior photography.

---

## 🌐 Live Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero with typing animation, featured work, services, testimonials, marquee, before/after slider, carousel, Instagram feed, CTA |
| Portfolio | `portfolio.html` | Filterable masonry gallery (5 categories) with Load More button and lightbox |
| Pricing | `pricing.html` | Photography & wedding packages with tiered pricing cards |
| About | `about.html` | Bio, stats counter, why choose us, process steps, testimonials |
| Contact | `contact.html` | Contact form (Formspree), FAQ accordion, Google Maps embed |
| 404 | `404.html` | Custom animated error page |

---

## ✨ Features

### Design & UX
- Dark luxury theme with gold (#c9a96e) accent color
- Fully responsive (360px → 1440px+)
- Smooth page transitions (scaleY animation between pages)
- Scroll-triggered reveal animations with IntersectionObserver
- Parallax backgrounds on page banners and CTA section
- Light/Dark mode toggle (persisted via localStorage)
- Custom preloader with spinner
- Scroll progress bar (gold gradient at top)
- Back-to-top button (appears after 500px scroll)
- WhatsApp floating button for quick booking

### Homepage Sections
- **Hero** — Centered typing animation for headline + subtitle with gold particles
- **Featured Work** — Bento grid layout (3 images)
- **Services** — 5 icon cards (Portrait, Wedding, Events, Baby Shower, Interior)
- **Testimonials** — Client cards with profile images and quote styling
- **Trusted By** — Auto-scrolling infinite brand marquee
- **Before & After** — Draggable mouse/touch comparison slider
- **More Captures** — Touch-swipeable image carousel (3/2/1 per view) with hover zoom + button pulse animation
- **Instagram Feed** — 6-image grid with hover overlay linking to Instagram
- **CTA** — Parallax call-to-action with animated background pulse

### Portfolio Page
- Category filter buttons (All, Wedding, Portrait, Events, Baby Shower, Interior)
- Masonry CSS columns layout (3 columns desktop, 2 tablet, 1 mobile)
- Load More button reveals hidden items with staggered fade animation
- Filtering by category shows all items and hides Load More button
- Lightbox with keyboard navigation (←/→/Esc) and prev/next arrows
- 55+ portfolio images from categorized `photo shoot 2/` folder

### Contact Page
- Dual-column layout: contact info + form
- **Formspree integration** — messages sent directly to email
- Service type dropdown selector (Portrait, Wedding, Event, Creative)
- Inline form feedback ("✓ Message Sent!" / "✗ Failed" with auto-reset)
- Accordion-style FAQ section with hover animations
- Embedded Google Maps iframe (Lagos, Nigeria)

### About Page
- Split layout: portrait image + bio text
- Animated stats counter (8+ years, 500+ projects, 350+ clients, 15K+ photos)
- Why Choose Us cards (Award-Winning, Personal Touch, Timely Delivery)
- 4-step process section (Consultation → Shoot → Editing → Delivery)
- 5 testimonial cards

### Pricing Page
- Photography packages (Basic ₦50K, Premium ₦120K, Luxury ₦250K)
- Wedding packages (Silver ₦200K, Gold ₦400K, Platinum ₦700K)
- "Most Popular" / "Best Value" badges on featured cards
- Custom package CTA

### Performance
- Lazy loading on all images (`loading="lazy"`)
- Font Awesome loaded asynchronously (`media="print"` + `onload`)
- Throttled scroll events (100ms navbar, 50ms progress bar, 200ms back-to-top)
- Single IntersectionObserver for all reveal elements
- CSS `will-change` optimization on animated elements
- No external JavaScript frameworks or libraries

---

## 📁 Project Structure

```
cletus-blaze-capture/
├── css/
│   └── style.css              # All styles (2500+ lines, fully responsive)
├── js/
│   └── main.js               # All interactivity (carousel, lightbox, filters, etc.)
├── images/
│   ├── gallery/              # 16 gallery images (hero bg, before/after, CTA bg)
│   ├── photo shoot/          # 19 images (featured work, Instagram feed)
│   ├── photo shoot 2/        # Categorized portfolio images (92 total)
│   │   ├── baby shower/      # 15 images (.jpeg)
│   │   ├── Event/            # 10 images (.jpg)
│   │   ├── interior/         # 12 images (.jpg)
│   │   ├── portrait/         # 32 images (.jpeg + .jpg)
│   │   └── wedding/          # 23 images (.jpeg + .jpg)
│   ├── portfolio/            # Legacy portfolio images
│   └── testimonials/         # 5 client testimonial avatars
├── index.html                # Homepage
├── portfolio.html            # Portfolio with filters + load more
├── pricing.html              # Pricing packages
├── about.html                # About page
├── contact.html              # Contact + FAQ + Google Maps
├── 404.html                  # Custom 404 page
├── logo.svg                  # Site logo (SVG, used as favicon)
├── my logo.png               # Alternative logo (PNG)
├── about me.png              # About page portrait
├── right side 1.jpeg         # Side image (backup)
├── right side 2.png          # Alternative side image (backup)
└── README.md                 # This file
```

---

## 🎨 Design System

### Colors
| Variable | Value | Usage |
|----------|-------|-------|
| `--gold` | `#c9a96e` | Primary accent, buttons, highlights, borders |
| `--gold-light` | `#e2c992` | Gradient highlights, shimmer effects |
| `--dark` | `#0a0a0a` | Body background |
| `--dark-2` | `#141414` | Alternate section background |
| `--dark-3` | `#1a1a1a` | Cards, borders, input backgrounds |
| `--white` | `#f5f5f5` | Primary text color |
| `--gray` | `#888` | Secondary text, descriptions |

### Typography
- **Headings:** Playfair Display (serif) — 400, 600, 700
- **Body:** Montserrat (sans-serif) — 300, 400, 500, 600

### Breakpoints
| Breakpoint | Target |
|-----------|--------|
| 1200px | Large tablets / small desktops |
| 992px | Tablets (featured grid → 2 col, portfolio → 2 col) |
| 768px | Small tablets / large phones (mobile nav, single columns) |
| 480px | Mobile phones (compact spacing, single carousel slide) |
| 360px | Small mobile devices (minimal sizing) |

---

## ⚙️ JavaScript Features

| Feature | Description |
|---------|-------------|
| Preloader | Fades out on `window.load` |
| Navbar | Auto-hide on scroll down, show on scroll up, blur background on scroll |
| Mobile Nav | Hamburger toggle, close on outside click or link click |
| Reveal Animations | IntersectionObserver with stagger support for grid children |
| Typing Effect | Hero h1 and p typed character-by-character with blinking cursor |
| Portfolio Filter | Category buttons show/hide items, integrates with Load More |
| Load More | Reveals hidden portfolio items with staggered fade-in animation |
| Lightbox | Click-to-zoom on portfolio/featured images, arrow nav, keyboard (Esc/←/→) |
| Before/After Slider | Mouse + touch drag comparison with handle |
| Carousel | Prev/next buttons, touch swipe, responsive slide count (3/2/1) |
| Counter Animation | Stats numbers count up when scrolled into view |
| Scroll Progress | Gold gradient bar at top showing page scroll position |
| Back to Top | Appears after 500px scroll, smooth scroll to top |
| Theme Toggle | Light/dark mode with sun/moon icon, saved to localStorage |
| Page Transitions | ScaleY animation between internal page navigations (300ms) |
| Contact Form | Formspree fetch submission with inline success/error feedback |
| WhatsApp Button | Fixed button linking to WhatsApp with pre-filled booking message |

---

## 📧 Contact Form Setup

The contact form uses **Formspree** for email delivery:
- Endpoint: `https://formspree.io/f/mzdqpngr`
- Submissions go to: cletusblaze@gmail.com
- Fields: Name, Email, Phone, Service Type, Message
- Inline JS feedback (no page redirect)

To change the receiving email, update the form endpoint on [formspree.io](https://formspree.io).

---

## 🚀 Getting Started

1. Clone or download the project
2. Open `index.html` in a browser (no build step needed)
3. For local development, use any static server:
   ```bash
   # Python
   python -m http.server 8000

   # Node.js (npx)
   npx serve .

   # VS Code
   # Use "Live Server" extension
   ```

---

## 📱 Contact Info (In-Site)

- **Phone:** +234 8059989192
- **Email:** cletusblazecapture@gmail.com
- **Instagram:** @cletusblazecapture
- **WhatsApp:** Direct link with pre-filled booking message
- **Location:** Lagos, Nigeria
- **Hours:** Mon - Sat: 9:00 AM - 6:00 PM

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup, Open Graph meta tags, lazy loading
- **CSS3** — Custom properties, Grid, Flexbox, animations, media queries, parallax
- **Vanilla JavaScript** — No frameworks or libraries
- **Formspree** — Contact form email delivery
- **Font Awesome 6.5** — Icons (async loaded for performance)
- **Google Fonts** — Playfair Display + Montserrat
- **Google Maps Embed** — Contact page interactive map

---

## 📝 License

© 2024 Cletus Blaze Capture. All Rights Reserved.
