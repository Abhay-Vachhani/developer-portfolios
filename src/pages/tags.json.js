import { countTags, getProfiles } from '@/lib/profiles.js'

export const GET = async () => Response.json(countTags(await getProfiles()))
