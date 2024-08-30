import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/routes";
import "./assets/fonts/Stem-Bold/Stem-Regular.ttf";
import { useWalletInfo } from "./services/wallet.query";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  useWalletInfo();
  return <RouterProvider router={router} />;
}
