import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./disableOverlay.js";

createRoot(document.getElementById("root")!).render(<App />);
