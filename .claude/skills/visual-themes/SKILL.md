---
name: visual-themes
description: Create high-end visual themes for the Covenant inscriptions marketplace. Two-phase workflow - propose previews, then implement approved themes.
---

# Visual Themes

Create distinctive, production-grade themes for the Covenant inscriptions marketplace. Each theme is a complete experience — visual styling AND layout/UX decisions that express its personality.

## Commands

```
/visual-themes propose [count] [inspiration...]   # Generate N theme proposals with optional inspiration
/visual-themes propose [count] --wild [inspiration...]  # Generate N ECCENTRIC proposals
/visual-themes implement [names]                  # Implement selected themes
```

### Inspiration: Text Hints

You can pass **keywords** to guide theme generation:
- **Art styles**: anime, ukiyo-e, bauhaus, art deco, constructivist
- **Media**: album covers, movie posters, video games, manga, zines
- **Eras**: 80s, 90s, y2k, retro, vintage, futuristic
- **Moods**: dark, minimal, chaotic, elegant, playful, aggressive
- **Specific references**: "criterion collection", "studio ghibli", "4AD records"
- **Genres**: cyberpunk, vaporwave, noir, horror, fantasy

### Inspiration: Image References (RECOMMENDED)

You can pass **image files** as visual references. This is the most effective way to communicate an aesthetic.

**How to use:**
1. Before running the skill, share the reference images in your message
2. Mention them: "use these album covers as reference" or "inspired by the attached images"
3. The skill will analyze them for: color palette, typography style, layout patterns, texture, mood

**What to share:**
- Album covers, movie posters, book covers
- Screenshots of websites you like
- Artwork, photography, design pieces
- Mood boards or Pinterest collections (as screenshots)

**Example workflow:**
```
User: [pastes 3 album cover images]
      /visual-themes propose 2 --wild based on these album covers

Claude: *analyzes images for:*
        - Dominant colors and palette relationships
        - Typography choices (serif, sans, display, handwritten)
        - Layout structure (centered, asymmetric, grid, organic)
        - Texture and effects (grain, blur, sharp, layered)
        - Overall mood and era

        *generates themes that capture the essence*
```

**Tips for good references:**
- 3-5 images work best (enough variety, not overwhelming)
- Choose images with consistent aesthetic (don't mix cyberpunk with cottagecore)
- Include at least one that shows typography you like
- Include at least one that shows layout/structure you like

### Combined Example

```
User: [attaches 4 slowerpace album covers]
      /visual-themes propose 2 --wild

      Use these album covers as reference. I love the muted earth tones,
      the elegant serif typography, and the contemplative negative space.
```

The skill will analyze the actual images AND incorporate your text notes to generate themes that truly match your vision.

---

## Part 1: Design Philosophy

### Core Principle

**Each theme = Visual Identity + UX Personality + Color Story**

Themes aren't just color swaps. Each theme MUST make STRUCTURALLY DIFFERENT layout and interaction choices AND have a distinctive color palette.

### The Blindfold Test

**If you removed all colors and fonts, could you still tell themes apart by their LAYOUT ALONE?**

- If YES → themes are properly differentiated
- If NO → themes are just reskins (UNACCEPTABLE)

---

## Part 1.5: Layout DNA System (CRITICAL)

**Every theme MUST declare its Layout DNA** — a combination of structural choices that defines its skeleton. No two themes should share the same DNA.

### Layout DNA Components

Each theme picks ONE option from EACH category:

#### A. Header Architecture
| Code | Style | Description |
|------|-------|-------------|
| `H1` | **Top Bar** | Full-width horizontal bar at top |
| `H2` | **Left Sidebar** | Vertical nav on left, content right |
| `H3` | **Right Sidebar** | Content left, vertical nav on right |
| `H4` | **Floating** | Minimal floating element, semi-transparent |
| `H5` | **Split** | Logo left page edge, nav right page edge |
| `H6` | **Bottom Bar** | Navigation at bottom of viewport |
| `H7` | **Centered Stack** | Centered logo above centered nav |
| `H8` | **Hidden/Hamburger** | No visible nav until triggered |
| `H9` | **Diagonal/Angled** | Rotated or angled header bar |

#### B. Home Page Layout
| Code | Style | Description |
|------|-------|-------------|
| `L1` | **Bio + Grid** | Artist info above, collection grid below |
| `L2` | **Hero + List** | Large featured image, vertical list |
| `L3` | **Sidebar + Content** | Bio in sidebar, collections in main |
| `L4` | **Single Feature** | One large item, minimal else |
| `L5` | **Magazine Spread** | Editorial layout, asymmetric blocks |
| `L6` | **Dashboard Panels** | Multiple stat/info panels |
| `L7` | **Vertical Scroll Story** | Single column, narrative scroll |
| `L8` | **Bento Grid** | Mixed-size boxes, varied content |
| `L9` | **Collage/Overlap** | Overlapping elements, chaotic |

#### C. Collection Grid
| Code | Style | Description |
|------|-------|-------------|
| `G1` | **2 Column** | Two items per row |
| `G2` | **3 Column** | Three items per row |
| `G3` | **4+ Column** | Four or more items per row |
| `G4` | **Single Column List** | Vertical list, one per row |
| `G5` | **Table/Rows** | Data table with columns |
| `G6` | **Masonry** | Pinterest-style varied heights |
| `G7` | **Horizontal Scroll** | Side-scrolling row |
| `G8` | **Scattered/Random** | Non-grid placement |
| `G9` | **Featured + Grid** | One large + smaller grid |

#### D. Detail Page Split
| Code | Style | Description |
|------|-------|-------------|
| `D1` | **50/50 Horizontal** | Image left, info right |
| `D2` | **50/50 Reversed** | Info left, image right |
| `D3` | **Stacked Vertical** | Image above, info below |
| `D4` | **Media Dominant (70/30)** | Large image, narrow info |
| `D5` | **Info Dominant (30/70)** | Narrow image, wide info |
| `D6` | **Overlay** | Info overlays image |
| `D7` | **Tabbed Panels** | Switchable info sections |
| `D8` | **Full Bleed + Drawer** | Full image, slide-out info |
| `D9` | **Centered Theater** | Centered image, info below |

#### E. Card Design
| Code | Style | Description |
|------|-------|-------------|
| `C1` | **Square** | 1:1 aspect ratio |
| `C2` | **Portrait** | Tall cards (2:3, 3:4) |
| `C3` | **Landscape** | Wide cards (16:9, 3:2) |
| `C4` | **Text Row** | Minimal/no image, text only |
| `C5` | **Large Preview** | Oversized image, tiny info |
| `C6` | **Thumbnail + Details** | Small image, lots of text |
| `C7` | **Circular/Rounded** | Non-rectangular shape |
| `C8` | **Polaroid/Framed** | Image with border/frame |
| `C9` | **Index Card** | Catalog/file card style |

### Example Layout DNA

```
Theme: "noir"
DNA: H4-L5-G2-D1-C2
- Floating header (H4)
- Magazine spread home (L5)
- 2-column grid (G2)
- 50/50 detail split (D1)
- Portrait cards (C2)
```

**RULE: Before generating proposals, list all existing theme DNAs and ensure new proposals use DIFFERENT combinations.**

---

## Part 2: Color Palettes (CRITICAL)

### Color Palette Requirements

Every theme MUST have a named color palette with:
1. **Palette Name** — evocative, memorable (e.g., "Midnight Cinema", "Sakura Dusk")
2. **5-7 Core Colors** — with hex codes and roles
3. **Color Story** — why these colors work together
4. **Contrast Ratios** — ensure accessibility

### Palette Archetypes

#### Monochromatic & Minimal
| Palette | Colors | Mood |
|---------|--------|------|
| **Ink & Paper** | Black, white, one accent | Classic, editorial |
| **Warm Graphite** | Charcoals, warm grays, cream | Sophisticated, quiet |
| **Cool Steel** | Blue-grays, silver, white | Technical, precise |
| **Parchment** | Ivory, sepia, brown | Archival, aged |

#### Bold & High Contrast
| Palette | Colors | Mood |
|---------|--------|------|
| **Stop Sign** | Red, black, white | Urgent, commanding |
| **Caution Tape** | Yellow, black | Warning, industrial |
| **Blueprint** | Cyan, white, dark blue | Technical, schematic |
| **Darkroom** | Black, red, amber | Photographic, mysterious |

#### Nostalgic & Retro
| Palette | Colors | Mood |
|---------|--------|------|
| **VHS Rental** | Teal, magenta, yellow, black | 80s video store |
| **Faded Polaroid** | Muted pastels, cream, brown | 70s photography |
| **Arcade Cabinet** | Neon pink, cyan, purple, black | 80s gaming |
| **Diner Booth** | Red, cream, chrome, mint | 50s Americana |
| **Sunset Strip** | Orange, pink, purple gradient | 80s Miami |

#### Japanese & Anime
| Palette | Colors | Mood |
|---------|--------|------|
| **Sakura** | Pink, white, soft green, gray | Spring, gentle |
| **Neon Tokyo** | Hot pink, electric blue, black | Cyberpunk, urban |
| **Ukiyo-e** | Indigo, vermillion, gold, cream | Traditional woodblock |
| **Ghibli Forest** | Forest green, brown, sky blue, cream | Organic, magical |
| **Evangelion** | Purple, orange, green, black | Mecha, dramatic |
| **Akira Red** | Red, black, blue, white | Cyberpunk, intense |

#### Pop Culture & Media
| Palette | Colors | Mood |
|---------|--------|------|
| **Criterion** | Black, white, red | Film, curated |
| **MTV 1981** | Yellow, magenta, cyan, black | Music television |
| **Warhol Factory** | Silver, neon colors, black | Pop art |
| **Tarantino** | Red, gold, brown, black | Grindhouse cinema |
| **Adult Swim** | Black, white, pink bump | Late night |

#### Art Movement
| Palette | Colors | Mood |
|---------|--------|------|
| **Bauhaus Primary** | Red, blue, yellow, black, white | Geometric, fundamental |
| **Memphis Milano** | Pink, teal, yellow, black, terrazzo | 80s postmodern |
| **De Stijl** | Red, blue, yellow, black, white | Mondrian |
| **Rothko Chapel** | Deep burgundy, black, maroon | Contemplative |
| **Yves Klein** | IKB blue, gold, white | Singular, bold |

#### Nature & Organic
| Palette | Colors | Mood |
|---------|--------|------|
| **Moss & Stone** | Forest green, gray, brown, cream | Natural, earthy |
| **Ocean Deep** | Navy, teal, white, sand | Maritime, calm |
| **Desert Sunset** | Terracotta, sand, pink, purple | Warm, vast |
| **Nordic Winter** | White, pale blue, charcoal, silver | Cold, minimal |

#### Eccentric & Experimental
| Palette | Colors | Mood |
|---------|--------|------|
| **Fever Dream** | Clashing neons, black | Chaotic, overwhelming |
| **Corrupted File** | Glitch colors, wrong combinations | Digital decay |
| **Bruise** | Purple, yellow-green, brown, black | Uncomfortable, visceral |
| **Highlighter Explosion** | Neon yellow, pink, green, orange | Aggressive, loud |

### Color Display in Proposals

**Every proposal MUST include a visual color palette section:**

```html
<!-- COLOR PALETTE SECTION (required in every proposal) -->
<section class="color-palette-display">
  <h2>Color Palette: [PALETTE NAME]</h2>
  <div class="palette-swatches">
    <div class="swatch" style="background: #HEX;">
      <span class="color-name">Background</span>
      <span class="color-hex">#HEX</span>
    </div>
    <!-- Repeat for each color -->
  </div>
  <div class="palette-story">
    <p>[Why these colors work together - 2-3 sentences]</p>
  </div>
  <div class="palette-usage">
    <div class="usage-example">
      <span class="label">Text on Background:</span>
      <span class="demo" style="background: #BG; color: #TEXT;">Sample Text</span>
    </div>
    <!-- Show key color combinations -->
  </div>
</section>
```

---

## Part 3: Eccentricity Mode (--wild flag)

When `--wild` flag is used, generate EXPERIMENTAL themes that push boundaries while remaining functional.

### Wild Mode Guidelines

**Still must work:** Navigation, buttons, readability, purchase flow
**Can be weird:** Layout, colors, typography, interactions, metaphors

### Wild Techniques

#### Layout Chaos
- **Rotated containers** (entire sections at angles)
- **Overlapping elements** (intentional z-fighting)
- **Broken grid** (elements escape their containers)
- **Reverse scroll** (content flows unexpectedly)
- **Nested frames** (windows within windows)

#### Visual Disruption
- **Glitch effects** (offset color channels, scan lines)
- **Brutalist anti-design** (ugly on purpose, raw HTML aesthetic)
- **Maximalist overload** (too much pattern, texture, ornament)
- **Color clash** (intentionally "wrong" combinations)
- **Scale extremes** (giant text, tiny navigation)

#### Interaction Oddities
- **Cursor follows content** (parallax, magnetic)
- **Reveal on scroll** (content appears dramatically)
- **Sound-reactive elements** (if ambient audio)
- **State persistence** (remembers hover states)
- **Easter eggs** (hidden interactions)

#### Thematic Extremes
| Theme Concept | Description |
|--------------|-------------|
| **Virus/Malware** | Fake error dialogs, corrupted UI, "your files are encrypted" |
| **Surveillance** | CCTV aesthetic, timestamps, tracking crosshairs |
| **Conspiracy Board** | String connections, polaroids, newspaper clippings |
| **Autopsy Report** | Clinical, specimen jars, medical forms |
| **Ransom Note** | Cut-out letters, threatening tone, deadline timers |
| **Tax Form** | Bureaucratic, numbered fields, stamps |
| **Slot Machine** | Spinning reels, flashing lights, jackpot aesthetic |
| **Ouija Board** | Mystical, seance, spirit communication |
| **Police Evidence** | Evidence bags, case numbers, chain of custody |
| **Food Menu** | Restaurant layout, appetizer/main/dessert |

### Wild Mode Rules

1. **Function over form** — weird but usable
2. **Commit fully** — half-weird is worse than normal
3. **Document the concept** — explain the metaphor
4. **Test all flows** — purchase still works
5. **Provide escape hatch** — don't trap users

### Wild Mode: Required Differentiators

**For wild proposals, these elements MUST be unconventional:**

1. **Artist Bio Presentation** — NOT just text in a box:
   - Dossier/file format with photo
   - Interview transcript style
   - Profile card with stats/attributes
   - Manifesto/statement presentation
   - Character sheet (RPG style)
   - Biography as timeline/scroll

2. **Detail Page Layout** — NEVER use standard 2-column:
   - D6 (Overlay): Info panels floating over full-bleed image
   - D8 (Full bleed + drawer): Image fills screen, info slides in
   - D9 (Centered theater): Dramatic centered presentation
   - Custom: Dossier pages, evidence files, specimen displays, etc.
   - The detail page is where the theme's personality shines most

3. **Navigation Pattern** — NOT just links in a bar:
   - Hidden until triggered
   - Integrated into the theme metaphor
   - Unconventional placement (bottom, side, floating)

### Mechanical & Fake UI Elements (ENCOURAGED)

**Add life to themes with animated, mechanical, or fake UI elements.** These create atmosphere and reinforce the theme's world:

#### Fake UI Elements
| Element | Description | Example Themes |
|---------|-------------|----------------|
| **Fake file browsers** | Windows/Mac OS chrome, folder trees | Retro computing, Desktop |
| **Fake terminals** | Scrolling logs, command prompts, boot sequences | Hacker, Terminal, DOS |
| **Fake media players** | Progress bars, play/pause, waveforms | Music, VHS, Cassette |
| **Fake notifications** | Toast messages, system alerts, error dialogs | OS themes, Virus |
| **Fake loading screens** | Progress bars, spinners, "please wait" | CD-ROM, Software |
| **Fake clocks/timestamps** | Real-time displays, countdowns | Surveillance, News |
| **Fake status indicators** | Blinking lights, signal bars, battery icons | Dashboard, Mecha |
| **Fake scan lines / noise** | CRT effects, VHS tracking, static | Retro TV, Surveillance |

#### Mechanical Animations
- **Ticking clocks** — real-time updates
- **Blinking cursors** — terminal authenticity
- **Scrolling tickers** — news/stock aesthetic
- **Pulsing indicators** — status lights, heartbeats
- **Spinning elements** — loading, CD/vinyl rotation
- **Waveform visualizers** — audio reactive or decorative
- **Particle effects** — dust, static, glitch fragments
- **Parallax layers** — depth and atmosphere

#### Implementation Notes

These elements should be **decorative and atmospheric** — they don't need to be functional. A fake terminal can scroll pre-written logs. A fake media player can show a static waveform. The goal is immersion, not functionality.

### Enhanced Libraries (ASK USER)

For wild themes that would benefit from advanced effects, **ask the user** if they want to include additional libraries:

#### Available Libraries
| Library | Use Case | Ask When |
|---------|----------|----------|
| **p5.js** | Generative art, particles, organic animations | Theme needs living/breathing background |
| **Three.js** | 3D elements, WebGL effects, spatial depth | Theme has sci-fi/futuristic/3D concept |
| **GSAP** | Complex timeline animations, smooth tweens | Theme needs choreographed reveals |
| **Lottie** | Vector animations, illustrated motion | Theme has playful/illustrated aesthetic |
| **Shaders (GLSL)** | Distortion, glitch, liquid effects | Theme needs psychedelic/glitch/liquid feel |
| **Howler.js** | Ambient sound, UI audio feedback | Theme would benefit from soundscape |

#### Custom Assets
| Asset Type | Use Case | Ask When |
|------------|----------|----------|
| **SVG illustrations** | Custom icons, decorative elements | Theme needs unique visual language |
| **Background images** | Textures, patterns, photography | Theme needs specific atmosphere |
| **Custom fonts** | Display typography beyond Google Fonts | Theme needs very specific type |
| **Audio files** | Ambient loops, UI sounds | Theme has audio component |

#### How to Ask

When proposing a wild theme that would benefit from enhanced libraries or assets:

```
This theme would be enhanced by:
- [ ] p5.js for generative particle background
- [ ] Custom shader for glitch/distortion effects
- [ ] Ambient audio loop for atmosphere

Would you like me to include any of these? They require additional setup but create a more immersive experience.
```

**For proposals**: Use CSS-only effects as baseline, note where libraries would enhance
**For implementation**: If user approves, include the library and implement the effect

---

## Part 4: UX Archetypes

**Use archetypes as inspiration, not rules.** The goal is structural differentiation — each theme should pass the blindfold test.

### Core Archetypes

| Archetype | DNA Example | Key Features | References |
|-----------|-------------|--------------|------------|
| **Editorial** | H1-L5-G2-D3-C2 | Masthead, columns, pull quotes | Apartamento, Fantastic Man |
| **Archive** | H1-L6-G5-D7-C4 | Dense data, tables, filters | Bloomberg, Library catalogs |
| **Gallery** | H8-L4-G1-D4-C1 | Whitespace, hidden chrome | Gagosian, White Cube |
| **Brutalist** | H9-L9-G8-D6-C8 | Raw, overlapping, bold | Virgil Abloh, Experimental Jetset |
| **Terminal** | H2-L6-G5-D7-C4 | Monospace, panels, status | Trading terminals, IDEs |
| **Catalog** | H1-L1-G3-D1-C9 | Index cards, provenance | Auction houses |
| **Zine** | H9-L9-G8-D6-C8 | Xerox, collage, DIY | Punk zines |

### Pop Culture Archetypes

| Archetype | DNA Example | Key Features | References |
|-----------|-------------|--------------|------------|
| **Anime Opening** | H4-L7-G7-D8-C2 | Dramatic reveals, character cards | Cowboy Bebop, Attack on Titan |
| **Manga Page** | H5-L5-G6-D6-C2 | Panel layouts, speed lines | Shonen Jump, Tezuka |
| **Visual Novel** | H6-L4-G4-D9-C2 | Text boxes, character sprites | Persona, Danganronpa |
| **JRPG Menu** | H2-L6-G4-D7-C6 | Stats, inventory, equipment | Final Fantasy, Dragon Quest |
| **Fighting Game Select** | H6-L8-G3-D1-C1 | Character portraits, VS screen | Street Fighter, Guilty Gear |
| **Rhythm Game** | H4-L7-G7-D9-C7 | Note highways, combo counters | DDR, Beatmania |

### Film & TV Archetypes

| Archetype | DNA Example | Key Features | References |
|-----------|-------------|--------------|------------|
| **Film Credits** | H7-L7-G4-D3-C4 | Scroll, titles, sparse | Saul Bass |
| **VHS Rental** | H1-L8-G3-D1-C8 | Tape spines, categories | Blockbuster era |
| **True Crime** | H1-L5-G2-D1-C9 | Evidence boards, case files | Making a Murderer |
| **Nature Documentary** | H4-L4-G1-D4-C1 | Specimen isolation | Planet Earth |
| **News Broadcast** | H1-L6-G5-D7-C4 | Tickers, breaking banners | CNN, Bloomberg |
| **Late Night TV** | H6-L5-G2-D3-C2 | Talk show cards, bumps | Adult Swim |

### Retro Computing Archetypes

| Archetype | DNA Example | Key Features | References |
|-----------|-------------|--------------|------------|
| **Win95** | H1-L6-G3-D1-C1 | Window chrome, start menu | Microsoft 1995 |
| **Mac Classic** | H1-L1-G3-D1-C1 | Chicago font, menu bar | System 7 |
| **DOS** | H8-L7-G4-D3-C4 | Green text, command line | MS-DOS |
| **Teletext** | H1-L8-G5-D3-C4 | Blocky graphics, pages | Ceefax, Oracle |
| **BBS** | H8-L7-G4-D3-C4 | ANSI art, forums | 1990s dialup |
| **HyperCard** | H1-L1-G2-D3-C9 | Cards, buttons, stacks | Apple HyperCard |

### Music & Audio Archetypes

| Archetype | DNA Example | Key Features | References |
|-----------|-------------|--------------|------------|
| **Record Label** | H7-L2-G2-D1-C8 | Album grid, liner notes | Factory, 4AD, ECM |
| **Cassette Insert** | H5-L5-G4-D3-C6 | J-card layout, track list | 80s mixtapes |
| **Concert Poster** | H7-L4-G1-D4-C2 | Bold type, venue info | Fillmore posters |
| **Rave Flyer** | H9-L9-G8-D6-C7 | Acid graphics, party info | 90s rave scene |
| **Music Video** | H8-L4-G7-D8-C1 | Cinematic, full-bleed | MTV era |

### Art Movement Archetypes

| Archetype | DNA Example | Key Features | References |
|-----------|-------------|--------------|------------|
| **Bauhaus** | H5-L1-G3-D1-C1 | Primary shapes, mathematical | Kandinsky, Klee |
| **Constructivist** | H9-L5-G8-D6-C2 | Diagonals, propaganda | Rodchenko |
| **De Stijl** | H5-L8-G3-D1-C1 | Mondrian grid, primaries | Rietveld |
| **Memphis** | H9-L9-G8-D6-C7 | Squiggles, terrazzo | Sottsass |
| **Ukiyo-e** | H7-L4-G2-D3-C2 | Wave borders, woodblock | Hokusai |
| **Art Nouveau** | H7-L4-G2-D3-C2 | Organic curves, nature | Mucha |

---

## Part 5: Technical Patterns (CRITICAL)

**READ THIS BEFORE DESIGNING.** These patterns affect design decisions and must be followed during both proposal and implementation.

### App Architecture

Themes consist of:

1. **Tailwind CSS file** at `app/assets/stylesheets/application.{theme-name}.tailwind.css`
   - Uses Tailwind v4 `@theme` directive for CSS custom properties
   - **CRITICAL: ALL theme CSS must go in this single file**

2. **EJS templates** at `app/themes/{theme-name}/`
   - `layout.html`, `home.html`, `inscription.html`, `inscriptions.html`, `activity.html`, `policy.html`
   - `partials/inscription-card.html`, `partials/order.html`

3. **Config** in `config/store.yml` sets active theme via `theme: {theme-name}`

### Build System

```bash
npm run build:css && npm run build:templates
```

**DO NOT create separate theme.css files** — they will NOT be included in the build.

### Transform Effects (CRITICAL)

If you want visual effects like tilted/rotated headers, **apply transforms to pseudo-elements, not the main element**.

`transform`, `filter`, `perspective`, and `will-change` create stacking contexts that trap ALL child elements (modals, dropdowns). This breaks z-index.

```css
/* WRONG - traps all children in stacking context */
.theme-{name} .header {
  transform: rotate(-0.5deg);
}

/* CORRECT - visual effect without trapping children */
.theme-{name} .header {
  position: relative;
  /* NO transform here */
}

.theme-{name} .header::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-primary);
  border: 4px solid var(--color-primary);
  box-shadow: 6px 6px 0 var(--color-primary);
  transform: rotate(-0.5deg);  /* Transform on pseudo-element */
  z-index: -1;  /* Behind content */
}
```

### Wallet Modal Pattern

The wallet controller toggles `data-state="open"` on the modal. **DO NOT use Tailwind utility classes** like `hidden` or `data-[state=open]:flex`.

**Standard pattern (wallet inside header):**
```html
<div data-controller="wallet" data-action="keydown.esc@window->wallet#close mouseup@document->wallet#closeIfClickedOutside">
  <div data-wallet-target="selector" data-state="closed">
    <div class="wallet-panel">...</div>
  </div>
  <button data-action="wallet#select">Connect</button>
</div>
```

**For themes with header transforms (move wallet to body):**
```html
<body data-controller="store body-class usd wallet"
      data-action="... keydown.esc@window->wallet#close">

  <!-- Modal with backdrop for click-to-close -->
  <div data-wallet-target="selector" data-state="closed" class="wallet-modal-overlay">
    <div class="wallet-backdrop" data-action="click->wallet#close"></div>
    <div class="wallet-panel">...</div>
  </div>

  <header class="header">
    <button data-action="wallet#select">Connect</button>
  </header>
</body>
```

**Wallet modal CSS:**
```css
.theme-{name} [data-wallet-target="selector"] {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 10000;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}

.theme-{name} [data-wallet-target="selector"][data-state="open"] {
  display: flex;
}

/* For backdrop approach */
.theme-{name} .wallet-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  cursor: pointer;
}

.theme-{name} .wallet-modal-overlay .wallet-panel {
  position: relative;
  z-index: 1;
}
```

### Connection State CSS (CRITICAL)

Use `.theme-{name}` prefix and `!important` to override button display rules:

```css
.theme-{name} .show-on-connected { display: none !important; }
.theme-{name} .hide-on-connected { display: flex; }
.theme-{name}.connected .hide-on-connected { display: none !important; }
.theme-{name}.connected .show-on-connected { display: inline-flex !important; }
.theme-{name}.connected .show-on-connected.btn-block { display: flex !important; }
```

**Why `!important`?** Rules like `.theme-{name} .btn-block { display: block }` have the same specificity and can override connection states.

### Dropdown Pattern

```css
.theme-{name} .dropdown-menu {
  z-index: 9999;
}
.theme-{name} .dropdown-menu.hidden {
  display: none;
}
```

### Mobile Responsiveness (CRITICAL)

1. **Never use inline styles** like `style="display: flex"` on nav elements — they override media queries

2. **Disable sticky positioning on mobile:**
```css
@media (max-width: 768px) {
  .theme-{name} .detail-media { position: static; }
  .theme-{name} .nav-links-desktop { display: none !important; }
}
```

3. **Define base styles in CSS, hide with media queries** — not inline styles

### Required Utilities

```css
.hidden { display: none !important; }
.invisible { visibility: hidden; }
.opacity-0 { opacity: 0; }
.transition-opacity { transition: opacity 0.3s; }
.duration-300 { transition-duration: 300ms; }
```

### Color Variable Convention

```css
@theme {
  /* Backgrounds */
  --color-bg: #...;        /* Page background */
  --color-surface: #...;   /* Cards, panels */

  /* Text */
  --color-primary: #...;   /* Main text */
  --color-secondary: #...; /* Secondary text */
  --color-muted: #...;     /* Faint text, labels */

  /* Accent */
  --color-accent: #...;    /* Links, prices, CTA */

  /* Borders */
  --color-border: #...;

  /* Status */
  --color-success: #...;
  --color-warning: #...;
  --color-error: #...;
}
```

---

## Part 6: Workflow

### Phase 1: Propose

Generate self-contained HTML preview files at `tmp/themes/{name}.html`.

Each preview MUST include:
- Self-contained (inline CSS, Google Fonts CDN only)
- ALL pages: Home, Collection, Detail, Activity, Policy
- **COLOR PALETTE SECTION** with swatches and hex codes
- **LAYOUT DNA** declaration
- Wireframe diagrams showing layout structure
- No build system, no EJS — just static HTML for review

#### Proposal Workflow

1. **Check existing themes in `app/themes/`** — list their Layout DNAs
2. **Interpret inspiration hints** (if provided) — see below
3. **Generate N unique theme specs** with DIFFERENT Layout DNAs, incorporating inspiration
4. **Spawn N parallel proposal agents** — each creates a preview HTML file
5. **Generate index page** at `tmp/themes/index.html` with:
   - Theme name and description
   - Layout DNA codes
   - Color palette swatches
   - Links to full previews
6. **Report**: "Open tmp/themes/index.html to compare all proposals"

#### Analyzing Image References

When the user provides reference images, **analyze them FIRST** before generating themes:

**Step 1: Read each image** using the Read tool
```
Read tool: file_path="/path/to/image.jpg"
```

**Step 2: Extract design elements** from each image:

| Element | What to Look For |
|---------|------------------|
| **Colors** | Dominant hue, accent colors, contrast level, saturation, temperature (warm/cool) |
| **Typography** | Serif/sans/display/script, weight, case, spacing, era |
| **Layout** | Centered/asymmetric, grid/organic, dense/spacious, hierarchy |
| **Texture** | Grain/smooth, matte/glossy, layered/flat, effects |
| **Mood** | Era, emotion, energy level, cultural context |

**Step 3: Synthesize** findings into a design brief:
```
From analyzing 4 album covers:
- Palette: muted earth tones (browns, sage, cream), low saturation
- Typography: elegant serifs (Garamond-style), often italic, generous tracking
- Layout: centered, lots of negative space, minimal elements
- Texture: film grain, soft focus, organic edges
- Mood: contemplative, melancholic, timeless, intimate
```

**Step 4: Generate themes** that capture this essence while adding unique interpretations

#### Interpreting Text Hints

When the user provides text hints (without images), interpret them:

| Hint Type | How to Interpret |
|-----------|------------------|
| **Art style** (anime, bauhaus) | Use as visual language — typography, color relationships, compositional rules |
| **Media type** (album covers, movie posters) | Use as format inspiration — aspect ratios, information hierarchy, typical elements |
| **Era** (80s, y2k) | Use as aesthetic era — period-appropriate colors, typography, textures |
| **Mood** (dark, chaotic) | Use as emotional tone — color temperature, density, motion |
| **Specific reference** (criterion, ghibli) | Research the reference's actual visual language and apply it |
| **Genre** (cyberpunk, noir) | Use established genre conventions — tropes, palettes, motifs |

**Multiple hints combine**: "90s rave flyers neon" = 90s aesthetic + rave flyer format + neon colors

**Generate variations**: Don't make N identical themes. Explore different interpretations:
- If "anime": Ghibli (organic) vs Evangelion (bold) vs Bebop (retro) vs Monogatari (abstract)
- If "album covers": Different labels have different aesthetics (4AD vs Blue Note vs Factory)

**Still follow all rules**: Inspiration guides aesthetics but themes must still:
- Have unique Layout DNA (don't duplicate existing themes)
- Include proper color palettes with names and stories
- Follow all technical patterns
- Work as functional marketplaces

#### Proposal Agent Prompt Template

```
You are creating a PREVIEW PROPOSAL for a theme, not implementing it.

## Inspiration Context

{INSPIRATION_HINTS}

Interpret these hints to guide your aesthetic choices while following all structural and technical requirements.

## CRITICAL: Layout DNA

This theme's Layout DNA is: {DNA_CODE}
- Header: {H_DESCRIPTION}
- Home Layout: {L_DESCRIPTION}
- Grid: {G_DESCRIPTION}
- Detail Split: {D_DESCRIPTION}
- Card Style: {C_DESCRIPTION}

You MUST implement this exact structural combination. The layouts must match the DNA.

## CRITICAL: Color Palette

Palette Name: {PALETTE_NAME}
Colors:
- Background: {HEX} - {ROLE}
- Surface: {HEX} - {ROLE}
- Primary Text: {HEX} - {ROLE}
- Accent: {HEX} - {ROLE}
- [Additional colors...]

Color Story: {WHY_THESE_COLORS}

## CRITICAL: Include Color Palette Display

Your preview MUST include a color palette section showing:
1. All color swatches with hex codes
2. Color names and roles
3. Example text on background combinations
4. The "Color Story" explanation

## Use the frontend-design Plugin

Invoke the frontend-design skill:
Skill tool: skill="frontend-design", args="Create {AESTHETIC} theme preview with {DNA_CODE} layout"

## Theme Specification
{SPEC_YAML}

## Output Requirements

Create a SINGLE self-contained HTML file at: tmp/themes/{name}.html

The file must include:
1. ALL CSS inline in a <style> tag
2. Google Fonts via CDN link only
3. NO external dependencies, NO build step
4. COLOR PALETTE SECTION (see above)
5. LAYOUT DNA badge/indicator

## Page Sections to Show

### 0. THEME HEADER
- Theme name in large display type
- Layout DNA code (e.g., "H4-L5-G2-D1-C2")
- Brief description (1-2 sentences)

### 1. COLOR PALETTE DISPLAY
- Named palette with all swatches
- Hex codes visible
- Color story text
- Usage examples (text on backgrounds)

### 2. HOME PAGE (CRITICAL: Artist Bio Required)
- **ARTIST BIO IS MANDATORY** — Every home page MUST prominently feature:
  - Artist name in display typography
  - Bio text (2-3 sentences about the artist)
  - Avatar/profile image
  - Social links (if applicable)
- Collection grid (show 4-6 fake collection cards)
- Header/nav in context
- **Must match {L_CODE} layout**
- The artist bio should feel like the SOUL of the page, not an afterthought

### 3. COLLECTION PAGE
- Collection header with stats
- Inscription grid (show 6-8 fake cards with prices)
- Pagination controls
- **Must match {G_CODE} grid**

### 4. INSCRIPTION DETAIL PAGE (CRITICAL: Layout Variety)
- Media display area
- Provenance/metadata section
- Purchase panel with price and button
- Success/error message states
- **Must match {D_CODE} split**

**IMPORTANT: Avoid defaulting to 2-column (D1)**
- D1 (50/50 horizontal) is overused — explore other options:
  - D3: Stacked vertical (image above, info below) — great for mobile-first
  - D4: Media dominant (70/30) — let the art breathe
  - D6: Overlay — info floats over image for dramatic effect
  - D8: Full bleed + drawer — cinematic, modern
  - D9: Centered theater — museum-like presentation
- For **wild mode**: D6, D8, D9 are preferred over standard splits

### 5. ACTIVITY PAGE
- Transaction table/list
- Status badges (pending, confirmed)

### 6. POLICY PAGE
- Wallet address display
- Terms text area

### 7. COMPONENTS
- Wallet connection modal
- Button states (default, hover, disabled)
- Card hover states (**Must match {C_CODE} style**)
- Loading spinner

### 8. LAYOUT WIREFRAME
Box diagram showing:
- Header position ({H_CODE})
- Home layout ({L_CODE})
- Grid columns ({G_CODE})
- Detail page split ({D_CODE})

## Use Realistic Content

- Artist name: "Satoshi Artifacts"
- Collection names: "Genesis Collection", "Rare Sats Series"
- Inscription numbers: #12,345, #67,890
- Prices: 50,000 sats, 100,000 sats
- Wallet address: bc1p...xyz (truncated)

## Design Quality

- Distinctive typography (not Inter/Roboto)
- Colors MUST match the specified palette
- Layout MUST match the DNA code
- Clear structural personality

## DO NOT

- Create multiple files
- Use EJS templates
- Reference external CSS/JS files
- Implement actual functionality
- Create directories in app/themes/
- Use different colors than specified
- Use different layout than DNA specifies

## Output

Return:
- Theme name
- Layout DNA code
- Color palette name
- File path created
- Brief description of the aesthetic
- Mechanical/fake UI elements included
- (If wild) Library enhancement opportunities
```

#### Wild Mode Additions

When `--wild` flag is used, add to the prompt:

```
## WILD MODE ACTIVE

This is an ECCENTRIC theme. Push boundaries while keeping it functional.

### MANDATORY FOR WILD MODE:

1. **Artist Bio** — MUST be creative presentation, NOT plain text:
   - Dossier/file with photo clipped to corner
   - Interview/interrogation transcript
   - Character stats card (RPG style)
   - Manifesto or artist statement with dramatic typography
   - Timeline or biography scroll
   - Profile with unconventional metadata

2. **Detail Page** — MUST NOT use standard 2-column (D1):
   - Use D6 (overlay), D8 (full-bleed + drawer), or D9 (theater)
   - Or invent a layout that fits the theme metaphor
   - This is where the theme's personality shines brightest
   - Think: evidence file, specimen display, auction lot, dossier page

3. **Navigation** — Should feel integrated into the concept:
   - Hidden/hamburger that fits the metaphor
   - Bottom bar or unconventional placement
   - Navigation as part of the theme's world

### Wild Techniques to Consider:
- Rotated/angled sections
- Overlapping elements
- Broken grid escapes
- Glitch effects
- Maximalist overload
- Intentional "wrong" choices
- Unusual metaphors
- Hidden interactions

### Mechanical & Fake UI Elements (ADD THESE):
Include at least 2-3 atmospheric/mechanical elements:
- **Fake UI**: terminals, file browsers, media players, notifications, loading bars
- **Animations**: ticking clocks, blinking cursors, pulsing indicators, scrolling tickers
- **Effects**: scan lines, static noise, waveforms, particle dust

These should be decorative and atmospheric — they reinforce the theme's world.
Example: A mecha theme should have blinking status lights, scrolling data readouts, targeting animations.
Example: A CD-ROM theme should have spinning disc graphics, progress bars, "loading" states.

### Enhanced Libraries (Note Opportunities):
If the theme would benefit from advanced effects, note it in your output:
- p5.js for generative/particle backgrounds
- Three.js for 3D/WebGL effects
- Shaders for glitch/distortion
- Ambient audio for atmosphere

For proposals: implement CSS-only version, note where libraries would enhance.

The theme concept is: {WILD_CONCEPT}

Remember: Still must work for purchasing inscriptions. Weird ≠ broken.
```

#### Parallel Execution

Spawn all proposal agents in a SINGLE message:

```
Task(subagent_type="general-purpose", description="Propose {name} theme", prompt="...")
Task(subagent_type="general-purpose", description="Propose {name} theme", prompt="...")
```

---

### Phase 2: Implement

After user selects themes from proposals, implement them fully.

#### Implementation Workflow

1. **Read the approved preview** at `tmp/themes/{name}.html`
2. **Invoke frontend-design plugin** with instruction to match the preview
3. **Create all required files** (see below)
4. **Run build and verify**

#### Implementation Agent Prompt Template

```
You are implementing a theme that was approved from a preview.

## Use the frontend-design Plugin

Invoke the frontend-design skill:
Skill tool: skill="frontend-design", args="Implement {name} theme matching preview"

## Required Reading

1. Read the approved preview: tmp/themes/{name}.html
2. This skill file contains all technical patterns in Part 5

## Match the Preview EXACTLY

The preview shows the approved design. Your implementation must match:
- Same colors (extract from palette section)
- Same typography
- Same layout structure (match the DNA)
- Same component styling

## CRITICAL: How to Match the Proposal

**1. Copy CSS directly from the proposal:**
- The proposal HTML contains ALL CSS inline in `<style>` tags
- Extract CSS rules and use them verbatim (only changing CSS variable names)
- DO NOT rewrite or "improve" the CSS - copy it exactly
- Search for specific class names: `grep "inscription-preview" tmp/themes/{name}.html`

**2. Match HTML structure exactly:**
- Use the SAME class names as the proposal (e.g., `two-col` not `detail-two-col`)
- Use the SAME element nesting and hierarchy
- Use the SAME element types (div vs span, etc.)

**3. Implement page by page with verification:**
- For EACH page section in the proposal:
  a. Read that section from the proposal file
  b. Copy the HTML structure
  c. Copy the CSS rules for that section
  d. Replace placeholder content with EJS variables
  e. Verify it matches before moving to the next page

**4. Use grep to find all relevant CSS:**
```bash
# Find all CSS for a specific component
grep -A 20 ".two-col" tmp/themes/{name}.html
grep -A 15 ".inscription-preview" tmp/themes/{name}.html
grep -A 10 ".field-row" tmp/themes/{name}.html
```

**5. Check each page against proposal:**
- Home page layout and components
- Collection page (table vs cards, columns)
- Inscription detail (two-col split, preview box, field rows)
- Activity page (log entries vs table)
- Policy page structure

**Common mistakes to avoid:**
- Renaming classes (proposal uses `two-col`, implementation uses `detail-two-col`)
- Changing layout approach (proposal uses flex, implementation uses grid)
- Inventing new CSS instead of copying from proposal
- Skipping components that exist in the proposal

## Critical Implementation Rules

1. ALL CSS in single file: `app/assets/stylesheets/application.{name}.tailwind.css`

2. Apply transforms to pseudo-elements (see Part 5: Technical Patterns)

3. Use connection state CSS with !important (see Part 5)

4. Follow wallet modal pattern (see Part 5)

5. Handle mobile responsiveness (see Part 5)

## Files to Create

1. `app/assets/stylesheets/application.{name}.tailwind.css`
2. `app/themes/{name}/layout.html`
3. `app/themes/{name}/home.html`
4. `app/themes/{name}/inscriptions.html`
5. `app/themes/{name}/inscription.html`
6. `app/themes/{name}/activity.html`
7. `app/themes/{name}/policy.html`
8. `app/themes/{name}/partials/inscription-card.html`
9. `app/themes/{name}/partials/order.html`

## Reference for Patterns

Use existing themes in `app/themes/` for:
- Stimulus controller attributes
- data-testid attributes
- EJS template variables
- formatSats() helper

## Template Variables

Preserve all EJS variables and Stimulus controllers:
- `title`, `assets.css`, `assets.js`
- `CONFIG.artist_name`, `CONFIG.artist_avatar_url`
- `artist.about`, `artist.socials`
- `collections`, `collection`, `inscription`
- `checkout`, `order`, `pagination`
- `formatSats()` helper
- All `data-controller`, `data-action`, `data-testid` attributes

## Verification

After creating files:
1. Run: npm run build:css && npm run build:templates
2. Report build status
3. Test wallet modal opens and closes
4. Test mobile menu works
5. Test connection states (show/hide buttons)

## Output

Return:
- Theme name
- Layout DNA implemented
- Files created
- Build status
- Confirmation that design matches preview
```

---

## Part 7: Reference

### Required Page Elements

#### Home Page (CRITICAL)

**The artist bio is the HEART of the home page.** It must be:
- **Always visible** — not hidden, not collapsed, not below the fold
- **Prominently styled** — typography that draws attention
- **Complete** — includes name, bio text, and avatar at minimum

| Element | Required | Notes |
|---------|----------|-------|
| Artist name | ✓ | Display typography, prominent |
| Bio text | ✓ | 2-3 sentences, always visible |
| Avatar | ✓ | Sized and positioned per theme |
| Social links | Optional | If provided in config |
| Collection cards | ✓ | With price and availability |

**For wild themes**, the bio presentation should be creative:
- Dossier/file format
- Character card with stats
- Interview transcript
- Manifesto style

#### All Pages
- Connect wallet bar — sticky or inline, with connected state
- Navigation — styled per archetype
- Footer — "Powered by Covenant" attribution

#### Inscription Detail

**Layout variety is essential.** Don't default to 2-column:

| Layout Code | Description | Best For |
|-------------|-------------|----------|
| D1 | 50/50 horizontal | Standard, overused |
| D3 | Stacked vertical | Mobile-first, simple |
| D4 | Media dominant (70/30) | Art-focused |
| D6 | Info overlays image | Dramatic, wild |
| D8 | Full bleed + drawer | Cinematic, modern |
| D9 | Centered theater | Museum-like, gallery |

**Required elements:**
- Purchase button — prominent, theme-styled
- Success/error/pending message states
- Already sold state
- Media display (image/content preview)
- Metadata (inscription #, collection, owner)

#### Activity Page
- Order list — recent transactions
- Status badges — pending/confirmed/failed

#### Policy Page
- Payment address — with copy functionality
- Policy text

### UI States to Design

1. **Button states**: default, hover, active, disabled, loading
2. **Card states**: default, hover, selected, sold
3. **Form states**: input focus, error, success
4. **Message types**: success, warning, error, info
5. **Loading states**: skeleton, spinner
6. **Empty states**: no items, no results
7. **Connection states**: disconnected, connecting, connected

### Verification Checklist

#### Build & Load
- [ ] `npm run build:css` completes without errors
- [ ] `npm run build:templates` completes without errors
- [ ] Page loads with correct styles
- [ ] No console errors in browser

#### Core Functionality
- [ ] Connect Wallet button opens wallet modal
- [ ] Wallet options (Xverse, Unisat) visible and clickable
- [ ] Close button (×) closes wallet modal
- [ ] ESC key closes wallet modal
- [ ] Click outside modal closes it
- [ ] Prepare Purchase button hidden when disconnected

#### Navigation
- [ ] Home link works
- [ ] Activity link works
- [ ] Policy link works
- [ ] Collection cards link to collection pages
- [ ] Mobile menu opens and links work
- [ ] Desktop nav links hidden on mobile

#### Responsive
- [ ] Desktop layout works (>900px)
- [ ] Tablet layout works (600-900px)
- [ ] Mobile layout works (<600px)
- [ ] Dropdown menus appear above other content

### Common Pitfalls

1. **CSS not loading**: All styles MUST be in the single Tailwind CSS file

2. **Wallet modal broken**: Don't use `hidden` class — use `data-state` CSS selectors

3. **Wallet modal / dropdown behind content**: Transform on header traps children. Use transform on `::after` pseudo-element instead.

4. **Prepare Purchase button visible when disconnected**: CSS specificity issue. Use `!important` on `.show-on-connected` rules.

5. **Nav links AND hamburger both showing on mobile**: Don't use inline `style="display: flex"` — it overrides media queries.

6. **Sticky positioning broken on mobile**: Add media query to set `position: static`.

7. **Click outside modal doesn't close it**: For full-screen overlays, add a backdrop element with `click->wallet#close`.

8. **Buttons not working**: Check `data-action` attributes preserved from reference theme.

9. **Missing styles**: Check `.theme-{name}` prefix on all custom selectors.

10. **Color variables undefined**: Check `@theme` block has all required variables.

11. **Implementation doesn't match proposal**: This is the #1 issue. To fix:
    - Read the proposal HTML file section by section
    - Copy CSS rules directly from the proposal's `<style>` tags
    - Use the exact same class names (don't rename `two-col` to `detail-two-col`)
    - Use grep to find CSS: `grep -A 20 ".class-name" tmp/themes/{name}.html`
    - Compare each page visually against the proposal before moving on

---

## Part 8: Inspiration Library

### Japanese Animation & Manga

**Studios & Shows**
- Studio Ghibli (Spirited Away, Princess Mononoke) — organic, painterly
- Gainax/Trigger (Evangelion, Kill la Kill) — bold, dynamic
- Madhouse (Perfect Blue, Paprika) — psychological, surreal
- Sunrise (Cowboy Bebop, Gundam) — retro-futurism
- Shaft (Monogatari series) — text-heavy, abstract
- Wit Studio (Attack on Titan) — intensity, drama

**Manga Artists**
- Osamu Tezuka — classic, expressive
- Katsuhiro Otomo (Akira) — detailed, cyberpunk
- Junji Ito — horror, spiral motifs
- CLAMP — elegant, shoujo
- Takehiko Inoue (Vagabond) — brushwork, epic

**Visual Concepts**
- Speed lines, impact frames
- Character sheets, model pages
- Panel compositions, gutters
- Screentone patterns
- Chibi vs dramatic contrast

### Retro Gaming

**Eras & Platforms**
- 8-bit (NES, Game Boy) — pixel limitations as style
- 16-bit (SNES, Genesis) — expanded palettes, Mode 7
- PS1 era — low-poly, warped textures, load screens
- Arcade — CRT glow, attract modes, high scores
- PC-98 — Japanese computer aesthetic, dithering

**Game UI Inspiration**
- Final Fantasy menus — blue gradient, cursor sounds
- Persona 5 — bold red/black, stylish transitions
- Metal Gear Solid — codec screens, briefing docs
- Resident Evil — typewriter saves, item boxes
- Silent Hill — fog, static, psychological
- Dark Souls — minimal HUD, item descriptions

### Film & Television

**Directors (Visual Style)**
- Wong Kar-wai — neon, blur, longing
- Nicolas Winding Refn — pink/cyan, violence
- David Lynch — uncanny, suburban horror
- Wes Anderson — symmetry, pastels, Futura
- Gaspar Noé — strobes, inversion, disorientation
- Dario Argento — giallo, saturated color
- Ridley Scott — smoke, rain, noir

**Title Sequences**
- Saul Bass — geometric, symbolic
- Kyle Cooper (Se7en) — disturbing, handmade
- Pablo Ferro — kinetic typography
- Maurice Binder (Bond) — silhouettes, guns
- Imaginary Forces — modern masters

**TV Aesthetics**
- Adult Swim bumps — minimal, late night
- MTV 1981-1995 — logos, station IDs
- VH1 Pop-Up Video — annotations
- Public access — lo-fi, weird
- QVC/Home shopping — product worship

### Music & Sound

**Album Art Schools**
- Blue Note — Reid Miles typography
- Factory Records — Peter Saville minimalism
- 4AD — Vaughan Oliver dreamscapes
- ECM — monochrome photography
- Death Row — glossy, provocative
- Warp Records — digital abstraction

**Music Video Directors**
- Michel Gondry — handmade, inventive
- Spike Jonze — narrative, emotional
- Chris Cunningham — disturbing, technical
- Hiro Murai — surreal, beautiful
- Jonathan Glazer — unsettling, minimal

**Genre Aesthetics**
- Vaporwave — mall muzak, Roman busts
- Synthwave — grids, sunsets, chrome
- City Pop — 80s Tokyo, airbrushed
- Shoegaze — blur, My Bloody Valentine
- Industrial — rust, machines, Throbbing Gristle

### Pop Culture Ephemera

**Physical Media**
- VHS tapes — tracking, FBI warnings, rental stickers
- Cassette tapes — J-cards, Dolby logos
- LaserDisc — prestige format, supplements
- Floppy disks — labels, disk sleeves
- CD jewel cases — booklet design

**Retail & Commercial**
- Video rental stores — categories, new releases
- Record shops — crate digging, listening stations
- Arcades — token machines, prize counters
- Mall culture — food courts, anchor stores
- Convenience stores — konbini aesthetic

**Print Ephemera**
- TV Guide listings — grid schedules
- Newspaper classifieds — dense text
- Phone books — yellow pages
- Instruction manuals — warranty cards
- Trading cards — stats, checklists

### Internet & Digital

**Eras**
- Web 1.0 — under construction GIFs, webrings
- Flash era — skip intros, loading bars
- MySpace — custom CSS, Top 8
- Tumblr — reblog chains, fandoms
- Current — dark mode, card-based

**Interface Styles**
- Skeuomorphism — leather, stitching
- Flat design — Metro, Material
- Neumorphism — soft shadows, emboss
- Brutalist web — raw HTML energy
- Y2K — bubble buttons, chrome

### Fine Art Deep Cuts

**Movements**
- Fluxus — instruction art, scores
- Situationist International — détournement
- Pictures Generation — appropriation
- Light and Space — perception, California
- Arte Povera — humble materials

**Contemporary**
- Takashi Murakami — superflat, DOB
- Yoshitomo Nara — punk children
- Banksy — stencil, commentary
- KAWS — Companion, XX eyes
- Daniel Arsham — future relics

### Architecture & Space

**Movements**
- Metabolism — Japanese futurism
- Googie — space age, car culture
- Streamline Moderne — curves, chrome
- Brutalism — concrete, raw
- Deconstructivism — fragmented

**Spaces**
- Airports — wayfinding, terminals
- Hospitals — clinical, fluorescent
- Hotels — lobbies, room numbers
- Parking garages — levels, concrete
- Data centers — server racks, cables

### Subcultures & Scenes

**Youth Movements**
- Punk — xerox, ransom, DIY
- Goth — black, lace, Victorian
- Rave — smiley, day-glo, flyers
- Skateboarding — graphics, zines
- Graffiti — tags, pieces, blackbooks

**Niche Communities**
- Trainspotters — timetables, numbers
- Birdwatchers — field guides, checklists
- Stamp collectors — albums, perforations
- Vinyl collectors — discographies, matrices
- Sneakerheads — release calendars, authentication
