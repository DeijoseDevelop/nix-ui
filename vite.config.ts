/// <reference types="vitest" />
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [tailwindcss()],
    // @ts-ignore - Vitest types
    test: {
        environment: "happy-dom",
    },
});
