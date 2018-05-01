# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
