import * as sass from 'sass';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);
const ROOT_DIR: string = path.resolve(__dirname, '../..');
const SRC_DIR: string = path.join(ROOT_DIR, 'src');

function getAllSassFiles(dir: string, fileList: string[] = []): string[] {
  const files: string[] = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath: string = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllSassFiles(filePath, fileList);
    } else if (file.endsWith('.sass')) {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

function runSyntaxCheck(): void {
  const sassFiles: string[] = getAllSassFiles(SRC_DIR);
  let errorCount: number = 0;

  console.log(`Checking ${sassFiles.length} Sass files for syntax and namespace validity...\n`);

  for (const file of sassFiles) {
    const relativePath: string = path.relative(ROOT_DIR, file);
    
    try {
      sass.compile(file, {
        syntax: 'indented',
        loadPaths: [SRC_DIR, path.join(ROOT_DIR, 'node_modules')],
        quietDeps: true,
        logger: {
          warn: () => {
            // Ignore warnings during syntax check
          }
        }
      });
      console.log(`✅ ${relativePath}`);
    } catch (err: any) {
      console.error(`❌ ${relativePath}`);
      console.error(err.message);
      errorCount++;
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
