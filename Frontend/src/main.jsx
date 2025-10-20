
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

// Initialize socket service
import './socket/socket';
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
