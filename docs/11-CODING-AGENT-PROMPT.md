# Coding Agent Prompt

Build a completely new personal portfolio for **Arik Riko Prasetya (Ark)**.

## First instruction

Read all markdown files in this documentation folder before writing code.

The documentation is intentionally split by concern. Do not merge everything into one source file.

Read in this order:

1. `00-README.md`
2. `01-POSITIONING-AND-TONE.md`
3. `02-HOMEPAGE-CONTENT.md`
4. `03-EXPERIENCE-CONTENT.md`
5. `04-SKILLS-CAPABILITIES.md`
6. `05-PROJECT-SELECTION.md`
7. `06-CASE-STUDY-CONTENT.md`
8. `07-IMAGE-DIRECTION.md`
9. `08-IMAGE-SHOTLIST.md`
10. `09-SEO-AND-METADATA.md`
11. `10-IMPLEMENTATION-BRIEF.md`

## Goal

Create a new portfolio with primary identity:

**Software Engineer**

Secondary positioning:

**Mobile · Backend · Full-stack**

The site must work for multiple software engineering job applications without looking unfocused.

## Visual Reference

Use `julianrizkipratama.com` only as a reference for:
- editorial spacing
- typography hierarchy
- project-first presentation
- case-study structure
- restrained motion

Do not clone the layout pixel-for-pixel.

## Core Rules

- Project work is the primary proof of skill.
- Homepage must not become a long CV.
- Historical job titles stay accurate.
- Only PT Teknologi Kartu Indonesia uses `Present`.
- No project uses `Present`.
- No fake metrics.
- No fake users.
- No fake revenue.
- No fake performance improvements.
- Odoo must remain `Odoo (Basic)`.
- Python is secondary, not the primary professional identity.
- Avoid excessive architecture buzzwords.

## Technical Requirements

Use:
- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX
- Motion only where useful

Prefer Server Components.

Keep content separate from presentation.

Project metadata should be typed data.
Project case studies should be MDX.

## Process

Before implementation:
1. inspect all documentation
2. inspect existing public GitHub repositories if needed
3. define design tokens
4. define project data schema
5. define layout components
6. define image placeholders from `08-IMAGE-SHOTLIST.md`
7. create implementation plan

Then implement the complete site.

Do not stop at scaffolding.

## Final QA

Run:
- lint
- typecheck
- production build

Then review:
- desktop
- mobile
- keyboard navigation
- reduced motion
- internal links
- project routes
- resume download
- metadata
- image alt text

Finish only when production build succeeds.
