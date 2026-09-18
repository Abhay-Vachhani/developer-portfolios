import { parseFrontmatter } from 'astro/markdown'
import { formatIssues, profileSchema, usernamePattern } from './schema.js'

export const folder = 'portfolios'

export const checkFileName = (filename) => {
    const match = /^portfolios\/([^/]+)\.md$/.exec(filename)
    if (!match) return [{ field: 'file name', message: 'Profiles must be Markdown files directly inside `portfolios/`' }]
    return usernamePattern.test(match[1])
        ? []
        : [{ field: 'file name', message: 'The file name must be your GitHub username in lowercase, like `octocat.md`' }]
}

export const checkSource = (source) => {
    if (!source.startsWith('---')) return [{ field: 'file', message: 'The file must start with `---` frontmatter' }]
    let parsed
    try {
        parsed = parseFrontmatter(source)
    } catch (error) {
        return [{ field: 'file', message: `The frontmatter is not valid YAML: ${error.reason ?? error.message}` }]
    }
    const problems = parsed.content.trim()
        ? [{ field: 'file', message: 'Only the fields between the `---` lines are allowed, remove the text below them' }]
        : []
    const result = profileSchema.safeParse(parsed.frontmatter ?? {})
    return result.success ? problems : [...problems, ...formatIssues(result.error)]
}
