# Public Assets Directory

This directory contains static assets that are served directly by Next.js.

## Structure

```
public/
├── images/          # Image assets
│   ├── logo/       # Logo variations
│   ├── icons/      # Icon files
│   ├── hero/       # Hero section images
│   └── social/     # Social media images
├── favicon.ico     # Site favicon
├── robots.txt      # Search engine crawler rules
└── sitemap.xml     # Site map for SEO (generated)
```

## Usage

- Files in the `public` directory can be referenced from the root URL `/`
- Example: `public/images/logo.png` → `/images/logo.png`
- These files are served statically without processing

## Image Guidelines

- Use WebP format for better compression when possible
- Provide fallback formats (JPEG/PNG) for compatibility
- Optimize images before adding (use tools like TinyPNG)
- Include alt text for accessibility

## Important Notes

- Don't store sensitive information in this directory
- All files here are publicly accessible
- Large files should be served from a CDN instead