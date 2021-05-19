# next-example - header not being applied on root route when locale is enabled

## Original Issue:

 - localhost:3000/ does not show the CSP response header
 - localhost:3000/page2 shows it fine

Next, remove i18n config items from next.config.js, then re-start server.
- localhost:3000 & localhost:3000/page2 now show header fine

## Issue Fixed:
Based on this [NextJS documentation](https://nextjs.org/docs/api-reference/next.config.js/headers#headers-with-i18n-support), it seems that to make a specific route be connected with a header without the normal automatic re-direction of the locale such as `/` to `/en-US/`, one need to add `locale: false` for that specific header.
Updated Next config file includes the following in the headers export to catch the `/` route.
```      
{
        source: '/(.*)',
        locale: false,
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp,
          },
        ],
}
```
