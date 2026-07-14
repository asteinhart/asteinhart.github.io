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

// Escape XML special characters
function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export const GET = async () => {
    const posts = await getPosts();
    const baseUrl = siteConfig.url;

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>${escapeXml(siteConfig.name)}</title>
        <description>${escapeXml(siteConfig.description)}</description>
        <link>${baseUrl}</link>
        <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        <language>en</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${posts
            .map(
                (post) => `        <item>
            <title>${escapeXml(post.title)}</title>
            <description>${escapeXml(post.description)}</description>
            <link>${baseUrl}/blog/${post.slug}</link>
            <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            ${post.tags ? post.tags.map((tag: string) => `<category>${escapeXml(tag)}</category>`).join("\n            ") : ""}
        </item>`
            )
            .join("\n")}
    </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "max-age=0, s-maxage=3600",
        },
    });
};