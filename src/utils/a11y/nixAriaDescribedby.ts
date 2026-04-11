/**
 * nixAriaDescribedby - Links description/error elements to form inputs
 * Implements WAI-ARIA aria-describedby pattern
 */

import { nixId } from "./nixId";
import type { AriaDescribedbyOptions } from "./types";

interface DescribedbyInstance {
  element: HTMLElement;
  descriptionIds: string[];
  setDescription: (text: string | null) => void;
  clearDescription: () => void;
}

const instances = new Map<string, DescribedbyInstance>();

/**
 * Manage aria-describedby for an element
 * Creates and manages description elements that are linked via aria-describedby
 *
 * @param options - Describedby configuration
 * @returns Object to manage descriptions
 *
 * @example
 * const describedby = nixAriaDescribedby({ element: inputElement });
 * describedby.setDescription("Password must be at least 8 characters");
 * // Later, for error:
 * describedby.setDescription("Password is too short");
 * // To clear:
 * describedby.clearDescription();
 */
export function nixAriaDescribedby(options: AriaDescribedbyOptions) {
  const { element, descriptionId } = options;

  const id = descriptionId || nixId("desc");
  let descriptionEl: HTMLElement | null = null;
  let currentText: string | null = null;

  /**
   * Set or update the description text
   */
  const setDescription = (text: string | null) => {
    currentText = text;

    if (!text) {
      clearDescription();
      return;
    }

    // Create description element if it doesn't exist
    if (!descriptionEl) {
      descriptionEl = document.createElement("div");
      descriptionEl.id = id;
      descriptionEl.className = "nix-sr-only"; // Use screen-reader-only class
      descriptionEl.setAttribute("role", "tooltip");

      // Insert after the element
      element.parentNode?.insertBefore(descriptionEl, element.nextSibling);
    }

    descriptionEl.textContent = text;

    // Update aria-describedby
    const existingDescribedby = element.getAttribute("aria-describedby") || "";
    const ids = existingDescribedby
      .split(" ")
      .filter((id) => id && id !== id);
    if (!ids.includes(id)) {
      ids.push(id);
      element.setAttribute("aria-describedby", ids.join(" "));
    }
  };

  /**
   * Clear the description
   */
  const clearDescription = () => {
    currentText = null;

    if (descriptionEl) {
      descriptionEl.remove();
      descriptionEl = null;
    }

    // Remove from aria-describedby
    const existingDescribedby = element.getAttribute("aria-describedby") || "";
    const ids = existingDescribedby
      .split(" ")
      .filter((descId) => descId && descId !== id);

    if (ids.length > 0) {
      element.setAttribute("aria-describedby", ids.join(" "));
    } else {
      element.removeAttribute("aria-describedby");
    }
  };

  /**
   * Set error description (adds error styling)
   */
  const setError = (text: string | null) => {
    if (!text) {
      clearDescription();
      element.removeAttribute("aria-invalid");
      return;
    }

    setDescription(text);
    element.setAttribute("aria-invalid", "true");

    // Add error styling class if description element exists
    if (descriptionEl) {
      descriptionEl.classList.add("nix-error-text");
    }
  };

  /**
   * Cleanup - remove description element and attributes
   */
  const cleanup = () => {
    clearDescription();
    element.removeAttribute("aria-invalid");
  };

  const instance: DescribedbyInstance = {
    element,
    descriptionIds: [id],
    setDescription,
    clearDescription,
  };

  instances.set(id, instance);

  return {
    setDescription,
    setError,
    clearDescription,
    cleanup,
    get id() {
      return id;
    },
    get currentText() {
      return currentText;
    },
  };
}

/**
 * Helper: Get all description IDs for an element
 */
export function nixGetDescribedbyIds(element: HTMLElement): string[] {
  const describedby = element.getAttribute("aria-describedby");
  if (!describedby) return [];
  return describedby.split(" ").filter(Boolean);
}

/**
 * Helper: Check if an element has a description
 */
export function nixHasDescription(element: HTMLElement): boolean {
  return nixGetDescribedbyIds(element).length > 0;
}
