import { html, signal } from "@deijose/nix-js";
import { Drawer } from "../../components/Drawer";
import { Button } from "../../components/Button";

export function DrawerPage() {
    const isRightOpen = signal(false);
    const isLeftOpen = signal(false);
    const isBottomOpen = signal(false);
    
    return html`
        <div class="space-y-6">
            <div class="space-y-2">
                <h1 class="text-3xl font-bold tracking-tight text-nix-text">Drawer</h1>
                <p class="text-lg text-nix-text-muted">A panel that slides in from the edge of the screen.</p>
            </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">Positions</h2>
                <div class="p-6 border border-nix-border rounded-nix-md bg-nix-bg-subtle flex gap-4 flex-wrap">
                    ${Button({
                        children: "Open Right Drawer",
                        onClick: () => isRightOpen.value = true
                    })}
                    
                    ${Button({
                        children: "Open Left Drawer",
                        variant: "outline",
                        onClick: () => isLeftOpen.value = true
                    })}
                    
                    ${Button({
                        children: "Open Bottom Drawer",
                        variant: "secondary",
                        onClick: () => isBottomOpen.value = true
                    })}
                </div>
            </div>

            ${Drawer({
                open: () => isRightOpen.value,
                onClose: () => isRightOpen.value = false,
                position: "right",
                title: "User Profile",
                description: "Manage your account settings here.",
                children: html`
                    <div class="flex flex-col gap-4">
                        <p class="text-sm">The Drawer component provides an alternative to modals for displaying contextual information or settings without losing the overall page context.</p>
                        <div class="h-32 bg-nix-border rounded-nix-md flex items-center justify-center">Profile Content</div>
                    </div>
                `,
                footer: html`
                    <div class="flex justify-end gap-2">
                        ${Button({ variant: "ghost", children: "Cancel", onClick: () => isRightOpen.value = false })}
                        ${Button({ children: "Save Changes", onClick: () => isRightOpen.value = false })}
                    </div>
                `
            })}
            
            ${Drawer({
                open: () => isLeftOpen.value,
                onClose: () => isLeftOpen.value = false,
                position: "left",
                title: "Navigation Menu",
                children: html`
                    <div class="flex flex-col gap-2">
                        <a href="#" class="p-2 hover:bg-nix-bg-subtle rounded-nix-md">Home</a>
                        <a href="#" class="p-2 hover:bg-nix-bg-subtle rounded-nix-md">Dashboard</a>
                        <a href="#" class="p-2 hover:bg-nix-bg-subtle rounded-nix-md">Settings</a>
                    </div>
                `
            })}
            
            ${Drawer({
                open: () => isBottomOpen.value,
                onClose: () => isBottomOpen.value = false,
                position: "bottom",
                title: "Options panel",
                children: html`
                    <div class="flex items-center justify-center h-full">
                        <p>This is a bottom drawer, often used for mobile action sheets.</p>
                    </div>
                `
            })}
        </div>

            <div class="space-y-4">
                <h2 class="text-2xl font-semibold text-nix-text border-b border-nix-border pb-2">API Reference</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left border-collapse">
                        <thead class="bg-nix-bg-subtle text-nix-text border-b border-nix-border">
                            <tr>
                                <th class="p-3 font-semibold">Prop</th>
                                <th class="p-3 font-semibold">Type</th>
                                <th class="p-3 font-semibold">Default</th>
                                <th class="p-3 font-semibold">Description</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-nix-border">
                            <tr><td class="p-3 font-mono text-nix-primary">open</td><td class="p-3">boolean | () => boolean</td><td class="p-3">false</td><td class="p-3 flex-1 break-words">Whether the drawer is visible.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">onClose</td><td class="p-3">() => void</td><td class="p-3">-</td><td class="p-3 flex-1 break-words">Callback fired when the user attempts to close the drawer.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">position</td><td class="p-3">"left" | "right" | "top" | "bottom"</td><td class="p-3">"right"</td><td class="p-3 flex-1 break-words">Slide-in direction of the drawer.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">title</td><td class="p-3">NixTemplate</td><td class="p-3">-</td><td class="p-3 flex-1 break-words">Heading template inside the Drawer header.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">description</td><td class="p-3">NixTemplate</td><td class="p-3">-</td><td class="p-3 flex-1 break-words">Subtitle displayed below the title.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">children</td><td class="p-3">NixTemplate</td><td class="p-3">-</td><td class="p-3 flex-1 break-words">Main content of the drawer.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">footer</td><td class="p-3">NixTemplate</td><td class="p-3">-</td><td class="p-3 flex-1 break-words">Actions positioned at the bottom border.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">closeOnEscape</td><td class="p-3">boolean</td><td class="p-3">true</td><td class="p-3 flex-1 break-words">If true, pressing ESC closes the drawer.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">closeOnOutsideClick</td><td class="p-3">boolean</td><td class="p-3">true</td><td class="p-3 flex-1 break-words">If true, clicking outside the drawer closes it.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">OverlayClass</td><td class="p-3">string</td><td class="p-3">undefined</td><td class="p-3 flex-1 break-words">Custom classes for the overlay backdrop.</td></tr>
                            <tr><td class="p-3 font-mono text-nix-primary">DrawerClass</td><td class="p-3">string</td><td class="p-3">undefined</td><td class="p-3 flex-1 break-words">Custom classes for the slide-in container.</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}
