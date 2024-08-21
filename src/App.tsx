import { createWallet, walletConnect, inAppWallet } from "thirdweb/wallets";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/routes";

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
  return <RouterProvider router={router} />;
}
