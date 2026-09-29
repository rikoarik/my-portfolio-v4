# CMS Implementation Prompt

Implement an internal CMS for the new ARK portfolio.

Read first:
- `12-CMS-ARCHITECTURE.md`
- `13-CMS-DATA-MODEL.md`
- `14-CMS-ADMIN-UX.md`
- `15-CMS-AUTH-MEDIA-SECURITY.md`

The CMS must be integrated into the same Next.js application.

Admin base route:

`/admin`

## Stack

Use:
- Next.js App Router
- TypeScript
- Supabase Postgres
- Supabase Auth
- Supabase Storage
- Server Actions
- Zod
- Tailwind CSS

Use React Hook Form only where it reduces complexity.

## Do Not Build

Do not build:
- a generic page builder
- drag-anything canvas
- theme editor
- multi-tenant CMS
- public account registration
- analytics dashboard without a real analytics source

This is a focused single-owner portfolio CMS.

## Required Admin Routes

```text
/admin
/admin/login
/admin/profile
/admin/homepage
/admin/experience
/admin/experience/new
/admin/experience/[id]
/admin/projects
/admin/projects/new
/admin/projects/[id]
/admin/capabilities
/admin/repositories
/admin/media
/admin/resume
/admin/seo
/admin/settings
```

## Required Features

### Authentication
- Supabase Auth
- no public signup
- protect all admin routes
- admin allowlist

### Profile
CRUD/edit:
- title
- descriptor
- taglines
- contact
- links
- avatar
- resume

### Homepage
Edit:
- hero
- about
- selected work copy
- capabilities copy
- GitHub section copy
- contact section

### Experience
- list
- create
- edit
- reorder
- draft/published/archive
- repeatable bullets

### Projects
- list
- create
- edit
- slug
- summary
- dates
- role
- featured
- case-study sections
- technologies
- media
- links
- SEO
- publish state

### Capabilities
- groups
- skills
- level
- ordering

### Repositories
- select GitHub repositories to feature
- allow custom title/description

### Media
- upload
- browse
- edit alt/caption
- delete unused
- select in forms

### Resume
- replace current PDF
- stable published filename
- verify public download URL

### SEO
- global metadata
- page metadata
- project metadata
- OG images

## Publishing

Implement status:
- draft
- published
- archived

Public queries must only return published content.

Publishing should call Next.js revalidation.

Use:
- `revalidatePath`
- or `revalidateTag`

Keep public pages fast.

## Database

Create SQL migrations for all required CMS tables.

Enable RLS.

Create policies for:
- public published SELECT
- admin CRUD

Do not ship with RLS disabled.

## Preview

Add preview support for draft projects if practical.

Preferred:
- authenticated preview route
- never expose draft content publicly

## Admin UI

Style:
- neutral
- utilitarian
- compact
- clear status badges
- simple forms
- no decorative portfolio animations

Admin should optimize editing speed, not aesthetics.

## Validation

Use Zod server-side.

Important rules:
- only one current professional experience
- current experience cannot have end date
- projects cannot be marked Present
- project slug must be unique
- published project requires cover image + alt text
- external links must be valid URLs

## Media

Use Supabase Storage.

Buckets:
- `portfolio-public`
- `resumes`
- optional `portfolio-private`

Do not expose service role keys.

## Security

- secure cookies/session
- server-side auth checks
- RLS
- input validation
- sanitize CMS Markdown
- no arbitrary MDX/JS execution from DB

## Data Migration

If old portfolio/Supabase content exists:
- inspect it
- migrate only factual content
- normalize old records to new schema
- do not copy stale dates
- do not copy `2+ Years Mobile Experience`
- do not copy mobile-only positioning

## Initial Seed

Seed with current canonical data from the documentation.

Do not create fake projects or metrics.

## Final QA

Before completion:

1. run migrations
2. run lint
3. run typecheck
4. run tests
5. run production build
6. test login
7. test unauthorized access
8. test project CRUD
9. test publish/unpublish
10. test image upload
11. test resume replacement
12. test SEO editing
13. test public site after publish
14. verify drafts do not leak publicly
15. verify RLS
16. verify mobile admin basic usability

Do not stop after building the UI.
Finish the CMS end-to-end.
