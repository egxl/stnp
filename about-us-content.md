# About Us Page Content

> Source: `app/[lang]/about-us/page.js`

---

## Page Metadata

- **Title:** About Us
- **Description:** Learn about Soaloan Tua Nababan & Partners — a full-service Jakarta law firm founded in 2018, dedicated to truth, justice, and excellence.

---

## Hero Banner

- **Breadcrumb:** Home / About Us
- **H1:** About Our Firm
- **Subtitle:** A legacy of excellence in legal services since 2018

---

## About Summary Section

> Content sourced from `dict.home` (i18n dictionary) + `firmInfo` data

- **Label:** `dict.home.aboutLabel`
- **Title:** `dict.home.aboutTitle`
- **Body:** `dict.home.aboutText` (with `{founder}` replaced by `firmInfo.founder`)
- **Right side:** CardSwap component cycling through `firmInfo.principles`, each card showing:
  - Number (01, 02, …)
  - Principle title
  - Principle description

---

## Our Story Section

- **Label:** Our Story
- **H2:** Building Trust Through Legal Excellence
- **Paragraph 1:**
  Soaloan Tua Nababan & Partners was established in 2018 by **[firmInfo.founder]** with a clear vision: to provide international-caliber legal services rooted in integrity and Indonesian expertise. Based in the prestigious Prudential Tower in South Jakarta, our firm has quickly earned recognition for delivering strategic counsel across a wide spectrum of legal disciplines.
- **Paragraph 2:**
  Our team combines deep knowledge of Indonesian law with practical business acumen, allowing us to serve both domestic and international clients with equal proficiency. We believe that the best legal outcomes are achieved through thorough preparation, creative strategy, and unwavering commitment to our clients' interests.

### Stats Cards

| Stat | Label |
|------|-------|
| 2018 | Established |
| 6 | Practice Areas |
| 100+ | Cases Handled |
| Jakarta | Headquarters |

---

## Guiding Principles Section (Dark)

- **Label:** Our Foundation
- **H2:** Guiding Principles
- **Content:** Grid of `firmInfo.principles`, each card showing:
  - Number (01, 02, …)
  - Principle title
  - Principle description

---

## Location Section

- **Label:** Our Location
- **H2:** Visit Our Office

### Address

Pulled from `firmInfo.address`:
- Line 1 (bold)
- Line 2
- City, Postal
- Country

### Contact Details

- **Phone:** `firmInfo.phone` (array, multiple numbers)
- **Email:** `firmInfo.email` (mailto link)

### Google Maps Embed

```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.302305370211!2d106.81998357582531!3d-6.20963026094602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5005f6a484f%3A0xa695d1d572dbf6ae!2sSoaloan%20Tua%20Nababan%20%26%20Partners!5e0!3m2!1sen!2sid!4v1712850000000!5m2!1sen!2sid
```

- `allowFullScreen`, `loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`
- Title: `STNP Office Location`
