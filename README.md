# Stay Dry Roofing demo — "RAINFALL, HANDLED"

**LOCAL ONLY — never deployed, never sent.** Built 2026-10-13 as a cold-pitch demo for
Stay Dry Roofing of Tampa Bay (residential + commercial roofing, Tampa Bay, FL).
Preview screenshots only; deploy to Vercel only with Emmanuel's explicit approval.

## Concept
**RAINFALL, HANDLED** — meteorological and calm: the roof as the thing between your
family and 52 inches of Tampa rain a year. The whole page is a deep slate-navy sky with
fine animated rain lines confined to the hero; one amber accent lives on CTAs and
conversion-pointing markers only — no storm-panic orange anywhere. Roofing sells an
*inspection* (booked, not dialled), so the hero's primary path is a **4-step
inspection-booking stepper** (service → ZIP → home size → callback time) with progress
bar, per-field checkmarks, "~2 min" time cost, an emergency toggle that routes urgent
jobs straight to the callback step, and a mailto handoff that shows the composed
message ("This opens your email app with everything filled in — hit send, a tech
replies today") plus loading → success button states and a commitment-style
confirmation screen (echoed job summary, exact next event, photo ask).

## Art-direction triple
**meteorological / calm / watertight** — deep slate-navy ink (#0d1626, tinted never
black), rain-grey paper (#edf0f4) for the objection-stack sections, amber (#f2b705)
used **only** on primary CTAs, the one headline emphasis word, conversion-pointing
markers (gauge bar, rec-tag, selection states, progress), and the logo. Archivo Narrow
(voiced condensed) display + Public Sans text + Space Mono utility. One custom `--ease`
(`cubic-bezier(.19,1,.22,1)`) for all motion; entrances are blur-to-sharp (headlines)
and clip-path wipe (photos) only — never fade-ups; everything completes within 3.5s
with zero interaction (backstop tested). 1px solid borders, sharp corners, zero drop
shadows; pill shape allowed only on the primary CTA.

## Broken convention (one rule, everywhere)
**Eyebrow pills sit flush to the container's left edge; every display headline starts
one column in from it** (96px desktop / 28px mobile). No other element violates the
grid — checked across all 13 sections.

## Signature interactive elements
1. **Annual-rainfall counter + gauge** — hero counts up to "52 in" (server-rendered
   for crawlers/AI), beside a Tampa-52″ vs US-avg-30″ gauge bar and a "— HANDLED"
   stamp.
2. **Canvas rain overlay** — fine diagonal rain lines, hero only, pauses off-screen
   and under `prefers-reduced-motion`; never hurts readability (low opacity,
   pointer-events none).
3. **Damage-type picker** — symptom chips in the homeowner's words (stain on the
   ceiling / shingles on the lawn / water sits after rain / a storm just hit), each
   revealing the pro diagnosis, price range, timeline, and a mini CTA.
4. **4-step inspection stepper** — multiple-choice question cards (never dropdowns),
   emergency toggle routing, ZIP validation, measured-response line ("Avg. callback
   6 min · Sep 2026") and the external-clock urgency line under the button.

## Motif (counted: ONE)
**Rain lines** — favicon drop glyph, brand mark, hero canvas rain, `///` eyebrow ticks,
the three-line section divider. Nothing else decorative competes (HUD chips are
instrumental, the hand-drawn marker style is field markup per the playbook).

## Named enemy
"The crew that cashes your check and vanishes after the storm" — answered with the
checkable line: *"Not a storm chaser — we're on N Florida Ave, and we'll be here when
the next storm isn't."*

## Insider-ritual headline
"We check the valleys first. Water always wins there."

## Distinctness vs the other roofing demos
- **jrjb-roofing** (charcoal/terracotta roofline): ours is slate-navy/amber, no roofline motif, meteorological not architectural.
- **cardinal-roofing** ("THE SHELL": annotated cross-section + layer explorer, cardinal red): ours has no diagram/explorer, no red.
- **carl-martin-roofing** ("THE LEDGER": ledger paper, cloth green, copper): ours is a dark sky system, amber accent, Archivo Narrow.
- **all-area-roofing** (full-bleed "STORM DAMAGE?" type, safety-orange): ours is calm-register, no orange, rain-gauge hero instead of panic type.
- **dockside-roofing** ("THE HARBOR": harbor teal/brass, review-pin map, edge-rail nav): ours has no map, conventional top nav + hamburger, rain motif not pilings.
- **roofing-solutions-tampa** ("THE WARRANTY": certificate hero): ours leads with rainfall data, not a certificate.
- **premier-metal-roof**: no shared moves (no metal-first framing; metal is one bento cell).
- **Batch siblings (2026-10-13)**: Service Works = "THE PLANT ROOM" industrial steel-blue
  spec-sheet (commercial); Southern Roofing = "THE 65-YEAR DOSSIER" archival kraft
  dossier. Ours is the only meteorological/dark-sky concept and the only one built
  around a rainfall counter.

## Trade-literacy audit (every AI photo, 30-second check)
- `tearoff-crew.webp` — PASS: hard hats + harnesses, shingle shovels, staggered courses on remaining roof, drip edge, ladder above eave, felt rolls, debris trailer.
- `shingle-course.webp` — PASS (minor): chalk lines, staggered courses, nail gun, drip edge; two visible nail heads sit in the nail strip mid-install (covered by the next course) — acceptable.
- `metal-seam.webp` — REGENERATED once: v1 had seams reading as floating strips; v2 shows proper interlocked standing seams, vent boot with storm collar between seams, no exposed screws. PASS.
- `tech-portrait.webp` — edited via resume: polo text changed from generic "ROOFING CREW SUPERVISOR" to "STAY DRY ROOFING"; harness, tool belt, clipboard read correctly. PASS. (v1 kept as `tech-portrait-v1.webp`.)

## QA summary (qa/qa.py, headless Chromium, systematic)
- **Zero console/page errors**, zero dead anchors, zero horizontal overflow at 390px and 1440px.
- All 4 images load; all reveals complete with no interaction (3.5s backstop asserted).
- Stepper: Next starts disabled, enables on chip pick, advances 1→2; ZIP validation gates step 2; Back genuinely hidden on step 1 (computed-display check — caught and fixed the `.btn` display overriding `[hidden]`, same bug class as dockside's).
- Damage picker: chip click updates pro/body/price/time (asserted "Ponding").
- Rain canvas animating (asserted); pauses off-screen (fixed a restart bug where a stale rAF id prevented resume).
- Nav anchor lands on #faq (asserted).
- Mobile: hamburger opens/closes, menu closes on link tap + Escape; sticky bottom bar ("Call (813) 232-9430" + "Free roof check →", number printed) appears after hero scrolls out, hides over final CTA (asserted).
- Bento: 6 cells, no orphans (large cell 2×2 in a 3-col grid; single column ≤1020px).
- Source checks: phone, tel:, mailto:, from-prices, services, FAQPage + RoofingContractor JSON-LD, og-image meta, absolute OG URLs — all in server HTML (JS-off safe); no runtime font/CDN hotlinking; one custom --ease (no bare `ease`); palette allowlist — amber is the only warm hex (the green dot is the functional open-now status only).
- Screenshots: segment-stitched full-page (avoids the >8192px captureBeyondViewport wrap bug) + hero shots, desktop and mobile.

## Substitute QA (claude.ai critique parked by standing rule)
- **Blur test** (Gaussian 28px on hero): fixation order = (1) headline mass "52 INCHES OF RAIN. HANDLED.", (2) amber header CTA pill, (3) gauge "52". PASS — headline first, CTA second.
- **Five-question friend test**: 1) what am I buying — roof repair/replacement + free inspection booking, Tampa Bay ✓; 2) where is the price — hero lede, every service card, matrix, FAQ ✓; 3) too long? — full objection stack is justified for an $8,900 considered purchase; copy is lean, every section answers one objection; nothing cut ✓; 4) why trust — 346 Angi reviews/4.7★ (real), licensed & insured, 46 yrs (real), named neighborhoods, annotated job photos, named tech card, missed-call script, measured callback record ✓; 5) exit depth — CTAs at hero, damage picker, matrix, final; work section intentionally CTA-free per playbook; no leak found ✓.
- **Read-aloud test**: all 11 display headlines read clean — "52 inches of rain. Handled.", "Tell us what you're seeing.", "One roof, every way it fails.", "Repair it, or replace it?", "We check the valleys first. Water always wins there.", "Two promises, two zones.", "Resolved jobs, named streets.", "Straight answers.", "Still dry under there?" — no brochure-speak; zero rewrites needed.
- **Accent audit**: trimmed rain-ticks, trust-line numerals, and commercial emphasis from amber to neutral — amber now only on CTAs, the one headline word, conversion-pointing markers, selection/progress states, data gauge, and logo.
- **Leaver audit**: "why now?" answered by the hurricane-season external clock beside the stepper and final CTA; missed-call script under every phone path; no blocking friction found.

## Mobile behaviour contract
- Pre-header: time + place hidden, chip + phone stay. Header: logo + phone icon + hamburger; nav → full-screen menu; header CTA hidden (bottom bar takes over).
- Hero stacks: eyebrow → H1 → lede → trust → stepper → gauge. Stepper full-width, choices 2-col, contact fields stack.
- Stat band 2×2; bento single column; matrix horizontal-scroll; damage chips wrap; footer stacks.
- Sticky bottom bar slides up after the hero, hides over the final CTA; 56px targets.

## Needs real data (flagged here; prices marked illustrative on-page where invented)
- **Review quotes** (Dana R./Marcus T./Priya S.) — invented voices; needs real Google/Angi reviews.
- **Prices** — from $8,900 replacement / $149-mo 0% APR / $349 repair / $29-mo Dry Club: demo copy, needs his real numbers.
- **"Ray" the field supervisor** (14 yrs) + 10-yr workmanship warranty — invented; needs the real tech name/photo and actual warranty terms.
- **Stat band** — 1,437 roofs since 2011 / 6-min callback: illustrative counted-style numbers; needs his real figures. (4.7★ · 346 Angi reviews · 46 yrs are REAL, from Angi.)
- **Live-job slot** ("This week · Seminole Heights", 2,300 sq ft) — staged; needs a real current job + photo.
- **Address** 4700 N Florida Ave, Tampa, FL 33603 — listed on ComplaintsBoard as verified; confirm with him before it goes anywhere public.
- Real facts used (verified 2026-10-13): Stay Dry Roofing of Tampa Bay Inc, Tampa FL; (813) 232-9430; office@staydryroofingoftampabay.com; 4.7★ (346 Angi reviews); 46 years of experience; free estimates; emergency services; warranties; shingle/flat/hydro-stop/metal 5-V crimp/standing seam; residential + commercial; hours Mon–Fri 9–5.

## Files
- `index.html`, `styles.css`, `app.js`, `favicon.svg`, `og-image.jpg` (1200×630, cropped from hero)
- `images/` — 4 original AI-generated webp photos (trade-literacy checked; v1 portrait kept as `tech-portrait-v1.webp`)
- `fonts/` — Archivo Narrow 500/600/700, Public Sans 400–700, Space Mono 400/700 (self-hosted woff2 + fonts.css)
- `qa/` — qa.py, results.json, stitched screenshots
- `screenshots/` — desktop/mobile full-page + hero shots (copies staged for the batch report)
- Planned (not deployed) alias for OG URLs: `https://stay-dry-roofing-demo-iodine-53s-projects.vercel.app/`
