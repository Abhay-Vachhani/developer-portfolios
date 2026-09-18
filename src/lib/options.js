export const levels = [
    { value: 'student', label: 'Student' },
    { value: 'junior', label: 'Junior' },
    { value: 'mid', label: 'Mid-level' },
    { value: 'senior', label: 'Senior' },
    { value: 'lead', label: 'Lead' },
]

export const levelLabel = (value) => levels.find((level) => level.value === value)?.label

export const roles = [
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'Mobile Developer',
    'Software Engineer',
    'Web Developer',
    'Game Developer',
    'Embedded Engineer',
    'DevOps Engineer',
    'Cloud Engineer',
    'Site Reliability Engineer',
    'Security Engineer',
    'Data Engineer',
    'Data Scientist',
    'Machine Learning Engineer',
    'AI Engineer',
    'QA Engineer',
    'Blockchain Developer',
    'Design Engineer',
    'Developer Advocate',
    'Engineering Manager',
]

export const otherRole = 'Other'

export const roleGroup = (role) => (roles.includes(role) ? role : otherRole)
