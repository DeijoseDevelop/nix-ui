# ❄️ Nix UI

A beautifully designed, heavily optimized component library built from the ground up for **Nix.js**. Powered by **Tailwind CSS v4** styling, but completely open for Vanilla CSS overrides when you need maximum control.

[![npm version](https://img.shields.io/npm/v/@deijose/nix-ui.svg)](https://www.npmjs.com/package/@deijose/nix-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Why Nix UI?

Nix UI leverages the ultra-lightweight signals architecture of Nix.js combined with the utility-first power of Tailwind CSS to deliver **16 essential components** that are ready to use, accessible, and look stunning out of the box.

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

## 🧩 Components Catalog (16 Components)

### 🔲 Layout & Containers

#### 1. Card
A versatile container with optional header and footer slots.
```typescript
Card({
  header: html`<h3 class="font-bold">Card Title</h3>`,
  children: "Inner body content here...",
  footer: html`<span class="text-sm">Footer text</span>`
})
```

#### 2. Accordion
A vertically stacked set of interactive headings that each reveal a section of content.
```typescript
Accordion({
  items: [
    { title: "Section 1", content: "Content for section 1" },
    { title: "Section 2", content: "Content for section 2" }
  ]
})
```

### 🔘 Interaction & Forms

#### 3. Button
Primary interactive element with 5 variants (`primary`, `secondary`, `outline`, `danger`, `ghost`) and 3 sizes (`sm`, `md`, `lg`).
```typescript
Button({ 
  variant: "primary", 
  size: "lg", 
  loading: false,
  onClick: () => console.log('clicked'),
  children: "Click Me" 
})
```

#### 4. Input
Text input with visual label formatting, focused states, and external error state formatting.
```typescript
Input({
  label: "Username",
  placeholder: "Enter username",
  type: "text"
})
```

#### 5. Textarea
Multi-line text input with custom styling and standard attributes.
```typescript
Textarea({
  label: "Description",
  placeholder: "Write something...",
  rows: 4
})
```

#### 6. Select
Native `<select>` dropdown styled to match the UI system.
```typescript
Select({
  label: "Country",
  options: [
    { label: "Select a country...", value: "" },
    { label: "USA", value: "us" },
  ]
})
```

#### 7. Checkbox
Custom styled checkbox element supporting checked bindings.
```typescript
Checkbox({
  label: "I agree to the terms",
  checked: mySignal.value,
  onChange: (e) => mySignal.value = e.target.checked
})
```

#### 8. Toggle / Switch
Animated toggle switch component.
```typescript
Toggle({
  label: "Enable notifications",
  checked: mySignal.value,
  onChange: (e) => mySignal.value = e.target.checked
})
```

### 📊 Data Display

#### 9. Badge
Small status indicators displaying inline information. Sizes (`sm`, `md`, `lg`) and variants (`default`, `primary`, `success`, `warning`, `error`).
```typescript
Badge({
  variant: "success",
  children: "Completed"
})
```

#### 10. Avatar
Circular image wrapper with automatic fallback parsing to display initials. Sizes (`sm`, `md`, `lg`, `xl`).
```typescript
// With image
Avatar({ src: "/avatar.jpg", alt: "John Doe" })

// With fallback initials (renders "JD")
Avatar({ fallback: "John Doe" }) 
```

#### 11. Spinner
Loading indicator. Variants (`primary`, `white`, `neutral`) and sizes (`sm`, `md`, `lg`).
```typescript
Spinner({ size: "md", variant: "primary" })
```

#### 12. Alert
Static banner for displaying important messages. Variants (`info`, `success`, `warning`, `error`). Native animated close button support.
```typescript
Alert({
  title: "Update Available",
  children: "A new version of the software is ready.",
  variant: "info",
  onClose: () => hideAlert()
})
```

### 🧩 Overlay & Navigation

#### 13. Modal
Dialog window overlay taking focus over everything else. Smooth enter/exit transition animations.
```typescript
Modal({
  open: modalStateSignal,
  title: "Confirm Action",
  closeButton: true,
  children: html`<p>Are you sure you want to do this?</p>`,
})
```

#### 14. Tooltip
Small popover providing contextual information on hover.
```typescript
Tooltip({
  content: "This does something special",
  position: "top", // top, bottom, left, right
  children: Button({ children: "Hover Me" })
})
```

#### 15. Tabs
Organize content into selectable panels.
```typescript
Tabs({
  tabs: [
    { id: "tab1", label: "Profile", content: () => html`Profile Data` },
    { id: "tab2", label: "Settings", content: () => html`Settings Data` },
  ],
  defaultTab: "tab1"
})
```

#### 16. Toast
Non-blocking notifications floating above content. Automatically expires with progress bar. Top-level API usage `showToast()`.
```typescript
import { showToast } from "@deijose/nix-ui";

// Trigger anywhere!
showToast("Profile saved successfully!", "success", {
  position: "bottom-right",
  duration: 4000
});
```

---

## Overriding Styles

Every component accepts `class` and `style` props. Nix UI intelligently merges your custom classes with its own base styling via an internal `cx()` engine powered by intelligent tailwind-class manipulation.

```typescript
// Changing a button's specific Tailwind classes
Button({
  class: "bg-purple-600 hover:bg-purple-700 shadow-xl rounded-full px-8",
  children: "Custom Pill Button"
})

// Or using inline CSS / CSS Modules
Button({
  style: "background: linear-gradient(90deg, #ff00cc, #333399); border-radius: 999px;",
  children: "Gradient Button"
})
```

## 🤝 Contributing

We welcome contributions to Nix-UI! Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to set up the repository, run the demo locally, and submit Pull Requests.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
