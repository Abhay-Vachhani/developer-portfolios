import { readdirSync, readFileSync } from 'node:fs'
import { checkFileName, checkSource, folder } from '../src/lib/profile-file.js'

const entries = readdirSync(folder, { withFileTypes: true }).filter((entry) => !entry.name.startsWith('.'))
const failures = entries
    .map((entry) => {
        const path = `${folder}/${entry.name}`
        if (!entry.isFile()) return { path, problems: [{ field: 'file', message: 'Folders are not allowed here' }] }
        const nameProblems = checkFileName(path)
        return { path, problems: nameProblems.length ? nameProblems : checkSource(readFileSync(path, 'utf8')) }
    })
    .filter(({ problems }) => problems.length)

failures.forEach(({ path, problems }) => {
    console.error(`\n${path}`)
    problems.forEach(({ field, message }) => console.error(`  - ${field}: ${message}`))
})

console.log(`\nChecked ${entries.length} profile files, ${failures.length} with problems.`)
process.exitCode = failures.length ? 1 : 0
