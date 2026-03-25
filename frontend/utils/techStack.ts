const python =
[
    "PYTHON","FLASK.PY", "DJANGO.PY", "PY-CORD.PY", "PANDAS.PY", "NUMPY.PY",
    "MATPLOTLIB.PY", "REFLEX.py", "FASTAPI.PY"
]

const cs = 
[
    'CS', 'C', 'C++', //'NET', 'ASPNET', 'ENTITY FRAMEWORK'
]

const javascript = [ "VUE", "NUXT", "TYPESCRIPT", "REACT", "JAVASCRIPT" ]
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
    ...rationalDB
]

export const techStackMap:Array<{ name: string, codes: string[] }> = 
[
    { name: 'CS', codes: cs },
    { name: 'Markup', codes: markup },
    { name: 'Python', codes: python },
    { name: 'SQL', codes: rationalDB },
    { name: 'Styling', codes: styling },
    //{ name: 'Workflow', codes: workFlow },
    { name: 'JavaScript', codes: javascript },
]
