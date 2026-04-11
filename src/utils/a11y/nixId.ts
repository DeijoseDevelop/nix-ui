/**
 * nixId - Unique ID generator for ARIA attribute linking
 * Generates stable, unique IDs for aria-labelledby, aria-describedby, etc.
 */

let _nixIdCounter = 0;

export interface NixIdRegistry {
  /** Generate a new unique ID with given prefix */
  generate: (prefix?: string) => string;
  /** Get or create a named ID */
  get: (name: string) => string;
}

/**
 * Create a unique ID for ARIA attributes
 * @param prefix - Prefix for the ID (default: "nix")
 * @returns Unique ID string
 *
 * @example
 * const id = nixId("modal"); // "nix-modal-0"
 * const labelId = nixId("label"); // "nix-label-1"
 */
export function nixId(prefix = "nix"): string {
  return `${prefix}-${_nixIdCounter++}`;
}

/**
 * Create an ID registry for related elements
 * Useful when you need multiple IDs that should be stable
 *
 * @param prefix - Prefix for all IDs
 * @returns Registry with generate() and get() methods
 *
 * @example
 * const ids = nixIdRegistry("dialog");
 * ids.get("title");    // "nix-dialog-title"
 * ids.get("desc");     // "nix-dialog-desc"
 * ids.get("title");    // "nix-dialog-title" (same)
 */
export function nixIdRegistry(prefix = "nix"): NixIdRegistry {
  const namedIds = new Map<string, string>();

  return {
    generate: (subPrefix?: string) => {
      const base = subPrefix ? `${prefix}-${subPrefix}` : prefix;
      return nixId(base);
    },
    get: (name: string) => {
      if (!namedIds.has(name)) {
        namedIds.set(name, `${prefix}-${name}`);
      }
      return namedIds.get(name)!;
    },
  };
}
