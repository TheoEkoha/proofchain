import {
  createRootRoute,
  createRoute,
  Navigate,
  Outlet,
} from "@tanstack/react-router";
import { LandingPage } from "../screens/LandingPage";
import { Layout } from "../layouts/Layout";
import { About } from "../screens/About";
import { getUserConnected } from "../services/wallet.query";
import { CreateDigitalCertification } from "../screens/CreateDigitalCertification";
import { Home } from "../screens/Home";
import { MyCertifications } from "../screens/MyCertifications";
import { ClaimFaucet } from "../screens/ClaimFaucet";
import Footer from "../layouts/Footer";
import TestnetFooter from "../layouts/TestnetFooter";

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
      <>
        <Outlet />
        <TestnetFooter></TestnetFooter>
        <Footer></Footer>
      </>
    </div>
  ),
});

// Route pour la page d'accueil
export const indexRoute = createRoute({
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
const createDigitalCertificationRoute = createRoute({
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

// Route pour MyCertifications
const myCertificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-certifications",
  component: () => {
    const MyCertificationsComponent = Layout(MyCertifications);
    return (
      <ProtectedRoute>
        <MyCertificationsComponent />
      </ProtectedRoute>
    );
  },
});

// Route pour ClaimFaucet
const claimFaucetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/claim-faucet",
  component: () => {
    const ClaimFaucetComponent = Layout(ClaimFaucet);
    return (
      <ProtectedRoute>
        <ClaimFaucetComponent />
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
  createDigitalCertificationRoute,
  myCertificationsRoute,
  claimFaucetRoute,
]);
