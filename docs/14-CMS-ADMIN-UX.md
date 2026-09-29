# CMS Admin UX

## Admin Philosophy

Admin should be fast and utilitarian.

Do not copy the public portfolio visual style into the admin.

Use a clean dashboard UI:
- neutral colors
- clear tables
- simple forms
- strong status indicators
- keyboard-friendly
- responsive enough for tablet/mobile, but desktop-first

---

# Navigation

Sidebar:

- Dashboard
- Profile
- Homepage
- Experience
- Projects
- Capabilities
- GitHub Repos
- Media
- Resume
- SEO
- Settings

Footer:
- View Portfolio
- Sign Out

---

# Dashboard

Show:

## Content Overview
- Published Projects
- Draft Projects
- Experiences
- Media Assets

## Quick Actions
- New Project
- Update Profile
- Upload Media
- Replace Resume

## Recent Changes
- latest edited entities
- status
- updated_at

Do not add analytics unless there is a real data source.

---

# Profile Editor

Fields:
- Full name
- Main title
- Descriptor
- Primary tagline
- Secondary tagline
- Location
- Email
- Phone
- GitHub URL
- LinkedIn URL
- Website URL
- Avatar
- Resume

Preview:
- compact hero preview

---

# Homepage Editor

Editable sections:

## Hero
- eyebrow
- title override optional
- descriptor
- tagline
- CTA labels
- CTA destinations

## About
- heading
- body

## Selected Work
- title
- lead
- selected featured projects

## Capabilities
- heading
- lead

## GitHub
- heading
- lead

## Contact
- heading
- body

Do not allow arbitrary page-builder blocks in MVP.

---

# Experience Manager

List view columns:
- Company
- Role
- Period
- Status
- Order
- Actions

Form:
- company
- role
- employment type
- location
- start date
- end date
- current role toggle
- summary
- repeatable bullet input
- status

Validation:
- current role => no end date

---

# Project Manager

List columns:
- Project
- Role
- Period
- Featured
- Status
- Updated
- Order

Filters:
- Published
- Draft
- Featured
- Archived

Project editor tabs:

1. Overview
2. Case Study
3. Technology
4. Media
5. Links
6. SEO
7. Publishing

---

# Project Overview Tab

Fields:
- title
- slug
- subtitle
- summary
- role
- project type
- platform
- period
- featured toggle
- cover image

---

# Case Study Tab

Repeatable sections.

Presets:
- Context
- My Role
- What I Built
- Engineering Decisions
- Integrations
- Challenges
- Result

Each block:
- type
- title
- markdown body
- ordering

Allow drag-and-drop ordering.

---

# Technology Tab

Repeatable tags:
- technology
- category
- priority/order

---

# Media Tab

Functions:
- upload
- select from media library
- reorder
- set placement
- edit alt text
- edit caption
- remove from project

Cover image must have alt text.

---

# Links Tab

Fields:
- GitHub repository
- live demo
- store link
- additional link label/url

---

# SEO Tab

Fields:
- SEO title
- meta description
- OG image
- canonical URL
- robots

Show character guidance, not hard limits.

---

# Publishing Tab

Show:
- Draft
- Published
- Archived

Actions:
- Save Draft
- Preview
- Publish
- Unpublish
- Archive

Publishing requires validation.

---

# Capabilities Manager

Manage:
- groups
- skills
- order
- visibility
- level

Levels:
- primary
- secondary
- basic

Never show percentages.

---

# GitHub Repositories

Admin should allow selecting which repositories appear publicly.

Fields:
- repository full name
- custom display title
- custom description
- order
- visible

Optional action:
`Refresh from GitHub`

---

# Media Library

Grid/list toggle.

Each asset:
- preview
- filename
- type
- dimensions
- size
- alt text
- usage references

Functions:
- upload
- edit metadata
- copy URL
- delete if unused

---

# Resume Manager

Show:
- current resume filename
- uploaded date
- file size

Actions:
- upload replacement
- download current
- publish replacement

Use stable public URL:
`/resume/Arik_Riko_Prasetya_Software_Engineer.pdf`

---

# SEO Manager

Sections:
- Global SEO
- Page SEO
- Project SEO

Show preview:
- Google-like title/description
- OG preview

---

# Settings

Keep limited:
- navigation visibility
- social links
- site locale
- maintenance mode optional

Do not expose low-level theme tokens in MVP.
