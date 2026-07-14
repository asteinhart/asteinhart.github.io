import { siteConfig } from "$lib/config/site";
export const prerender = true;


async function getPosts() {
    const paths = import.meta.glob("/src/posts/*.md", { eager: true });

    const posts = Object.entries(paths).map(([path, file]: [string, any]) => {
        const slug = path.split("/").at(-1)?.replace(".md", "");
        const metadata = file.metadata;
        return { slug, ...metadata };
    });

    return posts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
}

export const GET = async () => {
    const posts = await getPosts();
    const baseUrl = siteConfig.url;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>${baseUrl}/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>${baseUrl}/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    ${posts
            .map(
                (post) => `    <url>
        <loc>${baseUrl}/blog/${post.slug}</loc>
        <lastmod>${new Date(post.date).toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
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