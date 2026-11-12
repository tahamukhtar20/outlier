import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { INTRO_CSS } from "./art.gen.ts";
import "./styles.css";

// The hero animation's CSS comes from the art generator, next to the scene it animates.
const style = document.createElement("style");
style.textContent = INTRO_CSS;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
