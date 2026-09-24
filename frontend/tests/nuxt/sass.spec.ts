import path from 'path';
import * as sass from 'sass';
import { fileURLToPath } from 'url';
import { runSass } from 'sass-true';
import { describe, it } from 'vitest';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '../..');
const sassTestFile = path.resolve(ROOT_DIR, 'sass/tests/index.spec.sass');

runSass(
  { describe, it, sass },
  sassTestFile,
  {
    loadPaths: [
      ROOT_DIR, path.resolve(ROOT_DIR, 'sass'), path.resolve(ROOT_DIR, 'node_modules')],
    importers: [new sass.NodePackageImporter(ROOT_DIR)]
  }
);
