/**
 * Type definitions for accessibility utilities
 */

export interface FocusTrapOptions {
  /** Element to trap focus within */
  container: HTMLElement;
  /** Callback when focus is trapped (initial focus) */
  onActivate?: () => void;
  /** Allow focusing outside the container */
  allowOutsideClick?: boolean;
  /** Initial element to focus (selector) */
  initialFocus?: string;
}

export interface FocusRestoreOptions {
  /** Element to restore focus to when closed */
  element: HTMLElement | null;
  /** Whether to restore focus */
  enabled?: boolean;
}

export interface DismissableOptions {
  /** Callback when escape key is pressed */
  onEscape?: (e: KeyboardEvent) => void;
  /** Callback when clicking outside */
  onPointerDownOutside?: (e: PointerEvent) => void;
  /** Whether escape key should dismiss */
  escapeKey?: boolean;
  /** Whether clicking outside should dismiss */
  outsidePointer?: boolean;
  /** Container element to monitor for outside clicks */
  container?: HTMLElement | null;
}

export interface RovingTabindexOptions {
  /** Container element with tablist/menu role */
  container: HTMLElement;
  /** Selector for tabbable items */
  itemSelector?: string;
  /** Current active item index */
  currentIndex?: number;
  /** Callback when index changes */
  onIndexChange?: (index: number) => void;
  /** Orientation */
  orientation?: "horizontal" | "vertical" | "both";
  /** Whether to wrap around */
  loop?: boolean;
}

export interface AriaDescribedbyOptions {
  /** Element that needs description */
  element: HTMLElement;
  /** ID for the description element */
  descriptionId?: string;
}

export type LiveRegionLevel = "polite" | "assertive" | "off";
