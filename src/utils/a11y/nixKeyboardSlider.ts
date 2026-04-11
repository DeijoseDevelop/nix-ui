/**
 * nixKeyboardSlider - Adds keyboard navigation to slider inputs
 * Implements WAI-ARIA slider keyboard pattern
 */

interface KeyboardSliderOptions {
  /** The input element */
  element: HTMLInputElement;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step value */
  step?: number;
  /** Page step (for Page Up/Down) */
  pageStep?: number;
  /** Callback when value changes */
  onChange?: (value: number) => void;
}

/**
 * Add keyboard navigation to a slider input
 * Handles arrow keys, Page Up/Down, Home/End
 *
 * @param options - Keyboard slider configuration
 * @returns Object with activate, deactivate methods
 *
 * @example
 * const slider = nixKeyboardSlider({
 *   element: sliderInput,
 *   min: 0,
 *   max: 100,
 *   step: 1,
 *   onChange: (value) => updateSlider(value),
 * });
 * slider.activate();
 */
export function nixKeyboardSlider(options: KeyboardSliderOptions) {
  const {
    element,
    min = parseFloat(element.min) || 0,
    max = parseFloat(element.max) || 100,
    step = parseFloat(element.step) || 1,
    pageStep = (max - min) / 10,
    onChange,
  } = options;

  let isActive = false;

  const handleKeydown = (e: KeyboardEvent) => {
    if (!isActive) return;

    const currentValue = parseFloat(element.value) || min;
    let newValue = currentValue;
    let handled = false;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        newValue = Math.min(max, currentValue + step);
        handled = true;
        break;

      case "ArrowLeft":
      case "ArrowDown":
        newValue = Math.max(min, currentValue - step);
        handled = true;
        break;

      case "PageUp":
        newValue = Math.min(max, currentValue + pageStep);
        handled = true;
        break;

      case "PageDown":
        newValue = Math.max(min, currentValue - pageStep);
        handled = true;
        break;

      case "Home":
        newValue = min;
        handled = true;
        break;

      case "End":
        newValue = max;
        handled = true;
        break;

      default:
        return;
    }

    if (handled) {
      e.preventDefault();
      e.stopPropagation();

      // Round to step
      newValue = Math.round(newValue / step) * step;

      // Update value
      element.value = newValue.toString();
      onChange?.(newValue);
    }
  };

  const activate = () => {
    if (isActive) return;
    isActive = true;
    element.addEventListener("keydown", handleKeydown);
  };

  const deactivate = () => {
    if (!isActive) return;
    isActive = false;
    element.removeEventListener("keydown", handleKeydown);
  };

  return {
    activate,
    deactivate,
    get isActive() {
      return isActive;
    },
  };
}

/**
 * Generate aria-valuetext for a slider value
 *
 * @param value - Current value
 * @param min - Minimum value
 * @param max - Maximum value
 * @param formatter - Optional formatter function
 * @returns Formatted value text
 *
 * @example
 * nixSliderValueText(50, 0, 100); // "50%"
 * nixSliderValueText(75, 0, 100, (v) => `Volume: ${v}`); // "Volume: 75"
 */
export function nixSliderValueText(
  value: number,
  min: number,
  max: number,
  formatter?: (value: number, percentage: number) => string
): string {
  const percentage = Math.round(((value - min) / (max - min)) * 100);

  if (formatter) {
    return formatter(value, percentage);
  }

  return `${percentage}%`;
}
