// @vitest-environment node
import { describe, it } from 'vitest'
import { runSass } from 'sass-true'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sassFile = path.join(__dirname, 'mixins.test.scss')

describe('Sass Mixins', () => {
  runSass({ describe, it }, sassFile, {
    importers: [{
      findFileUrl(url) {
        if (url === 'lumina-sass') {
          return pathToFileURL(path.join(__dirname, '../../node_modules/lumina-sass/src/_index.sass'))
        }
        if (url.startsWith('lumina-sass/')) {
          const module = url.split('/')[1]
          return pathToFileURL(path.join(__dirname, `../../node_modules/lumina-sass/src/${module}/_index.sass`))
        }
        return null
      }
    }],
    loadPaths: [path.join(__dirname, '../../node_modules')],
  })
})
