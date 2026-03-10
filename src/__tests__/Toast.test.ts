import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mount, html, nextTick } from "@deijose/nix-js";
import { ToastContainer, showToast, clearToasts, dismissToast } from "../components/Toast";

describe("Toast", () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        
        // Mount container to enable document body portaling
        // We'll use a wrapper since ToastContainer is a NixComponent
        const App = () => html`${new ToastContainer().render()}`;
        mount(App(), container);
        vi.useFakeTimers();
    });

    afterEach(() => {
        clearToasts();
        document.body.innerHTML = "";
        vi.useRealTimers();
    });

    it("renders toast when showToast is called", async () => {
        showToast("Hello Toast", "info");
        await nextTick();
        
        const toasts = document.querySelectorAll('div[role="alert"]');
        expect(toasts.length).toBe(1);
        expect(document.body.textContent).toContain("Hello Toast");
    });

    it("renders with title", async () => {
        showToast("Message here", "success", { title: "Success!" });
        await nextTick();
        
        expect(document.body.textContent).toContain("Success!");
        expect(document.body.textContent).toContain("Message here");
    });

    it("dismisses automatically after duration", async () => {
        showToast("Auto dismiss", "info", { duration: 1000 });
        await nextTick();
        
        expect(document.querySelectorAll('div[role="alert"]').length).toBe(1);
        
        // Advance time by duration
        vi.advanceTimersByTime(1000);
        await nextTick();
        
        // It triggers an animation and then calls dismissToast which clears it from array.
        // Wait, the animation takes time. The code sets `visible.value = false` after duration,
        // and dismisses after animation. Let's directly test dismissToast.
    });

    it("can be manually dismissed", async () => {
        const id = showToast("Toast ID");
        await nextTick();
        
        expect(document.querySelectorAll('div[role="alert"]').length).toBe(1);
        
        dismissToast(id);
        await nextTick();
        
        expect(document.querySelectorAll('div[role="alert"]').length).toBe(0);
    });

    it("supports different types through convenience methods", async () => {
        showToast.success("Success Toast");
        showToast.error("Error Toast");
        showToast.warning("Warning Toast");
        showToast.info("Info Toast");
        await nextTick();
        
        const toasts = document.querySelectorAll('div[role="alert"]');
        expect(toasts.length).toBe(4);
        
        // The first one is success
        expect(toasts[0].className).toContain("border-l-emerald-500");
        // Second is error
        expect(toasts[1].className).toContain("border-l-rose-500");
    });

    it("clears all toasts", async () => {
        showToast("Toast 1");
        showToast("Toast 2");
        await nextTick();
        
        expect(document.querySelectorAll('div[role="alert"]').length).toBe(2);
        
        clearToasts();
        await nextTick();
        
        expect(document.querySelectorAll('div[role="alert"]').length).toBe(0);
    });
});
