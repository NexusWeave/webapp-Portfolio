# Root Changelog (Major & Breaking Changes)

This changelog tracks major milestones and breaking changes across the entire project.

> [!NOTE]
> For granular service-specific release notes (including minor features and patches):
> - **Frontend:** [`frontend/CHANGELOG.md`](frontend/CHANGELOG.md)
> - **Backend:** [`backend/CHANGELOG.md`](backend/CHANGELOG.md)

---

### 2025-12-21 – [`d7296b94`] chore(release): 1.0.0 [skip ci]
- **Impact:** Major Release v1.0.0

### 2025-11-09 – [`7c8ae5f7`] style(components | sass): Update classes and redesign card component     -   Implemented styling updates across various components, focusing     specifically on modernizing and improving the visual design of the     displayed cards.
- **Impact:** The visual appearance of the card components has changed.

### 2025-11-05 – [`22c96d6a`] refactor(package.json): Update scripts, add deploy command, and manage dependencies     -   Performed key updates to project scripts and dependencies to     streamline the development and deployment workflow.
- **Impact:** The primary local running command is now `serve` and not `start`.

### 2025-11-05 – [`d3a175e1`] refactor(config): Modularize configuration logic and remove redundancy     -   Refactored the main configuration file to separate distinct blocks     of logic into dedicated files. This greatly improves the organization,     readability, and maintenance of the configuration setup.
- **Impact:** The main configuration file now relies on imports for Collection and Tag definitions.

### 2025-11-03 – [`f25894b9`] chore(rename): Rename index to personal     -   Refactored the project structure by renaming the primary component     previously named `index` to `personal`. This standardizes the naming     convention, making it clear that the file serves as an autobiographical     page.
- **Impact:** All file imports, routing configurations, and internal references relying on the old name (`index`) must be updated to use the new name (`personal`).

### 2025-11-03 – [`5c639d50`] chore(rename): Rename folio to index     -   Refactored the project structure by renaming the primary component     or file previously named `folio` to `index`. This standardizes the     naming convention, making it clear that the file serves as a main     entry point or index view.
- **Impact:** All file imports, routing configurations, and internal references relying on the old name (`folio`) must be updated to use the new name (`index`).

### 2025-11-03 – [`45a0bdf2`] style(tech-color): Update tech-specific colors for consistency     -   Synchronized and updated the color definitions for various     technologies across both the general styling (`tech-color.sass`)     and the icon styling (`tech-icon.sass`). This ensures visual consistency     and accurate branding throughout the application.
- **Impact:** visual appearance of tech-related elements and icons has changed.

### 2025-10-20 – [`1d03a090`] refactor(utils/List): Migrate to TypeScript, import interfaces, and clean up     -   Performed a significant refactoring of the Utils/List     component to improve type safety, code maintainability, and efficiency.
- **Impact:** None. (This is an internal refactoring.)

### 2025-10-19 – [`0034afaf`] refactor(cleanup): Remove redundant spacing and require Anchor label     -   Performed a general cleanup pass and improved the data contract     for the Anchor interface.
- **Impact:** The `Anchor` interface now strictly requires the `label` property to be defined. Any consuming component that previously omitted the label will now cause a type error.

### 2025-10-14 – [`db85dea5`] refactor(Header): Streamline navigation, adopt Nuxt component, and rename path     -   Restructured the Header component to optimize navigation handling     and align with framework conventions.
- **Impact:** The primary navigation path for the portfolio section has changed from `/portfolio` to `/folio`. Any internal or external links pointing to the old path must be updated.

### 2025-10-14 – [`80c8a72d`] chore(tina/config): Removed redundant object field     -   This commit removes the redundant object field `tags` from the     TinaCMS configuration file.ts, streamlining the configuration and     preventing redundant tags. This change enhances maintainability
- **Impact:** This commit removes the `tags` field from the TinaCMS configuration file. And updates name field for `updated` to `end` in timeline items.

### 2025-10-13 – [`237e9d62`] refactor(types/props): Simplify DateObject to string for data contract
- **Impact:** The data type expected for all 'date' properties across the application (e.g., in DateYearProps and TimelineItem) has changed from an object structure to a primitive string. All consuming components and data sources must be updated to pass a standard string representation of the date

### 2025-10-12 – [`50af50cf`] refactor(preprocessor-utils): Relocate file based on reactive role     -   Moved the 'preprocessor-utils.ts' file from the generic 'utils'     directory to the new 'composable' directory. This relocation accurately     reflects that the contained functions utilize asynchronous operations     and exhibit reactive behavior, aligning the file's location with its     architectural purpose.
- **Impact:** The file path for 'preprocessor-utils.ts' has changed from 'utils/...' to 'composable/...'. All importing files have been updated to reflect this change.

### 2025-10-12 – [`ec2466ce`] fix(Timeline) : Resolve hydration mismatch (Vue warn 608)     -   Fixed a critical hydration node mismatch error (Vue warn 608)     that prevented the Academic/Achievement component from updating     correctly on the client side after SSR.
- **Impact:** This is purely a structural fix to the component template/behavior. No API changes were made.

### 2025-10-09 – [`5eba93cf`] feat(utils/preprosessor-utils): Initialize data mapping function     -   Created and initialized the 'utils/preprosessor-utils.ts' file     to house data processing logic, specifically implementing the primary     data mapping function (`mapTimeline`). This centralizes and cleans     up complex data transformations previously located in presentation     components.
- **Impact:** None. (This commit introduces the function, establishing 'mapTimeline' as the new canonical source for timeline data mapping logic.)

### 2025-10-09 – [`b9e6dd78`] chore(cleanup): Relocate obsolete data mapping logic to dedicated utility     -   Deleted redundant utility logic from the main page component after     successfully relocating the contained helper function to a dedicated     file. This improves the separation of concerns by moving data mapping     logic out of the presentation layer.
- **Impact:** None. (The function logic remains, but the import path for this data processing logic has changed.)'pages/index.vue' to the new 'utils/preprosessor-utils.ts' file.

### 2025-10-09 – [`2ef54caf`] chore(cleanup): Delete obsolete utility file after function relocating     -   Deleted the redundant `utils/utilities` file as its contained     helper function has been seperated & reloacted to dedicated files     within the `utils` directory, improving the organization and Single     Responsibility Principle (SRP) of the utility functions.
- **Impact:** None (Function logic remains, but file paths for imports have changed and must be updated.)

### 2025-10-09 – [`d68fe7c4`] refactor(timeline/Card): Centralize prop types and improve component definition     -   Moved the component's prop type definition out of the file and into 'types/props.ts'. This change centralizes the type contracts for better reusability and simplifies the component code by integrating the types directly via 'defineProps'.
- **Impact:** The component now relies entirely on the newly updated data structure (TimelineItem) from previous commits. If consuming components haven't updated their data fetching to the new schema, they will break.

### 2025-10-09 – [`e9056f48`] refactor(components/Timeline): Migrate to local state management and implement core filtering logic
- **Impact:** The 'toggleVisibility' event emitter was removed. Visibility state is now managed internally, fundamentally changing the component's public API and interaction with its parent.

### 2025-10-09 – [`e245e5ed`] refactor(timeline/filter): Centralize prop types and improve component definition
- **Impact:** None.

### 2025-10-09 – [`4638f293`] refactor(Date/Year): Streamline logic, improve reactivity, and enforce type safety     -   Refactored the Year component for significant internal improvement,     focusing on performance, robust logic, and strict type definition.
- **Impact:** The year property is now a reactive (computed) property. Consumers relying on the previous static or direct property access may need updates.

### 2025-10-09 – [`532f060c`] refactor(types/props): Standardize prop interfaces and streamline timeline data     -   Refactored the core prop definitions to simplify data structures     and align them with the new, generalized timeline item types. This     change cleans up the component contract and improves type-safety     consistency.
- **Impact:** The data type expected by TimelineProps has fundamentally changed from AcademicCollectionItem to the generalized TimelineItem. All code relying on the old interface must be updated to consume the new type structure.

### 2025-10-09 – [`7fdf30ba`] refactor(types/timeline): Simplify `TimelineItem` interface & initializing specialized types     -   Refactored the core 'TimelineItem' interface by moving from nested     object definitions to a structure based on plain data types. This     crucial change resolves a data mapping issue with `AcademicCollectionItem`.
- **Impact:** The structure of the 'TimelineItem' interface has been updated to match the 'AcademicCollectionItem' schema. All components and code relying on the old interface must be updated to consume the new, simplified data structure.

### 2025-10-09 – [`490f6abe`] refactor(techstack): Standardize data structure and naming conventions     -   Refactored the techstack data structure by converting the simple     list into a structured array of objects. This change connects each     technology with relevant properties (category, name) for better     consumption in the UI.
- **Impact:** The raw techstack data format has changed from a simple list to an array of objects. The legacy 2D array structure is deprecated, any code consuming this data must be updated to handle the new object structure and the enforced uppercase naming convention.

### 2025-10-08 – [`9972dce2`] refactor(tina/config) : Clean up, rename and reorganize academic collection
- **Impact:** Name references within the configuration schema have been modified. Any code querying or referencing these specific fields must be updated.

### 2025-10-08 – [`1e45ad13`] chore(cleanup): Remove redundant JSON data sheets after Markdown migration
- **Impact:** The data fetching mechanism and all related components must now use the Markdown-based logic; references to the old JSON files must be updated.

### 2025-10-08 – [`65eb4d9f`] feat(utilities/utilities.ts): Introducing  a helper function to fetch porgamming type by an array.     -   Created the new `utilities/utilities.ts` file to centralize     reusable helper functionallity. Implemented a function within this     file to efficiently fetch programming language type data based on an     input array.
- **Impact:** The ability to fetch programming language type data by name has been added as new functionality.

### 2025-10-08 – [`b32b60c5`] refactor(content.config) : Reorganize collections & Improve documentation     -   Refactored the content configuration file by reordering collections alphabetically,     for clarity and better readablitiy. Additionally improved comments through the file to     enchance documentation. For further mantaining.

### 2025-10-07 – [`c59a6a1b`] refactor(pages/index): Improve robustness and optimize data fetching.

### 2025-10-05 – [`9f20a374`] refactor(content/blog/dev_journey): Restructure blog for news post compatibility
- **Impact:** The internal data structure (front matter, file organization) for these blog posts has changed.

### 2025-10-05 – [`2bbc07b4`] refactor(utils/Header): Reorder and rename static navigation links
- **Impact:** None. (Existing links/routes were not changed, only display names and order.)

### 2025-10-05 – [`03e23a94`] refactor(tina/config): Merge related content collections for simplicity
- **Impact:** The structure of the content configuration in tina/config.ts has changed, impacting how content is queried and edited.

### 2025-10-05 – [`b8375997`] refactor(content-structure): Move academic data to 'achievements' and convert to Markdown
- **Impact:** File paths and data format for academic achievements have changed. Please update any references accordingly.

### 2025-10-05 – [`cddb124b`] refactor(content/dev ): Move profiles to common `profiles` directory

### 2025-10-05 – [`93316d90`] refactor(content/dev ): Move profiles to common `profiles` directory

### 2025-09-22 – [`bd0129f5`] refactor(tina/config.ts) Refactor `achievement` field for consistency and ID tracking.
- **Impact:** While the underlying data keys were largely preserved, the explicit removal of the **`institution` field** and the introduction of the **`id` field** means any validation or display logic relying on the old structure must be updated.

### 2025-09-22 – [`51bf6eb5`] refactor(tina/config.ts) Refactor `achievement` field for consistency and ID tracking.
- **Impact:** While the underlying data keys were largely preserved, the explicit removal of the **`institution` field** and the introduction of the **`id` field** means any validation or display logic relying on the old structure must be updated.

### 2025-09-21 – [`6400b778`] The code within `Card.vue` contained outdated logic and syntax that was based on older framework configurations. This refactoring updates the component to align with current project standards and improve long-term stability.
- **Impact:** None. The external API (props, events) of the Card component remains unchanged, ensuring no impact on consuming views.

### 2025-09-21 – [`da1cc149`] feat(utils/utils.js): Initialize helper functions utility script
- **Impact:** None. All consuming files have been updated to import helper functions from the new path.

### 2025-09-21 – [`dd2fb5cc`] refactor(config.ts): Standardize platform naming and field keys
- **Impact:** Code consuming or relying on the old configuration keys (`C#`, `institution`, `project_link`, `summary`) must be updated to use the new standardized keys (`.NET`, `name`, `href`, `description`).

### 2025-09-21 – [`1502677e`] refactor(portfolioStore.ts): Simplify item structure and refactor store logic
- **Impact:** None. This refactoring is internal to the store and does not change how the store is consumed by components, as all consumer code is expected to be updated for the future data model change anyway.

### 2025-09-20 – [`95256e5c`] feat(documentation) Initialized a frontend file map and dictionary structure.     -   A structured dictionary- file map has been Initialized to provide a quick visual reference. Initialized a structured tree map for the directory, this speeds up navigation for the entire team.
- **Impact:** None.

### 2025-09-20 – [`9679d54c`] refactor(timeline) Merge Academic and Achievements components into a single component
- **Impact:** All files importing or using the old `Academic` and `Achievements` components is already updated to use the new `Timeline` component.

### 2025-09-17 – [`f8afe355`] Refactor: Move 'pages' directory outside of 'app/' folder
- **Impact:** All relative file paths and import statements relying on the old `app/pages/` structure will be broken. Developers must re-test routing and page-specific imports after merging this change.
