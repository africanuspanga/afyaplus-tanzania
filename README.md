# AfyaPlus Tanzania — website

Static website for AfyaPlus Tanzania (English at `/`, Kiswahili at `/sw/`). No build step, no server code.

- **Vercel:** import this repo, Framework Preset "Other", leave build and install commands empty. `vercel.json` sets the security headers and asset caching.
- **cPanel / any host:** upload everything in this folder to the web root.
- **Domain:** pages, `sitemap.xml` and `robots.txt` assume `https://www.afyaplus.co.tz/`. Change it in the site source if the domain differs.

The enquiry form and consultation bar open WhatsApp (+255 683 178 299) with the visitor's message filled in; nothing is stored on the site.

Photos: Unsplash (free licence), credits in `assets/img/PHOTO-CREDITS.md`. Font: Plus Jakarta Sans (SIL OFL), `assets/fonts/OFL.txt`.
