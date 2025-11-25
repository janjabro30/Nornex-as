/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://nornex.no',
  generateRobotsTxt: false, // We have a custom robots.txt
  generateIndexSitemap: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*'],
  alternateRefs: [
    {
      href: 'https://nornex.no',
      hreflang: 'nb',
    },
    {
      href: 'https://nornex.no/en',
      hreflang: 'en',
    },
  ],
  transform: async (config, path) => {
    // Custom priority for different pages
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/services')) {
      priority = 0.9;
      changefreq = 'weekly';
    } else if (path.startsWith('/blog')) {
      priority = 0.8;
      changefreq = 'daily';
    } else if (path === '/contact' || path === '/pricing') {
      priority = 0.8;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => [
    // Static paths
    await config.transform(config, '/'),
    await config.transform(config, '/services'),
    await config.transform(config, '/services/managed-it'),
    await config.transform(config, '/services/cybersecurity'),
    await config.transform(config, '/services/cloud'),
    await config.transform(config, '/services/support'),
    await config.transform(config, '/services/network'),
    await config.transform(config, '/services/repair'),
    await config.transform(config, '/about'),
    await config.transform(config, '/pricing'),
    await config.transform(config, '/contact'),
    await config.transform(config, '/blog'),
    // English versions
    await config.transform(config, '/en'),
    await config.transform(config, '/en/services'),
    await config.transform(config, '/en/about'),
    await config.transform(config, '/en/pricing'),
    await config.transform(config, '/en/contact'),
    await config.transform(config, '/en/blog'),
  ],
};
