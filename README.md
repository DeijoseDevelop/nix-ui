# Nix UI

> 📖 **Read the official documentation, API references, and interact with live sandboxes at [ui.nix-js.dev](https://ui.nix-js.dev)**

A beautifully designed, heavily optimized component library built from the ground up for **Nix.js**. Powered by **Tailwind CSS v4** styling, but completely open for Vanilla CSS overrides when you need maximum control.

[![npm version](https://img.shields.io/npm/v/@deijose/nix-ui.svg)](https://www.npmjs.com/package/@deijose/nix-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Why Nix UI?

Nix UI leverages the ultra-lightweight signals architecture of Nix.js combined with the utility-first power of Tailwind CSS to deliver **26 essential components** that are ready to use, accessible, and look stunning out of the box.

*   **Native Nix.js Performance**: Fully reactive, no VDOM overhead.
*   **Fully Animated**: Deeply integrated with Nix.js `transition()` for buttery smooth 60fps animations.
*   **Tailwind v4 First**: Pre-styled with modern Tailwind utilities while exposing CSS custom properties.
*   **Vanilla CSS Escape Hatch**: Override ANY component using the `class` mapping or standard inline `style`.

## 📦 Installation

```bash
# Core framework
npm i @deijose/nix-js

# UI Library
npm i @deijose/nix-ui
```

*(Note: Tailwind CSS v4 setup is recommended in your project to fully apply the utility classes used by Nix UI).*

## 🚀 Quick Start

Drop Nix-UI components straight into your application!

```typescript
import { html, signal } from "@deijose/nix-js";
import { Button, Input, Card, Modal, showToast } from "@deijose/nix-ui";

// You MUST import the base styles once in your entry point:
import "@deijose/nix-ui/styles"; 

export function App() {
  const isModalOpen = signal(false);

  return html`
    <div class="p-8 max-w-2xl mx-auto space-y-6">
      
      ${Card({
        children: html`
          <h2 class="text-2xl font-bold mb-4">Welcome to Nix UI</h2>
          
          <div class="flex gap-4 items-end">
            ${Input({ label: "Your Email", placeholder: "test@example.com" })}
            ${Button({ 
              children: "Subscribe",
              onClick: () => showToast("Subscribed successfully!", "success")
            })}
          </div>
          
          <div class="mt-6">
            ${Button({
              variant: "outline",
              children: "Open Settings",
              onClick: () => isModalOpen.value = true
            })}
          </div>
        `
      })}

      ${Modal({
        open: isModalOpen,
        title: "Account Settings",
        children: html`<p>Manage your account details and preferences here.</p>`,
        footer: html`
            ${Button({ variant: "ghost", children: "Cancel", onClick: () => isModalOpen.value = false })}
            ${Button({ children: "Save Changes", onClick: () => isModalOpen.value = false })}
        `
      })}
    </div>
  `;
}
```

---

## 🧩 Components Catalog

Nix UI offers 26 fully-featured components. Check out the interactive playgrounds and full API documentation on our site:

### 🔲 Layout & Containers
* [Card](https://ui.nix-js.dev/components/card)
* [Accordion](https://ui.nix-js.dev/components/accordion)

### 🔘 Interaction & Forms
* [Button](https://ui.nix-js.dev/components/button)
* [Input](https://ui.nix-js.dev/components/input)
* [Textarea](https://ui.nix-js.dev/components/textarea)
* [Select](https://ui.nix-js.dev/components/select)
* [Checkbox](https://ui.nix-js.dev/components/checkbox)
* [RadioGroup](https://ui.nix-js.dev/components/radio-group)
* [Toggle / Switch](https://ui.nix-js.dev/components/toggle)
* [Slider](https://ui.nix-js.dev/components/slider)
* [Rating](https://ui.nix-js.dev/components/rating)

### 📊 Data Display
* [Badge](https://ui.nix-js.dev/components/badge)
* [Avatar](https://ui.nix-js.dev/components/avatar)
* [Spinner](https://ui.nix-js.dev/components/spinner)
* [Alert](https://ui.nix-js.dev/components/alert)
* [Progress](https://ui.nix-js.dev/components/progress)
* [Skeleton](https://ui.nix-js.dev/components/skeleton)
* [DataTable](https://ui.nix-js.dev/components/data-table)

### 🧩 Overlay & Navigation
* [Modal](https://ui.nix-js.dev/components/modal)
* [Drawer](https://ui.nix-js.dev/components/drawer)
* [Dropdown](https://ui.nix-js.dev/components/dropdown)
* [Tooltip](https://ui.nix-js.dev/components/tooltip)
* [Tabs](https://ui.nix-js.dev/components/tabs)
* [Breadcrumb](https://ui.nix-js.dev/components/breadcrumb)
* [Pagination](https://ui.nix-js.dev/components/pagination)
* [Toast](https://ui.nix-js.dev/components/toast)

> 🎯 **[Explore all components on ui.nix-js.dev](https://ui.nix-js.dev/components)**

---

## 🎨 Theming & Customization

Every component accepts `class` and `style` props. Nix UI intelligently merges your custom Tailwind classes with its own base styling via an internal `cx()` engine.

Furthermore, colors and rounding are handled via CSS variables. You can easily tweak the default palette (e.g. `--nix-primary`, `--nix-bg`, `--nix-text`) across your whole app.

**[Read the Theming Guide on ui.nix-js.dev](https://ui.nix-js.dev/theming)**

```typescript
// Example changing a button's specific Tailwind classes
Button({
  class: "bg-purple-600 hover:bg-purple-700 shadow-xl rounded-full px-8",
  children: "Custom Pill Button"
})
```

## 🤝 Contributing

We welcome contributions to Nix-UI! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to set up the repository, run the demo locally, and submit Pull Requests.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
