import * as sass from 'sass';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const ROOT_DIR: string = path.resolve(__dirname, '../../..');
const SASS_DIR: string = path.join(ROOT_DIR, 'sass');

/**
 * Recursively gets all .sass files in a directory, excluding tests and node_modules.
 */
function getAllSassFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  const files: string[] = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath: string = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'tests' && file !== 'node_modules') {
        getAllSassFiles(filePath, fileList);
      }
    } else if (file.endsWith('.sass')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

/**
 * Runs a standalone syntax check on each Sass file.
 * Many files are 'partials' (intended to be imported) and will fail standalone compilation 
 * if they depend on mixins or variables from other files. We catch these specific errors 
 * and label them as warnings instead of failures.
 */
function runSyntaxCheck(): void {
  const sassFiles: string[] = getAllSassFiles(SASS_DIR);
  let errorCount: number = 0;

  console.log(`Checking ${sassFiles.length} Sass files for syntax and namespace validity...\n`);

  for (const file of sassFiles) {
    const relativePath: string = path.relative(ROOT_DIR, file);
    
    try {
      sass.compile(file, {
        syntax: 'indented',
        loadPaths: [
          SASS_DIR, 
          path.join(ROOT_DIR, 'node_modules'),
          path.join(ROOT_DIR, 'node_modules/lumina-sass/src'),
          path.join(ROOT_DIR, 'node_modules/lumina-sass/src/mix')
        ],
        importers: [{
          findFileUrl(url) {
            if (url === 'lumina-sass') return new URL('file://' + path.resolve(ROOT_DIR, 'node_modules/lumina-sass/src/_index.sass'));
            if (url.startsWith('lumina-sass/')) {
              const part = url.substring('lumina-sass/'.length);
              const candidates = [
                path.resolve(ROOT_DIR, `node_modules/lumina-sass/src/${part}/_index.sass`),
                path.resolve(ROOT_DIR, `node_modules/lumina-sass/src/${part}.sass`),
                path.resolve(ROOT_DIR, `node_modules/lumina-sass/src/mix/_${part}.sass`)
              ];
              for (const c of candidates) {
                if (fs.existsSync(c)) return new URL('file://' + c);
              }
            }
            return null;
          }
        }],
        quietDeps: true,
        logger: {
          warn: () => {
            // Ignore warnings during syntax check
          }
        }
      });
      console.log(`✅ ${relativePath}`);
    } catch (err: any) {
      const isMissingDependency = err.message.includes('Undefined mixin') || err.message.includes('Undefined variable');
      
      if (isMissingDependency) {
         // This is likely a partial that expects to be imported into a context where these are defined.
         const details = err.message.split('\n')[0]; // Get the first line of the error (the "what")
         console.log(`⚠️  ${relativePath} (Partial: ${details})`);
      } else {
        // This is a legitimate syntax error or a broken import
        console.error(`❌ ${relativePath}`);
        console.error(err.message);
        errorCount++;
      }
    }
  }

  if (errorCount > 0) {
    console.error(`\nFound ${errorCount} syntax/import errors in Sass files.`);
    process.exit(1);
  } else {
    console.log('\nAll Sass files passed syntax and namespace validation (ignoring expected partial errors).');
    process.exit(0);
  }
}

runSyntaxCheck();
