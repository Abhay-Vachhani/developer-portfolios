import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { profileSchema, usernamePattern } from '@/lib/schema.js'

const portfolios = defineCollection({
    loader: glob({
        base: './portfolios',
        pattern: '*.md',
        generateId: ({ entry }) => {
            const username = entry.replace(/\.md$/, '')
            if (!usernamePattern.test(username)) {
                throw new Error(`portfolios/${entry}: the file name must be your GitHub username in lowercase`)
            }
            return username
        },
    }),
    schema: profileSchema,
})

export const collections = { portfolios }
