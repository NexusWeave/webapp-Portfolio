const python =
[
    "FLASK.PY", "DJANGO.PY", "PY-CORD.PY", "PANDAS.PY", "NUMPY.PY",
    "MATPLOTLIB.PY",
]

const cs = 
[
    'CS', 'C', 'C++', 'NET', 'ASPNET', 'ENTITY FRAMEWORK'
]
const javascript =
[
    "VUE.TS", "NUXT.TS", "REACT.TS", "TYPESCRIPT", "JAVASCRIPT"
]

const workFlow =
[
    'CMS', 'GITHUB', 'SASS', 'AGILE', 'GIT'
]

const databases =
[
    "MSSQL", "MYSQL", "SQLITE",
    "MONGODB", "POSTGRESQL", 'NOSQL'
]

const frontend = [
    'CSS', 'HTML', 'BOOTSTRAP'
]

export const techStack:string[] = 
[
    ...python,
    ...cs,
    ...workFlow,
    ...frontend, 
    ...databases,
    ...javascript
  
]

export const techStackMap:Array<{ name: string, codes: string[] }> = 
[
    { name: 'CS', codes: cs },
    { name: 'Python', codes: python },
    { name: 'SQL', codes: databases },
    { name: 'Frontend', codes: frontend },
    { name: 'TypeScript', codes: javascript },
    { name: 'Workflow', codes: workFlow },
]
