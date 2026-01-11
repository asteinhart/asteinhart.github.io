# Zola Port of Austin Steinhart's Portfolio

This is a Zola port of Austin Steinhart's portfolio website.

## Structure

- `config.toml` - Site configuration
- `content/` - All content pages
  - `blog/` - Blog posts section
  - `photos/` - Photography section
- `templates/` - HTML templates
  - `base.html` - Base template
  - `index.html` - Homepage template
  - `blog.html` - Blog list template
  - `blog-page.html` - Individual blog post template
  - `photos.html` - Photos page template
  - `section.html` - Generic section template
  - `page.html` - Generic page template
- `sass/` - SCSS stylesheets
  - `main.scss` - Main styles (converted from style.css)
  - `photo.scss` - Photo gallery styles
- `static/` - Static assets
  - `script.js` - Homepage JavaScript
  - `photos.js` - Photo gallery JavaScript
  - `stories.json` - Project data
  - `images/` - Project images
  - `resume_site.pdf` - Resume PDF

## Development

To run the development server:

```bash
cd zola_port/site
zola serve
```

The site will be available at http://127.0.0.1:1111 (or another port if 1111 is taken).

## Building

To build the site for production:

```bash
cd zola_port/site
zola build
```

The built site will be in the `public/` directory.

## Features Implemented

✅ Converted CSS to SCSS with variables and nesting  
✅ Home page with all original content and functionality  
✅ Photos page with photo gallery  
✅ Blog section with template post  
✅ Responsive design maintained  
✅ All static assets copied over

## Next Steps

- Add more blog posts
- Customize the blog styling if needed
- Set up deployment (GitHub Pages, Netlify, etc.)
- Add navigation menu if desired
