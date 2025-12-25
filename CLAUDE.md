# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static landing page for Packwalk - a Toronto dog walking app that donates 20% to local shelters. Deployed to **packwalk.ca** via GitHub Pages.

## Tech Stack

- Pure HTML/CSS/JavaScript (no build tools, no npm)
- Google Fonts: Fraunces (serif), DM Sans (sans-serif)
- Convex backend via CDN import for waitlist forms

## Files

- `index.html` - Main landing page with waitlist forms
- `privacy.html` - Privacy policy
- `CNAME` - Custom domain config (packwalk.ca)
- `archive/` - Previous landing page versions

## Convex Integration

Forms call the Convex backend directly via HTTP client:

```javascript
import { ConvexHttpClient } from "https://esm.sh/convex@1.21.0/browser";
const client = new ConvexHttpClient("https://earnest-minnow-363.convex.cloud");

// Owner waitlist
await client.mutation("waitlist:add", { email, type: "owner" });

// Walker application
await client.mutation("waitlist:add", { email, type: "walker", name });
```

The `waitlist:add` mutation is defined in the main `packwalk-mobile/convex/waitlist.ts` file.

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
