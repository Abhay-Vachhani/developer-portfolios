import { getCollection } from 'astro:content'
import { levelLabel, roleGroup } from '@/lib/options.js'

export const getProfiles = async () => {
    const entries = await getCollection('portfolios')
    return entries
        .map((entry) => ({ username: entry.id, ...entry.data }))
        .sort((a, b) => a.name.localeCompare(b.name))
}

export const countTags = (profiles) => {
    const counts = new Map()
    profiles.flatMap((profile) => profile.tags).forEach((tag) => counts.set(tag, (counts.get(tag) ?? 0) + 1))
    return [...counts]
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

export const indexableTag = (count) => count >= 3

export const profileTitle = (profile) => `${profile.name}, ${profile.role}`

export const profileSummary = (profile) =>
    [
        `${levelLabel(profile.level)} ${profile.role}`,
        profile.location && `based in ${profile.location}`,
        profile.open_to_work && 'open to work',
    ]
        .filter(Boolean)
        .join(', ')

export const filterData = (profile) => ({
    'data-search': [profile.name, profile.username, profile.role, ...profile.tags].join(' ').toLowerCase(),
    'data-role': roleGroup(profile.role),
    'data-level': profile.level,
    'data-tags': profile.tags.join(' '),
    'data-location': profile.location ?? '',
    'data-open': String(profile.open_to_work),
})
