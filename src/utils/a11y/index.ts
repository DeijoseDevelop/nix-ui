/**
 * Accessibility utilities for nix-ui
 * Provides headless primitives following WAI-ARIA patterns
 */

export { nixId, nixIdRegistry } from "./nixId";
export { nixFocusTrap } from "./nixFocusTrap";
export { nixFocusRestore } from "./nixFocusRestore";
export { nixDismissable } from "./nixDismissable";
export { nixRovingTabindex } from "./nixRovingTabindex";
export { nixAriaDescribedby } from "./nixAriaDescribedby";
export { nixLiveRegion } from "./nixLiveRegion";
export { nixKeyboardSlider, nixSliderValueText } from "./nixKeyboardSlider";
export type {
  FocusTrapOptions,
  FocusRestoreOptions,
  DismissableOptions,
  RovingTabindexOptions,
  LiveRegionLevel,
} from "./types";
