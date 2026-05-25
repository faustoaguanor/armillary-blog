import { getCollection } from "astro:content";
import { site } from "../consts";

export async function GET() {
  const posts = await getCollection("posts");
  const sorted = posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
  const body = sorted
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <description><![CDATA[${post.data.description || ""}]]></description>
      <link>${site}/blog/${post.slug}/</link>
      <guid>${site}/blog/${post.slug}/</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>ARMILLARY</title>
        <description>Geospatial Analysis · Data Science · GIS Development</description>
        <link>${site}</link>
        <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml"/>
        ${body}
      </channel>
    </rss>`,
    {
      headers: { "Content-Type": "application/rss+xml" },
    }
  );
}
