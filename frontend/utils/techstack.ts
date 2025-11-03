const python =
[
    "FLASK.PY", "DJANGO.PY", "PY-CORD.PY", "PANDAS.PY", "NUMPY.PY",
    "MATPLOTLIB.PY",
]

const cs = 
[
    'CS', 'C', 'C++', 'NET', 'ASPNET', 'ENTITY FRAMEWORK'
]
const TypeScript =
[
    "VUE.TS", "NUXT.TS", "REACT.TS", "TYPESCRIPT"
]
const javascript =
[
    "VUE.JS", "JAVASCRIPT"
]
const workFlow =
[
    'CMS', 'GITHUB', 'SASS', 'AGILE', 'GIT'
]

const rationalDB =
[
    "MSSQL", "MYSQL", "SQLITE", "POSTGRESQL", "MARIADB"
]

const styling = [
    'CSS', 'BOOTSTRAP'
]
const markup =
[
    "MARKDOWN", "LATEX", "HTML"
]

export const techStack:string[] = 
[
    ...cs,
    ...python,
    ...markup,
    ...styling,
    ...workFlow,
    ...javascript,
    ...rationalDB,
    ...TypeScript
]

export const techStackMap:Array<{ name: string, codes: string[] }> = 
[
    { name: 'CS', codes: cs },
    { name: 'Markup', codes: markup },
    { name: 'Python', codes: python },
    { name: 'Styling', codes: styling },
    { name: 'Workflow', codes: workFlow },
    { name: 'TypeScript', codes: TypeScript },
    { name: 'JavaScript', codes: javascript },
    { name: 'Rational-DB', codes: rationalDB },
]
