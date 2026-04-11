/**
 * nixFocusRestore - Restores focus to a trigger element when overlay closes
 * Implements WAI-ARIA focus restoration pattern
 */

import type { FocusRestoreOptions } from "./types";

/**
 * Track and restore focus to a trigger element
 * Essential for modals, dropdowns, popovers that open from user interaction
 *
 * @param options - Focus restore configuration
 * @returns Object with capture, restore, and update methods
 *
 * @example
 * const focusRestore = nixFocusRestore({ element: triggerButton });
 * focusRestore.capture(); // Before opening modal
 * // ... modal opens and closes
 * focusRestore.restore(); // Restores focus to triggerButton
 */
export function nixFocusRestore(options: FocusRestoreOptions) {
  const { enabled = true } = options;

  let capturedElement: HTMLElement | null = null;

  /**
   * Capture the current active element as the trigger
   * Call this BEFORE opening the overlay
   */
  const capture = () => {
    if (!enabled) return;
    capturedElement = document.activeElement as HTMLElement;
  };

  /**
   * Restore focus to the captured element
   * Call this AFTER closing the overlay
   */
  const restore = () => {
    if (!enabled || !capturedElement) return;

    // Only restore if element is still in DOM and focusable
    if (document.contains(capturedElement) && isFocusable(capturedElement)) {
      capturedElement.focus();
    }

    capturedElement = null;
  };

  /**
   * Update the target element to restore focus to
   */
  const update = (newElement: HTMLElement | null) => {
    if (newElement) {
      capturedElement = newElement;
    }
  };

  return {
    capture,
    restore,
    update,
    get capturedElement() {
      return capturedElement;
    },
  };
}

/**
 * Check if an element is focusable
 */
function isFocusable(element: HTMLElement): boolean {
  if (element.hasAttribute("disabled") || element.hasAttribute("tabindex") && element.getAttribute("tabindex") === "-1") {
    return false;
  }

  const focusableSelectors = [
    "a[href]",
    "button",
    "input",
    "select",
    "textarea",
    "[tabindex]",
    "[contenteditable]",
  ];

  return (
    element.matches(focusableSelectors.join(", ")) ||
    element.getAttribute("tabindex") !== null
  );
}
