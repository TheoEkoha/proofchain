import {
  createRootRoute,
  createRoute,
  Navigate,
  Outlet,
} from "@tanstack/react-router";
import { LandingPage } from "../screens/LandingPage";
import { Layout } from "../layouts/Layout";
import { About } from "../screens/About";
import { isUserConnected } from "../services/wallet.query";
import { CreateDigitalCertification } from "../screens/CreateDigitalCertification";
import { Home } from "../screens/Home";
import { MyCertifications } from "../screens/MyCertifications";
import { ClaimFaucet } from "../screens/ClaimFaucet";
import Footer from "../layouts/Footer";
import TestnetFooter from "../layouts/TestnetFooter";
import React from "react";

function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const address = isUserConnected();

  if (!address) {
    return <Navigate to="/" />;
  }

  return children;
}

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

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

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
