// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    site: process.env.SITE_URL,
    base: process.env.BASE_PATH,
    fonts: [
        {
            provider: fontProviders.google(),
            name: 'Poppins',
            cssVariable: '--font-poppins',
            weights: [400, 500, 600, 700],
            styles: ['normal'],
            fallbacks: ['sans-serif'],
        },
        {
            provider: fontProviders.google(),
            name: 'Space Mono',
            cssVariable: '--font-space-mono',
            weights: [400, 700],
            styles: ['normal'],
            fallbacks: ['monospace'],
        },
    ],
    markdown: {
        syntaxHighlight: false,
    },
    security: {
        csp: {
            directives: [
                "default-src 'self'",
                "img-src 'self' data: https://github.com https://avatars.githubusercontent.com",
                "connect-src 'self' https://api.github.com",
                "font-src 'self'",
                "object-src 'none'",
                "base-uri 'self'",
                "form-action 'self'",
            ],
        },
    },
    vite: {
        plugins: [tailwindcss()],
    },
})
