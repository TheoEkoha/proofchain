import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ThirdwebProvider as ThirdwebProviderV5 } from "thirdweb/react";

import "./index.css";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { client, clientId } from "./client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider contextSharing={true} client={queryClient}>
      <ThirdwebProvider clientId={client.clientId} activeChain={421614}>
        <ThirdwebProviderV5>
          <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </ChakraProvider>
        </ThirdwebProviderV5>
      </ThirdwebProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
