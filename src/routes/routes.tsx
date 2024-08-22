import {
  createRootRoute,
  createRoute,
  Navigate,
  Outlet,
} from "@tanstack/react-router";
import { LandingPage } from "../screens/LandingPage";
import { Dashboard } from "../screens/Dashboard";
import { About } from "../screens/About";
import { getUserConnected } from "../services/wallet.query";

function ProtectedRoute({ children }) {
  const address = getUserConnected();

  if (!address) {
    return <Navigate to="/" />;
  }

  return children;
}

const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  dashboardRoute,
]);
