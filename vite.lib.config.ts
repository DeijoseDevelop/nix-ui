import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// ── Library build configuration ───────────────────────────────────────────────
//
//   npm run build:lib
//
// Produces:
//   dist/lib/nix-ui.js      — ES module  (primary)
//   dist/lib/nix-ui.cjs     — CommonJS   (legacy Node.js / bundlers)
//   dist/lib/nix-ui.css     — Tailwind styles
//   dist/lib/*.d.ts         — Type declarations (generated separately by tsc)

export default defineConfig({
    publicDir: false,

    plugins: [tailwindcss()],

    build: {
        outDir: "dist/lib",
        emptyOutDir: true,
        sourcemap: true,
        cssCodeSplit: false,

        lib: {
            entry: resolve("src/index.ts"),
            name: "NixUI",
            formats: ["es", "cjs"],
            fileName: (format) => (format === "cjs" ? "nix-ui.cjs" : "nix-ui.js"),
        },

        rollupOptions: {
            external: ["@deijose/nix-js"],
            output: {
                globals: {
                    "@deijose/nix-js": "NixJS",
                },
                preserveModules: false,
            },
        },
    },
});
