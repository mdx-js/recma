# recma-minify

[![Build][badge-build-image]][badge-build-url]
[![Coverage][badge-coverage-image]][badge-coverage-url]
[![Downloads][badge-downloads-image]][badge-downloads-url]
[![Size][badge-size-image]][badge-size-url]
[![Sponsors][badge-sponsors-image]][badge-collective-url]
[![Backers][badge-backers-image]][badge-collective-url]
[![Chat][badge-chat-image]][badge-chat-url]

**[recma][github-recma]** plugin to minify code.

## Contents

* [What is this?](#what-is-this)
* [When should I use this?](#when-should-i-use-this)
* [Install](#install)
* [Use](#use)
* [API](#api)
  * [`unified().use(recmaMinify[, options])`](#unifieduserecmaminify-options)
  * [`Options`](#options)
* [Types](#types)
* [Compatibility](#compatibility)
* [Security](#security)
* [Contribute](#contribute)
* [License](#license)

## What is this?

This package is a [unified][github-unified]
([recma][github-recma])
that minifies code with [Terser][github-terser].

## When should I use this?

You can use this if you want to make code smaller.

You can alternatively use [`terser`][github-terser] manually if you don’t use
`recma`.

## Install

This package is [ESM only][github-gist-esm].
In Node.js (version 16+),
install with [npm][npm-install]:

```sh
npm install recma-minify
```

In Deno with [`esm.sh`][esmsh]:

```js
import recmaMinify from 'https://esm.sh/recma-minify@1'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import recmaMinify from 'https://esm.sh/recma-minify@1?bundle'
</script>
```

## Use

Say we have the following module `example.js`:

```js
import recmaMinify from 'recma-minify'
import recmaParse from 'recma-parse'
import recmaStringify from 'recma-stringify'
import {unified} from 'unified'

const file = await unified()
  .use(recmaParse, {module: true})
  .use(recmaMinify, {
    compress: true,
    ecma: 2020,
    mangle: true,
    toplevel: true
  })
  .use(recmaStringify)
  .process(
    'console.log(sum(2, 3)); function sum(left, right) { return left + right }'
  )

console.log(String(file))
```

…running that with `node example.js` yields:

```js
console.log(2 + 3);
```

## API

This package exports no identifiers.
The default export is [`recmaMinify`][api-recma-minify].

### `unified().use(recmaMinify[, options])`

Plugin to minify code.

###### Parameters

* `options` ([`Options`][api-options], optional)
  — configuration

###### Returns

Transform ([`Transformer`][github-unified-transformer]).

### `Options`

Configuration (TypeScript type).

Same as [`MinifyOptions`][github-terser-minify-options] from
[`terser`][github-terser] except that you do not need to pass
`format`, `module`, `output`, `parse`, or `sourceMap`;
you should probably pass `compress: true`, `ecma: 2020`,
`mangle: true`, and `toplevel: true`.

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`Options`][api-options].

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release,
we drop support for unmaintained versions of Node.
This means we try to keep the current release line,
`recma-minify@1`,
compatible with Node.js 16.

## Security

As **recma** works on JS and evaluating JS is unsafe,
use of recma can also be unsafe.
Do not evaluate unsafe code.

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

[api-options]: #options

[api-recma-minify]: #unifieduserecmaminify-options

[badge-backers-image]: https://opencollective.com/unified/backers/badge.svg

[badge-build-image]: https://github.com/mdx-js/recma/actions/workflows/main.yml/badge.svg

[badge-build-url]: https://github.com/mdx-js/recma/actions

[badge-collective-url]: https://opencollective.com/unified

[badge-coverage-image]: https://img.shields.io/codecov/c/github/mdx-js/recma.svg

[badge-coverage-url]: https://codecov.io/github/mdx-js/recma

[badge-downloads-image]: https://img.shields.io/npm/dm/recma-minify.svg

[badge-downloads-url]: https://www.npmjs.com/package/recma-minify

[badge-size-image]: https://img.shields.io/bundlejs/size/recma-minify

[badge-size-url]: https://bundlejs.com/?q=recma-minify

[badge-sponsors-image]: https://opencollective.com/unified/sponsors/badge.svg

[badge-chat-image]: https://img.shields.io/badge/chat-discussions-success.svg

[badge-chat-url]: https://github.com/mdx-js/mdx/discussions

[esmsh]: https://esm.sh

[file-license]: license

[github-gist-esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[github-recma]: https://github.com/mdx-js/recma

[github-terser-minify-options]: https://github.com/terser/terser#minify-options

[github-terser]: https://github.com/terser/terser

[github-unified-transformer]: https://github.com/unifiedjs/unified#transformer

[github-unified]: https://github.com/unifiedjs/unified

[health-coc]: https://github.com/mdx-js/.github/blob/main/code-of-conduct.md

[mdxjs-contribute]: https://mdxjs.com/community/contribute/

[mdxjs-support]: https://mdxjs.com/community/support/

[npm-install]: https://docs.npmjs.com/cli/install

[typescript]: https://www.typescriptlang.org

[wooorm]: https://wooorm.com
