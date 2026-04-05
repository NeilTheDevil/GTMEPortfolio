---
name: portfolio-creation-gtm
description: A specialized skill for creating premium, editorial portfolios for GTM Engineers and Revenue Systems experts with a 'Royal GTM' aesthetic. Mobile-first, full-bleed layouts with strict 24px gutters.
---

# Portfolio Creation Skill (Royal GTM Edition)

This skill generates a high-end, editorial portfolio for GTM Engineers, optimized for the 'Royal GTM' aesthetic and battle-tested for both desktop and mobile (390px+).

---

## Design Philosophy

- **Layout**: Single-column editorial on mobile. Two-column on desktop where needed.
- **Typography**: `clamp()` for all fluid sizes. Font: Inter (400, 600, 800, 900).
- **Palette**:
  - `#FCFBF7` warm cream background
  - `#000C24` midnight navy (text + dark sections)
  - `#B8860B` antique gold (accents, labels, links)
  - `#F8F6F0` secondary cream (alternating sections)
- **Hero Image**: `object-fit: cover`, `object-position: top`, `aspect-ratio: 3/4` on mobile.
- **Backgrounds**: Always full-bleed. Content lives inside padded inner wrappers only.

---

## Mobile-First Rules (Non-Negotiable)

All rules below go inside `@media (max-width: 768px)`.

### Global Safety
```css
body { overflow-x: hidden; width: 100%; max-width: 100%; }
.container { padding: 0 24px !important; box-sizing: border-box; width: 100%; max-width: 100%; }
```

### Navigation
```css
.nav-content { padding: 0 24px; justify-content: space-between; }
.nav-links { display: none; }
.mobile-menu-toggle { display: block; }
```

### Mobile Menu Overlay
MUST be `display: none` globally — only shows via JS `.active` class:
```css
.mobile-menu-overlay { display: none; position: fixed; inset: 0; background: #000C24; z-index: 2000; flex-direction: column; align-items: center; justify-content: center; }
.mobile-menu-overlay.active { display: flex; }
```
Without this, nav links render over the hero image by default.

### Typography
```css
.editorial-headline { font-size: clamp(1.6rem, 8vw, 2.2rem); overflow-wrap: break-word; text-wrap: balance; max-width: 100%; }
.intro-text { line-height: 1.25; text-wrap: balance; max-width: 100%; }
.project-desc, .section-intro { max-width: 90%; margin: 0 auto; line-height: 1.6; }
```

### Section Labels
```css
.section-label { font-size: 1.1rem; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #000C24; margin-top: 60px; margin-bottom: 24px; text-align: center; }
```

### Grids
```css
.loom-grid, .automation-highlights, .workflow-visuals, .community-grid-new, .project-header { grid-template-columns: 1fr; }
```

### Bullets
```css
.engagements li { padding-left: 15px; justify-content: flex-start; text-align: left; }
```

---

## Core Page Sections

1. **Hero**: Portrait `aspect-ratio: 3/4`, `order: -1` on mobile. Headline fluid. Intro tight `line-height: 1.25`.
2. **Loom Grid**: 2-col → 1-col. Video thumbnails with play button overlay.
3. **Lead Gen Stat**: Large number (`10,000+`) + one full sentence + tool badge grid.
4. **Automation**: 4-box highlight grid + workflow cards.
5. **Case Studies**: Linear list. Each links to its own detail page. Gold "View Case Study →" link. No numerical indexes on mobile (`.index { display: none }`).
6. **Community**: 2-col desktop → stacked mobile. Gold dot bullets with `padding-left: 15px`.
7. **About**: Flex row → column. Narrative text.
8. **CTA**: Full-bleed, centered, pill button `border-radius: 100px`.
9. **Footer Socials**: `display: flex; flex-direction: row; justify-content: center; gap: 20px`.

---

## Case Study Detail Pages

Each case study is a separate `.html` file using a **clean article layout** — no card grids, no emoji. Use the user's exact words.

### File structure
```
index.html
style.css
script.js
case-study-[slug].html
case-study.css   ← shared stylesheet
```

### HTML pattern
```html
<main class="cs-article-page">
  <div class="cs-article-container">
    <div class="cs-back-link"><a href="index.html#work">← Back to Work</a></div>
    <div class="cs-meta">
      <span class="tool-tag">Tools</span>
      <span class="cs-type">Use case</span>
    </div>
    <h1 class="cs-article-title">Title</h1>
    <p class="cs-article-intro">Hook sentence.</p>
    <p class="cs-article-lead">Expanded context with <strong>bold claim</strong>.</p>
    <hr class="cs-article-divider">
    <div class="cs-article-section">
      <h2>1. Section</h2>
      <p>Body.</p>
      <ul><li><strong>Label:</strong> Detail.</li></ul>
    </div>
    <hr class="cs-article-divider">
    <div class="cs-article-closing">
      <p class="cs-article-statement">Closing argument.</p>
      <ul><li>Capability</li></ul>
      <p><strong>Final punchy line.</strong></p>
    </div>
    <div class="cs-article-cta">
      <a href="linkedin" class="cs-cta-btn">Let's Talk →</a>
      <a href="next.html" class="cs-next-link">Next Case Study →</a>
    </div>
  </div>
</main>
```

### Case study CSS (key rules)
```css
.cs-article-container { max-width: 740px; margin: 0 auto; padding: 0 24px; }
.cs-article-title { font-size: clamp(2.4rem, 6vw, 4rem); font-weight: 900; letter-spacing: -0.04em; }
.cs-article-section h2 { font-size: 1.3rem; font-weight: 800; color: #B8860B; }
.cs-article-statement { font-size: 1.4rem; font-weight: 700; border-left: 3px solid #B8860B; padding-left: 24px; }

@media (max-width: 768px) {
  body { overflow-x: hidden; }
  .cs-article-container { width: 100%; max-width: 100vw; padding: 0 24px; box-sizing: border-box; }
  .cs-article-title { font-size: clamp(1.8rem, 8vw, 2.8rem); word-break: break-word; }
  .cs-article-section h2 { font-size: clamp(1rem, 5vw, 1.3rem); overflow-wrap: break-word; }
}
```

---

## JavaScript (script.js)

```js
document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); } });
  }, { threshold: 0.05, rootMargin: '0px 0px -100px 0px' });
  document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

  // Mobile menu
  const toggle = document.getElementById('mobileMenuToggle');
  const overlay = document.getElementById('mobileMenuOverlay');
  const close = document.getElementById('closeMenu');
  if (toggle && overlay && close) {
    toggle.addEventListener('click', () => { overlay.classList.add('active'); document.body.style.overflow = 'hidden'; });
    const hide = () => { overlay.classList.remove('active'); document.body.style.overflow = 'auto'; };
    close.addEventListener('click', hide);
    document.querySelectorAll('.mobile-nav-links a').forEach(a => a.addEventListener('click', hide));
  }
});
```

---

## Lessons Learned

| Decision | Why |
|----------|-----|
| `padding: 0 24px !important` on `.container` | No cascade can let text touch screen edges |
| Full-bleed sections, padded inner wrappers | Backgrounds reach edges; text never does |
| `display: none` on `.mobile-menu-overlay` globally | Prevents nav links overlaying the hero on load |
| `aspect-ratio: 3/4` on hero portrait | Natural portrait on mobile, no cropping |
| `overflow-wrap: break-word` on all headings | Long GTM terms never overflow narrow screens |
| `text-wrap: balance` on hero intro | Premium even line breaks |
| `max-width: 90%` on description `<p>` only | Long text readable; stats/headlines float freely |
| `.index { display: none }` on mobile | Removes stray "02" markers from case studies |
| Article layout for case study pages | No mobile card grid rendering bugs |
| `clamp()` on all font sizes | Fluid scaling — never breaks, never unreadable |
| `z-index: 2000` on mobile overlay | Always above sticky nav (`z-index: 1000`) |
| `box-sizing: border-box` globally | Padding never adds to width and causes overflow |

---

## Resources
- [index.html](file:///C:/Users/HP/Desktop/My-GTME-Portfolio/.agents/skills/portfolio-creation-gtm/resources/index.html)
- [style.css](file:///C:/Users/HP/Desktop/My-GTME-Portfolio/.agents/skills/portfolio-creation-gtm/resources/style.css)
- [script.js](file:///C:/Users/HP/Desktop/My-GTME-Portfolio/.agents/skills/portfolio-creation-gtm/resources/script.js)
