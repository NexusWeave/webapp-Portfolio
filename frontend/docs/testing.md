# Test Documentation

This application relies on a unified test environment for both Nuxt 4/Vue 3 components and Sass stylesheets. Test execution is handled by **Vitest**.

## Running Tests

To execute tests, use one of the following commands in the \`frontend/\` directory:

- \`npm run test\` - Runs the complete test suite (both Nuxt and Sass).
- \`npm run test:nuxt\` - Runs only Vue and Nuxt related tests located in \`tests/nuxt/\`.
- \`npm run test:sass\` - Runs only stylesheet related tests located in \`tests/sass/\`.
- \`npm run pre-release\` - Executes the complete test suite and the build process prior to release.

## Nuxt Test Inventory
* **\`app.spec.ts\`**: Verifies that the primary component (\`app.vue\`) of the Nuxt application mounts and remains accessible without errors.

## Sass Test Inventory
* **\`mixins.spec.ts\` / \`mixins.test.scss\`**: Executes via \`sass-true\` to verify that mixins (e.g., \`logical-size\`) compile to the expected CSS output, ensuring correct attributes for block and inline sizes.
