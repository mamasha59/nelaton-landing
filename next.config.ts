const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Современный способ — CSP frame-ancestors
          {
            key: 'Content-Security-Policy',
            value:
              "frame-ancestors 'self' https://www.facebook.com https://web.facebook.com;",
          },
          // (Опционально, X-Frame-Options устаревший и конфликтует с CSP)
          // { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};
 
module.exports = withNextIntl(nextConfig);