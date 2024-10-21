/**
 * @import {Program} from 'estree'
 * @import {Options} from 'recma-minify'
 * @import {MinifyOptions} from 'terser'
 */

import {minify} from 'terser'

/** @type {Readonly<Options>} */
const emptySettings = {}

/**
 * Plugin to minify code.
 *
 * @param {Readonly<Options> | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function recmaMinify(options) {
  const givenSettings = options || emptySettings

  /**
   * @param {Program} tree
   *   Tree.
   * @returns {Promise<Program>}
   *   Minified tree.
   */
  return async function (tree) {
    /** @type {MinifyOptions} */
    const actualSettings = {
      ...givenSettings,
      module: tree.sourceType === 'module',
      // @ts-expect-error: `code` and `spidermonkey` do exist.
      // `code` cannot be turned off (or even defined) if source maps are
      // on: otherwise source maps are not generated.
      format: {code: false, spidermonkey: true},
      // @ts-expect-error: `spidermonkey` is allowed.
      parse: {spidermonkey: true}
    }

    // @ts-expect-error: if `spidermonkey` is on,
    // an AST can be passed and is returned.
    const result = await minify(tree, actualSettings)

    // @ts-expect-error: if `spidermonkey` is on,
    // an AST can be passed and is returned.
    return result.ast
  }
}
