# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
