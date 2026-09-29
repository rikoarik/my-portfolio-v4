# CMS Data Model

Use UUID primary keys.

Every table should include:
- `id`
- `created_at`
- `updated_at`

Content tables should also include where applicable:
- `status`
- `sort_order`
- `published_at`

---

# 1. site_profile

Fields:

```text
id uuid pk
full_name text
title text
descriptor text
tagline_primary text
tagline_secondary text
location text
email text
phone text nullable
github_url text nullable
linkedin_url text nullable
website_url text nullable
resume_url text nullable
avatar_media_id uuid nullable
status text
updated_at timestamptz
```

Example:
- title: `Software Engineer`
- descriptor: `Mobile · Backend · Full-stack`

---

# 2. site_sections

For editable copy that is not its own entity.

```text
id uuid pk
section_key text unique
eyebrow text nullable
title text nullable
subtitle text nullable
body text nullable
metadata jsonb
status text
sort_order int
published_at timestamptz nullable
```

Possible keys:
- hero
- about
- selected_work
- capabilities
- github
- contact

---

# 3. experiences

```text
id uuid pk
company text
role text
employment_type text nullable
location text nullable
start_date date
end_date date nullable
is_current boolean default false
summary text nullable
bullets jsonb
sort_order int
status text
published_at timestamptz nullable
```

Validation:
- only PT Teknologi Kartu Indonesia should currently have `is_current=true`
- if `is_current=true`, `end_date` must be null

---

# 4. projects

```text
id uuid pk
slug text unique
title text
subtitle text nullable
summary text
period_label text nullable
start_date date nullable
end_date date nullable
role text nullable
project_type text nullable
platform text nullable
featured boolean default false
cover_media_id uuid nullable
repo_url text nullable
demo_url text nullable
store_url text nullable
sort_order int
status text
published_at timestamptz nullable
```

No project should use `Present`.

---

# 5. project_technologies

```text
id uuid pk
project_id uuid fk
technology text
category text nullable
sort_order int
```

Example categories:
- mobile
- backend
- web
- database
- integration
- delivery

---

# 6. project_sections

Case study content.

```text
id uuid pk
project_id uuid fk
section_type text
title text nullable
body_md text nullable
metadata jsonb
sort_order int
status text
```

Allowed `section_type`:

- context
- role
- built
- decisions
- integrations
- challenges
- result
- stack
- links
- custom

`body_md` can support Markdown.

---

# 7. project_media

```text
id uuid pk
project_id uuid fk
media_id uuid fk
placement text
caption text nullable
alt_text text
sort_order int
```

Placement examples:
- cover
- hero
- gallery
- feature
- diagram

---

# 8. skill_groups

```text
id uuid pk
name text
description text nullable
sort_order int
status text
```

Examples:
- Mobile
- Backend
- Web
- Data
- Integrations
- Delivery
- Additional

---

# 9. skills

```text
id uuid pk
group_id uuid fk
name text
level text nullable
featured boolean default false
sort_order int
status text
```

Do not use percentage proficiency.

`level` may be:
- primary
- secondary
- basic

Example:
- Kotlin = primary
- Python = secondary
- Odoo = basic

---

# 10. featured_repositories

```text
id uuid pk
repo_full_name text
title_override text nullable
description_override text nullable
sort_order int
visible boolean default true
status text
```

GitHub data may be enriched at render time.

---

# 11. media_assets

```text
id uuid pk
bucket text
path text
public_url text
mime_type text
size_bytes bigint nullable
width int nullable
height int nullable
alt_text text nullable
caption text nullable
created_at timestamptz
```

---

# 12. seo_settings

```text
id uuid pk
site_title text
title_template text
default_description text
default_og_media_id uuid nullable
canonical_base_url text
robots text nullable
metadata jsonb
status text
```

---

# 13. seo_pages

```text
id uuid pk
page_key text unique
title text nullable
description text nullable
canonical_url text nullable
og_media_id uuid nullable
robots text nullable
metadata jsonb
status text
```

Example page keys:
- home
- work
- about
- work:puas-hub

---

# 14. site_settings

```text
id uuid pk
key text unique
value jsonb
updated_at timestamptz
```

Examples:
- `navigation`
- `social_links`
- `resume`
- `feature_flags`

---

# Recommended Indexes

Add indexes on:
- `status`
- `sort_order`
- `slug`
- `section_key`
- `project_id`
- `group_id`
- `featured`
- `published_at`

## Deletion Strategy

Prefer soft/archive semantics for content.

Do not hard-delete published content by default.

Media can be deleted only if no content references it.
