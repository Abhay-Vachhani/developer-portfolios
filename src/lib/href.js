const base = import.meta.env.BASE_URL.replace(/\/$/, '')

export const href = (path = '') => `${base}/${path.replace(/^\//, '')}`

export const absolute = (path, site) => new URL(href(path), site).toString()

export const avatarUrl = (username, size = 160) => `https://github.com/${username}.png?size=${size}`

export const githubUrl = (username) => `https://github.com/${username}`
