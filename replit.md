# Sarbala.Studio

A static HTML/CSS/JS website for Sarbala.Studio.

## Project Structure

- `index.html` — Main landing page
- `DooDol.html`, `fazaei.html`, `Panshta.html`, `TaSoraya.html` — Subpages
- `css/` — Stylesheets (grid.css, styles.css)
- `js/` — JavaScript files (main.js, essential.js, f1.js, jquery.nice-select.min.js)
- `images/` — Image assets (SVGs, PNGs)
- `songs/` — Music-related page and assets
- `mini_icons/` — Favicon and app icons
- `loaders/` — Loading animation assets
- `server.js` — Simple Node.js static file server for development

## Running Locally

The app is served via a Node.js static file server on port 5000:

```
node server.js
```

## Deployment

Configured as a static deployment. The root directory (`.`) is the public directory.
