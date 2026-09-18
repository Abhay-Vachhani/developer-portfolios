import { absolute } from '@/lib/href.js'
import { countTags, getProfiles, indexableTag } from '@/lib/profiles.js'

export const GET = async ({ site }) => {
    const profiles = await getProfiles()
    const paths = [
        '',
        'add/',
        'tags/',
        'how-it-works/',
        'privacy/',
        ...countTags(profiles)
            .filter(({ count }) => indexableTag(count))
            .map(({ tag }) => `tags/${tag}/`),
        ...profiles.map((profile) => `@${profile.username}/`),
    ]
    const urls = paths.map((path) => `    <url><loc>${absolute(path, site)}</loc></url>`).join('\n')
    const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
    return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}
