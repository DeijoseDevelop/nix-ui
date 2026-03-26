import { html } from "@deijose/nix-js";
import type { NixTemplate } from "@deijose/nix-js";
import { DataTable } from "../../components/DataTable";
import { Badge } from "../../components/Badge";
import { Usage } from "../Usage";
import { PropTable } from "../PropTable";

const sampleData = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", joined: "2024-01-15" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active", joined: "2024-02-20" },
    { id: 3, name: "Carol Davis", email: "carol@example.com", role: "Viewer", status: "Inactive", joined: "2024-03-10" },
    { id: 4, name: "Dan Wilson", email: "dan@example.com", role: "Admin", status: "Active", joined: "2024-04-05" },
    { id: 5, name: "Eve Martinez", email: "eve@example.com", role: "Editor", status: "Active", joined: "2024-05-12" },
    { id: 6, name: "Frank Lee", email: "frank@example.com", role: "Viewer", status: "Inactive", joined: "2024-06-18" },
    { id: 7, name: "Grace Kim", email: "grace@example.com", role: "Admin", status: "Active", joined: "2024-07-22" },
    { id: 8, name: "Hank Brown", email: "hank@example.com", role: "Editor", status: "Active", joined: "2024-08-30" },
    { id: 9, name: "Iris Chen", email: "iris@example.com", role: "Viewer", status: "Inactive", joined: "2024-09-14" },
    { id: 10, name: "Jack Taylor", email: "jack@example.com", role: "Admin", status: "Active", joined: "2024-10-01" },
    { id: 11, name: "Kara White", email: "kara@example.com", role: "Editor", status: "Active", joined: "2024-10-15" },
    { id: 12, name: "Leo Harris", email: "leo@example.com", role: "Viewer", status: "Inactive", joined: "2024-11-02" },
];

export function DataTablePage(): NixTemplate {
    return html`
        <div class="doc-container animate-nix-fade-in">
            <h1 class="doc-h1">DataTable</h1>
            <p class="doc-lead">A fully dynamic table with sorting, searching, pagination, and responsive design.</p>
            
            ${Usage({
                title: "Full-Featured Table",
                demo: DataTable({
                    columns: [
                        { key: "id", label: "#", width: "60px", align: "center" },
                        { key: "name", label: "Name" },
                        { key: "email", label: "Email" },
                        { key: "role", label: "Role" },
                        { key: "status", label: "Status", render: (val) => Badge({ variant: val === "Active" ? "success" : "default", size: "sm", children: String(val) }) },
                        { key: "joined", label: "Joined" },
                    ],
                    data: sampleData,
                    pageSize: 5,
                }),
                code: `DataTable({
    columns: [
        { key: "id", label: "#", width: "60px" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "status", label: "Status",
          render: (val) => Badge({ variant: val === "Active" ? "success" : "default", children: val })
        },
    ],
    data: myData,
    pageSize: 5,
})`
            })}

            ${Usage({
                title: "Compact & Bordered",
                demo: DataTable({
                    columns: [
                        { key: "name", label: "Name" },
                        { key: "role", label: "Role" },
                        { key: "status", label: "Status" },
                    ],
                    data: sampleData.slice(0, 5),
                    compact: true,
                    bordered: true,
                    searchable: false,
                }),
                code: `DataTable({ compact: true, bordered: true, searchable: false })`
            })}

            <h2 class="doc-h2">API Reference</h2>
            ${PropTable([
                { name: "columns", type: "DataTableColumn[]", default: "required", description: "Column definitions with key, label, sortable, render, width, align." },
                { name: "data", type: "T[] | Signal<T[]>", default: "required", description: "Row data array. Supports reactive signals." },
                { name: "pageSize", type: "number", default: "10", description: "Rows per page." },
                { name: "searchable", type: "boolean", default: "true", description: "Show the search input." },
                { name: "striped", type: "boolean", default: "true", description: "Alternate row backgrounds." },
                { name: "hoverable", type: "boolean", default: "true", description: "Highlight rows on hover." },
                { name: "bordered", type: "boolean", default: "false", description: "Add vertical borders." },
                { name: "compact", type: "boolean", default: "false", description: "Reduce padding." },
                { name: "stickyHeader", type: "boolean", default: "false", description: "Sticky header on scroll." },
                { name: "emptyMessage", type: "string", default: "'No data available.'", description: "Message when no rows." },
            ])}
        </div>
    `;
}
