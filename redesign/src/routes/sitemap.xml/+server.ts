import { siteConfig } from "$lib/config/site";

export const prerender = true;

// Site pages to include in the sitemap. Blog entries link out to external
// sites (see $lib/blogs.js), so they are surfaced via rss.xml rather than here.
const pages = [
    { path: "", changefreq: "weekly", priority: "1.0" },
    { path: "/projects", changefreq: "monthly", priority: "0.9" },
    { path: "/blog", changefreq: "weekly", priority: "0.9" },
    { path: "/links", changefreq: "monthly", priority: "0.7" },
    { path: "/photos", changefreq: "monthly", priority: "0" },
];

export const GET = async () => {
    const baseUrl = siteConfig.url;
    const lastmod = new Date().toISOString();

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
        .map(
            (page) => `    <url>
        <loc>${baseUrl}${page.path}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`
        )
        .join("\n")}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "max-age=0, s-maxage=3600",
        },
    });
};
