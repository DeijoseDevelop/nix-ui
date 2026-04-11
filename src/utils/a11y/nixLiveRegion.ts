/**
 * nixLiveRegion - Manages aria-live regions for dynamic announcements
 * Used to announce changes to screen readers (toast messages, form validation, etc.)
 */

import type { LiveRegionLevel } from "./types";

let _politeRegion: HTMLElement | null = null;
let _assertiveRegion: HTMLElement | null = null;

/**
 * Create or get existing live region
 */
function getOrCreateRegion(level: LiveRegionLevel): HTMLElement {
  const id = level === "polite" ? "nix-live-polite" : "nix-live-assertive";
  let region = document.getElementById(id);

  if (!region) {
    region = document.createElement("div");
    region.id = id;
    region.setAttribute("role", level === "polite" ? "status" : "alert");
    region.setAttribute("aria-live", level);
    region.setAttribute("aria-atomic", "true");
    region.className = "nix-sr-only";
    document.body.appendChild(region);
  }

  return region;
}

/**
 * Announce a message to screen readers
 *
 * @param message - Text to announce
 * @param level - Priority level (default: "polite")
 *
 * @example
 * // Polite announcement (waits for current speech to finish)
 * nixLiveRegion("Item added to cart");
 *
 * // Assertive announcement (interrupts current speech)
 * nixLiveRegion("Form has errors", "assertive");
 */
export function nixLiveRegion(message: string, level: LiveRegionLevel = "polite"): void {
  const region = getOrCreateRegion(level);

  // Clear and set message (triggers announcement)
  region.textContent = "";

  // Use setTimeout to ensure the DOM update is detected
  setTimeout(() => {
    region.textContent = message;
  }, 100);

  // Auto-clear after announcement
  setTimeout(() => {
    region.textContent = "";
  }, 5000);
}

/**
 * Create a live region component that can be used in templates
 * Returns HTML string for a live region
 *
 * @param level - Priority level
 * @param id - Custom ID
 * @returns HTML string
 */
export function nixLiveRegionHTML(level: LiveRegionLevel = "polite", id?: string): string {
  const regionId = id || (level === "polite" ? "nix-live-polite" : "nix-live-assertive");
  const role = level === "polite" ? "status" : "alert";

  return `<div
    id="${regionId}"
    role="${role}"
    aria-live="${level}"
    aria-atomic="true"
    class="nix-sr-only"
  ></div>`;
}

/**
 * Cleanup all live regions (useful for testing)
 */
export function nixCleanupLiveRegions(): void {
  _politeRegion?.remove();
  _assertiveRegion?.remove();
  _politeRegion = null;
  _assertiveRegion = null;

  document.getElementById("nix-live-polite")?.remove();
  document.getElementById("nix-live-assertive")?.remove();
}
