# ui-predicate-core

Low-level ui-predicate API.

# Installation

ui-predicate is available on [npm repository](https://www.npmjs.com/package/ui-predicate-core).

using yarn:

```shell
$ yarn add ui-predicate-core
```

using npm:

```shell
$ npm install ui-predicate-core
```

You can also directly download [sources](https://github.com/fgribreau/ui-predicate/releases) or use bundles available on [jsDelivr](https://www.jsdelivr.com/package/npm/ui-predicate-core).

## Usage

ES modules:

```js
import {PredicateCore} from 'ui-predicate-core'

PredicateCore({
  data: [/* */],
  config:{ /* ... */ }
}).then(api => {
  // use api here
  console.log(api);
}, error => {
  // UIPredicateCore will yield a rejected promise if something went wrong at initialization time
  console.error(error);
});
```

CommonJS:  

```js
const {PredicateCore} = require('ui-predicate-core');

PredicateCore({
  data: [/* */],
  config:{ /* ... */ }
}).then(api => {
  // use api here
  console.log(api);
}, error => {
  // UIPredicateCore will yield a rejected promise if something went wrong at initialization time
  console.error(error);
});
```



### Example

Learn more about what ui-predicate can do in the [Getting started](https://ui-predicate.fgribreau.com/ui-predicate-vue/latest#/examples).

Feel free to [try ui-predicate on runkit](https://npm.runkit.com/ui-predicate-core).

## Documentation

### API

The detailed generated [API documentation is available here](https://ui-predicate.fgribreau.com/ui-predicate-core/latest).

Looking for older versions API documentation? Links are available [here](https://ui-predicate.fgribreau.com/).

<!-- ## Performances

(todo) -->

## Contributing

We want contributing to ui-predicate to be fun, enjoyable, and educational for anyone, and everyone.

### [Code of Conduct](https://github.com/fgribreau/ui-predicate/blob/master/.github/CODE_OF_CONDUCT.md)

In the interest of fostering an open and welcoming environment, we have adopted a Code of Conduct that we expect project participants to commit to. Please read the [full text](https://github.com/fgribreau/ui-predicate/blob/master/.github/CODE_OF_CONDUCT.md) so that you can understand what behavior will and will not be tolerated.

### [Contributing guide](https://github.com/fgribreau/ui-predicate/blob/master/.github/CONTRIBUTING.md)

If you are interested in contributing to ui-predicate, please read our [contributing guide](https://github.com/fgribreau/ui-predicate/blob/master/.github/CONTRIBUTING.md) to learn more about how to suggest bugfixes and improvements.

## License

ui-predicate is [MIT licensed](https://github.com/fgribreau/ui-predicate/blob/master/LICENSE.md).
