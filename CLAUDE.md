# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static landing page for Packwalk - a Toronto dog walking app that donates 20% to local shelters. Deployed to **packwalk.ca** via GitHub Pages.

## Tech Stack

- Pure HTML/CSS/JavaScript (no build tools, no npm)
- Google Fonts: Fraunces (serif), DM Sans (sans-serif)
- Convex backend via CDN import for waitlist forms
- CSS keyframe animations (no external animation libraries)

## Files

- `index.html` - Main landing page with waitlist forms
- `privacy.html` - Privacy policy
- `CNAME` - Custom domain config (packwalk.ca)
- `archive/` - Previous landing page versions

## Waitlist Forms

Split-screen layout with gamified success animations:
- **Owner form** (left): Collects name + email, warm cream background
- **Walker form** (right): Collects name + email, dark ink background

### Success State Features
- 8-paw confetti burst (CSS animation with `--angle` and `--distance` custom properties)
- Animated SVG checkmark with ring pulse
- Achievement badges ("Early Adopter" / "Future Walker")
- Animated position counter using `requestAnimationFrame` with cubic ease-out

### Position Counter Logic
- New signups: Shows total count of their type (you're the newest)
- Returning users: Shows their original signup position

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
| `--ink` | #2C2416 | Primary text |
| `--ink-light` | #5C5446 | Secondary text |
| `--warm-white` | #FFFCF7 | Background |
| `--cream` | #FDF8F3 | Card backgrounds |
| `--maple` | #C41E3A | Canadian accent |

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
