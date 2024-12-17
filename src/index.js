import "./styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { Provider } from "react-redux"; // Import Redux Provider
import { configureStore } from "@reduxjs/toolkit"; // Import Redux Toolkit
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { store } from "./store/index.ts";
import { HashConnectClient } from "./services/wallet/wallet/hashconnect-client.tsx";


// Create the root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashConnectClient />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
