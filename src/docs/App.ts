import { html, createRouter, RouterView, signal } from "@deijose/nix-js";
import { Sidebar } from "./Sidebar";
import { cx } from "../utils/cx";

// Import pages
import { Introduction } from "./pages/Introduction";
import { Installation } from "./pages/Installation";
import { AccordionPage } from "./pages/AccordionPage";
import { AlertPage } from "./pages/AlertPage";
import { AvatarPage } from "./pages/AvatarPage";
import { BadgePage } from "./pages/BadgePage";
import { ButtonPage } from "./pages/ButtonPage";
import { CardPage } from "./pages/CardPage";
import { CheckboxPage } from "./pages/CheckboxPage";
import { InputPage } from "./pages/InputPage";
import { ModalPage } from "./pages/ModalPage";
import { SelectPage } from "./pages/SelectPage";
import { SpinnerPage } from "./pages/SpinnerPage";
import { TabsPage } from "./pages/TabsPage";
import { TextareaPage } from "./pages/TextareaPage";
import { ToastPage } from "./pages/ToastPage";
import { TogglePage } from "./pages/TogglePage";
import { TooltipPage } from "./pages/TooltipPage";
import { FormsPage } from "./pages/FormsPage";

const routes = [
    { path: "/", component: Introduction },
    { path: "/installation", component: Installation },
    { path: "/accordion", component: AccordionPage },
    { path: "/alert", component: AlertPage },
    { path: "/avatar", component: AvatarPage },
    { path: "/badge", component: BadgePage },
    { path: "/button", component: ButtonPage },
    { path: "/card", component: CardPage },
    { path: "/checkbox", component: CheckboxPage },
    { path: "/input", component: InputPage },
    { path: "/modal", component: ModalPage },
    { path: "/select", component: SelectPage },
    { path: "/spinner", component: SpinnerPage },
    { path: "/tabs", component: TabsPage },
    { path: "/textarea", component: TextareaPage },
    { path: "/toast", component: ToastPage },
    { path: "/toggle", component: TogglePage },
    { path: "/tooltip", component: TooltipPage },
    { path: "/forms", component: FormsPage },
];

export const router = createRouter(routes);

const groups = [
    {
        title: "Getting Started",
        links: [
            { id: "/", label: "Introduction" },
            { id: "/installation", label: "Installation" },
        ]
    },
    {
        title: "Components",
        links: [
            { id: "/accordion", label: "Accordion" },
            { id: "/alert", label: "Alert" },
            { id: "/avatar", label: "Avatar" },
            { id: "/badge", label: "Badge" },
            { id: "/button", label: "Button" },
            { id: "/card", label: "Card" },
            { id: "/checkbox", label: "Checkbox" },
            { id: "/input", label: "Input" },
            { id: "/modal", label: "Modal" },
            { id: "/select", label: "Select" },
            { id: "/spinner", label: "Spinner" },
            { id: "/tabs", label: "Tabs" },
            { id: "/textarea", label: "Textarea" },
            { id: "/toast", label: "Toast" },
            { id: "/toggle", label: "Toggle" },
            { id: "/tooltip", label: "Tooltip" },
        ]
    },
    {
        title: "Advanced",
        links: [
            { id: "/forms", label: "Forms & Validation" },
        ]
    }
];

export function App() {
    const isSidebarOpen = signal(false);

    return html`
        <div class="doc-layout transition-all duration-300">
            <!-- Mobile Header -->
            <header class="mobile-header">
                <button class="mobile-toggle" @click=${() => isSidebarOpen.value = true}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
                <div class="mobile-title">Nix UI</div>
            </header>

            <!-- Overlay -->
            <div 
                class=${() => cx("sidebar-overlay", isSidebarOpen.value && "active")} 
                @click=${() => isSidebarOpen.value = false}
            ></div>

            ${Sidebar(groups, () => isSidebarOpen.value, () => isSidebarOpen.value = false)}
            
            <main class="main-content">
                <div class="content-view">
                    ${new RouterView()}
                </div>
            </main>
        </div>
    `;
}
