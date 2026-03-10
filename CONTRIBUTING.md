# Contributing to Nix-UI

First off, thank you for considering contributing to Nix-UI! It's people like you that make Nix-UI a great open-source library.

## Getting Started

1. **Fork the repository** on GitHub.
2. **Clone your fork locally**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/nix-ui.git
   cd nix-ui
   ```
3. **Install dependencies**:
   We recommend using `bun` or `npm`.
   ```bash
   npm install
   ```

## Development Workflow

The library source code is in `src/components`, `src/utils`, and `src/styles`. There is also a `src/main.ts` file running a Vite development server to preview your changes in real-time.

1. **Start the playground**:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:5173` to see your changes.

## Adding a New Component

If you're proposing a new component:
1. Create `src/components/ComponentName.ts`.
2. Ensure you follow the API patterns (accept `class`, `style`, and use `cx` utility for Tailwind classes).
3. Export your component and its `Props` interface in `src/index.ts`.
4. Add an example block showing how to use it in `src/main.ts`.

## Pull Request Guidelines

- Ensure `npm run build:lib` and `npm run typecheck` complete without errors.
- Limit each PR to a single feature or bugfix.
- Follow the existing code style and formatting.
- Update the documentation (README) if your change adds or changes the API.

## Code of Conduct

Please note that we have a [Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project, you agree to abide by its terms.
