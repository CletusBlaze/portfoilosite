# Cletus Blaze Capture — Luxury Photography Website

A modern, dark-themed luxury photography portfolio website built with vanilla HTML, CSS, and JavaScript. Designed for **Cletus Blaze Capture**, a professional photography studio specializing in weddings, portraits, events, baby showers, and interior photography.

---

## 🌐 Live Site

**[cletusblazecapture.netlify.app](https://cletusblazecapture.netlify.app)**

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero with typing animation, featured work, services, testimonials, marquee, before/after slider, carousel, Instagram feed, quick booking, CTA |
| Portfolio | `portfolio.html` | Filterable masonry gallery (5 categories) with Load More button and lightbox |
| Pricing | `pricing.html` | Photography, wedding & video packages with tiered pricing cards, instant quote calculator |
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
- `background-attachment: scroll` on hero, page banners, and CTA (mobile-safe)
- Light/Dark mode toggle (persisted via localStorage)
- Custom preloader with spinner
- Scroll progress bar (gold gradient at top)
- Back-to-top button (appears after 500px scroll)
- WhatsApp floating button for quick booking
- `prefers-reduced-motion` support on page transitions

### Homepage Sections
- **Hero** — Centered typing animation for headline + subtitle
- **Featured Work** — Bento grid layout (3 images)
- **Services** — 5 icon cards (Portrait, Wedding, Events, Baby Shower, Interior)
- **Testimonials** — Client cards with profile images and quote styling
- **Trusted By** — Auto-scrolling infinite brand marquee
- **Before & After** — Draggable mouse/touch comparison slider
- **Quick Booking** — 6 popular Nigerian services (Traditional Wedding, White Wedding, Naming Ceremony, Graduation Photos, Corporate Headshots, Birthday Photoshoot) with direct WhatsApp links
- **More Captures** — Touch-swipeable image carousel (3/2/1 per view)
- **Instagram Feed** — 6-image grid with hover overlay linking to Instagram
- **CTA** — Call-to-action with animated background pulse

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
- Embedded Google Maps iframe (Benin City, Nigeria)
- Light mode form inputs fully visible

### About Page
- Split layout: portrait image + bio text
- Animated stats counter (8+ years, 500+ projects, 350+ clients, 15K+ photos)
- Why Choose Us cards (Award-Winning, Personal Touch, Timely Delivery)
- 4-step process section (Consultation → Shoot → Editing → Delivery)
- 5 testimonial cards

### Pricing Page
- Photography packages (Basic ₦25K, Premium ₦50K, Luxury ₦85K)
- Wedding packages (Silver ₦200K, Gold ₦350K, Platinum ₦500K)
- Video packages (Basic ₦80K, Premium ₦150K, Luxury ₦300K)
- Event & special occasion packages (Corporate ₦75K, Burial coverage ₦450K–₦550K)
- **Instant Quote Calculator** — Real-time pricing with add-on services and WhatsApp integration
- "Most Popular" / "Best Value" badges on featured cards
- Custom package CTA at bottom

### Performance
- Lazy loading on all images (`loading="lazy"`)
- Font Awesome loaded asynchronously (`media="print"` + `onload`)
- `preconnect` hints to Google Fonts and Cloudflare CDN on all pages
- `font-display=swap` on Google Fonts import
- Throttled scroll events (50ms progress bar, 200ms back-to-top)
- Single IntersectionObserver for all reveal elements
- No external JavaScript frameworks or libraries
- All `target="_blank"` links include `rel="noopener noreferrer"`

---

## 📁 Project Structure

```
cletus-blaze-capture/
├── css/
│   └── style.css              # All styles (fully responsive)
├── js/
│   └── main.js                # All interactivity (carousel, lightbox, filters, etc.)
├── images/
│   ├── gallery/               # 16 gallery images (hero bg, before/after, CTA bg)
│   ├── photo shoot/           # 19 images (featured work, Instagram feed)
│   ├── photo shoot 2/         # Categorized portfolio images (92 total)
│   │   ├── baby shower/       # 15 images (.jpeg)
│   │   ├── Event/             # 10 images (.jpg)
│   │   ├── interior/          # 12 images (.jpg)
│   │   ├── portrait/          # 32 images (.jpeg + .jpg)
│   │   └── wedding/           # 23 images (.jpeg + .jpg)
│   └── testimonials/          # 5 client testimonial avatars
├── index.html                 # Homepage
├── portfolio.html             # Portfolio with filters + load more
├── pricing.html               # Pricing packages
├── about.html                 # About page
├── contact.html               # Contact + FAQ + Google Maps
├── 404.html                   # Custom 404 page
├── logo.svg                   # Site logo (SVG, used as favicon)
├── my logo.png                # Alternative logo (PNG)
├── about me.png               # About page portrait
└── README.md                  # This file
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
| Navbar | Scrolled class on scroll, blur background |
| Mobile Nav | Hamburger toggle, close on outside click, Escape key |
| Page Transitions | ScaleY animation (300ms), skips external/tel/mailto links, clears body overflow, respects `prefers-reduced-motion` |
| Reveal Animations | IntersectionObserver with stagger support for grid children |
| Typing Effect | Hero h1 and p typed character-by-character with blinking cursor |
| Portfolio Filter | Category buttons show/hide items, integrates with Load More |
| Load More | Reveals hidden portfolio items with staggered fade-in |
| Lightbox | Click-to-zoom on portfolio/featured images, arrow nav, keyboard (Esc/←/→) |
| Before/After Slider | Mouse + touch drag comparison with handle |
| Carousel | Prev/next buttons, touch swipe, responsive slide count (3/2/1) |
| Counter Animation | Stats numbers count up when scrolled into view |
| Scroll Progress | Gold gradient bar at top showing page scroll position |
| Back to Top | Appears after 500px scroll, smooth scroll to top |
| Theme Toggle | Light/dark mode with sun/moon icon, saved to localStorage |
| Contact Form | Formspree fetch submission with inline success/error feedback |
| Quick Booking | 6 Nigerian photography services with direct WhatsApp booking links |
| Quote Calculator | Interactive pricing calculator with real-time updates and WhatsApp quote sharing |
| WhatsApp Button | Fixed floating button with pre-filled booking message |

---

## 🐛 Bug Fixes & Optimizations (Post-Launch)

- Fixed `background-attachment: fixed` breaking on mobile browsers — changed to `scroll` on hero, page banners, and CTA
- Fixed `404.html` using old broken navbar system — replaced with current navbar + preloader/page-transition divs
- Fixed `setupActiveStates()` partial path matching — now uses `endsWith()` for exact filename match
- Fixed `border-radius` persisting on navbar at mobile widths — added explicit reset at 992px breakpoint
- Fixed mobile nav links not navigating — `closeMobileMenu()` was racing with page transition; now state resets inline and transition handles navigation
- Fixed page transition `link.hostname` check failing on Android mobile browsers — replaced with explicit external/anchor detection
- Fixed `body.style.overflow = 'hidden'` persisting on new page after mobile menu navigation — cleared before every transition
- Fixed contact form inputs invisible in light mode — added light-mode CSS overrides
- Fixed quote calculator functions not callable from HTML `onclick` — exposed on `window`
- Fixed `href` variable shadowing in page transition listener
- Removed ~15 dead CSS rules and keyframes (`.nav-links`, `.showreel-section`, `.video-*`, `.blog-grid`, unused animations)
- Added `rel="noopener noreferrer"` to all `target="_blank"` links
- Added `preconnect` hints and `font-display=swap` to all pages
- Added `resetBtn()` shared helper to consolidate contact form state reset
- Removed JS-based mobile menu item animation (CSS handles it)

---

## 📧 Contact Form Setup

The contact form uses **Formspree** for email delivery:
- Endpoint: `https://formspree.io/f/mzdqpngr`
- Submissions go to: cletusblazecapture@gmail.com
- Fields: Name, Email, Phone, Service Type, Message
- Inline JS feedback (no page redirect)

To change the receiving email, update the form endpoint on [formspree.io](https://formspree.io).

---

## 🚀 Getting Started

1. Clone or download the project
2. For local development, serve via a static server (do **not** open as `file://` — lazy loading and some CSS features require HTTP):
   ```bash
   # Node.js
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
- **Location:** Benin City, Edo State, Nigeria
- **Hours:** Mon - Sat: 9:00 AM - 6:00 PM

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup, Open Graph meta tags, lazy loading
- **CSS3** — Custom properties, Grid, Flexbox, animations, media queries
- **Vanilla JavaScript** — No frameworks or libraries
- **Formspree** — Contact form email delivery
- **Font Awesome 6.5** — Icons (async loaded for performance)
- **Google Fonts** — Playfair Display + Montserrat (`font-display=swap`)
- **Google Maps Embed** — Contact page interactive map
- **Netlify** — Hosting and continuous deployment

---

## 📝 License

© 2024 Cletus Blaze Capture. All Rights Reserved.
