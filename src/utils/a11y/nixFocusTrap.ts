/**
 * nixFocusTrap - Traps focus within a container element
 * Implements WAI-ARIA focus trapping pattern for modals, dialogs, drawers
 */

import type { FocusTrapOptions } from "./types";

const FOCUSABLE_SELECTORS = [
  "a[href]:not([disabled]):not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "input:not([disabled]):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1']):not([disabled])",
  "[contenteditable]:not([disabled])",
  "audio[controls]",
  "video[controls]",
  "details > summary:first-of-type",
  "iframe",
  "object",
  "embed",
].join(", ");

let _activeFocusTrap: (() => void) | null = null;

/**
 * Get all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS)
  );
  return elements.filter(
    (el) =>
      !el.hasAttribute("disabled") &&
      el.offsetParent !== null && // visible
      getComputedStyle(el).visibility !== "hidden"
  );
}

/**
 * Trap focus within a container
 * @param options - Focus trap configuration
 * @returns Object with activate, deactivate, and update methods
 *
 * @example
 * const trap = nixFocusTrap({ container: modalElement });
 * trap.activate();
 * // ... later
 * trap.deactivate();
 */
export function nixFocusTrap(options: FocusTrapOptions) {
  const {
    container,
    onActivate,
    allowOutsideClick = false,
    initialFocus,
  } = options;

  let isActive = false;
  let previousActiveElement: HTMLElement | null = null;

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== "Tab" || !isActive) return;

    const focusableElements = getFocusableElements(container);
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Shift + Tab: move focus to last element if on first
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    }
    // Tab: move focus to first element if on last
    else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
    // Focus is outside container, bring it back
    else if (!container.contains(document.activeElement)) {
      e.preventDefault();
      const elementToFocus = initialFocus
        ? container.querySelector<HTMLElement>(initialFocus)
        : firstElement;
      elementToFocus?.focus();
    }
  };

  const handlePointerDown = (e: PointerEvent) => {
    if (!allowOutsideClick && !container.contains(e.target as Node)) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const activate = () => {
    if (_activeFocusTrap) {
      _activeFocusTrap();
    }

    previousActiveElement = document.activeElement as HTMLElement;
    isActive = true;
    _activeFocusTrap = deactivate;

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("pointerdown", handlePointerDown, true);

    // Focus initial element
    const elementToFocus = initialFocus
      ? container.querySelector<HTMLElement>(initialFocus)
      : getFocusableElements(container)[0];

    setTimeout(() => {
      elementToFocus?.focus();
      onActivate?.();
    }, 0);
  };

  const deactivate = () => {
    isActive = false;
    _activeFocusTrap = null;

    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("pointerdown", handlePointerDown, true);

    // Restore focus to previous element if it still exists in DOM
    if (previousActiveElement && document.contains(previousActiveElement)) {
      previousActiveElement.focus();
    }
  };

  const update = (newOptions: Partial<FocusTrapOptions>) => {
    if (newOptions.allowOutsideClick !== undefined) {
      // allowOutsideClick = newOptions.allowOutsideClick;
    }
  };

  return {
    activate,
    deactivate,
    update,
    get isActive() {
      return isActive;
    },
  };
}
