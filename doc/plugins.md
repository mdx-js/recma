# Plugins

**recma** is a tool that transforms JavaScript with plugins.
See [the monorepo readme][github-recma] for info on what the recma ecosystem
is.
This page lists existing plugins.

## Contents

* [List of plugins](#list-of-plugins)
* [List of utilities](#list-of-utilities)
* [Use plugins](#use-plugins)
* [Create plugins](#create-plugins)

## List of plugins

Plugins can be found on GitHub tagged with the
[`recma-plugin` topic][github-topic-plugin].

The list of plugins:

* [`recma-build-jsx`](https://github.com/mdx-js/recma/tree/main/packages/recma-build-jsx)
  — add support for turning JSX into function calls
* [`recma-jsx`](https://github.com/mdx-js/recma/tree/main/packages/recma-jsx)
  — add support for JSX
* [`recma-mdx-escape-missing-components`](https://github.com/ipikuka/recma-mdx-escape-missing-components)
  — set the default `() => null` for missing components in MDX
* [`recma-mdx-is-mdx-component`](https://github.com/remcohaszing/recma-mdx-is-mdx-component)
  — define an `isMdxComponent` property on MDX components
* [`recma-minify`](https://github.com/mdx-js/recma/tree/main/packages/recma-minify)
  — plugin to minify code
* [`recma-nextjs-static-props`](https://github.com/remcohaszing/recma-nextjs-static-props)
  — expose top-level identifiers in Next.js `app.js`

## List of utilities

See [esast][github-esast-utilities] for a list of utilities that work with the
syntax tree.
See [unist][github-unist-utilities] for other utilities which work with
esast/estree and other syntax trees too.
Finally,
see [vfile][github-vfile-utilities] for a list of utilities working with
virtual files.

## Use plugins

To use a plugin programmatically,
call the [`use()`][github-unified-use] function.

## Create plugins

To create a plugin,
first read up on the [concept of plugins][github-unified-plugins].
Then,
read the
[guide on “Creating a plugin with unified”][unified-guide-create-a-plugin].
Finally,
take one of existing plugins,
which looks similar to what you’re about to make,
and work from there.
If you get stuck,
[discussions][github-mdx-discussions] is a good place to get help.

You should pick a name prefixed by `'recma-'` (such as `recma-format`).
**Do not use the `recma-` prefix** if the thing you create doesn’t work with
`recma().use()`: it isn’t a “plugin” and will confuse users.
If it works with esast or estree,
use `'esast-util-'` or `estree-util`,
if it works with any unist tree,
use `unist-util-`,
and if it works with virtual files,
use `vfile-`.

Use default exports to expose plugins from your packages,
add `recma-plugin` keywords in `package.json`,
add a `recma-plugin` topic to your repo on GitHub,
and create a pull request to add the plugin here on this page!

<!--Definitions:-->

[github-esast-utilities]: https://github.com/syntax-tree/esast#list-of-utilities

[github-mdx-discussions]: https://github.com/mdx-js/recma/discussions

[github-recma]: https://github.com/mdx-js/recma

[github-topic-plugin]: https://github.com/topics/recma-plugin

[github-unified-plugins]: https://github.com/unifiedjs/unified#plugin

[github-unified-use]: https://github.com/unifiedjs/unified#processoruseplugin-options

[github-unist-utilities]: https://github.com/syntax-tree/unist#unist-utilities

[github-vfile-utilities]: https://github.com/vfile/vfile#utilities

[unified-guide-create-a-plugin]: https://unifiedjs.com/learn/guide/create-a-plugin/
