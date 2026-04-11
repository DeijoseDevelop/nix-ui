import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Usage } from "../Usage";

export function AccessibilityPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Accessibility Utilities</h1>
            <p class="doc-lead">
                Low-level ARIA utilities for building fully accessible components.
                Each helper follows WAI-ARIA Authoring Practices.
            </p>

            <h2 class="doc-h2">Overview</h2>
            <p class="doc-p">
                Nix-UI ships with a suite of accessibility utilities prefixed with <code>nix</code>.
                They can be used to enhance existing components or build new ones from scratch.
                All utilities are exported from the main package entry point.
            </p>

            <div class="doc-p">
                <h3 class="doc-h2">nixId / nixIdRegistry</h3>
                <p class="doc-p">Generate stable unique IDs for ARIA attribute linking.</p>
            </div>

            ${Usage({
        title: "nixId",
        description: "Generate a unique ID with an optional prefix.",
        demo: html`<span class="text-sm text-nix-text-muted">See code example</span>`,
        code: `import { nixId, nixIdRegistry } from "@deijose/nix-ui";

// Simple ID generator
const id = nixId("modal");  // "modal-0"
const labelId = nixId("label"); // "label-1"

// Registry for multiple related IDs
const ids = nixIdRegistry("dialog");
const titleId = ids.get("title");   // "dialog-title"
const descId = ids.get("description"); // "dialog-description"
// ids.get("title") returns the same value every time`
    })}

            <h2 class="doc-h2">nixFocusTrap</h2>
            <p class="doc-p">
                Traps keyboard focus within a container element. Essential for modals, dialogs, drawers,
                and any overlay that should prevent focus from escaping. Implements the WAI-ARIA
                focus trapping pattern.
            </p>

            ${Usage({
        title: "Basic Focus Trap",
        description: "Trap focus inside a container. Focus cycles between focusable elements.",
        demo: html`<span class="text-sm text-nix-text-muted">See code example</span>`,
        code: `import { nixFocusTrap } from "@deijose/nix-ui";

const trap = nixFocusTrap({
    container: myModalElement,
    initialFocus: "#first-input", // optional: element to focus first
    allowOutsideClick: false,
    onActivate: () => console.log("Focus trapped"),
});

trap.activate();
// ... later
trap.deactivate(); // restores focus to previously focused element`
    })}

            <h2 class="doc-h2">nixFocusRestore</h2>
            <p class="doc-p">
                Captures the currently focused element and restores focus to it later.
                Use this when closing overlays to return focus to the trigger button.
            </p>

            ${Usage({
        title: "Focus Restore Pattern",
        description: "Capture before opening, restore after closing.",
        demo: html`<span class="text-sm text-nix-text-muted">See code example</span>`,
        code: `import { nixFocusRestore } from "@deijose/nix-ui";

const focusRestore = nixFocusRestore({ enabled: true });

// Before opening the modal/dialog
function openDialog() {
    focusRestore.capture(); // captures document.activeElement
    showModal();
}

// After closing
function closeDialog() {
    hideModal();
    focusRestore.restore(); // focuses the original trigger element
}`
    })}

            <h2 class="doc-h2">nixDismissable</h2>
            <p class="doc-p">
                Handles Escape key and click-outside (pointer down outside container) for dismissing overlays.
            </p>

            ${Usage({
        title: "Dismissable Overlay",
        description: "Combine Escape key and click-outside for consistent dismiss behavior.",
        demo: html`<span class="text-sm text-nix-text-muted">See code example</span>`,
        code: `import { nixDismissable } from "@deijose/nix-ui";

const dismiss = nixDismissable({
    container: modalElement,
    escapeKey: true,
    outsidePointer: true,
    onEscape: () => closeModal(),
    onPointerDownOutside: () => closeModal(),
});

dismiss.activate();
// ... later
dismiss.deactivate();`
    })}

            <h2 class="doc-h2">nixRovingTabindex</h2>
            <p class="doc-p">
                Implements the roving tabindex pattern for component groups like tabs, menus,
                radio groups, and toolbars. Only one element has <code>tabindex="0"</code> at a time,
                arrow keys move focus between items.
            </p>

            ${Usage({
        title: "Roving Tabindex for Tabs",
        description: "Arrow keys move focus between tab buttons.",
        demo: html`<span class="text-sm text-nix-text-muted">See code example</span>`,
        code: `import { nixRovingTabindex } from "@deijose/nix-ui";

const roving = nixRovingTabindex({
    container: tablistElement,
    itemSelector: "[role='tab']",
    orientation: "horizontal",
    loop: true,
    onIndexChange: (index) => setActiveTab(index),
});

roving.activate();
// Manually control focus
roving.focusNext();
roving.focusPrev();
roving.focusFirst();
roving.focusLast();
roving.deactivate();`
    })}

            <h2 class="doc-h2">nixAriaDescribedby</h2>
            <p class="doc-p">
                Manages <code>aria-describedby</code> by creating description elements and linking them
                to form inputs. Supports both descriptions and error messages.
            </p>

            ${Usage({
        title: "Error and Description Linking",
        description: "Automatically associates errors with inputs via aria-describedby.",
        demo: html`<span class="text-sm text-nix-text-muted">See code example</span>`,
        code: `import { nixAriaDescribedby } from "@deijose/nix-ui";

const describedby = nixAriaDescribedby({ element: inputElement });

// Set a hint
describedby.setDescription("Password must be at least 8 characters");

// Set an error (adds aria-invalid)
describedby.setError("Password is too short");

// Clear
describedby.clearDescription();

// Cleanup when component unmounts
describedby.cleanup();`
    })}

            <h2 class="doc-h2">nixLiveRegion</h2>
            <p class="doc-p">
                Announces messages to screen readers via <code>aria-live</code> regions.
                Use for dynamic updates like toast notifications, form submission results, etc.
            </p>

            ${Usage({
        title: "Announce to Screen Readers",
        description: "Send announcements with appropriate priority.",
        demo: html`<span class="text-sm text-nix-text-muted">See code example</span>`,
        code: `import { nixLiveRegion } from "@deijose/nix-ui";

// Polite announcement (waits for current speech to finish)
nixLiveRegion("Item added to cart");

// Assertive announcement (interrupts current speech)
nixLiveRegion("Form has errors", "assertive");`
    })}

            <h2 class="doc-h2">nixKeyboardSlider</h2>
            <p class="doc-p">
                Adds full keyboard navigation to slider inputs: Arrow keys, Page Up/Down, Home/End.
                Also provides <code>nixSliderValueText</code> for generating <code>aria-valuetext</code>.
            </p>

            ${Usage({
        title: "Keyboard Slider",
        description: "Add keyboard support to custom slider components.",
        demo: html`<span class="text-sm text-nix-text-muted">See code example</span>`,
        code: `import { nixKeyboardSlider, nixSliderValueText } from "@deijose/nix-ui";

const slider = nixKeyboardSlider({
    element: sliderInput,
    min: 0,
    max: 100,
    step: 5,
    pageStep: 20,
    onChange: (value) => updateValue(value),
});
slider.activate();

// Generate value text
const text = nixSliderValueText(50, 0, 100); // "50%"
const custom = nixSliderValueText(75, 0, 100, (v, p) => \`Volume: \${v}\`);
// "Volume: 75"`
    })}

            <h2 class="doc-h2">CSS: Screen Reader Only</h2>
            <p class="doc-p">
                The <code>.sr-only</code> class is included for visually hiding content that should
                still be announced by screen readers.
            </p>

            ${Usage({
        title: "sr-only Class",
        description: "Hide visually, keep accessible to screen readers.",
        demo: html`<span class="text-sm text-nix-text-muted">See code example</span>`,
        code: `<button class="p-2">
    <svg class="w-5 h-5" aria-hidden="true">...</svg>
    <span class="sr-only">Settings</span>
</button>`
    })}

            <h2 class="doc-h2">CSS: Focus Visible</h2>
            <p class="doc-p">
                Enhanced <code>:focus-visible</code> styles are included by default for better keyboard
                navigation visibility.
            </p>

            <h2 class="doc-h2">CSS: Reduced Motion</h2>
            <p class="doc-p">
                When <code>prefers-reduced-motion: reduce</code> is set, all animations and transitions
                are disabled automatically.
            </p>
        </div>
    `;
}
