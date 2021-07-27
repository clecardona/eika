import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "./ErrorBoundary";

import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);


