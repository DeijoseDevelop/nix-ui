import type { NixTemplate } from "@deijose/nix-js";
import type { NixComponent } from "@deijose/nix-js";

/**
 * NixUIChildren — Accepted child types for Nix-UI components.
 *
 * Extends NixChildren to also accept plain strings, making the API
 * more ergonomic for consumers:
 *
 *   Button({ children: "Click me" })       // ✅ string
 *   Button({ children: html`<b>Bold</b>` }) // ✅ NixTemplate
 */
export type NixUIChildren =
    | NixTemplate
    | NixComponent
    | string
    | number
    | Array<NixTemplate | NixComponent | string | number>
    | null
    | undefined;
