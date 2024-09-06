import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routes/routes";
import "./assets/fonts/Stem-Bold/Stem-Regular.ttf";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function App() {
  return <RouterProvider router={router} />;
}
