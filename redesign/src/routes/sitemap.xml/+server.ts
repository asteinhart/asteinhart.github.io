import { siteConfig } from "$lib/config/site";
import { POSTS } from "$lib/posts.js";

export const prerender = true;

// Static site pages. External blog entries live on other sites and are surfaced
// via rss.xml; native Markdown posts are added below.
const pages = [
    { path: "", changefreq: "weekly", priority: "1.0" },
    { path: "/projects", changefreq: "monthly", priority: "0.9" },
    { path: "/blog", changefreq: "weekly", priority: "0.9" },
    { path: "/links", changefreq: "monthly", priority: "0.7" },
    { path: "/photos", changefreq: "monthly", priority: "0" },
    // Native posts authored on this site (external write-ups are excluded).
    ...POSTS.filter((p) => !p.external).map((p) => ({
        path: p.url,
        changefreq: "monthly",
        priority: "0.8",
    })),
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
