# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.6.2"></a>
## [0.6.2](https://github.com/FGRibreau/ui-predicate/compare/ui-predicate-core@0.6.1...ui-predicate-core@0.6.2) (2018-08-31)


### Bug Fixes

* examples ([fed36a6](https://github.com/FGRibreau/ui-predicate/commit/fed36a6))
* missing default_argument component overriding and predicate-options display ([#12](https://github.com/FGRibreau/ui-predicate/issues/12)) ([82df478](https://github.com/FGRibreau/ui-predicate/commit/82df478))
* require ([bc16be0](https://github.com/FGRibreau/ui-predicate/commit/bc16be0))




<a name="0.6.1"></a>
## [0.6.1](https://github.com/FGRibreau/ui-predicate/compare/ui-predicate-core@0.6.0...ui-predicate-core@0.6.1) (2018-08-29)


### Bug Fixes

* **core:** remove build script after installing the package ([0d00b32](https://github.com/FGRibreau/ui-predicate/commit/0d00b32))




<a name="0.6.0"></a>
# [0.6.0](https://github.com/FGRibreau/ui-predicate/compare/ui-predicate-core@0.5.0...ui-predicate-core@0.6.0) (2018-08-22)


### Bug Fixes

* bugs (assign instead of merge, merge that was overriding ui for every instance of ui-predicate), simpler storybook ([757db43](https://github.com/FGRibreau/ui-predicate/commit/757db43))
* test snapshot ([7ac4ccb](https://github.com/FGRibreau/ui-predicate/commit/7ac4ccb))
* ui-predicate-core bring back 100% coverage ([db48541](https://github.com/FGRibreau/ui-predicate/commit/db48541))
* ui-predicate-core fix tests ([8315520](https://github.com/FGRibreau/ui-predicate/commit/8315520))


### Features

* **ui-component-overriding:** add possibility to override ui default components ([6ff449d](https://github.com/FGRibreau/ui-predicate/commit/6ff449d))




<a name="0.5.0"></a>
# [0.5.0](https://github.com/FGRibreau/ui-predicate/compare/ui-predicate-core@0.3.0...ui-predicate-core@0.5.0) (2018-08-06)


### Bug Fixes

* ui-predicate-core remove weird package.json parameter ([d02a30f](https://github.com/FGRibreau/ui-predicate/commit/d02a30f))


### Features

* add eslint & fix lint on ui-predicate-core, new /getting-started for ui-predicate-vue exposed on public doc, clean cross-package doc generation, better jsdoc for ui-predicate-vue, fixed linting on ui-predicate-vue ([997ebca](https://github.com/FGRibreau/ui-predicate/commit/997ebca))
* ui-predicate-core build compiled library ([47a14d4](https://github.com/FGRibreau/ui-predicate/commit/47a14d4))




<a name="0.4.0"></a>
# [0.4.0](https://github.com/FGRibreau/ui-predicate/compare/ui-predicate-core@0.3.0...ui-predicate-core@0.4.0) (2018-08-06)


### Bug Fixes

* ui-predicate-core remove weird package.json parameter ([1d476f2](https://github.com/FGRibreau/ui-predicate/commit/1d476f2))


### Features

* add eslint & fix lint on ui-predicate-core, new /getting-started for ui-predicate-vue exposed on public doc, clean cross-package doc generation, better jsdoc for ui-predicate-vue, fixed linting on ui-predicate-vue ([997ebca](https://github.com/FGRibreau/ui-predicate/commit/997ebca))




<a name="0.3.0"></a>
# [0.3.0](https://github.com/FGRibreau/ui-predicate/compare/ui-predicate-core@0.2.0...ui-predicate-core@0.3.0) (2018-05-01)


### Bug Fixes

* way better, cleaner & simpler JSON output ([2d391d6](https://github.com/FGRibreau/ui-predicate/commit/2d391d6))


### Features

* 😱😱😱 7 years after my first implementation with jQuery, here we come, a fully-featured UI Predicate component from scratch finally written in 10 non-consecutive days with an agnostic core (#SoC) and a first UI Framework adapter (#futurproof) for VueJS. FINALLY. This is soOOOOOOOOOOOOOOOOOOOOOOOOOOoooooooo exciting! ([5db8f1a](https://github.com/FGRibreau/ui-predicate/commit/5db8f1a))
* PredicateCore can now load data! ([934c7ab](https://github.com/FGRibreau/ui-predicate/commit/934c7ab))




<a name="0.2.0"></a>
# [0.2.0](https://github.com/FGRibreau/ui-predicate/compare/ui-predicate-core@0.1.0...ui-predicate-core@0.2.0) (2018-04-29)


### Bug Fixes

* corner-case : if we remove a predicate from a CompoundPredicate and that it was the last, then we should also remove the parent CompoundPredicate and recurse until this statement stay no more true ([c913de8](https://github.com/FGRibreau/ui-predicate/commit/c913de8))
* make vuejs events same as core events (#SSoT) ([9ac3690](https://github.com/FGRibreau/ui-predicate/commit/9ac3690))


### Features

* add $canBeRemoved flag ([7429ef6](https://github.com/FGRibreau/ui-predicate/commit/7429ef6))
* docs with netlify 😍 ([b8a30b9](https://github.com/FGRibreau/ui-predicate/commit/b8a30b9))
* logicalTypes support 🎉 ([069ffab](https://github.com/FGRibreau/ui-predicate/commit/069ffab))
* storybook, storyshotos, image-snapshots ([ee2dfe6](https://github.com/FGRibreau/ui-predicate/commit/ee2dfe6))
* support for rules ([bf233da](https://github.com/FGRibreau/ui-predicate/commit/bf233da))
* support of on/once/off event handling and `changed` event ([5593c99](https://github.com/FGRibreau/ui-predicate/commit/5593c99))
