# FieldDesk

Electrical and HVAC field calculators on one site.

- Motor circuit sizing from the published NEC full-load table
- Voltage drop, dwelling service estimate, and wire ampacity
- HVAC room-load screen, supply CFM, and equal-friction duct size

These are screening sheets, not permit calculations.

## Scripts

```bash
npm install
npm run dev
```

## Cloudflare Pages

Connect this repo. Use these build settings:

- Production branch: main
- Build command: npm run build
- Build output directory: dist/client
- Node version: 22

Leave the custom domain for later. Pages will issue a pages.dev address. When the domain is ready, add fielddesk.site and redirect fielddesk.cc to it.
