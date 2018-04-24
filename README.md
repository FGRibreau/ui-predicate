# ui-predicate

[![Codecov branch](https://img.shields.io/codecov/c/github/fgribreau/ui-predicate/master.svg)](https://codecov.io/gh/fgribreau/ui-predicate) [![Documentation](https://img.shields.io/badge/documentation-yes-brightgreen.svg)](https://fgribreau.github.io/ui-predicate/api/) [![CircleCI branch](https://img.shields.io/circleci/project/github/FGRibreau/ui-predicate/master.svg)](https://circleci.com/gh/FGRibreau/ui-predicate)

Finally a f\*ck\*n Predicates UI component for the Web.

# High level packages

Packages | description | badges
------------ | ------------- | -------------
**[ui-predicate-vue](packages/ui-predicate-vue)** | ui-predicate for VueJS | [![npm version](https://img.shields.io/npm/v/ui-predicate-core.svg)](https://www.npmjs.com/package/ui-predicate-core) ![npm](https://img.shields.io/npm/dm/ui-predicate-vue.svg) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/ui-predicate-core/badge)](https://www.jsdelivr.com/package/npm/ui-predicate-core)
**[ui-predicate-react](packages/ui-predicate-react)** | ui-predicate for React | [![npm version](https://img.shields.io/npm/v/ui-predicate-react.svg)](https://www.npmjs.com/package/ui-predicate-react) ![npm](https://img.shields.io/npm/dm/ui-predicate-react.svg) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/ui-predicate-react/badge)](https://www.jsdelivr.com/package/npm/ui-predicate-react)
**[ui-predicate-angular](packages/ui-predicate-angular)** | ui-predicate for Angular | [![npm version](https://img.shields.io/npm/v/ui-predicate-angular.svg)](https://www.npmjs.com/package/ui-predicate-angular) ![npm](https://img.shields.io/npm/dm/ui-predicate-angular.svg) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/ui-predicate-angular/badge)](https://www.jsdelivr.com/package/npm/ui-predicate-angular)
**[ui-predicate-hyperhtml](packages/ui-predicate-hyperhtml)** | ui-predicate for HyperHTML | [![npm version](https://img.shields.io/npm/v/ui-predicate-hyperhtml.svg)](https://www.npmjs.com/package/ui-predicate-hyperhtml) ![npm](https://img.shields.io/npm/dm/ui-predicate-hyperhtml.svg) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/ui-predicate-hyperhtml/badge)](https://www.jsdelivr.com/package/npm/ui-predicate-hyperhtml)

# Low-level packages

Packages | description | badges
------------ | ------------- | -------------
**[ui-predicate-core](packages/ui-predicate-core)** | low-level agnostic library | [![npm version](https://img.shields.io/npm/v/ui-predicate-core.svg)](https://www.npmjs.com/package/ui-predicate-core) ![npm](https://img.shields.io/npm/dm/ui-predicate-core.svg) [![jsDelivr](https://data.jsdelivr.com/v1/package/npm/ui-predicate-core/badge)](https://www.jsdelivr.com/package/npm/ui-predicate-core)

# Todo (will accept a PR for it)

- [ ] ui-predicate-traverse
- [ ] quality: eslint support
- [ ] build size: treeshaking support
- [ ] ui-predicate-react
- [ ] ui-predicate-angular
- [ ] ui-predicate-hyperHTML

## The story

UI-Predicate is the result of years of implementation from scratch of the same UI component, again and again and again.

It started in 2011, I had to build a filtering system for my first startup Bringr so our customers could build their own filters from our social media data stream, at that time the first version was in jQuery. Then I had to reimplement it in BackboneJS for [Redsmin](https://redsmin.com) for the alerting part, then at [iAdvize](https://www.iadvize.com) where I build the first version of their customer targeting engine and now at [Ouest-France](https://ouest-france.fr) a french newspaper where I want to give this awesome power to our internal users so they can build their own filter above our knowledge graph.

Each time the front library was different, I think we should all build low-level, agnostic, libraries of our components and then build upon them adapters for major front library (e.g. React, Vue)... At least that's what I'm doing for ui-predicate 😋
