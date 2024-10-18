# recma

[![Build][badge-build-image]][badge-build-url]
[![Coverage][badge-coverage-image]][badge-coverage-url]
[![Downloads][badge-downloads-image]][badge-downloads-url]
[![Size][badge-size-image]][badge-size-url]
[![Sponsors][badge-sponsors-image]][badge-collective-url]
[![Backers][badge-backers-image]][badge-collective-url]
[![Chat][badge-chat-image]][badge-chat-url]

**recma** is a tool that transforms JS with plugins.
These plugins can inspect and change the JS.
You can use recma on the server,
the client,
CLIs,
deno,
etc.

## Intro

recma is an ecosystem of plugins that work with JS as structured data,
specifically ASTs (abstract syntax trees).
ASTs make it easy for programs to deal with JS.
We call those programs plugins.
Plugins inspect and change trees.
You can use the many existing plugins or you can make your own.

This GitHub repository is a monorepo that contains the following packages:

* [`recma-build-jsx`][github-recma-build-jsx]
  — plugin to turn JSX into function calls
* [`recma-jsx`][github-recma-jsx]
  — plugin to add support for JSX
* [`recma-parse`][github-recma-parse]
  — plugin to take JS as input and turn it into a syntax tree (esast)
* [`recma-stringify`][github-recma-stringify]
  — plugin to take a syntax tree (estree) and turn it into JS as output
* [`recma`][github-recma-core]
  — `unified`, `recma-parse`, and `recma-stringify`,
  useful when input and output are JS

## Plugins

Two good ways to find plugins:

* [list of plugins][file-plugins-list-of-plugins]
  — list of all plugins
* [`recma-plugin` topic][github-topic-recma-plugin]
  — any tagged repo on GitHub

## License

[MIT][file-license] © [Titus Wormer][wooorm]

<!-- Definitions -->

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

[file-license]: license

[file-plugins-list-of-plugins]: doc/plugins.md#list-of-plugins

[github-recma-build-jsx]: https://github.com/mdx-js/recma/tree/main/packages/recma-build-jsx

[github-recma-core]: https://github.com/mdx-js/recma/tree/main/packages/recma

[github-recma-jsx]: https://github.com/mdx-js/recma/tree/main/packages/recma-jsx

[github-recma-parse]: https://github.com/mdx-js/recma/tree/main/packages/recma-parse

[github-recma-stringify]: https://github.com/mdx-js/recma/tree/main/packages/recma-stringify

[github-topic-recma-plugin]: https://github.com/topics/recma-plugin

[wooorm]: https://wooorm.com
