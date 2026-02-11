# PWA Icons

This directory contains Progressive Web App icons in various sizes:

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Generating Icons

To generate these icons, you can:
1. Use an online tool like https://realfavicongenerator.net/
2. Use a command-line tool like ImageMagick
3. Create them manually with your preferred design tool

The icons should feature the portfolio logo/branding with the cyberpunk theme colors (cyan #00ffff and magenta #ff00ff).

Example with ImageMagick:
```bash
convert source.png -resize 72x72 icon-72x72.png
convert source.png -resize 96x96 icon-96x96.png
# ... etc for all sizes
```
