# Ember & Oak — Project Context

## What This Is
A full-stack restaurant website for a fictional modern American bistro called "Ember & Oak" based in Austin, TX. Tagline: "Fire-crafted food, rooted in tradition."

## Tech Stack
- Framework: Next.js 14 with App Router (NOT Pages Router)
- Language: TypeScript
- Styling: Tailwind CSS with custom brand colors
- Database: Supabase (PostgreSQL)
- Auth: NextAuth.js with CredentialsProvider
- Password hashing: bcryptjs
- Notifications: react-hot-toast
- Icons: lucide-react
- Hosting: Vercel

## Brand Colors (defined in tailwind.config.ts)
- ember: #C8692A (primary accent)
- oak: #3D2314 (dark brown)
- cream: #F5F0E8 (off-white text)
- charcoal: #1A1A1A (dark background)
- ash: #4A4A4A (medium gray)

## Fonts
- Headings: Playfair Display (serif) — from Google Fonts
- Body: Inter (sans-serif)

## Project Structure
- All source code lives in /src
- Pages are in /src/app (App Router)
- Components are in /src/components
- Utilities and DB client are in /src/lib
- API routes are in /src/app/api

## Database Tables
- menu_items: id, category, name, description, price, image_url, is_available, created_at
- reservations: id, customer_name, phone, email, date, time, party_size, status, notes, created_at
- admins: id, username, password_hash, created_at

## Important Rules
- Always use App Router patterns (not Pages Router)
- Always use TypeScript — no plain .js files in /src
- Never use <form> HTML tags — use onClick handlers instead
- Server Components by default — only add "use client" when truly needed
- All API routes use the Supabase service role key (not the public key)
- Public pages use the public Supabase client
- Admin routes must check authentication before any DB operation
- Keep components small and focused — one job per component

## Pages Built So Far
(Update this section as you complete each phase)
- [x] Phase 1 — Project scaffold and database
- [x] Phase 2 — Layout, Navbar, Footer
- [x] Phase 3 — Public pages (Home, Menu, Reservations, About, Contact)
- [x] Phase 4 — API routes
- [x] Phase 5 — Admin panel
- [x] Phase 6 — Polish
- [ ] Phase 7 — Deployment

## Environment Variables Needed
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXTAUTH_SECRET
NEXTAUTH_URL
ADMIN_USERNAME
ADMIN_PASSWORD_HASH