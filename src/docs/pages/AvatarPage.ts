import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { Avatar } from "../../components/Avatar";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

export function AvatarPage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">Avatar</h1>
            <p class="doc-lead">Visual representation of users or entities.</p>
            
            ${Usage({
                title: "Sizes & Status",
                demo: html`
                    <div class="flex flex-wrap items-center gap-6">
                        ${Avatar({ size: "xs", name: "John Doe", status: "online" })}
                        ${Avatar({ size: "sm", name: "Jane Smith", status: "away" })}
                        ${Avatar({ size: "md", name: "Bob Wilson", status: "busy" })}
                        ${Avatar({ size: "lg", src: "https://i.pravatar.cc/150?u=a042581f4e29026704d", status: "offline" })}
                        ${Avatar({ size: "xl", name: "Alice Brown" })}
                    </div>
                `,
                code: `Avatar({ size: "md", name: "User Name", status: "online" })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "src", type: "string", default: "undefined", description: "Image source URL." },
                { name: "name", type: "string", default: "undefined", description: "Used for initials and background color." },
                { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Avatar scale." },
                { name: "status", type: "'online' | 'offline' | 'busy' | 'away'", default: "undefined", description: "Presence indicator." },
                { name: "class", type: "string", default: "''", description: "Additional classes." }
            ])}
        </div>
    `;
}
