/**
 * nixRovingTabindex - Implements roving tabindex pattern for component groups
 * WAI-ARIA pattern for tabs, menus, radio groups, etc.
 */

import type { RovingTabindexOptions } from "./types";

/**
 * Manage roving tabindex within a group of elements
 * Only one element has tabindex="0" at a time, others have tabindex="-1"
 *
 * @param options - Roving tabindex configuration
 * @returns Object with setup, activate, deactivate methods
 *
 * @example
 * const roving = nixRovingTabindex({
 *   container: tablistElement,
 *   itemSelector: "[role='tab']",
 *   orientation: "horizontal",
 * });
 * roving.activate();
 */
export function nixRovingTabindex(options: RovingTabindexOptions) {
  const {
    container,
    itemSelector = "[tabindex]",
    currentIndex = 0,
    onIndexChange,
    orientation = "horizontal",
    loop = true,
  } = options;

  let isActive = false;
  let currentIdx = currentIndex;

  const getItems = (): HTMLElement[] => {
    return Array.from(container.querySelectorAll<HTMLElement>(itemSelector));
  };

  /**
   * Update which item has tabindex="0" and focus it
   */
  const focusItem = (index: number) => {
    const items = getItems();
    if (items.length === 0) return;

    // Clamp index
    const clampedIndex = loop
      ? ((index % items.length) + items.length) % items.length
      : Math.max(0, Math.min(index, items.length - 1));

    currentIdx = clampedIndex;

    // Update tabindex attributes
    items.forEach((item, i) => {
      item.setAttribute("tabindex", i === clampedIndex ? "0" : "-1");
    });

    // Focus the current item
    items[clampedIndex]?.focus();
    onIndexChange?.(clampedIndex);
  };

  /**
   * Move focus to the next item
   */
  const focusNext = () => {
    focusItem(currentIdx + 1);
  };

  /**
   * Move focus to the previous item
   */
  const focusPrev = () => {
    focusItem(currentIdx - 1);
  };

  /**
   * Move focus to the first item
   */
  const focusFirst = () => {
    focusItem(0);
  };

  /**
   * Move focus to the last item
   */
  const focusLast = () => {
    const items = getItems();
    focusItem(items.length - 1);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (!isActive) return;

    const items = getItems();
    if (items.length === 0) return;

    const isHorizontal = orientation === "horizontal" || orientation === "both";
    const isVertical = orientation === "vertical" || orientation === "both";

    let handled = false;

    switch (e.key) {
      case "ArrowRight":
        if (isHorizontal) {
          e.preventDefault();
          focusNext();
          handled = true;
        }
        break;

      case "ArrowLeft":
        if (isHorizontal) {
          e.preventDefault();
          focusPrev();
          handled = true;
        }
        break;

      case "ArrowDown":
        if (isVertical) {
          e.preventDefault();
          focusNext();
          handled = true;
        }
        break;

      case "ArrowUp":
        if (isVertical) {
          e.preventDefault();
          focusPrev();
          handled = true;
        }
        break;

      case "Home":
        e.preventDefault();
        focusFirst();
        handled = true;
        break;

      case "End":
        e.preventDefault();
        focusLast();
        handled = true;
        break;
    }

    return handled;
  };

  /**
   * Activate roving tabindex
   * Sets up initial state and adds keyboard listener
   */
  const activate = () => {
    isActive = true;

    // Set initial tabindex
    const items = getItems();
    items.forEach((item, i) => {
      item.setAttribute("tabindex", i === currentIdx ? "0" : "-1");
    });

    // Add keyboard handler to container
    container.addEventListener("keydown", handleKeydown);
  };

  /**
   * Deactivate roving tabindex
   * Removes keyboard listener
   */
  const deactivate = () => {
    isActive = false;
    container.removeEventListener("keydown", handleKeydown);
  };

  /**
   * Manually set the active index
   */
  const setIndex = (index: number) => {
    currentIdx = index;
    focusItem(index);
  };

  return {
    activate,
    deactivate,
    focusItem,
    focusNext,
    focusPrev,
    focusFirst,
    focusLast,
    setIndex,
    get currentIndex() {
      return currentIdx;
    },
    get isActive() {
      return isActive;
    },
  };
}
