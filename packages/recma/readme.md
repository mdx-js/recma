# recma

[![Build][badge-build-image]][badge-build-url]
[![Coverage][badge-coverage-image]][badge-coverage-url]
[![Downloads][badge-downloads-image]][badge-downloads-url]
[![Size][badge-size-image]][badge-size-url]
[![Sponsors][badge-sponsors-image]][badge-collective-url]
[![Backers][badge-backers-image]][badge-collective-url]
[![Chat][badge-chat-image]][badge-chat-url]

**[unified][github-unified]** processor to add support for parsing and
serializing JavaScript.

## Contents

* [What is this?](#what-is-this)
* [When should I use this?](#when-should-i-use-this)
* [Install](#install)
* [Use](#use)
* [API](#api)
  * [`recma()`](#recma-1)
* [Syntax](#syntax)
* [Syntax tree](#syntax-tree)
* [Types](#types)
* [Compatibility](#compatibility)
* [Security](#security)
* [Contribute](#contribute)
* [License](#license)

## What is this?

This package is a [unified][github-unified] processor with support for parsing
JavaScript as input and serializing JavaScript as output by using unified with
[`recma-parse`][github-recma-parse] and
[`recma-stringify`][github-recma-stringify].

See [the monorepo readme][github-recma] for info on what the recma ecosystem is.

## When should I use this?

You can use this package when you want to use unified,
have JS as input,
and want JS as output.
This package is a shortcut for
`unified().use(recmaParse).use(recmaStringify)`.
When the input isn’t JS
(meaning you don’t need `recma-parse`)
or the output is not JS
(you don’t need `recma-stringify`),
it’s recommended to use `unified` directly.

## Install

This package is [ESM only][github-gist-esm].
In Node.js (version 16+),
install with [npm][npm-install]:

```sh
npm install recma
```

In Deno with [`esm.sh`][esmsh]:

```js
import {recma} from 'https://esm.sh/recma@0'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {recma} from 'https://esm.sh/recma@0?bundle'
</script>
```

## Use

Say we have the following module `example.js`:

```js
import recmaBuildJsx from 'recma-build-jsx'
import recmaJsx from 'recma-jsx'
import {recma} from 'recma'

const file = await recma()
  .use(recmaJsx)
  .use(recmaBuildJsx)
  .process('console.log(<em>Hi!</em>)')

console.log(String(file))
```

…running that with `node example.js` yields:

```js
console.log(React.createElement("em", null, "Hi!"));
```

## API

This package exports the identifier [`recma`][api-recma].
There is no default export.

### `recma()`

Create a new unified processor that already uses
[`recma-parse`][github-recma-parse] and
[`recma-stringify`][github-recma-stringify].

You can add more plugins with `use`.
See [`unified`][github-unified] for more information.

## Syntax

JS is parsed and serialized according to [ECMA-262][tc39-ecma-262],
which is also followed by all browsers and engines such as Node.js.

## Syntax tree

The syntax tree format used in recma is [esast][github-esast] and
[estree][github-estree].

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release,
we drop support for unmaintained versions of Node.
This means we try to keep the current release line,
`recma@0`,
compatible with Node.js 16.

## Security

As **recma** works on JS and evaluating JS is unsafe,
use of recma can also be unsafe.
Do not evaluate unsafe code.

Use of recma plugins could also open you up to other attacks.
Carefully assess each plugin and the risks involved in using them.

For info on how to submit a report, see our [security policy][health-security].

## Contribute

See [§ Contribute][mdxjs-contribute] on our site for ways to get started.
See [§ Support][mdxjs-support] for ways to get help.

This project has a [code of conduct][health-coc].
By interacting with this repository,
organization,
or community you agree to abide by its terms.

## License

[MIT][file-license] © [Titus Wormer][wooorm]

<!-- Definitions -->

[api-recma]: #recma-1

[badge-backers-image]: https://opencollective.com/unified/backers/badge.svg

[badge-build-image]: https://github.com/mdx-js/recma/actions/workflows/main.yml/badge.svg

[badge-build-url]: https://github.com/mdx-js/recma/actions

[badge-collective-url]: https://opencollective.com/unified

[badge-coverage-image]: https://img.shields.io/codecov/c/github/mdx-js/recma.svg

[badge-coverage-url]: https://codecov.io/github/mdx-js/recma

[badge-downloads-image]: https://img.shields.io/npm/dm/recma.svg

[badge-downloads-url]: https://www.npmjs.com/package/recma

[badge-size-image]: https://img.shields.io/bundlejs/size/recma

[badge-size-url]: https://bundlejs.com/?q=recma

[badge-sponsors-image]: https://opencollective.com/unified/sponsors/badge.svg

[badge-chat-image]: https://img.shields.io/badge/chat-discussions-success.svg

[badge-chat-url]: https://github.com/mdx-js/mdx/discussions

[esmsh]: https://esm.sh

[file-license]: license

[github-esast]: https://github.com/syntax-tree/esast

[github-estree]: https://github.com/estree/estree

[github-gist-esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[github-recma]: https://github.com/mdx-js/recma

[github-recma-parse]: https://github.com/mdx-js/recma/tree/main/packages/recma-parse

[github-recma-stringify]: https://github.com/mdx-js/recma/tree/main/packages/recma-stringify

[github-unified]: https://github.com/unifiedjs/unified

[health-coc]: https://github.com/mdx-js/.github/blob/main/code-of-conduct.md

[health-security]: https://github.com/mdx-js/.github/blob/main/security.md

[mdxjs-contribute]: https://mdxjs.com/community/contribute/

[mdxjs-support]: https://mdxjs.com/community/support/

[npm-install]: https://docs.npmjs.com/cli/install

[tc39-ecma-262]: https://tc39.es/ecma262/multipage/

[typescript]: https://www.typescriptlang.org

[wooorm]: https://wooorm.com
