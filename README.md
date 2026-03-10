# ❄️ Nix UI

[![npm version](https://img.shields.io/npm/v/@deijose/nix-ui.svg)](https://www.npmjs.com/package/@deijose/nix-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A heavily optimized component library built from the ground up for **Nix.js**. Powered by Tailwind CSS v4 styling but open for Vanilla CSS overrides.

**[→ Full Documentation & 16 Components on GitHub](https://github.com/DeijoseDevelop/nix-ui)**

## Installation

```bash
npm install @deijose/nix-ui
```

*(Requires `@deijose/nix-js` >= 1.2.0 as peer dependency)*

## Quick Start

You must import the base CSS styles once in your entry point:

```typescript
import { html, signal } from "@deijose/nix-js";
import { Button, Input, Card, showToast } from "@deijose/nix-ui";

import "@deijose/nix-ui/styles"; 

export function App() {
  return html`
    <div class="p-8 max-w-sm mx-auto">
      ${Card({
        children: html`
          <h2 class="text-xl font-bold mb-4">Subscribe</h2>
          <div class="space-y-4">
            ${Input({ label: "Email address", placeholder: "you@example.com" })}
            ${Button({ 
              class: "w-full",
              children: "Subscribe Now",
              onClick: () => showToast("Subscribed!", "success")
            })}
          </div>
        `
      })}
    </div>
  `;
}
```

## Documentation

For full API reference, all 16 components examples, and styling guides:

**→ [github.com/DeijoseDevelop/nix-ui](https://github.com/DeijoseDevelop/nix-ui)**

## License

MIT
