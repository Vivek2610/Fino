# FINO Jewellery — Maison Haute Joaillerie

> **“Bold by Nature. Golden by Design.”**  
> An architectural dialogue between faceted gold, vivid emerald tones, and sovereign geometry.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.x-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)

---

## ✦ Overview

**FINO Jewellery** is a bespoke digital experience designed for a luxury high jewellery maison based in Dubai’s historic Gold Souk. The platform harmoniously combines architectural design language, scroll-driven kinetic branding, and editorial catalogue presentation.

---

## 🏛 Architectural & Design Highlights

### 1. The Scroll-Driven Logo Journey
At the core of the homepage is a proprietary kinetic animation system built with **GSAP & ScrollTrigger** (`src/journey/logoJourney.ts`):
- The geometric **FINO "F" mark** breaks apart into distinct faceted fragments as the visitor scrolls down.
- Each fragment travels dynamically through document space and docks into purposeful design slots (`[data-dock]`) across the sections:
  - **Philosophy Kicker & Roman Arch Frame**
  - **Cinematic Atelier Film Vignette**
  - **Permanent Forms Collection Cards**
  - **Master Goldsmiths Team Profiles**
- At the footer of the home journey, the fragments converge and **reassemble** onto the Gold Souk coordinate map — symbolising *"Gold returns home"*.

### 2. High Jewellery Suites Collection Page
A dedicated editorial catalog (`src/pages/CollectionPage.tsx`) matching haute joaillerie exhibition standards:
- **Deep Emerald Sovereign Hero**: Atmospheric layered emerald gradient (`#021a0d` to `#062314`) with architectural gold filigree lines, frosted emerald glass pill badge, and provenance seals.
- **Interactive Sticky Filter Bar**: Seamless category filtering across:
  - `ALL CREATIONS`
  - `HIGH JEWELLERY`
  - `THE ROYAL EMERALD COLLECTION`
  - `GOLDEN TALISMANS`
  - `BESPOKE BRIDAL`
- **Asymmetric Bento Grid Layout**:
  - **01 / 05 (Hero 7-Column)**: *The Al-Thuraya Emerald Necklace* — 42.8 carats of Colombian emeralds framed in 18k yellow gold with Roman arch framing.
  - **02 / 05 (Tall 5-Column)**: *The Solstice Falcon Ring* — geometric diamond pavé mimicking the sovereign crest.
  - **Editorial Interlude**: *“Jewellery is frozen light, shaped into sovereign geometry.”*
  - **03 – 05 (3-Column Row)**: *Dune Serpent Cuff*, *Noor Diamond Cascade*, and *The Royal Palmier Brooch*.
- **Haute Atelier & One-of-One Commissions**: Bespoke consultation manifesto with pointed arch window into the master atelier and floating Geneva & Dubai seal.

### 3. Reusable Component System
- **Header (`src/components/common/Header.tsx`)**: Responsive luxury navigation bar with brand wordmark, active link highlighting, smooth anchor scrolling, and slide-in mobile drawer.
- **Footer (`src/components/common/Footer.tsx`)**: Unified maison footer with boutique location details and navigation links.
- **CollectionCard (`src/components/collection/CollectionCard.tsx`)**: Bento-ready product card supporting `hero-7`, `tall-5`, and `standard-4` proportions, carat badges, and concierge inquiry actions.

---

## 🎨 Design Tokens & Palette

| Token | Hex / Value | Description |
| :--- | :--- | :--- |
| `--v2-emerald-950` | `#002110` | Deepest sovereign forest emerald |
| `--v2-emerald-900` | `#062314` | Maison primary atelier green |
| `--v2-gold` | `#c5a059` | Satin warm Dubai gold accent |
| `--v2-gold-dark` | `#775a19` | Deep antique bronze gold |
| `--v2-ivory` | `#faf8f5` | Warm pearl ivory background |
| `--v2-sand` | `#f4f1ea` | Architectural limestone & sand tone |
| `--v2-line` | `#e5dec9` | Subtle metallic filigree rule |

---

## 📁 Project Structure

```bash
fino/
├── public/
│   ├── assets/
│   │   ├── figma/              # Downloaded high-resolution jewellery suite assets
│   │   ├── figma-logo.png      # Gold geometric brand mark
│   │   ├── hero.png            # Campaign photography
│   │   ├── atelier.png         # Goldsmith craft bench photography
│   │   ├── film.png            # Cinematic visual preview
│   │   └── map-*.svg           # Vector boutique location map layers
├── src/
│   ├── components/
│   │   ├── collection/
│   │   │   └── CollectionCard.tsx    # Reusable bento-capable jewellery card
│   │   ├── common/
│   │   │   ├── Header.tsx            # Reusable navigation bar & mobile drawer
│   │   │   └── Footer.tsx            # Reusable maison footer
│   │   ├── JourneyPieces.tsx         # Traveling logo fragments layer
│   │   └── LogoMark.tsx              # Vector geometry of the sovereign "F" mark
│   ├── data/
│   │   ├── collections.ts            # High Jewellery suites metadata & categories
│   │   └── figma_images_map.json     # Asset hash mappings
│   ├── journey/
│   │   └── logoJourney.ts            # GSAP ScrollTrigger kinetic orchestrator
│   ├── pages/
│   │   └── CollectionPage.tsx        # High Jewellery Suites exhibition page
│   ├── styles/
│   │   └── figma-screens.css         # Arch framing, bento grid, & suite styling
│   ├── types/
│   │   └── index.ts                  # TypeScript definitions for items and routes
│   ├── App.tsx                       # Main application entry point
│   ├── AppV2.tsx                     # Integrated layout, routing & GSAP lifecycle
│   ├── figma.css                     # Global typography, resets & theme tokens
│   └── main.tsx                      # React 18 DOM mount
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or later recommended)
- `npm` or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vivek2610/Fino.git
   cd Fino
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in the `dist/` directory.

---

## 🧭 Navigation & Routes

The application features client-side hash routing with smooth fallback handling:
- `/#home` (or root `/`): The main home experience with hero, brand philosophy, permanent forms, atelier film, team, Gold Souk boutique location, and the kinetic logo journey.
- `/#collections`: The High Jewellery Suites exhibition catalog with interactive filtering and bespoke commissions portal.
- Navigating between pages automatically resets scroll positions and synchronises the GSAP animation lifecycles.

---

## 📜 Maison Provenance

**FINO Jewellery Atelier & Boutique**  
Gold Souk, Dubai, United Arab Emirates  
*All jewellery designs, architectural silhouettes, and sovereign motifs are proprietary creations of Maison FINO.*
