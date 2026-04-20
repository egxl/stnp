# Prompt to Create Team Member Detail Page

## Objective
Create a dynamic Next.js page for individual team members at the route `/[lang]/team-profile/[slug]`.

## Context
- The user's team data is in `lib/data/team.js` containing an array of member objects (name, title, bio, photo, etc.).
- The URL slug is derived from the "slugified" full name of the lawyer (e.g., `oswald-anggi-soaloan-s-h` for "Oswald Anggi Soaloan, S.H.").
- You will need to implement a dynamic `page.js` that reads the `[slug]` from the params, matches it against the slugified names in `team.js`, and renders the detailed profile.

## Requirements
1. **Routing:** Implement the `app/[lang]/team-profile/[slug]/page.js` file as a Server Component.
2. **Matching:** Import the `team` array from `lib/data/team.js` and slugify the `name` field of each member to match against the provided `slug` param. The slugify logic should be robust: `name.toLowerCase().replace(/[\s.,]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')`.
3. **Design:** Follow the UI UX Pro Max and Emil Kowalski guidelines. The page should feel premium, using the established custom easing and layout tokens.
4. **Layout:** The page should have a beautiful Hero section (or similar top section) displaying the full portrait on one side and the name/title on the other side, plus the full bio content.
5. **Not Found:** If the slug doesn't match any member, return the `notFound()` Next.js function to show a 404 page.
6. **Animations:** Ensure smooth enter animations using standard CSS transitions or `@starting-style` where appropriate, avoiding keyframes for simple entrances.

Please review the existing `app/[lang]/team-profile/page.js` for layout consistency before starting.
