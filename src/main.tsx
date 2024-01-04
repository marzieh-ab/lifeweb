import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import CustomApolloProvider from "./components/ApolloClient.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <CustomApolloProvider>
        <App />
      </CustomApolloProvider>
    </Router>
  </React.StrictMode>
);
