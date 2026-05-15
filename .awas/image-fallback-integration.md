# AWAS Image Fallback — Integration Guide

## What was added

- `static/js/image-fallback.js` — retry + placeholder fallback for all `<img>` tags
- `static/images/product-placeholder.png` — replace with a branded placeholder

## Required: add the script to your base template

In your HTML base template (e.g. `templates/base.html`), add before `</body>`:

```html
<script src="/static/js/image-fallback.js"></script>
```

## How it works

1. When any `<img>` fails to load, the script retries up to 2 times (3s apart)
2. After retries exhausted, swaps to `/static/images/product-placeholder.png`
3. Applies to both existing and dynamically added images (MutationObserver)

## Replace the placeholder

Replace `static/images/product-placeholder.png` with a real branded image
(recommended: 400×400px, shows product category silhouette or brand logo).
