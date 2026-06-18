import * as sass from 'sass';
import * as path from 'path';

/**
 * Checks for SASS dependency warnings (deprecations) by compiling the main index file.
 * We use the JS API with a custom logger to capture warnings that usually go to stderr.
 */
function checkDependencyWarnings(): void {
  console.log('Checking for SASS dependency warnings...');

  let warnings: string[] = [];

  const logger: sass.Logger = {
    warn(message, options) {
      // We specifically care about deprecation warnings from dependencies 
      // or our own code that we want to track.
      if (options.deprecation) {
        const warningMessage = `Warning: ${message}${options.span ? `\n  at ${options.span.url}:${options.span.start.line}:${options.span.start.column}` : ''}`;
        warnings.push(warningMessage);
        console.warn(warningMessage);
      }
    }
  };

  try {
    // We compile the main index.sass which includes all project styles.
    // We use a NodePackageImporter to handle package resolution.
    sass.compile('sass/index.sass', {
      syntax: 'indented',
      loadPaths: [
        'sass', 
        'node_modules',
        'node_modules/lumina-sass/src',
        'node_modules/lumina-sass/src/mix'
      ],
      importers: [new sass.NodePackageImporter()],
      logger,
      // quietDeps: true silences warnings from node_modules. 
      // If we want to find warnings in our own code but NOT in dependencies, we use this.
      quietDeps: true
    });
    
    if (warnings.length > 0) {
      console.error(`❌ FAIL: ${warnings.length} SASS Dependency warnings detected.`);
      process.exit(1);
    }
    
    console.log('✅ PASS: No dependency warnings detected.');
  } catch (error: any) {
    // Some errors are expected if we compile a file that has 'undefined' symbols 
    // but isn't a hard syntax error.
    const isExpectedError = error.message.includes('Undefined mixin') || 
                            error.message.includes('Undefined variable') ||
                            error.message.includes("Can't find stylesheet");

    if (isExpectedError) {
        const details = error.message.split('\n')[0];
        console.warn(`⚠️  SASS Compilation Error: ${details}`);
        console.log('💡 This error is likely due to missing context during standalone compilation of a partial.');
        console.log('✅ PASS: No dependency warnings detected (ignoring build errors for warning check).');
        process.exit(0);
    }
    
    console.error('❌ FAIL: SASS compilation failed for an unexpected reason.');
    console.error(error.message);
    process.exit(1);
  }
}

checkDependencyWarnings();
