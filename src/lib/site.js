export const site = {
    name: 'Developer Portfolios',
    title: 'Developer Portfolios - an open directory of developers',
    description:
        'An open, community-built directory of developers. Find developers by role, skill, level and country, see their portfolios, or add your own profile for free.',
    repository: import.meta.env.PUBLIC_REPOSITORY,
    branch: 'master',
    folder: 'portfolios',
}

export const googleVerification = 'fJhZX0oQnmoFkkU0icXnGvDi37RmV5cKEXs2ePmYSAc'

export const repoUrl = `https://github.com/${site.repository}`

export const newFileUrl = (username, content) =>
    `${repoUrl}/new/${site.branch}?${new URLSearchParams({ filename: `${site.folder}/${username}.md`, value: content })}`

export const editFileUrl = (username) => `${repoUrl}/edit/${site.branch}/${site.folder}/${username}.md`

export const deleteFileUrl = (username) => `${repoUrl}/delete/${site.branch}/${site.folder}/${username}.md`

export const removalUrl = `${repoUrl}/issues/new?${new URLSearchParams({ template: 'removal.yml', title: 'Removal request' })}`

export const reportUrl = (username) =>
    `${repoUrl}/issues/new?${new URLSearchParams({ template: 'report.yml', title: `Report @${username}` })}`
