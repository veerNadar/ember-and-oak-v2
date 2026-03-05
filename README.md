# 🔥 Ember & Oak

> **Fire-crafted food, rooted in tradition.**

A full-stack restaurant website for **Ember & Oak**, a modern American bistro in Austin, TX. Built with Next.js 14 App Router, Supabase, and Tailwind CSS.

---

## Features

- **Public site** — Home, Menu (filterable by category), Reservations, About, Contact
- **Online reservations** — form with validation, conflict checking, and toast confirmations
- **Admin panel** — protected dashboard for managing menu items and reservation statuses
- **SEO-ready** — metadata, OpenGraph, Twitter cards, sitemap.xml, robots.txt
- **Loading states** — animated flame loader, skeleton cards throughout
- **Error handling** — branded error/404 pages, client-side error boundaries
- **Mobile-first** — responsive at 375px, 768px, and 1280px; touch-friendly 44px tap targets

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org) (App Router, TypeScript) |
| Styling | [Tailwind CSS](https://tailwindcss.com) with custom brand tokens |
| Database | [Supabase](https://supabase.com) (PostgreSQL) |
| Auth | [NextAuth.js](https://next-auth.js.org) with CredentialsProvider |
| Notifications | [react-hot-toast](https://react-hot-toast.com) |
| Icons | [lucide-react](https://lucide.dev) |
| Fonts | Playfair Display + Inter (Google Fonts) |
| Hosting | [Vercel](https://vercel.com) |

---

## Running Locally

### 1. Clone and install

```bash
git clone https://github.com/your-username/ember-and-oak.git
cd ember-and-oak
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in your values — see [Environment Variables](#environment-variables) below.

### 3. Set up the Supabase database

Run the following SQL in your Supabase SQL editor to create the required tables:

```sql
-- Menu items
create table menu_items (
  id uuid primary key default gen_random_uuid(),
  category text not null check (category in ('starters','mains','desserts','drinks')),
  name text not null,
  description text,
  price numeric(8,2) not null,
  image_url text,
  is_available boolean not null default true,
  created_at timestamptz not null default now()
);

-- Reservations
create table reservations (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  email text,
  date date not null,
  time text not null,
  party_size int not null,
  status text not null default 'pending'
    check (status in ('pending','confirmed','seated','cancelled')),
  notes text,
  created_at timestamptz not null default now()
);
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The admin panel is at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL (Project Settings → API) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only, never exposed to browser) |
| `NEXTAUTH_SECRET` | Random secret — generate with `openssl rand -hex 32` |
| `NEXTAUTH_URL` | Full URL of the app (`http://localhost:3000` locally, your domain in production) |
| `ADMIN_USERNAME` | Admin login username (plain text) |
| `ADMIN_PASSWORD` | Admin login password (plain text, bcrypt-compared at runtime) |

---

## Project Structure

```
src/
├── app/               # Next.js App Router pages & API routes
│   ├── api/           # REST API routes (menu, reservations, auth)
│   ├── admin/         # Protected admin panel pages
│   ├── (public)/      # Home, Menu, Reservations, About, Contact
│   ├── error.tsx      # Global error boundary page
│   ├── not-found.tsx  # 404 page
│   ├── loading.tsx    # Root loading state (animated flame)
│   ├── sitemap.ts     # Auto-generated sitemap.xml
│   └── robots.ts      # Auto-generated robots.txt
├── components/        # Reusable React components
│   ├── admin/         # Admin panel components
│   ├── home/          # Home page components
│   ├── menu/          # Menu grid & card
│   └── reservations/  # Reservation form
└── lib/               # Supabase client, auth config, TypeScript types
```

---

## Deploying to Vercel

1. Push your code to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add all environment variables from `.env.example` in the Vercel dashboard under **Settings → Environment Variables**. Make sure to:
   - Set `NEXTAUTH_URL` to your production domain (e.g. `https://www.emberandoak.com`)
   - Keep `SUPABASE_SERVICE_ROLE_KEY` out of any `NEXT_PUBLIC_` prefix — it's server-only
4. Deploy. Vercel auto-detects Next.js and builds with `npm run build`.

> **OG Image:** Drop a `1200×630` branded image at `public/og-image.jpg` before deploying to enable rich social sharing previews.

---

## Brand Colours

| Name | Hex | Usage |
|---|---|---|
| `ember` | `#C8692A` | Primary accent |
| `oak` | `#3D2314` | Dark brown backgrounds |
| `cream` | `#F5F0E8` | Off-white text |
| `charcoal` | `#1A1A1A` | Dark page background |
| `ash` | `#4A4A4A` | Medium gray / borders |

---

## Scripts

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # ESLint
```
