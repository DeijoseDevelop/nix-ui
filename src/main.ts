import { mount } from "@deijose/nix-js";
import "./styles/base.css";
import { App } from "./docs/App";
import { ToastContainer } from "./components/Toast";

// Render the Documentation Shell
mount(App(), "#app");

// Render global toast container
mount(new ToastContainer().render(), "body");