# HVT corporate website

Corporate website for **HVT, High Voltage Technology SA (Pty) Ltd**.

It is built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and Lucide icons.

## Run locally

```bash
npm install
npm run dev            # http://localhost:3000
```

Production build:

```bash
npm run build
npm start              # serves the production build on port 3000
```

> On a network drive (such as `A:\` mapped to a share), set `NEXT_DISABLE_FS_CACHE=1` before `dev` or `build`. Turbopack's filesystem cache is very slow over SMB.
> On a machine short of memory, set `NEXT_BUILD_CPUS=1` to build with a single worker.

## Environment variables

Copy `.env.example` to `.env.local` and fill it in.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL for metadata, sitemap and structured data. Defaults to `https://www.hvt.co.za`. |
| `RESEND_API_KEY` | for the form | API key from [Resend](https://resend.com), used to deliver enquiries. |
| `ENQUIRY_FROM_EMAIL` | for the form | Sender address on a domain verified in Resend, e.g. `HVT Website <website@hvt.co.za>`. |
| `ENQUIRY_TO_EMAIL` | optional | Inbox that receives enquiries. Defaults to `info@hvt.co.za`. |

**Enquiry form behaviour.**
- Without `RESEND_API_KEY` and `ENQUIRY_FROM_EMAIL`, `/api/enquiry` returns `503 not_configured`. The form then tells the visitor plainly that the enquiry was **not** sent and offers a pre-filled email and the phone number. It never shows a false success message.
- To switch to another provider (SMTP, a CRM, Microsoft Graph), replace the `fetch` call in `app/api/enquiry/route.ts`.

## Deploy

**Vercel (simplest).**
1. Import the repository.
2. Set the environment variables above.
3. Deploy.

**Any Node 20+ host.**
1. Run `npm ci && npm run build`.
2. Run `npm start` behind a reverse proxy with HTTPS.
3. The rate limiter in `/api/enquiry` is in-memory per instance. Behind several instances, add a shared limiter or a CAPTCHA.

## Project structure

```
app/                     routes (home, about, services/[slug], projects/[slug], quality-safety,
                         social-impact, contact, privacy, image-credits), API route, sitemap, robots, 404
components/layout/       Header (mega menu, sticky), MenuOverlay (full-screen menu), Footer, Logo
components/sections/     Homepage and page sections (Hero, IntroSplit, ServicesGrid, Credentials, ...)
components/forms/        EnquiryForm (client validation, honest delivery states)
components/ui/           Button, SectionHeading, Photo, RevealObserver
lib/site.ts              Company facts, contact details, navigation
lib/services.ts          Service content (from hvt.co.za service pages)
lib/projects.ts          Project content (published facts only)
lib/images.ts            Image registry: HVT photographs vs. labelled illustrative stock, with credits
lib/enquiry.ts           Shared form validation and the mailto fallback
public/images/           Optimised photographs
public/brand/            Logo files, cropped from the supplied artwork in ../Logos
```

To edit content, change the files in `lib/`. The components read from them.

See `HANDOVER.md` for content verification notes and the items HVT needs to confirm.
