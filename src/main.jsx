import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { EditorProvider } from "./context/EditorContext";
import { SocketProvider } from "./context/SocketContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketProvider>
      <EditorProvider>
        <App />
      </EditorProvider>
    </SocketProvider>
  </StrictMode>
);