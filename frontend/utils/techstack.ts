const python =
[
    "FLASK.py", "DJANGO.py", "PY-CORD.py", "PANDAS.py", "NUMPY.py",
    "MATPLOTLIB.py",
]

const cs = 
[
    'CS', 'C', 'C++', 'NET', 'ASPNET', 'ENTITY FRAMEWORK'
]
const javascript =
[
    "VUE.JS", "NUXT.JS", "REACT.JS", "TYPESCRIPT.JS", "JAVASCRIPT"
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
    { name: 'JavaScript', codes: javascript },
    { name: 'Workflow', codes: workFlow },
]
