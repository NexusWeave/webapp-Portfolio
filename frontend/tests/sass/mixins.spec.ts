import { describe, it } from 'vitest'
import { runSass } from 'sass-true'
import path from 'path'
import { fileURLToPath } from 'url'

import { NodePackageImporter } from 'sass'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sassFile = path.join(__dirname, 'mixins.test.scss')

describe('Sass Mixins', () => {
  runSass({ describe, it }, sassFile, {
    importers: [new NodePackageImporter()],
    loadPaths: [path.join(__dirname, '../../node_modules')],
  })
})
