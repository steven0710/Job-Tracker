// router.tsx
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import App from "./App";
import Login from "./Login";

const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <div>404 - Page not found</div>,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <App />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  component: () => <Login />,
});

const routeTree = rootRoute.addChildren([indexRoute, loginRoute]);
export const router = createRouter({
  routeTree,
  basepath: "/",
});
