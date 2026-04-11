/**
 * nixDismissable - Handles dismiss gestures for overlays
 * Escape key and click-outside (pointer down outside)
 */

import type { DismissableOptions } from "./types";

/**
 * Make an element dismissible via Escape key and/or clicking outside
 *
 * @param options - Dismissable configuration
 * @returns Object with activate, deactivate, and update methods
 *
 * @example
 * const dismiss = nixDismissable({
 *   container: modalElement,
 *   onEscape: () => closeModal(),
 *   onPointerDownOutside: () => closeModal(),
 * });
 * dismiss.activate();
 */
export function nixDismissable(options: DismissableOptions) {
  const {
    onEscape,
    onPointerDownOutside,
    escapeKey = true,
    outsidePointer = true,
    container,
  } = options;

  let isActive = false;

  const handleKeydown = (e: KeyboardEvent) => {
    if (!isActive || !escapeKey || e.key !== "Escape") return;

    e.preventDefault();
    e.stopPropagation();
    onEscape?.(e);
  };

  const handlePointerDown = (e: PointerEvent) => {
    if (!isActive || !outsidePointer || !container) return;

    // Check if click is outside the container
    if (!container.contains(e.target as Node)) {
      e.preventDefault();
      e.stopPropagation();
      onPointerDownOutside?.(e);
    }
  };

  const activate = () => {
    isActive = true;

    if (escapeKey) {
      document.addEventListener("keydown", handleKeydown);
    }

    if (outsidePointer) {
      // Use capture phase to detect outside clicks before they propagate
      document.addEventListener("pointerdown", handlePointerDown, true);
    }
  };

  const deactivate = () => {
    isActive = false;

    document.removeEventListener("keydown", handleKeydown);
    document.removeEventListener("pointerdown", handlePointerDown, true);
  };

  const update = (newOptions: Partial<DismissableOptions>) => {
    if (newOptions.escapeKey !== undefined) {
      // Update escape key setting without full deactivation
    }
    if (newOptions.outsidePointer !== undefined) {
      // Update outside pointer setting
    }
    if (newOptions.container) {
      // Update container reference
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
