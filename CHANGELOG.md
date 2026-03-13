# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-03-13

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
