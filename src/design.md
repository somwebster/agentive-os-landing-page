# Unioun Design System

## Overview

**Unioun** is a Human + AI collaboration product. The brand is built around the idea of two forces in partnership: the **Human side** (warm orange/fire tones) and the **AI side** (cool purple/violet tones). Together they form a visual identity that communicates co-creation, intelligence, and warmth.

The design system was created from Figma CSS export data covering: typography (Inter, Geist, Google Sans), color palette and semantic tokens, border/radius tokens, spacing tokens, and shadow tokens.

> **Sources**: Figma CSS exports were pasted directly as the primary source. No external codebase or Figma link was provided — all tokens were reconstructed from the CSS output.

---

## CONTENT FUNDAMENTALS

- **Tone**: Confident, collaborative, and approachable. The brand speaks to both technical and non-technical users with clarity.
- **Voice**: First-person plural ("we", "our") when speaking as the product; second-person ("you") when addressing the user. Avoids jargon.
- **Casing**: Sentence case for UI labels and body copy. Title case reserved for section headers and navigation.
- **Emoji**: Not used in UI copy. Brand stays clean and text-forward.
- **Punctuation**: Clean — minimal use of exclamation points. Favors periods and em-dashes for emphasis.
- **Copy vibe**: Precise but human. Describes complex AI actions in plain terms. E.g. "Here is a simple caption." rather than "AI-powered caption generation module output."

---

## VISUAL FOUNDATIONS

### Colors
- **Brand Primary (Human side)**: Orange/fire — `#F7621E` (secondary-500). Used for primary actions, CTAs, hero elements.
- **Brand Secondary (AI side)**: Purple/violet — `#963BF7` (primary-500). Used for interactive states, AI-attributed actions, smart suggestions.
- **Neutral**: Warm gray — ranges from `#FAFAFA` (neutral-25) to `#050506` (neutral-900). Slightly purple-tinted neutrals.
- **Success**: Green — `#28B83D` (500), `#E5F9E9` (50 tint).
- **Warning**: Yellow — `#F9DF1C` (500), `#FEFDF3` (25 tint).
- **Error**: Red — `#FF201F` (500), `#FFF4F4` (25 tint).

### Typography
- **Primary typeface**: **Google Sans** — used for all headings and body text in product and marketing contexts.
- **Display typeface**: **Geist** — used for token labels, code-adjacent UI, and technical/spec contexts.
- **Utility typeface**: **Inter** — used in spec annotations and secondary documentation contexts.
- Type scale is mobile-first with `base` (375–639px) and `md` (≥640px) breakpoint values.

### Spacing
- **Component spacing** (internal padding): sm=8, md=16 (default), lg=24, xl=32, 2xl=64
- **Gap spacing** (between sections): sm=16, md=32, lg=64, xl=96
- Rule: internal spacing ≤ border radius to maintain visual balance.

### Borders & Radius
- **Border widths**: sm=1px (default), md=2px (focus/selected).
- **Border radii**: sm=28, md=36 (default), lg=40, xl=48, round=120.
- Optical roundness rule: inner radius = outer radius − padding.

### Shadows / Elevation
- **shadow:sm** — `0px 4px 20px rgba(0,0,0,0.12)` — cards, panels at rest.
- **shadow:md** — `0px 6px 15px rgba(0,0,0,0.15)` — dropdowns, popovers, hover states.
- **shadow:lg** — `0px 8px 25px rgba(0,0,0,0.20)` — modals, dialogs, floating surfaces.
- Shadows communicate elevation, not decoration. Never combine multiple shadow levels on one surface.

### Backgrounds & Surfaces
- Backgrounds are clean white (`#FAFAFA` / `#F6F5F5`) in light mode; deep near-black (`#050506`) in dark mode.
- Purple tinted hero banners (`#E6D0FD`) used as accent section backgrounds.
- No gradients — backgrounds are flat color only.
- No full-bleed imagery or textures mentioned; surfaces stay clean.

### Animation
- No explicit animation system defined in the source data. Assumed to be minimal/functional — subtle fades, no bounces.

### Hover / Press States
- Hover: step one shade darker along the color scale (e.g. action: primary-500 → primary-600 on hover).
- Focus: border width increases to md (2px), borderAction color applied.
- Disabled: neutral-100 surface, neutral-400 text.

### Cards
- Rounded corners: BorderRadius-md (36px) default.
- Shadow: shadow:sm at rest, shadow:md on hover.
- Border: 1px neutral-300 (light) / neutral-700 (dark).
- Backgrounds: white or surfacePrimary (#FAFAFA).

### Imagery & Iconography
- See ICONOGRAPHY section below.
- No illustrations or hand-drawn elements found in the source data.

---

## ICONOGRAPHY

- No custom icon set or icon font was found in the source data.
- The design system does not appear to use emoji as icons.
- Recommended substitute: **Lucide Icons** (CDN) — clean, consistent 2px stroke weight, matches the brand's precision aesthetic.