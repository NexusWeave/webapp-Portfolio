import { execSync } from 'child_process';

function checkDependencyWarnings(): void {
  console.log('Checking for SASS dependency warnings...');

  try {
    // Run sass compiler on the demo style which includes everything.
    // 2>&1 ensures stderr (where warnings go) is captured in stdout.
    const output: string = execSync('npx sass demo/style.sass demo/style.css 2>&1', { encoding: 'utf-8' });
    
    if (output.toLowerCase().includes('warning:')) {
      console.error('❌ FAIL: SASS Dependency warnings detected.');
      console.error(output);
      process.exit(1);
    }
    
    console.log('✅ PASS: No dependency warnings detected.');
  } catch (error: any) {
    const output: string = error.stdout || error.stderr || error.message;
    if (output.toLowerCase().includes('warning:')) {
      console.error('❌ FAIL: SASS Dependency warnings detected during build failure.');
    } else {
      console.error('❌ FAIL: Build failed for another reason.');
    }
    console.error(output);
    process.exit(1);
  }
}

checkDependencyWarnings();
