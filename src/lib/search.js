export const rank = (label, query) => {
    const text = label.toLowerCase()
    if (!query) return 3
    if (text === query) return 0
    if (text.startsWith(query)) return 1
    if (text.split(/[\s-]/).some((word) => word.startsWith(query))) return 2
    return text.includes(query) ? 3 : -1
}

export const sortMatches = (items, query, label) =>
    items
        .map((item, order) => ({ item, order, score: rank(label(item), query) }))
        .filter(({ score }) => score >= 0)
        .sort((a, b) => a.score - b.score || (query ? label(a.item).length - label(b.item).length : 0) || a.order - b.order)
        .map(({ item }) => item)

export const highlight = (element, label, query) => {
    const start = query ? label.toLowerCase().indexOf(query) : -1
    if (start < 0) {
        element.textContent = label
        return
    }
    const strong = document.createElement('strong')
    strong.className = 'font-semibold text-primary'
    strong.textContent = label.slice(start, start + query.length)
    element.replaceChildren(label.slice(0, start), strong, label.slice(start + query.length))
}
