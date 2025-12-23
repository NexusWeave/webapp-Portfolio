# [1.2.0](https://github.com/NexusWeave/webapp-Portfolio/compare/v1.1.1...v1.2.0) (2025-12-22)


### Bug Fixes

* **Model:** 🐛 Removing Redundant links from the UI, by adding a if check ([23e10ce](https://github.com/NexusWeave/webapp-Portfolio/commit/23e10ce932a0a6b25e3fb9a32ce326e85a171a61))


### Features

* **UI:** ✨ Introducing Repositories for UI ([e21cb32](https://github.com/NexusWeave/webapp-Portfolio/commit/e21cb320f278004cbe339235775e6c699227f0a8))

## [1.1.1](https://github.com/NexusWeave/webapp-Portfolio/compare/v1.1.0...v1.1.1) (2025-12-22)


### Bug Fixes

* **Date-Component:** 🐛 Resolve Naming Collision ([3b8d7c6](https://github.com/NexusWeave/webapp-Portfolio/commit/3b8d7c66ac3d0dca7593e8313761ce494c29944a))

# [1.1.0](https://github.com/NexusWeave/webapp-Portfolio/compare/v1.0.0...v1.1.0) (2025-12-22)


### Features

* **Config:** ✨ Integrate Environment Strings into ConfigurationClasses ([fca301c](https://github.com/NexusWeave/webapp-Portfolio/commit/fca301c64e26cd22cd56d4b1efea6697bb8ece5b))

# 1.0.0 (2025-12-21)


* feat(documentation) Initialized a frontend file map and dictionary structure.     -   A structured dictionary- file map has been Initialized to provide a quick visual reference. Initialized a structured tree map for the directory, this speeds up navigation for the entire team. ([95256e5](https://github.com/NexusWeave/webapp-Portfolio/commit/95256e5c18bfceacfce3d0adb4c988788c521caa))
* fix(Timeline) : Resolve hydration mismatch (Vue warn 608)     -   Fixed a critical hydration node mismatch error (Vue warn 608)     that prevented the Academic/Achievement component from updating     correctly on the client side after SSR. ([ec2466c](https://github.com/NexusWeave/webapp-Portfolio/commit/ec2466ce038c81a78e2cb43dfc541c4a674faf0b))
* refactor(content.config) : Reorganize collections & Improve documentation     -   Refactored the content configuration file by reordering collections alphabetically,     for clarity and better readablitiy. Additionally improved comments through the file to     enchance documentation. For further mantaining. ([b32b60c](https://github.com/NexusWeave/webapp-Portfolio/commit/b32b60c58b4a96395206165d9b7228798001a396))
* refactor(timeline) Merge Academic and Achievements components into a single component ([9679d54](https://github.com/NexusWeave/webapp-Portfolio/commit/9679d54cb832d992ef6d1618c7ffe8c9d02e1708))
* refactor(tina/config.ts) Refactor `achievement` field for consistency and ID tracking. ([bd0129f](https://github.com/NexusWeave/webapp-Portfolio/commit/bd0129f5cf6a45ef43481523d501b79895fa6c6e))
* refactor(tina/config.ts) Refactor `achievement` field for consistency and ID tracking. ([51bf6eb](https://github.com/NexusWeave/webapp-Portfolio/commit/51bf6eb518f96cd8f66f50dd761eb5f3cd742a9a))
* refactor(tina/config) : Clean up, rename and reorganize academic collection ([9972dce](https://github.com/NexusWeave/webapp-Portfolio/commit/9972dce2fcdb362e064830690be9eb012100060e))
* The code within `Card.vue` contained outdated logic and syntax that was based on older framework configurations. This refactoring updates the component to align with current project standards and improve long-term stability. ([6400b77](https://github.com/NexusWeave/webapp-Portfolio/commit/6400b7789d9c0bd6906e3a87807a7a70b3c102fa))


### Bug Fixes

* **AchievementsCollection:** resolved achievementsCollection display issues ([55b5bcb](https://github.com/NexusWeave/webapp-Portfolio/commit/55b5bcbbf561bc74b0c954f5116c280d5e199db4))
* Add CSS source map files to .gitignore ([c38912b](https://github.com/NexusWeave/webapp-Portfolio/commit/c38912b82c688a102f7043d6059a101bf676f328))
* Add missing icon mappings for academic and miscellaneous categories ([fe2acdc](https://github.com/NexusWeave/webapp-Portfolio/commit/fe2acdc758e7b861ec8b0122cd9b4ec354b7eb8a))
* Add missing visited link color in mixins and define icon styles ([0b10a1d](https://github.com/NexusWeave/webapp-Portfolio/commit/0b10a1d07b8dc9a2462a18af09864a58d88429cd))
* adjust .gitignore to properly include and exclude local and production files ([25d033d](https://github.com/NexusWeave/webapp-Portfolio/commit/25d033dcd8765c2a14005f0d8a405b53ce6280c4))
* Adjust timeline component layout for improved readability and visibility of school details ([6148c45](https://github.com/NexusWeave/webapp-Portfolio/commit/6148c45264894f65fcf4f8638e2529ed6d076ba3))
* Adjust timeline item styles for consistent input sizing and remove overflow property ([5200f2e](https://github.com/NexusWeave/webapp-Portfolio/commit/5200f2e9b801b4cf18d995fa6372e2564a4ef88c))
* **Anchor.vue:** Fix type comparison bug in isDisabled function ([5dcd95b](https://github.com/NexusWeave/webapp-Portfolio/commit/5dcd95b542cb7291df3c90f1977087711b70244e))
* **backendAPI:** Resolve missing return statement issue in fetch function ([d2334f8](https://github.com/NexusWeave/webapp-Portfolio/commit/d2334f878d0d56ba79d91e91a83ae869b51860df))
* **build:** 🐛 Included Missing File for Commit 17efb3c4438e1c9b8700304d5baea03a8c191ba1 ([889483c](https://github.com/NexusWeave/webapp-Portfolio/commit/889483c14451a5bdb0cb59b12befa7f2d1a72bb0))
* **Button:** Resolve click issue and perform cleanup ([011f478](https://github.com/NexusWeave/webapp-Portfolio/commit/011f4786fe9c7c3560492949d164caaf88fb9f12))
* **composables/preprosessor:** resolved type-safety issue with, by migrating strings into arrays ([b713838](https://github.com/NexusWeave/webapp-Portfolio/commit/b7138381d89d7e92480212721f0a4d667c2e9a9f))
* **config:** 🐛 Løste typesikkerheten i logger_config.py ([130d1f3](https://github.com/NexusWeave/webapp-Portfolio/commit/130d1f3c0a8d3afc0d73051443b0c196fa3a5f23))
* **config:** Update path for public directory ([16eb166](https://github.com/NexusWeave/webapp-Portfolio/commit/16eb166037cbe7f3b7dea2bc61199307bfd318d0))
* Correct alignment and justification classes in flexbox mixins ([2df6e16](https://github.com/NexusWeave/webapp-Portfolio/commit/2df6e16f46a55cdc8ca9140a13fa0fbbf60445db))
* Correct timeline entry IDs for accurate sequencing ([ad0cf7f](https://github.com/NexusWeave/webapp-Portfolio/commit/ad0cf7f2e80a6269004a28e7936a65ac49c44192))
* **Endpoint:** 🐛 Resolved the 500 - Server Issue that prevents to fetch projects from the Rational Database. ([452f322](https://github.com/NexusWeave/webapp-Portfolio/commit/452f322a6c7d0e9ca4a7929616649d7cfd59bcab))
* Enhance timeline store with reactive data handling and improved item field assignment ([35a0def](https://github.com/NexusWeave/webapp-Portfolio/commit/35a0def724f7f509a7a31d507051850f2e0dee99))
* **github_api:** Resolve Python syntax issue preventing script execution ([eb6f5b0](https://github.com/NexusWeave/webapp-Portfolio/commit/eb6f5b0c622d94d91c22148e630ecc18b0b53552))
* **index:** Update file path for reactive utility functions ([2a754c6](https://github.com/NexusWeave/webapp-Portfolio/commit/2a754c6927bb835712927b9fe2b6e1512eea4150))
* **Model:** 🐛 Resolved Invalid keyword argument in LanguageModel ([d5b6ee0](https://github.com/NexusWeave/webapp-Portfolio/commit/d5b6ee0bafb58d36cdf7326723d1b9047420324f))
* **Navigation/NavMenu:** fixed import for Props type ([e96d7c8](https://github.com/NexusWeave/webapp-Portfolio/commit/e96d7c8cc379d594409cbbaa38e538688653f74b))
* **nuxt.config:** corrected runtime config for Flask API ([0cb48c1](https://github.com/NexusWeave/webapp-Portfolio/commit/0cb48c1094804144d5e4fbd0f7a98f68fd10273e))
* Refactor class bindings in Card.vue for improved consistency and readability ([f04eb5d](https://github.com/NexusWeave/webapp-Portfolio/commit/f04eb5de4d6006a92bd838835d40096513a9c648))
* Refactor icon styles and improve icon mapping integration ([5d38c66](https://github.com/NexusWeave/webapp-Portfolio/commit/5d38c66d45983f912404d29e9314163e81e69c4c))
* Refactor input component to enhance range input handling with dynamic min, step, and max attributes ([e2cd1b9](https://github.com/NexusWeave/webapp-Portfolio/commit/e2cd1b9f92a725d3686ce1dd124a43c3606d8339))
* Remove unnecessary SEO meta tags from index.html ([286dfc4](https://github.com/NexusWeave/webapp-Portfolio/commit/286dfc45fcdebee2b7e27dfc59cb811c04f84dbf))
* remove unnecessary whitespace in _profile.sass ([0f92a09](https://github.com/NexusWeave/webapp-Portfolio/commit/0f92a09c693d1d7bb2c81248fb17570cbecb14cb))
* remove unused font import and clean up margin declaration ([1151e90](https://github.com/NexusWeave/webapp-Portfolio/commit/1151e909880ad01481a9d652f029482bb001d943))
* Rename $misc to $misc-breakpoints for clarity in device breakpoints mapping ([a486615](https://github.com/NexusWeave/webapp-Portfolio/commit/a4866155cc2beffe2122a6d2b643de171f0dc286))
* Reorder import statements in main.js for consistency ([8729a49](https://github.com/NexusWeave/webapp-Portfolio/commit/8729a49682687fe35c855d43c8943d49a20072f1))
* **types/prop:** resolved issues with exporting `NavProp` ([e7be167](https://github.com/NexusWeave/webapp-Portfolio/commit/e7be167998fa068b421ab6f1f4694d4817ef4564))
* **types/props:** Export CarouselButton interface for proper usage ([4e650b2](https://github.com/NexusWeave/webapp-Portfolio/commit/4e650b2438bf000ee5b56662347b69230c0c926d))
* Update class bindings for timeline sections to improve layout consistency ([72a8e8a](https://github.com/NexusWeave/webapp-Portfolio/commit/72a8e8a099c2e5eb5e5a1f293f21d58190c82516))
* Update document title to reflect author name ([02bc39e](https://github.com/NexusWeave/webapp-Portfolio/commit/02bc39eb40c72b5bafdc6a1ee3041d9f0b7922ac))
* Update flexbox generator mixin to improve parameter naming and error handling ([8e8bb3f](https://github.com/NexusWeave/webapp-Portfolio/commit/8e8bb3f7505af0d39e40366c7a322658e0473570))
* update font import to use mixin for consistent styling ([053dac3](https://github.com/NexusWeave/webapp-Portfolio/commit/053dac346bbcf13af237d1aa6c095affe5cc924f))
* update font import to use mixin for consistent styling and clean up margin declaration ([2de2e4b](https://github.com/NexusWeave/webapp-Portfolio/commit/2de2e4b4b40360eb1cebfe20c5aab21055e1cac4))
* Update navigation styles for consistency and clarity ([f393cd0](https://github.com/NexusWeave/webapp-Portfolio/commit/f393cd005495806f04791f2078b1785cdf1e1577))
* update pinia version to 3.0.3 in package.json and package-lock.json ([a78b5e8](https://github.com/NexusWeave/webapp-Portfolio/commit/a78b5e8bfbee2122c0058484730c09b0cb92ed78))
* Update placeholder handling and refactor data type computation in inputs component ([1be8d87](https://github.com/NexusWeave/webapp-Portfolio/commit/1be8d87595f4875d476a28154548167f26d17962))
* Update placeholder logic in inputs component for better handling of text and password types ([07d8010](https://github.com/NexusWeave/webapp-Portfolio/commit/07d8010d358284d59cf9b86320a76dfdca70b3c4))
* Update section class for improved alignment in Header component ([2fa7cd4](https://github.com/NexusWeave/webapp-Portfolio/commit/2fa7cd4a5405989d2e9824df9b5c3c2e4123f82a))
* Update source mapping in index.css.map to include new flexbox mixins ([27317c8](https://github.com/NexusWeave/webapp-Portfolio/commit/27317c84a00f13fb3d6e0f5e5f4bbc878a1717d7))
* Update Timeline component data binding in Academic.vue for improved visibility handling ([d9eb8fb](https://github.com/NexusWeave/webapp-Portfolio/commit/d9eb8fb1a1f8864181fa5453716ab8731c8373d1))
* Update Timeline component to iterate over timeline data for proper rendering ([8484234](https://github.com/NexusWeave/webapp-Portfolio/commit/848423424e973e91b84aee0a696d0be74da843d9))
* Update timeline entries with correct URLs, descriptions, and technology stacks ([7c8151c](https://github.com/NexusWeave/webapp-Portfolio/commit/7c8151c02c5612e1a42517c1ac18626c07b9fb8c))
* Update visibility handling in timeline store and improve logging ([ec846cc](https://github.com/NexusWeave/webapp-Portfolio/commit/ec846ccea0087d213c805e6059c82886ab3dc87d))
* **utils/techstack:** Rename techStackMap key to fix class error ([1139679](https://github.com/NexusWeave/webapp-Portfolio/commit/11396799ebd8952bb19e533a809b20808627591f))


### chore

* **cleanup:** Delete obsolete utility file after function relocating ([2ef54ca](https://github.com/NexusWeave/webapp-Portfolio/commit/2ef54caf65e131575bcf4278d2a1fab0bd8762de))
* **cleanup:** Relocate obsolete data mapping logic to dedicated utility ([b9e6dd7](https://github.com/NexusWeave/webapp-Portfolio/commit/b9e6dd78c6447973c1715b2273ec1147746071d4))
* **cleanup:** Remove redundant JSON data sheets after Markdown migration ([1e45ad1](https://github.com/NexusWeave/webapp-Portfolio/commit/1e45ad13a9fbd216199eafa2453af23b93e77edb))
* **rename:** Rename folio to index ([5c639d5](https://github.com/NexusWeave/webapp-Portfolio/commit/5c639d508ec4ac332091da7536343fcf5d23edb8))
* **rename:** Rename index to personal ([f25894b](https://github.com/NexusWeave/webapp-Portfolio/commit/f25894b90aea39a87d38166d268715692e5e7b26))
* **tina/config:** Removed redundant object field ([80c8a72](https://github.com/NexusWeave/webapp-Portfolio/commit/80c8a72d8d45a44ffae3c4ea6b69cddbfeb9be26))


### Code Refactoring

* **cleanup:** Remove redundant spacing and require Anchor label ([0034afa](https://github.com/NexusWeave/webapp-Portfolio/commit/0034afaf16d0fca14a263afb7a1734c9e2cb13b2))
* **components/Timeline:** Migrate to local state management and implement core filtering logic ([e9056f4](https://github.com/NexusWeave/webapp-Portfolio/commit/e9056f483a09ee40d549f65c50f783a53bdfbd69))
* **config.ts:** Standardize platform naming and field keys ([dd2fb5c](https://github.com/NexusWeave/webapp-Portfolio/commit/dd2fb5ccf7dcd62ac2735cdddbba6c3ba43080f8))
* **config:** Modularize configuration logic and remove redundancy ([d3a175e](https://github.com/NexusWeave/webapp-Portfolio/commit/d3a175e12fc86d28f265e1292f7db25c8d63708f))
* **content-structure:** Move academic data to 'achievements' and convert to Markdown ([b837599](https://github.com/NexusWeave/webapp-Portfolio/commit/b8375997f62306bb0b4b80ffc90f657c298fa7f4))
* **content/blog/dev_journey:** Restructure blog for news post compatibility ([9f20a37](https://github.com/NexusWeave/webapp-Portfolio/commit/9f20a374682b6dbb9a07c3480ef665f0cceb509e))
* **content/dev :** Move profiles to common `profiles` directory ([cddb124](https://github.com/NexusWeave/webapp-Portfolio/commit/cddb124b9116a68ce672eabc837992897b307ae4))
* **content/dev :** Move profiles to common `profiles` directory ([93316d9](https://github.com/NexusWeave/webapp-Portfolio/commit/93316d90fdc13abbc9c1e1b3489e2cb9f05bf85f))
* **Date/Year:** Streamline logic, improve reactivity, and enforce type safety ([4638f29](https://github.com/NexusWeave/webapp-Portfolio/commit/4638f2939af297de15fd7e937a1840d6fca982a7))
* **Header:** Streamline navigation, adopt Nuxt component, and rename path ([db85dea](https://github.com/NexusWeave/webapp-Portfolio/commit/db85dea5bc41dfd8a04dfe05b33765496afe67b3))
* **package.json:** Update scripts, add deploy command, and manage dependencies ([22c96d6](https://github.com/NexusWeave/webapp-Portfolio/commit/22c96d6ad7e81e785d557ce2f91ada51b5d64da6))
* **pages/index:** Improve robustness and optimize data fetching. ([c59a6a1](https://github.com/NexusWeave/webapp-Portfolio/commit/c59a6a1b44779424b8eb0c0087abb728d24f59df))
* **portfolioStore.ts:** Simplify item structure and refactor store logic ([1502677](https://github.com/NexusWeave/webapp-Portfolio/commit/1502677e36a99bc3a40ac04f73f03068456457fe))
* **preprocessor-utils:** Relocate file based on reactive role ([50af50c](https://github.com/NexusWeave/webapp-Portfolio/commit/50af50cf315266bf5ce13869d0bd1059970667aa))
* **techstack:** Standardize data structure and naming conventions ([490f6ab](https://github.com/NexusWeave/webapp-Portfolio/commit/490f6abe48e2f0905039ea88d0c0beb6da154c82))
* **timeline/Card:** Centralize prop types and improve component definition ([d68fe7c](https://github.com/NexusWeave/webapp-Portfolio/commit/d68fe7c4dd67c2788d8e3e22e91581a6c85a155c))
* **timeline/filter:** Centralize prop types and improve component definition ([e245e5e](https://github.com/NexusWeave/webapp-Portfolio/commit/e245e5ed454056d3e940214b181c771f82cf4898))
* **timeline/Filter:** Robustness, type safety and object structure ([2ea87bb](https://github.com/NexusWeave/webapp-Portfolio/commit/2ea87bbfcf2fd8e8f1f8a47ef827ab6e6c5ed2b3))
* **tina/config:** Merge related content collections for simplicity ([03e23a9](https://github.com/NexusWeave/webapp-Portfolio/commit/03e23a948783ba5b2cf6bfdf25f18a88b43eefca))
* **types/props:** Simplify DateObject to string for data contract ([237e9d6](https://github.com/NexusWeave/webapp-Portfolio/commit/237e9d621108cc0eba5ccf80945f978539e638c4))
* **types/props:** Standardize prop interfaces and streamline timeline data ([532f060](https://github.com/NexusWeave/webapp-Portfolio/commit/532f060cf4c873328f9e7fd4b88e259f2742fa3c))
* **types/timeline:** Simplify `TimelineItem` interface & initializing specialized types ([7fdf30b](https://github.com/NexusWeave/webapp-Portfolio/commit/7fdf30ba13c02f2bd80dfc67ad91f4533cdd213c))
* **utils/Header:** Reorder and rename static navigation links ([2bbc07b](https://github.com/NexusWeave/webapp-Portfolio/commit/2bbc07b474ce45f3b4100224327d848159b55374))
* **utils/List:** Migrate to TypeScript, import interfaces, and clean up ([1d03a09](https://github.com/NexusWeave/webapp-Portfolio/commit/1d03a090145a6f136fae69ca289e3b0661cf709c))


### Features

* **__generated__:** Auto generated files from TinaCMS ([4c480f6](https://github.com/NexusWeave/webapp-Portfolio/commit/4c480f6d1cc86fbef50e474012fa00215056da13))
* Add academic timeline styles for improved layout and visibility ([a8703f3](https://github.com/NexusWeave/webapp-Portfolio/commit/a8703f3067b436dd2e36f41ca0d0eea945819a4b))
* Add article components and utilities ([4fd4086](https://github.com/NexusWeave/webapp-Portfolio/commit/4fd40863466c45acd83d64aa644d16df998755e6))
* Add comprehensive device breakpoints mapping for improved responsiveness ([ef3136e](https://github.com/NexusWeave/webapp-Portfolio/commit/ef3136e3bd60c00360902d9d59fc59a2d512a1a1))
* Add fetchData function and timeline data structure; remove unused bioTools and breakpoints utilities ([e7f4e38](https://github.com/NexusWeave/webapp-Portfolio/commit/e7f4e38e78ad7d861dd6d643a96c8d8caf4650ad))
* Add flexbox function for improved layout handling ([82e617d](https://github.com/NexusWeave/webapp-Portfolio/commit/82e617db66a66536d2adfafbcb3835460bf16aeb))
* Add flexbox mappings for layout management ([75196e8](https://github.com/NexusWeave/webapp-Portfolio/commit/75196e89675e9e8a5e56b24702f74cf93fce4b35))
* Add flexbox variables file for layout management ([2dc2df7](https://github.com/NexusWeave/webapp-Portfolio/commit/2dc2df7cddca8f1acb260b6dd9fdb3c8fb0448e6))
* Add font and link style mixins to improve styling consistency ([ff54c66](https://github.com/NexusWeave/webapp-Portfolio/commit/ff54c663505e5e25adb6679351600ecb144b3b90))
* Add Footer and Header components with dynamic content ([f492df3](https://github.com/NexusWeave/webapp-Portfolio/commit/f492df37eaa02399399a83bbc0326fbdc4b0a5d1))
* Add forward for row-align-justify mixin in flexbox utility ([bfbcccb](https://github.com/NexusWeave/webapp-Portfolio/commit/bfbcccb22048eb4b59588f11fc190dd313161ac1))
* Add generated image for Gemini model documentation ([849987c](https://github.com/NexusWeave/webapp-Portfolio/commit/849987c648442686ecb71f02c985424af00cb0c2))
* Add helse fag kompetansebevis PDF document ([e587101](https://github.com/NexusWeave/webapp-Portfolio/commit/e587101a6c52ef4c460cd420216f965963743daf))
* Add icon-types function to retrieve icon mapping by name ([94a978f](https://github.com/NexusWeave/webapp-Portfolio/commit/94a978f0a3126555d2eb2162e0352598e677a987))
* Add initial workspace configuration for project setup ([086b2f3](https://github.com/NexusWeave/webapp-Portfolio/commit/086b2f3cb1bc7d7a4dae8de612e547de32403c52))
* Add inputs component with dynamic props for form handling ([e4d4e08](https://github.com/NexusWeave/webapp-Portfolio/commit/e4d4e08716fbb20ed0f9d97c6d632e8707c6735a))
* Add mappings for Bootstrap icons and device breakpoints ([9dba34b](https://github.com/NexusWeave/webapp-Portfolio/commit/9dba34b013e918cc3eb8685527f34799819b6a92))
* Add mappings for Bootstrap icons and tech languages for improved icon management ([50776cf](https://github.com/NexusWeave/webapp-Portfolio/commit/50776cf7e523c1cd2b9fff124d3ad0e0265b811b))
* Add miscellaneous color variables for improved styling options ([8217d9a](https://github.com/NexusWeave/webapp-Portfolio/commit/8217d9a5cd5be21f6646c408235d376b29ec9c46))
* Add mixins for flexbox row alignment and justification ([6698300](https://github.com/NexusWeave/webapp-Portfolio/commit/66983007f49e1f630ca7b9f919452b782f7aca94))
* Add screen capture of homepage for documentation ([c579434](https://github.com/NexusWeave/webapp-Portfolio/commit/c5794345caf65372772e9c90a26db55cd9bc4de7))
* Add visual documentation for project directories, APIs, database, endpoints, frontend, system architecture, and utility tools ([de1f729](https://github.com/NexusWeave/webapp-Portfolio/commit/de1f729096ab5b663db1f219fb99ff708d893132))
* Adjust timeline layout and enhance line scaling for improved visibility ([2598731](https://github.com/NexusWeave/webapp-Portfolio/commit/259873197368b64062461ce8f78c242aec2ebced))
* **article:** Initialize foundational styles for article content ([99277f2](https://github.com/NexusWeave/webapp-Portfolio/commit/99277f2f31c5c8730238f36c214f3f7cdf0d4772))
* **backendAPI:** Initialize function to fetch repository data ([a350de7](https://github.com/NexusWeave/webapp-Portfolio/commit/a350de742b39991479f96162fe2acb05733cdb02))
* **cards:** Initialize new card style dedicated for timelines ([b20e83d](https://github.com/NexusWeave/webapp-Portfolio/commit/b20e83de6cbc5a676f246f21e2f661430873044d))
* **collection:** Added a reference section in blogs ( for blogs which requires references ). ([83d7357](https://github.com/NexusWeave/webapp-Portfolio/commit/83d7357554be8e15d6170042f3da356d301e75b7))
* Comment out border-radius property and add transitions mixin for enhanced styling ([57520a8](https://github.com/NexusWeave/webapp-Portfolio/commit/57520a87df2b62f600974f4db714e2682b87c927))
* **config:** ✨ Introduced Model for AsyncAPIClientConfig class ([a09d3cb](https://github.com/NexusWeave/webapp-Portfolio/commit/a09d3cba9818c435c02aa87a490de5378efa7660))
* Consolidate flex-column alignment styles for improved clarity ([f990cfe](https://github.com/NexusWeave/webapp-Portfolio/commit/f990cfebd857c8c57f8d13a94dcf675d26de3975))
* **content.config :** Define content collections for Nuxt SSG interface ([d3da2a8](https://github.com/NexusWeave/webapp-Portfolio/commit/d3da2a8b019edbc3b1f3e939508a7061e4cc85ed))
* **Database:** ✨ Introducing SQLAlchomy GithubModel ([1098a9a](https://github.com/NexusWeave/webapp-Portfolio/commit/1098a9a959a8dbe2c8ab4ff5407316b68298b986))
* **Database:** ✨ Migrating SQLite3 ORM to SQLAlchemy ([b0c713e](https://github.com/NexusWeave/webapp-Portfolio/commit/b0c713e45e896038c8f90bdc68a0ea2e67e631a7))
* **Deps:** ✨ Migrates all models to Pyndantic V2 ([ecdce17](https://github.com/NexusWeave/webapp-Portfolio/commit/ecdce17c150beccbbac3f58b8035488c99dbaccb))
* **dev:** expanded skillbar & updated title ([4867b9d](https://github.com/NexusWeave/webapp-Portfolio/commit/4867b9db651d8f011222c892d473687796ab1d9a))
* **dev:** Implement mounted lifecycle hook and reference mapping ([d346ed4](https://github.com/NexusWeave/webapp-Portfolio/commit/d346ed49056b6678303ee280db3cd1587cf775e2))
* **dev:** Introduce developer sidebar and optimize key usage ([acee222](https://github.com/NexusWeave/webapp-Portfolio/commit/acee2224980d115c88a30f28432822616b84657f))
* Enhance media-queries mixin to support breakpoints for improved responsiveness ([0ab8a6f](https://github.com/NexusWeave/webapp-Portfolio/commit/0ab8a6f829b2fa02b10a0a7adeee190285f67c8d))
* Enhance timeline component layout and visibility handling ([4e4fb0b](https://github.com/NexusWeave/webapp-Portfolio/commit/4e4fb0b0f534116bbe4ae6f535dffd2a17f0eb45))
* **exception:** ✨ Introducing TimeOutError exception ([d704777](https://github.com/NexusWeave/webapp-Portfolio/commit/d704777fe3c2106e7a3d6120f3ae88d81bf28635))
* **FastAPI-app:** ✨ Introducing FastAPI Lifespan, Standardize Configuration & Refactor imports ([08fd5d1](https://github.com/NexusWeave/webapp-Portfolio/commit/08fd5d10e739b8f87252213561ac3a6399b3f1a8))
* **FastAPI-app:** ✨ Introducing Healthcheck & Temporary test Endpoints ([e6afecc](https://github.com/NexusWeave/webapp-Portfolio/commit/e6afecc92fd2d803df8de2f984c24ed84f0ebd68))
* **FastAPI-app:** ✨ Introducing new API endpoint for today's announcement ([17efb3c](https://github.com/NexusWeave/webapp-Portfolio/commit/17efb3c4438e1c9b8700304d5baea03a8c191ba1))
* **flexbox-column:** Initialize flex-column-justify-space-evenly class ([53ae0eb](https://github.com/NexusWeave/webapp-Portfolio/commit/53ae0eb4a64462cba73b2e958650afa61717725a))
* **framework:** :building_construction: Migrer API fra Flask til FastAPI ([70b3844](https://github.com/NexusWeave/webapp-Portfolio/commit/70b384459e7d0119ce1915c64d9f96f07b71079e))
* **github:** ✨ Improved Client Logic & added Repository Commands ([22ecc04](https://github.com/NexusWeave/webapp-Portfolio/commit/22ecc0420c9620a74a559a2b31f175ac557b46dd))
* **Header:** Added a class for h1-element ([05af5bd](https://github.com/NexusWeave/webapp-Portfolio/commit/05af5bdf5f9f30a2f499a32b91c97285692837c0))
* Implement academic timeline component with dynamic data rendering ([377eb58](https://github.com/NexusWeave/webapp-Portfolio/commit/377eb58e869eb19f776efcff6b04db35a9e6f22a))
* Implement multiple endpoints for Photos, Announcements, and Github data ([025d9a9](https://github.com/NexusWeave/webapp-Portfolio/commit/025d9a9cc79809d52fe1413860838d9b925e49a3))
* Implement timeline store with state management and data fetching actions ([f84eb76](https://github.com/NexusWeave/webapp-Portfolio/commit/f84eb7678d6eac10a3e60a3a81d35b5610430dde))
* **Index:** Add image with caption and dedicated autobiography section ([93e2aed](https://github.com/NexusWeave/webapp-Portfolio/commit/93e2aed8324eb6ed768647e24b5407d7f54b2c63))
* **index:** Add wrapper and class for article section styling ([9b4a6ff](https://github.com/NexusWeave/webapp-Portfolio/commit/9b4a6fff2d82bc41f452c2a3d7d89cb3717c936d))
* **index:** Add wrapper and class for article section styling ([5433750](https://github.com/NexusWeave/webapp-Portfolio/commit/5433750b24c931d31b5b1d8a78031375bee91621))
* **index:** Import article stylesheets ([734f6d5](https://github.com/NexusWeave/webapp-Portfolio/commit/734f6d57b276db04ae311c73c81093786451bfb3))
* Initialize "aktuelt" page structure ([b7e9415](https://github.com/NexusWeave/webapp-Portfolio/commit/b7e94152fbea6041a8ec53c2e1c896db47018d72))
* Initialize developer profile page structure ([6c63c4d](https://github.com/NexusWeave/webapp-Portfolio/commit/6c63c4d915b9971e0d1ccafdac349a9d0c8067b8))
* Integrate Pinia for state management and update timeline data fetching logic ([2c6ee3c](https://github.com/NexusWeave/webapp-Portfolio/commit/2c6ee3ca008b7cd3f1d46ef836cc3e210a514b9e))
* **mixins:** Added a mixin-style for circle-boarders ([f7ae39d](https://github.com/NexusWeave/webapp-Portfolio/commit/f7ae39ddf10a74b493276e7ebe336e478a1484f2))
* **Model:** ✨ Enhance `github_model` with Pydantic V2 Migration and Support for Github Languages ([73437b4](https://github.com/NexusWeave/webapp-Portfolio/commit/73437b42096326874fb57c3d33e51c347cb8c869))
* **Model:** ✨ Introducing the Model for Heavy Endpoint ([52570c2](https://github.com/NexusWeave/webapp-Portfolio/commit/52570c2dd2bb0f2786d4924521232ba544a4c1f7))
* **nuxt.config:** Add support for backend APIs ([033f4bc](https://github.com/NexusWeave/webapp-Portfolio/commit/033f4bc888f3f43f86de44a83091233fb4cbabc9))
* **package.json:** adding cl-update command for changelog. ([808f6c3](https://github.com/NexusWeave/webapp-Portfolio/commit/808f6c39735e44931bb20c84ba92f61ea38ac554))
* **portfolio-ux-visualization:** added temp image ([5883eab](https://github.com/NexusWeave/webapp-Portfolio/commit/5883eabf2ae052118344c1a29e6a24c6ae2ea9e6))
* **preprosessor-utils:** Add reference mapping and remove unused types ([37cefdf](https://github.com/NexusWeave/webapp-Portfolio/commit/37cefdf914166b12dee3ee73d7911fc93480ad02))
* **Progress:** Inititalized a new Utils component Progress.vue ([0a0f4b0](https://github.com/NexusWeave/webapp-Portfolio/commit/0a0f4b0920f47d2e8c937eb43b180bb754963b22))
* **props:** added interface for ProgressProps. ([fe406da](https://github.com/NexusWeave/webapp-Portfolio/commit/fe406da581ce3eaa521abfaa87ecff2ed97ec18a))
* Refactor academic components to enhance timeline visibility and structure ([62328c5](https://github.com/NexusWeave/webapp-Portfolio/commit/62328c5b77da41b12a17460e4ab81c87cdc2bbc7))
* Refactor flexbox styles to use mixins for improved consistency and maintainability ([0649a00](https://github.com/NexusWeave/webapp-Portfolio/commit/0649a0035755d0906f91de6687140d1a6485fd9a))
* Refactor flexbox styles to utilize variables for improved maintainability ([22b8ea0](https://github.com/NexusWeave/webapp-Portfolio/commit/22b8ea0513b3b28e3d6122c325ced22812974b74))
* Refactor timeline styles for improved layout and transitions ([694bcd6](https://github.com/NexusWeave/webapp-Portfolio/commit/694bcd63a13471940dbffdf0ac01cf99ad08cd64))
* **references:** Initializing interface for References Items ([73e44b3](https://github.com/NexusWeave/webapp-Portfolio/commit/73e44b330099fce2dd9b0e4bc67e946179905f5a))
* Remove unused import for improved code clarity ([93b467a](https://github.com/NexusWeave/webapp-Portfolio/commit/93b467a54d0243001d8010b6c6c06bae8bf84a1a))
* Remove unused timeline styles and clean up SASS imports ([bd1e773](https://github.com/NexusWeave/webapp-Portfolio/commit/bd1e7733a3ac58b9bea2b0e071bb8ff383029173))
* Rename color variables for consistency and clarity ([bf5244e](https://github.com/NexusWeave/webapp-Portfolio/commit/bf5244e6108e8565c3ad2f33aae1700224a085d3))
* Reorder color variables for consistency and clarity ([61f4616](https://github.com/NexusWeave/webapp-Portfolio/commit/61f4616a10961b0ce2266d40b3f2dae5c9a75ad6))
* Reorder SASS imports for improved organization and clarity ([bbfc673](https://github.com/NexusWeave/webapp-Portfolio/commit/bbfc673b73a51117fa4683fd49b5e6cfd7cd21fd))
* **routing:** ✨ Introduced new Route to fetch Github Repositories ([f5a803c](https://github.com/NexusWeave/webapp-Portfolio/commit/f5a803c92d9d98f6dd570e81c7b7672e8093dc1c))
* **Scheduler:** ✨ Introducing APScheduler for async job management ([652df3b](https://github.com/NexusWeave/webapp-Portfolio/commit/652df3b24463852fd5b1852e9d346c356e0e4b72))
* **Services:** ✨ Introducing GithubServices as a dedicated database Service ([ef52304](https://github.com/NexusWeave/webapp-Portfolio/commit/ef52304cfa31a15a9dd18d41a86e82de6844116a))
* **Services:** 🎨 Migrating Api caller from synchronous to asychronous operation ([8e14b69](https://github.com/NexusWeave/webapp-Portfolio/commit/8e14b694b76d25ebf356d18c9fb98d5a8c365b04))
* **tech-content:** Initialize dedicated styles for script languages ([ccf4246](https://github.com/NexusWeave/webapp-Portfolio/commit/ccf42461ad3e04f8afc773eb3a40977a95ba8dea))
* **tina/config:** Initialize content reference logic ([9c2b6b8](https://github.com/NexusWeave/webapp-Portfolio/commit/9c2b6b8dfeb30f3f4a3dccc5093a91bc6a58611d))
* **type/props:** Initialize FigureProps-interface ([74cd6af](https://github.com/NexusWeave/webapp-Portfolio/commit/74cd6af976ad22728fe75a45863220cd0c8f8c27))
* **type/props:** Introduce dedicated interfaces for list and icon properties ([13e9e1d](https://github.com/NexusWeave/webapp-Portfolio/commit/13e9e1da719a5f3d258213721c56963a4c53c01d))
* **types/props:** Initialize type-safe interface for AnchorItem ([b765238](https://github.com/NexusWeave/webapp-Portfolio/commit/b76523848694cbf316a233e667c0678c766af94a))
* **types/props:** Initialize type-safe interface for Carousel component ([7d1805f](https://github.com/NexusWeave/webapp-Portfolio/commit/7d1805f065ef024cfa574d55fcd31bdac8928e7d))
* **types/props:** Introducing prop definition for Navigation Menu `NavProp` ([6bba009](https://github.com/NexusWeave/webapp-Portfolio/commit/6bba009e157ebdec3be8bc17968dfc16ed115679))
* Update comments and reformat color variable section for clarity ([4dc05bf](https://github.com/NexusWeave/webapp-Portfolio/commit/4dc05bf646790905abbd4c7bb7b86ec03a078f30))
* Update CS50x course details and improve visibility toggle functionality ([bdbd883](https://github.com/NexusWeave/webapp-Portfolio/commit/bdbd88382918d952b3243c65f5148445f3904dbf))
* Update media-queries mixin for improved breakpoint handling and add flexbox generator mixin ([667d014](https://github.com/NexusWeave/webapp-Portfolio/commit/667d014beb15faef5c34dfc72b36ce4218b8ddfa))
* Update timeline data structure and enhance internship details ([65bc194](https://github.com/NexusWeave/webapp-Portfolio/commit/65bc194e271a053a041b106c9b0d81d5b8baa1aa))
* **utilities/utilities.ts:** Introducing  a helper function to fetch porgamming type by an array. ([65eb4d9](https://github.com/NexusWeave/webapp-Portfolio/commit/65eb4d9f078db68aae81c331c39e60cc02bdf63f))
* **Utils/List:** Introduce styling classes for `UL` and `LI` elements ([44e0a5e](https://github.com/NexusWeave/webapp-Portfolio/commit/44e0a5ef931164401a7374c6f89e2a50b8fac48b))
* **utils/preprosessor-utils:** Initialize data mapping function ([5eba93c](https://github.com/NexusWeave/webapp-Portfolio/commit/5eba93cf4cb851089333e5d9a924f044302b4855))
* **utils/utils.js:** Initialize helper functions utility script ([da1cc14](https://github.com/NexusWeave/webapp-Portfolio/commit/da1cc1497f57d6ed7fa8438e72e336843ace891d))
* **utils:** Initialize array sequence command and timer utility ([54be2b0](https://github.com/NexusWeave/webapp-Portfolio/commit/54be2b02f2679349a71b41d69e5864b6a3f4d4dd))


### Refactor

* Move 'pages' directory outside of 'app/' folder ([f8afe35](https://github.com/NexusWeave/webapp-Portfolio/commit/f8afe3555cd0e84995eef9b6beb527a4d84e40db)), closes [hi#level](https://github.com/hi/issues/level)


### Reverts

* **Services:** ⏪️ Reverted the Handling of `req.json()` to Synchronous Mode, ([f1db8c1](https://github.com/NexusWeave/webapp-Portfolio/commit/f1db8c1602328629b2da595f4e4b31d72980ee44))


### Styles

* **components | sass:** Update classes and redesign card component ([7c8ae5f](https://github.com/NexusWeave/webapp-Portfolio/commit/7c8ae5f72254efdc001be1758a0d0c17e033a908))
* **tech-color:** Update tech-specific colors for consistency ([45a0bdf](https://github.com/NexusWeave/webapp-Portfolio/commit/45a0bdf2d6566778aff8b209e9a7abc78147abc4))


### BREAKING CHANGES

* **components | sass:** The visual appearance of the card components has changed.
* **package.json:** The primary local running command is now `serve` and not `start`.
* **config:** The main configuration file now relies on imports for Collection and Tag definitions.
* **rename:** All file imports, routing configurations, and internal references relying on the old name (`index`) must be updated to use the new name (`personal`).
* **rename:** All file imports, routing configurations, and internal references relying on the old name (`folio`) must be updated to use the new name (`index`).
* **tech-color:** visual appearance of tech-related elements and icons has changed.
* **utils/List:** None. (This is an internal refactoring.)
* **cleanup:** The `Anchor` interface now strictly requires the `label` property to be defined. Any consuming component that previously omitted the label will now cause a type error.
* **Header:** The primary navigation path for the portfolio section has changed from `/portfolio` to `/folio`. Any internal or external links pointing to the old path must be updated.
* **tina/config:** This commit removes the `tags` field from the TinaCMS configuration file. And updates name field for `updated` to `end`  in timeline items.
* **types/props:** The data type expected for all 'date' properties across the application (e.g., in DateYearProps and TimelineItem) has changed from an object structure to a primitive string. All consuming components and data sources must be updated to pass a standard string representation of the date
* **preprocessor-utils:** The file path for 'preprocessor-utils.ts' has changed from 'utils/...' to 'composable/...'. All importing files have been updated to reflect this change.
* This is purely a structural fix to the component template/behavior. No API changes were made.
* **utils/preprosessor-utils:** None. (This commit introduces the function, establishing 'mapTimeline' as the new canonical source for timeline data mapping logic.)
* **cleanup:** None. (The function logic remains, but the import path for this data processing logic has changed.)'pages/index.vue' to the new 'utils/preprosessor-utils.ts' file.
* **cleanup:** None (Function logic remains, but file paths for imports have changed and must be updated.)
* **timeline/Card:** The component now relies entirely on the newly updated
data structure (TimelineItem) from previous commits. If consuming
components haven't updated their data fetching to the new schema, they
will break.
* **components/Timeline:** The 'toggleVisibility' event emitter was removed.
Visibility state is now managed internally, fundamentally changing the
component's public API and interaction with its parent.
* **timeline/filter:** None.
* **Date/Year:** The year property is now a reactive (computed) property.
Consumers relying on the previous static or direct property access may
need updates.
* **types/props:** The data type expected by TimelineProps has fundamentally
changed from AcademicCollectionItem to the generalized TimelineItem. All
code relying on the old interface must be updated to consume the new type
structure.
* **types/timeline:** The structure of the 'TimelineItem' interface has been updated to match the 'AcademicCollectionItem' schema. All components and code relying on the old interface must be updated to consume the new, simplified data structure.
* **techstack:** The raw techstack data format has changed from a simple list to an array of objects.
The legacy 2D array structure is deprecated, any code consuming this data must be updated to handle the new object structure and the enforced uppercase naming convention.
* Name references within the configuration schema have been modified. Any code querying or referencing these specific fields must be updated.
* **cleanup:** The data fetching mechanism and all related components must now use the Markdown-based logic; references to the old JSON files must be updated.
* **utilities/utilities.ts:** The ability to fetch programming language type data by name has been added as new functionality.
* NO FUNCTIONAL CHANGES MADE (Only organizational changes to the configuration structure and comments)
* **pages/index:** The component structure relying on Pinia state has changed. Additionally, the toggle logic has been removed, its currently broken, and portefolio elements are now sourced through the `achievements` collection
* **timeline/Filter:** The internal paths to data objects have been updated and must be followed by consumers of this component
* **content/blog/dev_journey:** The internal data structure (front matter, file organization) for these blog posts has changed.
* **utils/Header:** None. (Existing links/routes were not changed, only display names and order.)
* **tina/config:** The structure of the content configuration in tina/config.ts has changed, impacting how content is queried and edited.
* **content-structure:** File paths and data format for academic achievements have changed. Please update any references accordingly.
* **content/dev :** File paths for personal profiles have changed, and been updated.
* **content/dev :** File paths for developer profiles have changed, and been updated.
* While the underlying data keys were largely preserved, the explicit removal of the **`institution` field** and the introduction of the **`id` field** means any validation or display logic relying on the old structure must be updated.

Note: Underlaying logic updated !
* While the underlying data keys were largely preserved, the explicit removal of the **`institution` field** and the introduction of the **`id` field** means any validation or display logic relying on the old structure must be updated.

Note: Underlaying logic updated !
* None. The external API (props, events) of the Card component remains unchanged, ensuring no impact on consuming views.
* **utils/utils.js:** None. All consuming files have been updated to import helper functions from the new path.
* **config.ts:** Code consuming or relying on the old configuration keys (`C#`, `institution`, `project_link`, `summary`) must be updated to use the new standardized keys (`.NET`, `name`, `href`, `description`).
* **portfolioStore.ts:** None. This refactoring is internal to the store and does not change how the store is consumed by components, as all consumer code is expected to be updated for the future data model change anyway.
* None.
* All files importing or using the old `Academic` and `Achievements` components is already updated to use the new `Timeline` component.
* All relative file paths and import statements relying on the old `app/pages/` structure will be broken. Developers must re-test routing and page-specific imports after merging this change.
