/**
 * cx — Conditional class name joiner
 *
 * Accepts strings, undefined, null, false, and arrays.
 * Filters out falsy values and joins the rest with a space.
 *
 * @example
 *   cx("btn", isActive && "btn-active", className)
 *   // → "btn btn-active custom-class"
 */
export type CxValue = string | undefined | null | false | 0 | CxValue[];

export function cx(...args: CxValue[]): string {
    const classes: string[] = [];
    for (const arg of args) {
        if (!arg) continue;
        if (Array.isArray(arg)) {
            const inner = cx(...arg);
            if (inner) classes.push(inner);
        } else {
            classes.push(arg);
        }
    }
    return classes.join(" ");
}
