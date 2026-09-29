# Implementation Brief

## Goal

Build a new portfolio from scratch.

Do not extend the current portfolio UI.

## Stack

Recommended:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Motion / Framer Motion only where useful
- MDX for case studies

No CMS initially.

## Suggested Structure

```text
src/
  app/
    page.tsx
    work/
      page.tsx
      [slug]/
        page.tsx
    about/
      page.tsx
  components/
    layout/
    home/
    work/
    ui/
  data/
    profile.ts
    experience.ts
    skills.ts
    projects.ts
  content/
    projects/
      puas-hub.mdx
      member-app-ecosystem.mdx
      lembar.mdx
      crm-platform.mdx
      merchant-payment-platform.mdx
      explore-bojonegoro.mdx
  lib/
  styles/
public/
  images/
    projects/
```

## Content Architecture

Homepage:
- hero
- selected work
- about short
- experience short
- capabilities
- selected GitHub repos
- contact

Project detail:
- header
- context
- role
- what I built
- engineering decisions
- integrations
- challenges
- result
- stack
- links

## Performance

- Server Components by default
- client component only when needed
- next/image
- optimized fonts
- responsive images
- lazy load below fold
- avoid large global animation JS

## Accessibility

- semantic HTML
- keyboard navigation
- visible focus
- reduced motion
- correct headings
- sufficient contrast
- meaningful alt text

## Responsive Targets

Review at:
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1440px+

## Definition of Done

- lint passes
- typecheck passes
- production build passes
- no broken internal links
- all project routes work
- resume download works
- responsive layout checked
- metadata checked
- no placeholder copy
- no project marked Present


## CMS

CMS is included in the same Next.js application.

Admin:
`/admin`

Backend services:
- Supabase Postgres
- Supabase Auth
- Supabase Storage

Read:
- `12-CMS-ARCHITECTURE.md`
- `13-CMS-DATA-MODEL.md`
- `14-CMS-ADMIN-UX.md`
- `15-CMS-AUTH-MEDIA-SECURITY.md`
- `16-CMS-IMPLEMENTATION-PROMPT.md`

The CMS should manage content, ordering, publishing and media, but must not become a page builder.
