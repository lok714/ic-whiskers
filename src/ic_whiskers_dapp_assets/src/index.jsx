import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { AnvilProvider } from "@vvv-interactive/nftanvil-react";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";

authentication.setOptions({ cookie: true });

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <ChakraProvider>
    <AnvilProvider>
      <App />
    </AnvilProvider>
  </ChakraProvider>
);
