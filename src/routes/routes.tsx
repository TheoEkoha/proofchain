import {
  createRootRoute,
  createRoute,
  Navigate,
  Outlet,
} from "@tanstack/react-router";
import { LandingPage } from "../screens/LandingPage";
import { Dashboard, Layout } from "../layouts/Layout";
import { About } from "../screens/About";
import { getUserConnected } from "../services/wallet.query";
import {
  CreateDigitalCertification,
  Trending,
} from "../screens/CreateDigitalCertification";
import { Home } from "../screens/Home";

// Composant de route protégée
function ProtectedRoute({ children }) {
  const address = getUserConnected();

  if (!address) {
    return <Navigate to="/" />;
  }

  return children;
}

// Route racine
const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});

// Route pour la page d'accueil
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

// Route pour Dashboard
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => {
    const DashboardComponent = Layout(Home);
    return (
      <ProtectedRoute>
        <DashboardComponent />
      </ProtectedRoute>
    );
  },
});

// Route pour Dashboard
const trendingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create-digital-certification",
  component: () => {
    const CreateDigitalCertificationComponent = Layout(
      CreateDigitalCertification,
    );
    return (
      <ProtectedRoute>
        <CreateDigitalCertificationComponent />
      </ProtectedRoute>
    );
  },
});

// Route pour About
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  dashboardRoute,
  trendingRoute,
]);
