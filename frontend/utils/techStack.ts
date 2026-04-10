const python =
[
    "PYTHON","FLASK", "DJANGO", "PY-CORD", "PANDAS", "NUMPY",
    "MATPLOTLIB", "REFLEX", "FASTAPI"
]

const c = ['C', 'C++']
const cs = 
[
    'CS', 'DOTNET', 'ASPNET', 'ENTITY FRAMEWORK'
]

const javascript = [ "VUE", "NUXT", "TYPESCRIPT", "REACT", "JAVASCRIPT" ]
const workFlow =
[
    'DECAPCMS', 'TinaCMS', 'SASS', 'AGILE', 'GIT'
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

export const techStack:string[] = [ ...c, ...cs, ...python, ...markup, ...styling, ...workFlow, ...javascript, ...rationalDB ]

export const techStackMap:Array<{ name: string, codes: string[] }> = 
[
    { name: 'CS', codes: cs },
    { name: 'C/C++', codes: c },
    { name: 'Markup', codes: markup },
    { name: 'Python', codes: python },
    { name: 'SQL', codes: rationalDB },
    { name: 'Styling', codes: styling },
    { name: 'Workflow', codes: workFlow },
    { name: 'JavaScript', codes: javascript },
]
