/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://app.firstaidforads.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/']
      }
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_APP_URL || 'https://app.firstaidforads.com'}/sitemap.xml`,
    ]
  },
  exclude: [
    '/api/*',
    '/admin/*',
    '/dashboard/*',
    '/server-sitemap.xml'
  ],
  generateIndexSitemap: false,
  outDir: './public',
}