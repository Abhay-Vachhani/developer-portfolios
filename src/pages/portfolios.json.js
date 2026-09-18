import { getProfiles } from '@/lib/profiles.js'

export const GET = async () => Response.json(await getProfiles())
