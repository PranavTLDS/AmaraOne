# AMARA ONE — Sandhatri Group

Static rebuild of the AMARA ONE Framer site (Home, About, Model Flat/Interior, Amenities, Gallery, Contact).

## Edit
- Page content: `src/pages/*.html`
- Shared header, enquiry form and footer: `src/partials/*.html`
- Styles: `assets/css/style.css` · Scripts: `assets/js/main.js`

After editing anything in `src/`, rebuild the root HTML files:

```bash
python3 build.py
```

## Preview

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080.

## Notes
- The enquiry form opens the visitor's email client addressed to sandhatrijv@gmail.com. To store submissions instead, point the form at a backend or a form service (Formspree, Netlify Forms, etc.).
- The hero videos in `assets/video/` are the original Framer files (85–140 MB each). Compress them before deploying.
- Social links in the footer are `#` placeholders, the same as on the live site.
