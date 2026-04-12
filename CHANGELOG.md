# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.1] - 2026-04-12

### Changed
- **Nix.js Compatibility Floor**: Raised `@deijose/nix-js` peer dependency and internal dependency baseline to `2.1.0` to align with current framework APIs and documentation.

## [1.3.0] - 2026-04-11

### Added
- **Core Accessibility Utilities**: Introduced headless accessibility primitives in \`src/utils/a11y/\` including \`nixRovingTabindex\`, \`nixFocusTrap\`, \`nixFocusRestore\`, \`nixDismissable\`, \`nixLiveRegion\` and \`nixAriaDescribedby\`.
- **Accessibility Docs**: Added a new _Accessibility Utilities_ page explaining the WAI-ARIA abstractions.

### Changed
- **README Redesign**: Restructured the root \`README.md\` to point users to the official site \`ui.nix-js.dev\`, cleaning up the repository entry point.

### Fixed
- **Native Keyboard Navigation**: Overhauled \`Tabs\`, \`Accordion\`, and \`Dropdown\` to use \`nixRovingTabindex\`, replacing faux visual focus with true DOM keyboard arrow navigation.
- **Drawer Accessibility**: Fixed uninitialized focus lock in the \`Drawer\` component.
- **Dropdown Disabled Items**: Ensured keyboard navigation properly skips \`disabled\` elements inside the \`Dropdown\` menu via css selector filtering.

## [1.2.5] - 2026-03-25

### Added
- **10 New Premium Components**: `DataTable`, `Drawer`, `Pagination`, `Progress`, `RadioGroup`, `Rating`, `Skeleton`, `Slider`, `Breadcrumb`, and `Dropdown`.
- **Comprehensive Test Suite**: Test suite extended to 117 unit tests, keeping 100% test coverage across all 26 components.
- **Styling Section**: Added a new _Styling & Customization_ page teaching developers how to configure themes and CSS variables.
- **Extended API References**: Added API tables across all the new components (`Rating`, `Pagination`, `Drawer`, etc).

### Fixed
- **Mobile Responsiveness**:
  - `doc-layout`: Fixed a CSS Grid blowout bug (`minmax(0, 1fr)`) that caused horizontal scrolling on mobile viewports.
  - `PropTable`: Nested tables inside horizontal scrolling overlays to prevent layout breakage.
  - `Toast`, `Tabs`, `Pagination`: Optimized alignments, wrapping, and sizes for small screen form factors.
- **Z-Index Layering**: Solved layering issues where `Dropdown` popups rendered beneath subsequent `.preview-box` components.
- **Hydration Behaviors**: Unified attribute bindings directly relying on standard IDL attribute mappings.

## [1.2.2] - 2026-03-16

### Added
- **Client-Side Routing**: Integrated `@deijose/nix-js` router for seamless documentation navigation.
- **Modular Architecture**: Split documentation pages into individual components in the `pages/` directory.
- **Premium Design Overhaul**: Redesigned documentation with professional typography, background patterns, and refined spacing.
- **Sidebar Enhancements**: Added Nix.js logo and active link highlighting with `router.isActive()`.
- **API Documentation**: Added missing API references for `Tabs` and `Toast` components.

### Fixed
- **Forms Page**: Fixed issues with the forms documentation page and touched state handling.
- **Component Stability**: Fixed width stability issues in `Accordion` when expanded.
- **UI Consistency**: Fixed grid background overlapping components in preview boxes.

## [1.1.3] - 2026-03-13
### Changed
- Refactored documentation shell for better performance.

## [1.1.0] - 2026-03-10

### Added
- **Testing Setup**: Configured integrated tests with `vitest` and `happy-dom`.
- **Component Tests**: 100% test coverage successfully written for all 16 components (`Accordion`, `Alert`, `Avatar`, `Badge`, `Button`, `Card`, `Checkbox`, `Input`, `Modal`, `Select`, `Spinner`, `Tabs`, `Textarea`, `Toast`, `Toggle`, `Tooltip`).
- **Showcase Updates**: Added dynamic favicon sets/manifests and an overhauled premium layout for the main component testing page.

### Fixed
- **Forms Integration**: Fixed global scope and validation execution context within `main.ts` for form-tied components (`createForm`).


## [1.0.0] - 2026-03-09

### Added
- **Core Package**: Initial release of Nix-UI `@deijose/nix-ui`.
- **System**: Tailwind CSS v4 integration with Vanilla CSS custom properties override layer.
- **Components**: 16 Core UI components ready for production:
  - `Accordion`
  - `Alert`
  - `Avatar`
  - `Badge`
  - `Button`
  - `Card`
  - `Checkbox`
  - `Input`
  - `Modal`
  - `Select`
  - `Spinner`
  - `Tabs`
  - `Textarea`
  - `Toast`
  - `Toggle`
  - `Tooltip`
- **Utilities**: `cx` utility for robust tailwind and standard class merging.
- **Types**: Full TypeScript support with `NixUIChildren` type definitions.
- **Documentation**: README, Setup Guide and Contribution Guidelines included.
- **Build System**: Vite lib mode configuration for CJS and ES modules.
