# RK Fusion Chiropractic Yog Centre

A full MERN-stack website: a single-page public site (Hero → About → Gallery →
Contact) with scroll-driven motion, and a **hidden, password-protected admin
dashboard** for uploading gallery photos/videos. The contact form opens
WhatsApp with a pre-filled message instead of sending email.

```
rk-fusion/
├── server/   Express + MongoDB API (auth, media upload) - deploys to Vercel as a serverless function
└── client/   React + Vite + Tailwind + Framer Motion - deploys to Vercel as a static site
```

## How the pieces fit together

- **Public site** (`/`) — one scrolling page. A right-side dot nav (styled
  like vertebrae) and the top navbar both smooth-scroll between sections.
  The Gallery section pulls its photos/videos live from the API.
- **Admin dashboard** — reachable only at a private URL you choose
  (`VITE_ADMIN_PATH` in `client/.env`, default `/rk-admin-portal`). It is
  **not linked anywhere** on the public site, nav, or footer — the only way
  in is knowing the exact address, and even then a login (email + password,
  stored hashed in MongoDB) is required. From there you upload images and
  videos, tag them by category, mark items as featured, and delete them.
- **Contact form** — collects name / phone / service / message, then opens
  `https://wa.me/<your number>?text=...` in a new tab with everything
  pre-filled. Nothing is emailed or stored server-side; the visitor presses
  send inside WhatsApp itself.
- **Media storage** — uploaded photos/videos go to Cloudinary, not local
  disk. This matters because the API runs as a serverless function on
  Vercel, which has no persistent filesystem between requests.

## 1. Prerequisites

- Node.js 18+
- A free MongoDB Atlas account (database) — atlas.mongodb.com
- A free Cloudinary account (photo/video storage) — cloudinary.com
- A Vercel account
- A WhatsApp number that should receive enquiries

## 2. Backend setup (local dev)

```bash
cd server
cp .env.example .env
npm install
```

Fill in `.env` — see the table below. Then create your first admin account
(run once, against your real `MONGO_URI`):

```bash
npm run seed:admin
```

Start the API locally:

```bash
npm run dev
```

It runs on `http://localhost:5000`.

| Variable | What to put |
|---|---|
| `MONGO_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Any long random string (e.g. generate with `openssl rand -hex 32`) |
| `JWT_EXPIRES_IN` | `7d` is a sensible default |
| `ADMIN_SEED_EMAIL` / `ADMIN_SEED_PASSWORD` | The login you'll use for the dashboard (only needed to run the seed script once) |
| `CLIENT_ORIGIN` | `http://localhost:5173` locally; your live client URL in production |
| `CLOUDINARY_CLOUD_NAME` / `CLOUDINARY_API_KEY` / `CLOUDINARY_API_SECRET` | From your Cloudinary dashboard home page |

## 3. Frontend setup (local dev)

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

| Variable | What to put |
|---|---|
| `VITE_API_URL` | `http://localhost:5000/api` locally; your live server URL + `/api` in production |
| `VITE_WHATSAPP_NUMBER` | Your number, international format, digits only, no `+` |
| `VITE_ADMIN_PATH` | A private path only you know, e.g. `/rk-portal-7x2k` — change this before deploying |
| `VITE_SITE_URL` | Your real live domain, no trailing slash — used in SEO tags only |

Visit `http://localhost:5173` for the public site, and
`http://localhost:5173<VITE_ADMIN_PATH>/login` for the dashboard.

## 4. Deploying everything to Vercel

Vercel runs static frontends and short-lived serverless functions — not
always-on Node servers. So this repo deploys as **two separate Vercel
projects** from the same codebase, each pointed at a different folder:

**Project 1 — the API (`server/`)**
1. In Vercel, "Add New Project," import this repo, and set **Root Directory**
   to `server`.
2. Framework preset: "Other." Vercel will detect `server/api/index.js` as a
   serverless function automatically (routing is handled by
   `server/vercel.json`, already included).
3. Add the backend environment variables from the table above, using your
   *live* `CLIENT_ORIGIN` (you'll fill this in after deploying the client).
4. Deploy. Note the resulting URL, e.g. `https://rk-fusion-api.vercel.app`.

**Project 2 — the website (`client/`)**
1. "Add New Project" again, same repo, **Root Directory** set to `client`.
2. Framework preset: "Vite" (auto-detected).
3. Add the frontend environment variables, with `VITE_API_URL` set to
   `https://rk-fusion-api.vercel.app/api` (your Project 1 URL + `/api`).
4. Deploy. This is the URL you share with visitors.

**Then go back to Project 1** and update `CLIENT_ORIGIN` to your live client
URL (e.g. `https://rkfusion.vercel.app`), so the API's CORS settings allow
requests from it. Redeploy Project 1 after changing it.

A note on Vite + environment variables: they're baked into the build at
build time, not read at runtime. If you change one in the Vercel dashboard
later, trigger a new deployment for it to take effect.

## 5. Content to personalize before launch

- `client/src/components/Contact.jsx` — studio address and hours (currently placeholders)
- `client/src/components/Hero.jsx` / `About.jsx` — headline and philosophy copy
- Upload real photos/videos from the admin dashboard — the gallery shows a friendly empty state until you do

## 6. SEO setup

The site ships with a meta title/description, Open Graph + Twitter share
previews, a `Chiropractic`/`ExerciseGym` structured data block (helps Google
understand it as a real local business — opening hours, address, etc.), a
favicon, `robots.txt`, and `sitemap.xml`. A few things still need your real
details:

- Set `VITE_SITE_URL` (see table above) to your actual domain once you have
  one — it's used for the canonical link and all the share-preview tags.
- `client/index.html` — the JSON-LD block near the bottom of `<head>` has
  placeholder phone number and address; update both to match
  `Contact.jsx` so the two stay consistent.
- Add a real `og-image.jpg` (1200×630px, a clear studio/team photo works
  well) to `client/public/` — this is what shows up as the preview image
  when the link is shared on WhatsApp, Facebook, etc. There's a placeholder
  reference to it in `index.html` already.
- `client/public/robots.txt` and `client/public/sitemap.xml` — replace
  `YOUR_DOMAIN` with your real domain in both files.
- Once live, submit the site in Google Search Console (free) and paste in
  your `sitemap.xml` URL — this is what actually gets you indexed quickly,
  rather than waiting for Google to find it on its own.

This is a single scrolling page, so there's only one URL to optimize — no
per-page meta tags to manage.

## 7. Keeping the admin panel private

- The dashboard route is never linked from the public site — there's no
  button or link pointing to it anywhere.
- It still requires a real login on top of that; the URL alone isn't enough.
- Before deploying, change `VITE_ADMIN_PATH` to something unguessable, and
  use a strong, unique admin password.
- All upload/edit/delete API routes require a valid login token — only
  `GET /api/media` (read-only, used by the public gallery) is open.