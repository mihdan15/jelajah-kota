import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ApolloProvider } from "@apollo/client";
import { GraphQlClient } from "./API/Graph";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={GraphQlClient}>
      <BrowserRouter>
        <Header />
        <App />
        <Footer />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
