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

export function Sidebar(groups: NavGroup[]): NixTemplate {
    const router = useRouter();

    return html`
        <aside class="sidebar">
            <a 
                href="/" 
                class="sidebar-title"
                @click=${(e: Event) => {
                    e.preventDefault();
                    router.navigate("/");
                    window.scrollTo(0, 0);
                }}
            >
                <img src="../images/ico/favicon-96x96.png" alt="Nix.js Logo" class="sidebar-logo-img">
                <span>Nix UI</span>
            </a>
            
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
                                }}
                                href=${link.id}
                            >
                                ${link.label}
                            </a>
                        `)}
                    </div>
                </div>
            `)}
        </aside>
    `;
}
