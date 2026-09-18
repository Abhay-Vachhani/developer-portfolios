export const links = [
    {
        key: 'portfolio',
        label: 'Portfolio',
        kind: 'url',
        placeholder: 'https://your-site.dev',
    },
    {
        key: 'blog',
        label: 'Blog',
        kind: 'url',
        placeholder: 'https://blog.your-site.dev',
    },
    {
        key: 'linkedin',
        label: 'LinkedIn',
        kind: 'handle',
        pattern: /^[A-Za-z0-9-]{3,100}$/,
        extract: /linkedin\.com\/in\/([^/?#]+)/i,
        toUrl: (handle) => `https://www.linkedin.com/in/${handle}`,
        placeholder: 'linkedin.com/in/your-name',
    },
    {
        key: 'x',
        label: 'X',
        kind: 'handle',
        pattern: /^[A-Za-z0-9_]{1,15}$/,
        extract: /(?:x|twitter)\.com\/([^/?#]+)/i,
        toUrl: (handle) => `https://x.com/${handle}`,
        placeholder: 'x.com/your-name',
    },
    {
        key: 'devto',
        label: 'DEV',
        kind: 'handle',
        pattern: /^[A-Za-z0-9_]{1,30}$/,
        extract: /dev\.to\/([^/?#]+)/i,
        toUrl: (handle) => `https://dev.to/${handle}`,
        placeholder: 'dev.to/your-name',
    },
    {
        key: 'medium',
        label: 'Medium',
        kind: 'handle',
        pattern: /^[A-Za-z0-9_.]{1,30}$/,
        extract: /medium\.com\/@([^/?#]+)/i,
        toUrl: (handle) => `https://medium.com/@${handle}`,
        placeholder: 'medium.com/@your-name',
    },
    {
        key: 'youtube',
        label: 'YouTube',
        kind: 'handle',
        pattern: /^[A-Za-z0-9_.-]{3,30}$/,
        extract: /youtube\.com\/@([^/?#]+)/i,
        toUrl: (handle) => `https://www.youtube.com/@${handle}`,
        placeholder: 'youtube.com/@your-channel',
    },
    {
        key: 'stackoverflow',
        label: 'Stack Overflow',
        kind: 'handle',
        pattern: /^[0-9]{1,10}$/,
        extract: /stackoverflow\.com\/users\/([0-9]+)/i,
        toUrl: (handle) => `https://stackoverflow.com/users/${handle}`,
        placeholder: 'stackoverflow.com/users/123456',
    },
    {
        key: 'leetcode',
        label: 'LeetCode',
        kind: 'handle',
        pattern: /^[A-Za-z0-9_-]{1,30}$/,
        extract: /leetcode\.com\/(?:u\/)?([^/?#]+)/i,
        toUrl: (handle) => `https://leetcode.com/u/${handle}`,
        placeholder: 'leetcode.com/u/your-name',
    },
    {
        key: 'codepen',
        label: 'CodePen',
        kind: 'handle',
        pattern: /^[A-Za-z0-9_-]{1,40}$/,
        extract: /codepen\.io\/([^/?#]+)/i,
        toUrl: (handle) => `https://codepen.io/${handle}`,
        placeholder: 'codepen.io/your-name',
    },
    {
        key: 'dribbble',
        label: 'Dribbble',
        kind: 'handle',
        pattern: /^[A-Za-z0-9_-]{1,40}$/,
        extract: /dribbble\.com\/([^/?#]+)/i,
        toUrl: (handle) => `https://dribbble.com/${handle}`,
        placeholder: 'dribbble.com/your-name',
    },
    {
        key: 'npm',
        label: 'npm',
        kind: 'handle',
        pattern: /^[a-z0-9][a-z0-9._-]{0,49}$/,
        extract: /npmjs\.com\/~([^/?#]+)/i,
        toUrl: (handle) => `https://www.npmjs.com/~${handle}`,
        placeholder: 'npmjs.com/~your-name',
    },
]

export const extractHandle = (link, value) => {
    const input = String(value).trim()
    const match = link.extract?.exec(input)
    return (match ? match[1] : input).replace(/^@/, '')
}

export const linkUrl = (link, value) => (link.kind === 'url' ? value : link.toUrl(value))

export const profileLinks = (data) =>
    links
        .filter((link) => data[link.key] !== undefined)
        .map((link) => ({ ...link, url: linkUrl(link, data[link.key]) }))
