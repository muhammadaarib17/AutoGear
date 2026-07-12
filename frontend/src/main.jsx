import "@fontsource/poppins";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.css";

import { WishlistProvider } from "./context/WishlistContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </React.StrictMode>
);