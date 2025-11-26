import { getPublishedPosts } from '@/lib/blog-utils';

export async function GET() {
  const posts = getPublishedPosts().slice(0, 50); // Latest 50 posts
  const baseUrl = 'https://nornex.no';
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Nornex Blogg</title>
    <link>${baseUrl}/blogg</link>
    <description>Artikler om IT-sikkerhet, skyløsninger og teknologi fra Nornex.</description>
    <language>nb-NO</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blogg/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/images/logo.png</url>
      <title>Nornex Blogg</title>
      <link>${baseUrl}/blogg</link>
    </image>
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blogg/${post.category.slug}/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blogg/${post.category.slug}/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>${post.author.email} (${post.author.name})</author>
      <category>${post.category.name}</category>
      ${post.tags.map(tag => `<category>${tag.name}</category>`).join('\n      ')}
    </item>`).join('')}
  </channel>
</rss>`;
  
  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
