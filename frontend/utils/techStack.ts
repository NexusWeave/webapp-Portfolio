const c = ["c", "cp", "C++"]
const styling = ["css", "bootstrap"]
const cs = ["cs", "dotnet", "aspnet", "entity framework"]
const markup = ["markdown", "latex", "html", "liquid", "nunjucks"]
const workFlow = ["tinacms", "sass", "agile", "git", "decapcms", "cms"]
const internal = ["webapp", "nexus", "vupy", "console", "codealong", "fiveem", "cli", "py"]
const javascript = ["vue", "nuxt", "typescript", "react", "javascript", "js", "ts"]
const rationalDB = ["mssql", "mysql", "sqlite", "postgresql", "mariadb", "sql", "database"]
const python = ["python", "flask", "django", "py-cord", "pandas", "numpy", "matplotlib", "reflex", "fastapi", "jupyter", "cython", "py"]
const misc = ["batchfile", "dockerfile", "fortran", "hack", "jinja", "makefile", "meson", "go", "lua", "php", "powershell", "roff", "scratch", "shell", "smarty"]



export const techStack: string[] = [...c, ...cs, ...python, ...markup, ...styling, ...workFlow, ...javascript, ...rationalDB]
export const validIcons: string[] = [...techStack, ...misc]
export const forbiddenWords: string[] = [...validIcons, ...internal]

export const techStackMap: Array<{ name: string, codes: string[] }> = 
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
