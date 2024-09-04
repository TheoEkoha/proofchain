import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThirdwebProvider } from "thirdweb/react";  // Utilisation unique de ThirdwebProvider de la version 5

import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { client, clientId, config } from "./client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defineChain } from "thirdweb";
import { WagmiProvider } from "wagmi";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ThirdwebProvider>
            <App />
          </ThirdwebProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
