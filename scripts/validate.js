import { execFileSync } from 'node:child_process'
import { appendFileSync, writeFileSync } from 'node:fs'
import { checkFileName, checkSource, folder } from '../src/lib/profile-file.js'

const { GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_OUTPUT, PR_NUMBER, PR_AUTHOR, HEAD_SHA } = process.env
const minAccountDays = 30
const author = PR_AUTHOR.toLowerCase()

const github = async (path) => {
    const response = await fetch(`https://api.github.com${path}`, {
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, Accept: 'application/vnd.github+json' },
    })
    if (!response.ok) throw new Error(`GitHub API ${path} returned ${response.status}`)
    return response.json()
}

const changedFiles = async () => {
    const files = []
    for (let page = 1; ; page++) {
        const batch = await github(`/repos/${GITHUB_REPOSITORY}/pulls/${PR_NUMBER}/files?per_page=100&page=${page}`)
        files.push(...batch)
        if (batch.length < 100) return files
    }
}

const readAtHead = (path) => execFileSync('git', ['show', `${HEAD_SHA}:${path}`], { encoding: 'utf8' })

const accountAgeDays = async () => {
    const user = await github(`/users/${PR_AUTHOR}`)
    return (Date.now() - new Date(user.created_at).getTime()) / 86400000
}

const run = async () => {
    const files = await changedFiles()
    const profileFiles = files.filter((file) => file.filename.startsWith(`${folder}/`))
    if (profileFiles.length === 0) return { result: 'skip', problems: [] }

    const expected = `${folder}/${author}.md`
    if (files.length !== 1) {
        return {
            result: 'fail',
            problems: [{ field: 'pull request', message: `Change only one file: \`${expected}\`` }],
        }
    }

    const [file] = files
    const problems = []
    if (file.filename !== expected) {
        problems.push({ field: 'file name', message: `You can only add or edit \`${expected}\`` })
    } else {
        problems.push(...checkFileName(file.filename))
    }
    if (file.status === 'renamed') {
        problems.push({ field: 'file name', message: 'Renaming files is not allowed' })
    }
    if (problems.length === 0 && file.status === 'removed') return { result: 'merge', removed: true, problems: [] }

    if ((await accountAgeDays()) < minAccountDays) {
        problems.push({
            field: 'account',
            message: `GitHub accounts must be at least ${minAccountDays} days old. Please try again later`,
        })
    }
    if (problems.length === 0) problems.push(...checkSource(readAtHead(file.filename)))
    return { result: problems.length ? 'fail' : 'merge', problems }
}

const report = ({ result, removed, problems }) => {
    if (removed) return `### Checks passed\n\nYour profile will be removed from the directory in a few minutes, @${PR_AUTHOR}.`
    if (result === 'merge') {
        return `### Checks passed\n\nThanks @${PR_AUTHOR}! Your profile looks good and will be merged automatically. It will be live on the site in a few minutes.`
    }
    const list = problems.map(({ field, message }) => `- **${field}**: ${message}`).join('\n')
    return `### A few things to fix\n\n${list}\n\nEdit your file on this pull request and the checks will run again. The easiest way is the builder on the site: it creates a valid file for you.`
}

const outcome = await run()
if (outcome.result !== 'skip') writeFileSync('validation.md', report(outcome))
appendFileSync(GITHUB_OUTPUT, `result=${outcome.result}\n`)
console.log(outcome.result, outcome.problems)
