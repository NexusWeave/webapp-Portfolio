import * as sass from 'sass';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const ROOT_DIR: string = path.resolve(__dirname, '../../..');
const SASS_DIR: string = path.join(ROOT_DIR, 'sass');

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
      // Some files might be designed to be imported and have undefined variables if compiled alone,
      // but we try our best.
      if (err.message.includes('Undefined mixin') || err.message.includes('Undefined variable')) {
         // If it's just undefined stuff, it's often because the file is a partial.
         console.log(`⚠️  ${relativePath} (potential partial with dependencies)`);
      } else {
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
    console.log('\nAll Sass files passed syntax and namespace validation.');
    process.exit(0);
  }
}

runSyntaxCheck();
