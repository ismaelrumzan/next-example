const {
  createHash,
} = require('crypto');

require('dotenv')
  .config();

const dev = process.env.RELEASE_TYPE !== 'production';
const local = process.env.RELEASE_TYPE === 'localhost';


function getDomain() {
  if (dev) return 'falcn.dev *.falcn.dev';

  return 'falcn.io *.falcn.io';
}


function getCsp() {
  const domain = getDomain();

  let csp = '';
  csp += "default-src 'self'; ";
  csp += "base-uri 'none'; ";
  csp += "frame-ancestors 'none'; ";
  csp += "form-action 'none'; ";
  csp += `manifest-src 'self' ${domain}; `;
  csp += `img-src 'self' ${domain}  `;
  csp += `prefetch-src 'self' ${domain} `;
  csp += `script-src-elem 'self' ${domain}  `;
  csp += `script-src 'self' ${domain} `;

  if (local) {
    csp += " 'unsafe-eval'; ";
  } else {
    csp += '; ';
  }

  csp += `connect-src 'self' ${domain} `;
  csp += `font-src 'self' ${domain} `;
  csp += `style-src 'unsafe-inline' 'self' ${domain} `;
  csp += `frame-src 'self' ${domain} `;
  csp += `media-src 'self' ${domain}; `;
  csp += `object-src 'none';`;
  return csp;
}

const csp = getCsp();

const nextConfig = {
  target: 'serverless',
  future: {
    webpack5: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
      },
    ];
  },
  i18n: {
    locales: [
      'en-au',
      'en-AU',
      'en-nz',
      'en-NZ',
      'en-gb',
      'en-GB',
    ],
    defaultLocale: 'en-au',
  },
};

module.exports = nextConfig;
