# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static landing page for Packwalk - a Toronto dog walking app that donates 20% to local shelters. Deployed to **packwalk.ca** via GitHub Pages.

## Tech Stack

- Pure HTML/CSS/JavaScript (no build tools, no npm)
- Google Fonts: Fraunces (serif), DM Sans (sans-serif)
- Lucide Icons via CDN (`https://unpkg.com/lucide@latest`)
- GSAP + ScrollTrigger for animations (`https://cdn.jsdelivr.net/npm/gsap@3.12.5`)
- Convex backend via CDN import for waitlist forms

## Files

- `index.html` - Main landing page with all sections
- `privacy.html` - Privacy policy
- `CNAME` - Custom domain config (packwalk.ca)
- `paw.png` - Logo paw icon
- `canada.png` - 3D rounded Canadian flag for hero
- `archive/` - Previous landing page versions

## Page Sections

### 1. Hero Section
- Asymmetric two-column layout (text left, flag right)
- Floating 3D Canada flag with mouse parallax effect (GSAP)
- Animated headline with line-by-line reveal
- Floating decorative paw prints (hidden on mobile)
- Stat badges floating near flag (hidden on tablet/mobile)
- Mobile: Flag floats near headline at 90px, tilted 12°

### 2. Money Journey Comparison ("Why Packwalk")
- Dark background section
- Side-by-side journey cards: Rover (faded) vs Packwalk (vibrant)
- Animated money flow line on Packwalk card
- GSAP scroll animations (cards slide in from opposite sides)

### 3. App Preview
- Phone mockups showing app screens (iPhone + Android)
- 3D tilt effect on scroll (GSAP)
- Feature cards with Lucide icons (dog, map-pin, heart)
- "Coming Soon" badges

### 4. Waitlist Split Section
- Split-screen layout: Owner (cream) | Walker (dark)
- Gamified success state with paw confetti burst
- Animated position counter

### 5. Footer
- Lucide icons: paw-print, maple-leaf, instagram, mail, shield
- Mobile: stacks vertically with centered alignment

## Animations

### GSAP Animations
- Hero headline line reveal with stagger
- Highlight underline draw-in
- Flag mouse parallax (rotateX/rotateY on mousemove)
- Scroll-triggered reveals (`.reveal-on-scroll` class)
- Journey cards slide in from left/right
- Phone 3D tilt on scroll

### CSS Keyframe Animations
- `flagFloat` - Flag bobbing motion
- `floatPaw` - Decorative paw prints floating
- `flowPulse` - Money flow line animation
- `iconPulse` - Destination icon pulse
- `confettiBurst` - Success state paw confetti
- `drawCheck` - SVG checkmark animation
- `ringPulse` - Success check ring pulse

## Convex Integration

Forms call the Convex backend directly via HTTP client:

```javascript
import { ConvexHttpClient } from "https://esm.sh/convex@1.21.0/browser";
const client = new ConvexHttpClient("https://earnest-minnow-363.convex.cloud");

// Returns { success: boolean, alreadyExists: boolean, position: number }
const result = await client.mutation("waitlist:add", { email, type: "owner", name });
animateCounter(element, result.position);
```

### Convex Functions (`packwalk-mobile/convex/waitlist.ts`)

| Function | Type | Description |
|----------|------|-------------|
| `waitlist:add` | mutation | Add to waitlist, returns position |
| `waitlist:getStats` | query | Get counts and all entries |

```bash
# Check waitlist stats
npx convex run waitlist:getStats
```

## Design System

CSS custom properties defined in `:root`:

| Variable | Value | Usage |
|----------|-------|-------|
| `--ember` | #E86A33 | Primary/owner orange |
| `--ember-dark` | #C85A2A | Hover states |
| `--sage` | #5B8C5A | Walker/secondary green |
| `--sage-light` | #7AAC79 | Sage hover/light variant |
| `--ink` | #2C2416 | Primary text, dark backgrounds |
| `--ink-light` | #5C5446 | Secondary text |
| `--warm-white` | #FFFCF7 | Page background |
| `--cream` | #FDF8F3 | Card backgrounds |
| `--maple` | #C41E3A | Canadian red accent |

## Responsive Breakpoints

| Breakpoint | Changes |
|------------|---------|
| 1024px | Hero becomes single column, flag above content |
| 900px | Phone showcase gap reduced |
| 768px | Waitlist becomes single column, footer stacks |
| 700px | Journey cards stack vertically |
| 600px | Hero flag floats near headline (absolute), phones stack |

## Deployment

This is a separate git repo from the main app:
- Remote: `https://github.com/sahasand/packwalk.git`
- Push to `main` to deploy to GitHub Pages

```bash
git add .
git commit -m "Your message"
git push
```

## Relationship to Main App

This landing page lives inside `/packwalk-mobile/web_html/` but has its own git history. The main app's Convex backend (in `/packwalk-mobile/convex/`) handles the waitlist mutations. After adding/modifying Convex functions, deploy with:

```bash
cd /Users/sanman/Documents/dog-walk-new/packwalk-mobile
npx convex dev --once  # Push to dev deployment
```
