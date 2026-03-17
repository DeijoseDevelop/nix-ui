import { html, useRouter } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { cx } from "../utils/cx";

interface NavLink {
    id: string;
    label: string;
}

interface NavGroup {
    title: string;
    links: NavLink[];
}

export function Sidebar(groups: NavGroup[], isOpen?: () => boolean, onClose?: () => void): NixTemplate {
    const router = useRouter();

    return html`
        <aside class=${() => cx("sidebar", isOpen?.() && "open")}>
            <div class="sidebar-header">
                <a 
                    href="/" 
                    class="sidebar-title"
                    @click=${(e: Event) => {
                        e.preventDefault();
                        router.navigate("/");
                        window.scrollTo(0, 0);
                        onClose?.();
                    }}
                >
                    <img src="/images/ico/favicon-96x96.png" alt="Nix.js Logo" class="sidebar-logo-img">
                    <span>Nix UI</span>
                </a>
                
                <button class="sidebar-close" @click=${onClose}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
            
            <nav class="sidebar-nav">
                ${groups.map(group => html`
                    <div class="nav-group">
                        <h3 class="nav-group-title">${group.title}</h3>
                        <div class="space-y-1">
                            ${group.links.map(link => html`
                                <a 
                                    class=${() => cx("sidebar-link", router.isActive(link.id) && "active")}
                                    @click=${(e: Event) => {
                                        e.preventDefault();
                                        router.navigate(link.id);
                                        window.scrollTo(0, 0);
                                        onClose?.();
                                    }}
                                    href=${link.id}
                                >
                                    ${link.label}
                                </a>
                            `)}
                        </div>
                    </div>
                `)}
            </nav>
        </aside>
    `;
}
