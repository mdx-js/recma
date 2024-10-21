import type {MinifyOptions} from 'terser'

/**
 * Configuration.
 *
 * Same as `MinifyOptions` from `terser` except that you do not need to pass
 * `format`, `module`, `output`, `parse`, or `sourceMap`;
 * you should probably pass `compress: true`, `ecma: 2020`,
 * `mangle: true`, and `toplevel: true`.
 */
export interface Options extends MinifyOptions {
  /**
   * Serialization options are not supported with `recma-minify`.
   */
  format?: never

  /**
   * The module field is not needed with `recma-minify`.
   */
  module?: never

  /**
   * Serialization options are not supported with `recma-minify`.
   */
  output?: never

  /**
   * Parse options are not supported with `recma-minify`.
   */
  parse?: never

  /**
   * The module field is not supported with `recma-minify`.
   */
  sourceMap?: never
}

export {default} from './lib/index.js'
