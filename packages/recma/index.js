// Note: types exposed from `index.d.ts`
import recmaParse from 'recma-parse'
import recmaStringify from 'recma-stringify'
import {unified} from 'unified'

/**
 * Create a new unified processor that already uses `recma-parse` and
 * `recma-stringify`.
 */
export const recma = unified().use(recmaParse).use(recmaStringify).freeze()
