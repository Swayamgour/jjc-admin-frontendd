# JJC Systems — Admin Panel

React + RTK Query admin panel for the JJC Systems backend.

## Setup

```bash
npm install
cp .env.example .env
# Set REACT_APP_API_URL to your backend URL
npm start
```

## Features

- **Dashboard** — Stats, recent leads, pipeline overview
- **Services** — 13 business-outcome pages (CRUD + publish toggle)
- **Platforms** — 14 Microsoft product pages (CRUD + category filter)
- **Solutions** — 13 outcome-based pages (CRUD)
- **Industries** — 9 industry pages (CRUD)
- **Blog & Resources** — Blog, Guide, Checklist, FAQ, Whitepaper
- **Case Studies** — Client results with approval workflow
- **Leads CRM** — All inbound leads, status pipeline management
- **FAQs** — Global FAQ library by category
- **Testimonials** — Client quotes management

## Tech Stack

- React 18
- Redux Toolkit + RTK Query (all API calls)
- React Router v6
- Component-scoped CSS (no Tailwind, no CSS modules)
- Zero external UI libraries
