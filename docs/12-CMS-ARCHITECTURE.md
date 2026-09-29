# CMS Architecture

## Goal

Tambahkan CMS internal agar konten portfolio dapat dikelola tanpa edit code.

CMS harus menjadi bagian dari project portfolio yang sama, bukan aplikasi terpisah.

Admin route:

`/admin`

Public portfolio tetap:
- `/`
- `/work`
- `/work/[slug]`
- `/about`

## Recommended Stack

- Next.js App Router
- TypeScript
- Supabase Postgres
- Supabase Auth
- Supabase Storage
- Server Actions / Route Handlers
- Zod for validation
- React Hook Form for complex forms if needed

## Why Supabase

Dipilih karena:
- database PostgreSQL
- authentication
- storage
- row-level security
- simple deployment
- cocok untuk single-owner portfolio CMS
- tidak perlu maintain separate backend service

## Architecture

```text
Browser
  |
  | Public
  v
Next.js Portfolio
  |
  | Server-side queries
  v
Supabase Postgres + Storage

Browser
  |
  | /admin
  v
Next.js Admin UI
  |
  | authenticated Server Actions
  v
Supabase
```

## Public Rendering

Public pages harus fetch published content only.

Rules:
- no draft content on public pages
- no admin-only fields leaked
- no service-role key exposed to browser
- cache/revalidation after publish

## Admin Rendering

Admin routes:
- protected by auth middleware
- server-side session validation
- single-owner or allowlisted account
- CRUD through server actions

## CMS Scope

CMS should manage:

1. Profile
2. Homepage sections
3. Experience
4. Projects
5. Project case studies
6. Skills / capability groups
7. GitHub featured repositories
8. Media assets
9. Resume file
10. SEO metadata
11. Site settings
12. Draft / publish status

## Publishing Model

Each content type should support:

- `draft`
- `published`
- `archived`

Optional:
- `scheduled` later, but not required for MVP.

Publishing should:
1. validate content
2. update `published_at`
3. trigger Next.js revalidation
4. update public site

## CMS Principle

CMS should not control low-level design.

CMS controls:
- content
- ordering
- visibility
- image selection
- metadata

Code controls:
- typography
- spacing
- layout system
- component variants
- responsive behavior

This prevents the CMS from becoming a page builder.
