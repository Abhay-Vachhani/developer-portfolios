import { absolute } from '@/lib/href.js'

export const GET = ({ site }) =>
    new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absolute('sitemap.xml', site)}\n`, {
        headers: { 'Content-Type': 'text/plain' },
    })
