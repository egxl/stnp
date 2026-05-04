# Research: Law Firm Services Page Best Practices

> Conducted: 2026-05-04

---

## Summary

A premium law firm's Services (Practice Areas) page is the firm's **commercial engine** — it converts a visitor's problem into a specific service they can engage. Unlike the About page (trust & identity), the Services page must answer: *"Can this firm solve my specific legal issue?"* Architecture, clarity of grouping, and sector specificity are the primary levers.

---

## 1. Core Content Components

| Element | Purpose |
| :--- | :--- |
| **Category Grouping** | Organise services into logical clusters (Dispute, Corporate, Industry) to help scanners self-identify |
| **Service Title + Short Description** | 1–2 sentences answering "what does this solve for the client?" |
| **Long-form Service Narrative** | 3–5 sentences of authoritative detail — demonstrates depth, not just breadth |
| **Sector Callouts** | Name the industries and client types served under each practice area |
| **Credential Anchors** | Bar associations, certifications, and notable client/deal references that validate expertise |
| **Anchor Navigation** | Sticky or in-page links to each category so visitors can jump directly |

---

## 2. Structural Patterns Used by Premium Law Firms

### Pattern A — Category-First Scroll (most common)
- Three-column or bento grid of category tiles at top
- Each tile anchors to a full section below
- Services within each category listed as rows with description + CTA

### Pattern B — Indexed Ledger
- Left sidebar index of all services (sticky)
- Right panel renders the active service's full detail
- Elegant but requires JS; excellent for depth-heavy practices

### Pattern C — Editorial Magazine Layout
- Full-bleed section per category, typographic hierarchy carries the page
- Services are set in editorial columns with generous white space
- Best for firms positioning on brand, not just SKU-list

**STNP Recommendation**: Pattern C (Editorial Magazine), consistent with the About page's split-column + sticky-anchor pattern. Categories get their own editorial sections; services within them use a typographic list, not icon-cards.

---

## 3. Content Strategy for Each Practice Area

### What a Premium Description Must Include:
1. **The Problem Statement** — the client situation this service addresses
2. **STNP's Specific Capability** — what the team can actually do (not generic claims)
3. **Proof Point** — a credential, court level, or deal reference
4. **Scope Signal** — geographic (Indonesia-wide, District → Supreme Court), sector (industry name), or transaction size

### What to Avoid:
- Generic "We provide legal advice on X" without specifics
- Claiming "best" or "leading" without evidence
- Listing services as bullet points with no narrative weight

---

## 4. Navigation & Architecture Recommendations

| Recommendation | Rationale |
| :--- | :--- |
| **Three top-level categories** (Dispute Resolution, Corporate & Commercial, Industry Focus) | Already structured this way in `lib/data/services.js` — reinforce, don't re-invent |
| **In-page anchor nav** (sticky pill tabs or a horizontal tab bar) | Reduces scroll fatigue; lets repeat visitors jump to their practice area |
| **Pro Bono as a dedicated, closing section** | Positions social responsibility as a firm value, not a footnote |
| **Client Industries sidebar or tag cloud** | Surfaces sector depth — Energy, Mining, Plantation, Tourism — as a trust signal |

---

## 5. Hero Section Strategy

The hero for a Services page should:
- Establish the **range** of STNP's expertise ("Full-service. Industry-specific. Partner-led.")
- Signal **geographic authority** (Indonesia: District Court to Supreme Court)
- Use the **editorial split layout** — breadcrumb + H1 on one side, a powerful sub-statement on the other — consistent with the About page hero

---

## 6. CTA Placement

| Location | CTA Type |
| :--- | :--- |
| After each service row | "Discuss this matter →" linking to `/contact` |
| After each category section | "Meet the team handling [Category] →" linking to `/team` |
| Page-end CTA section | "Ready to retain counsel?" — primary contact CTA |

---

## 7. Tone & Style for Legal Services Copy

- **Capability-first, not claim-first**: "We have represented major clients from District Court to the Supreme Court" > "We are the best litigators"
- **Indonesian jurisdiction specificity**: Name actual courts (Pengadilan Negeri, Mahkamah Agung), bar associations (PERADI, AKPI), and regulatory bodies (KPPU, OJK)
- **Deal / matter references**: USD 120M syndicated finance, PKPU proceedings, palm oil plantation acquisitions — these belong in the body copy, not just in track records
- **Client-centric framing**: Each service description should open from the client's perspective, not the firm's self-description

---

## 8. Checklist

| Element | Status |
| :--- | :--- |
| In-page category navigation | Plan for implementation |
| Hero with range statement | Plan — editorial split |
| 3 service categories clearly delineated | ✅ Data exists in `services.js` |
| Individual service: long-form editorial copy | Plan — expand existing descriptions |
| Credential + proof points in copy | Plan — pull from FIRM_DATA.md partner track records |
| Pro Bono closing section | ✅ Data exists in `services.js` |
| Per-service CTA to contact | ✅ Already in `page.js` |
| Client industry references | Plan — surface from `services.js` sector data |
| Page-end CTA block | ✅ Already in `page.js` |
