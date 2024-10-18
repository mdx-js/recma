/**
 * @import {Node, Program} from 'estree'
 * @import {Settings} from 'unified'
 */

import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import process from 'node:process'
import test from 'node:test'
import {visit as visitEstree} from 'estree-util-visit'
import recmaBuildJsx from 'recma-build-jsx'
import recmaJsx from 'recma-jsx'
import recmaParse from 'recma-parse'
import recmaStringify from 'recma-stringify'
import rehypeParse from 'rehype-parse'
import rehypeRecma from 'rehype-recma'
import {recma} from 'recma'
import {unified} from 'unified'
import {VFile} from 'vfile'

test('recma-build-jsx', async function (t) {
  await t.test(
    'should expose the public api of `recma-build-jsx`',
    async function () {
      assert.deepEqual(Object.keys(await import('recma-build-jsx')).sort(), [
        'default'
      ])
    }
  )

  await t.test('should support building JSX', async function () {
    const file = await unified()
      .use(recmaParse)
      .use(recmaJsx)
      .use(recmaBuildJsx)
      .use(recmaStringify)
      .process('let a = <b:c/>')

    assert.equal(String(file), 'let a = React.createElement("b:c");\n')
  })

  await t.test('should support configuration comments', async function () {
    const file = await unified()
      .use(recmaParse)
      .use(recmaJsx)
      .use(recmaBuildJsx)
      .use(recmaStringify)
      .process('/* @jsxRuntime automatic */\nconsole.log(<h1>Hi!</h1>)')

    assert.equal(
      String(file),
      '/*@jsxRuntime automatic*/\nimport {jsx as _jsx} from "react/jsx-runtime";\nconsole.log(_jsx("h1", {\n  children: "Hi!"\n}));\n'
    )
  })

  await t.test('should support configuration', async function () {
    const file = await unified()
      .use(recmaParse)
      .use(recmaJsx)
      .use(recmaBuildJsx, {pragma: 'h'})
      .use(recmaStringify)
      .process('console.log(<h1>Hi!</h1>)')

    assert.equal(String(file), 'console.log(h("h1", null, "Hi!"));\n')
  })
})

test('recma-jsx', async function (t) {
  await t.test(
    'should expose the public api of `recma-jsx`',
    async function () {
      assert.deepEqual(Object.keys(await import('recma-jsx')).sort(), [
        'default'
      ])
    }
  )

  await t.test('should support JSX w/ `recma-jsx`', async function () {
    const file = await unified()
      .use(recmaParse)
      .use(recmaJsx)
      .use(recmaStringify)
      .process('let a = <b:c/>')

    assert.equal(String(file), 'let a = <b:c />;\n')
  })
})

test('recma-parse', async function (t) {
  await t.test(
    'should expose the public api of `recma-parse`',
    async function () {
      assert.deepEqual(Object.keys(await import('recma-parse')).sort(), [
        'default'
      ])
    }
  )

  await t.test('should parse', async function () {
    assert.deepEqual(unified().use(recmaParse).parse('let a = 1'), {
      type: 'Program',
      body: [
        {
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: {
                type: 'Identifier',
                name: 'a',
                position: {
                  start: {line: 1, column: 5, offset: 4},
                  end: {line: 1, column: 6, offset: 5}
                }
              },
              init: {
                type: 'Literal',
                value: 1,
                position: {
                  start: {line: 1, column: 9, offset: 8},
                  end: {line: 1, column: 10, offset: 9}
                }
              },
              position: {
                start: {line: 1, column: 5, offset: 4},
                end: {line: 1, column: 10, offset: 9}
              }
            }
          ],
          kind: 'let',
          position: {
            start: {line: 1, column: 1, offset: 0},
            end: {line: 1, column: 10, offset: 9}
          }
        }
      ],
      sourceType: 'script',
      comments: [],
      position: {
        start: {line: 1, column: 1, offset: 0},
        end: {line: 1, column: 10, offset: 9}
      }
    })
  })

  await t.test(
    'should prefer explicit options over `settings`',
    async function () {
      try {
        await unified()
          .data('settings', {module: true})
          .use(recmaParse, {module: false})
          .use(recmaStringify)
          .process('import {a} from "b"')
        assert.fail()
      } catch (error) {
        assert.match(String(error), /Could not parse JavaScript with Acorn/)
      }
    }
  )
})

test('recma-stringify', async function (t) {
  await t.test(
    'should expose the public api of `recma-stringify`',
    async function () {
      assert.deepEqual(Object.keys(await import('recma-stringify')).sort(), [
        'default'
      ])
    }
  )

  await t.test(
    'should prefer explicit options over `settings`',
    async function () {
      const file = await unified()
        .data('settings', {
          handlers: {
            Identifier(d, state) {
              state.write(d.name.toUpperCase())
            }
          }
        })
        .use(recmaParse)
        .use(recmaStringify, {
          handlers: {
            Identifier(d, state) {
              state.write(d.name.toLowerCase())
            }
          }
        })
        .process('let Ab = 1')

      assert.deepEqual(String(file), 'let ab = 1;\n')
    }
  )

  await t.test(
    'should throw when `tree` is not a valid node',
    async function () {
      assert.throws(function () {
        unified()
          .use(recmaStringify)
          // @ts-expect-error: check how an unknown node is handled.
          .stringify({type: 'unicorn'})
      }, /is not a function/)
    }
  )
})

test('recma', async function (t) {
  await t.test('should expose the public api of `recma`', async function () {
    assert.deepEqual(Object.keys(await import('recma')).sort(), ['recma'])
  })
})

test('rehype-recma', async function (t) {
  await t.test(
    'should expose the public api of `rehype-recma`',
    async function () {
      assert.deepEqual(Object.keys(await import('rehype-recma')).sort(), [
        'default'
      ])
    }
  )

  await t.test('should work', async function () {
    const file = await unified()
      .use(rehypeParse, {fragment: true})
      .use(rehypeRecma)
      .use(recmaJsx)
      .use(recmaStringify)
      .process('<p>Hi!<h1>Hello!')

    assert.equal(String(file), '<><p>{"Hi!"}</p><h1>{"Hello!"}</h1></>;\n')
  })
})

test('fixtures', async function (t) {
  const root = new URL('fixtures/', import.meta.url)
  const folders = await fs.readdir(root)

  for (const folder of folders) {
    if (folder.charAt(0) === '.') {
      continue
    }

    await t.test(folder, async function () {
      const base = new URL(folder + '/', root)
      const configUrl = new URL('config.json', base)
      const inputUrl = new URL('index.js', base)
      const expectedTreeUrl = new URL('index.json', base)
      const expectedOutputUrl = new URL('result.js', base)

      /** @type {Settings & {reprocess?: boolean | null | undefined}} */
      let config = {}

      try {
        config = JSON.parse(String(await fs.readFile(configUrl)))
      } catch {}

      const {reprocess, ...settings} = config

      const processor = recma().data('settings', settings)
      const input = new VFile({
        basename: 'index.js',
        value: await fs.readFile(inputUrl)
      })
      const actualTree = processor.parse(input)
      const actualOutput = processor.stringify(actualTree, input)

      /** @type {string} */
      let expectedOutput
      /** @type {Program} */
      let expectedTree

      try {
        if ('UPDATE' in process.env) throw new Error('Update')
        expectedOutput = String(await fs.readFile(expectedOutputUrl))
      } catch {
        expectedOutput = actualOutput
        await fs.writeFile(expectedOutputUrl, expectedOutput)
      }

      try {
        if ('UPDATE' in process.env) throw new Error('Update')
        expectedTree = JSON.parse(String(await fs.readFile(expectedTreeUrl)))
      } catch {
        expectedTree = actualTree
        await fs.writeFile(
          expectedTreeUrl,
          JSON.stringify(expectedTree, undefined, 2) + '\n'
        )
      }

      assert.deepEqual(actualTree, expectedTree)
      assert.equal(actualOutput, expectedOutput)

      if (reprocess !== false) {
        const reprocessedTree = recma()
          .data('settings', settings)
          .parse(actualOutput)
        visitEstree(actualTree, removeFromEstree)
        visitEstree(reprocessedTree, removeFromEstree)
        assert.deepEqual(actualTree, reprocessedTree)
      }
    })
  }
})

/**
 * @param {Node} node
 *   estree node.
 * @returns {undefined}
 *   Nothing.
 */
function removeFromEstree(node) {
  // @ts-expect-error: `unist` extension.
  delete node.position
}
