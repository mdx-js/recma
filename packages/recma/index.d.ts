/// <reference types="recma-parse" />
/// <reference types="recma-stringify" />

import type {Program} from 'estree'
import type {Processor} from 'unified'

/**
 * Create a new unified processor that already uses `recma-parse` and
 * `recma-stringify`.
 */
export const recma: Processor<Program, undefined, undefined, Program, string>
