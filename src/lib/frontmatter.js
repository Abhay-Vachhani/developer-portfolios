import { fieldOrder } from './schema.js'

const reserved = /^(true|false|yes|no|on|off|null|~)$/i
const plain = /^[A-Za-z][A-Za-z0-9 ._()/-]*$/

const scalar = (value) => {
    if (typeof value === 'boolean') return String(value)
    const text = String(value)
    return plain.test(text) && !reserved.test(text) && !/\s$/.test(text) ? text : JSON.stringify(text)
}

const yamlValue = (value) => (Array.isArray(value) ? `[${value.map(scalar).join(', ')}]` : scalar(value))

export const toMarkdown = (data) => {
    const lines = fieldOrder
        .filter((key) => data[key] !== undefined && data[key] !== '' && data[key]?.length !== 0)
        .map((key) => `${key}: ${yamlValue(data[key])}`)
    return `---\n${lines.join('\n')}\n---\n`
}
