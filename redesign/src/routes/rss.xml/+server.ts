import { siteConfig } from "$lib/config/site";
import { POSTS } from "$lib/posts.js";

export const prerender = true;

// POSTS is already merged (native + external) and sorted newest-first.
function getPosts() {
    return POSTS;
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
    const posts = getPosts();
    const baseUrl = siteConfig.url;
    // Native posts have site-relative URLs ("/blog/foo"); external ones are absolute.
    const absoluteUrl = (url: string) => (url.startsWith("http") ? url : `${baseUrl}${url}`);

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
            <title>${escapeXml(post.title)}</title>${
                    post.description
                        ? `
            <description>${escapeXml(post.description)}</description>`
                        : ""
                }
            <link>${escapeXml(absoluteUrl(post.url))}</link>
            <guid isPermaLink="true">${escapeXml(absoluteUrl(post.url))}</guid>
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
