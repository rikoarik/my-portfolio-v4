# CMS Auth, Media & Security

## Authentication

Use Supabase Auth.

CMS is private and intended for Ark only.

Recommended:
- email + password
- optional magic link
- optional MFA later

Do not allow public registration.

## Authorization

Use an allowlist.

Example:
- allowed user ID
- or allowed email configured in environment

Every admin request must validate:
1. valid session
2. authorized admin identity

Do not rely on hidden navigation alone.

---

# Route Protection

Protect:
- `/admin`
- `/admin/**`
- admin API routes
- admin server actions

If unauthenticated:
redirect to `/admin/login`

If authenticated but unauthorized:
return 403 / access denied.

---

# Supabase RLS

Enable RLS for CMS tables.

Public role:
- SELECT only rows where `status='published'`
- no INSERT
- no UPDATE
- no DELETE

Authenticated admin:
- CRUD allowed only for authorized admin user

Storage:
- public read for published portfolio media
- authenticated upload/update/delete
- private bucket for drafts if desired

---

# Secrets

Never expose:
- Supabase service-role key
- database password
- GitHub token
- private API keys

Browser may only receive:
- public Supabase URL
- anon key

Service role:
server only.

---

# Media Storage

Recommended buckets:

## portfolio-public
For:
- project covers
- project screenshots
- diagrams
- avatar
- OG images

## portfolio-private
Optional:
- unpublished/draft media
- internal source files

## resumes
For:
- current resume PDF

---

# Upload Rules

Allowed project image formats:
- PNG
- JPG/JPEG
- WebP
- AVIF
- SVG only if sanitized / trusted

Resume:
- PDF

Recommended limits:
- image <= 10 MB
- resume <= 5 MB

Generate optimized public derivatives where useful.

---

# Image Metadata

Require:
- alt text for published project images

Optional:
- caption
- source note
- width
- height

---

# File Naming

Use stable, descriptive paths.

Example:

```text
projects/puas-hub/cover.webp
projects/puas-hub/transaction-history.webp
projects/lembar/dashboard.webp
resume/Arik_Riko_Prasetya_Software_Engineer.pdf
```

Avoid random user-facing filenames if possible.

---

# Publish Validation

Before publishing a project require:

- title
- slug
- summary
- role
- cover image
- cover alt text
- at least one case study section
- valid dates
- no `Present` project period
- valid external URLs

---

# Audit / Safety

Recommended later:
- `created_by`
- `updated_by`
- content revision history

MVP does not require full audit log, but `updated_at` is mandatory.

---

# Input Validation

Use Zod on server.

Validate:
- URLs
- slug format
- status enums
- date consistency
- array lengths
- markdown/string limits

Never trust browser validation alone.

---

# Markdown Safety

If rendering Markdown/MDX from CMS:
- do not allow arbitrary executable JSX from database content
- use safe Markdown renderer
- sanitize raw HTML or disable it

For CMS-driven case studies, prefer Markdown over arbitrary MDX execution.
