import { mount } from "@deijose/nix-js";
import "./styles/base.css";
import { App } from "./docs/App";
import { ToastContainer } from "./components/Toast";

mount(App(), "#app");

mount(new ToastContainer().render(), "body");