import { Root } from "postcss";
import {
  createRootRoute,
  createRoute,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { LandingPage } from "../screens/LandingPage";
import { Dashboard } from "../screens/Dashboard";
import { About } from "../screens/About";

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
  component: Dashboard,
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
