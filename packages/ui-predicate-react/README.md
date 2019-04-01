# ui-predicate-react

> Finally a predicate UI component for the Web, for React

[![NPM](https://img.shields.io/npm/v/ui-predicate-react.svg)](https://www.npmjs.com/package/ui-predicate-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ui-predicate-react
```

or

```bash
yarn add ui-predicate-react
```

## Usage

```jsx
import React, { Component } from 'react';

import { UIPredicate } from 'ui-predicate-react';

const columns = [
  /* insert columns... see ui-predicate docs */
];

class Example extends Component {
  render() {
    return <UIPredicate columns={columns} />;
  }
}
```

## License

MIT © [FGRibreau](https://github.com/FGRibreau)
