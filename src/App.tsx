import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  inAppWallet({
    auth: {
      options: ["email", "google", "apple", "facebook", "phone"],
    },
  }),
  createWallet("me.rainbow"),
];

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
