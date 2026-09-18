import { z } from 'astro/zod'
import { countries } from './countries.js'
import { links } from './links.js'
import { levels } from './options.js'
import { normalizeTag, tagPattern } from './tags.js'

export const usernamePattern = /^[a-z0-9][a-z0-9-]{0,38}$/

export const limits = {
    name: { min: 2, max: 50 },
    role: { min: 2, max: 40 },
    bio: { min: 20, max: 160 },
    tags: { min: 2, max: 8 },
    tag: { min: 1, max: 25 },
}

export const fieldOrder = [
    'name',
    'role',
    'bio',
    'level',
    'tags',
    'open_to_work',
    'location',
    ...links.map((link) => link.key),
]

const required = (message) => ({
    error: (issue) => (issue.input === undefined ? 'This field is required' : message),
})

const text = ({ min, max }) =>
    z
        .string(required('Must be text'))
        .trim()
        .min(min, `Use at least ${min} characters`)
        .max(max, `Use at most ${max} characters`)

const tag = z
    .string({ error: 'Each tag must be text' })
    .max(limits.tag.max, `Each tag can be at most ${limits.tag.max} characters`)
    .superRefine((value, ctx) => {
        const normalized = normalizeTag(value)
        if (value !== normalized || !tagPattern.test(value)) {
            ctx.addIssue({
                code: 'custom',
                message: normalized ? `Use "${normalized}" instead of "${value}"` : `"${value}" is not a valid tag`,
            })
        }
    })

const httpsUrl = z
    .url({ protocol: /^https$/, error: 'Must be a full https:// link' })
    .refine((value) => !/^https:\/\/(www\.)?github\.com/i.test(value), 'Your GitHub is added automatically')

const linkFields = Object.fromEntries(
    links.map((link) => [
        link.key,
        (link.kind === 'url'
            ? httpsUrl
            : z.coerce.string().regex(link.pattern, `Use only your ${link.label} username, not the full link`)
        ).optional(),
    ]),
)

export const profileSchema = z.strictObject(
    {
        name: text(limits.name),
        role: text(limits.role),
        bio: text(limits.bio)
            .refine((value) => !/[\r\n]/.test(value), 'Keep the bio on one line')
            .refine((value) => !/https?:\/\/|www\./i.test(value), 'Links are not allowed in the bio'),
        level: z.enum(
            levels.map((level) => level.value),
            required(`Use one of: ${levels.map((level) => level.value).join(', ')}`),
        ),
        tags: z
            .array(tag, required('Tags must be a list, like [react, node]'))
            .min(limits.tags.min, `Add at least ${limits.tags.min} tags`)
            .max(limits.tags.max, `Use at most ${limits.tags.max} tags`)
            .refine((value) => new Set(value).size === value.length, 'Tags must not repeat'),
        open_to_work: z.boolean(required('Use true or false')),
        location: z.enum(countries, { error: 'Use a country name in English, like India' }).optional(),
        ...linkFields,
    },
    { error: (issue) => (issue.code === 'unrecognized_keys' ? `Unknown field: ${issue.keys.join(', ')}` : undefined) },
)

export const formatIssues = (error) =>
    error.issues.map((issue) => ({
        field: issue.path.join('.') || 'file',
        message: issue.message,
    }))
