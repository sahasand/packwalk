# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static landing page for Packwalk, a live Toronto dog walking app for owners and walkers. Packwalk is committed to supporting Toronto animal rescues through company-funded giving. Deployed to **packwalk.ca** via GitHub Pages.

> **Giving copy guardrail:** Never connect a customer's walk payment, fee, tip, or purchase to a charitable donation. Do not publish per-walk giving percentages or customer impact totals. Tips go 100% to walkers. Approved framing: "Packwalk is committed to supporting Toronto animal rescues through company-funded giving."

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

## Page Sections

### 1. Hero Section
- Asymmetric two-column layout (text left, flag right)
- Floating 3D Canada flag with mouse parallax effect (GSAP)
- Animated headline with line-by-line reveal
- Floating decorative paw prints (hidden on mobile)
- Stat badges floating near flag (hidden on tablet/mobile)
- Primary CTA links to the live App Store listing
- Mobile: Flag floats near headline at 90px, tilted 12°

### 2. Product Pillars ("Local by design")
- Dark background section
- Three pillars: neighbourhood walkers, live confidence, and community-first company
- Company-funded giving language is not connected to customer payments

### 3. App Preview
- Phone mockups showing app screens (iPhone + Android)
- 3D tilt effect on scroll (GSAP)
- Feature cards with Lucide icons (dog, map-pin, heart)
- iPhone CTA links to the live App Store; Android remains "Coming Soon"

### 4. Download Split Section
- Split-screen layout: Owner (cream) | Walker (dark)
- Both roles link to the same live iPhone app
- Walker panel explains the 80% walk-fee share and 100%-of-tips payout

### 5. Footer
- Lucide icons: paw-print, mail, shield. Maple leaf + Instagram are INLINE SVGs
  (identical markup on index/about/become-a-dog-walker) because lucide@latest
  dropped both names — do not switch them back to `data-lucide`.
- Includes a direct App Store link
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

### Section Transitions
Gradient fades using `::after` pseudo-elements for smooth color flow between sections:

| Section | Pseudo | Height | Effect |
|---------|--------|--------|--------|
| `.hero` | `::after` | 120px | Bottom fade: transparent → ink |
| `.contrast` | `::after` | 100px | Bottom fade: transparent → cream |
| `.app-preview` | `::after` | 80px | Top fade: ink → transparent |
| `.waitlist-panel.owners` | `::after` | 60px | Mobile only: transparent → ink |

## App Store

- Public listing: `https://apps.apple.com/app/id6758026014`
- App Store ID: `6758026014`
- The homepage no longer loads Convex or collects owner/walker waitlist entries.

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

This landing page lives inside `/packwalk-mobile/web_html/` but has its own git history. It links to the Packwalk iOS app but does not call the app's Convex backend.
