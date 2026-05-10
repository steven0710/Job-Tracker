// router.tsx
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import App from "./App";
import Login from "./Login";
import EmailVerifiedPage from "./EmailVerifiedPage";
import VerifyEmailWaitingPage from "./VerifyEmailWaitingPage";

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

const emailVerifiedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "verify-email",
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  component: () => <EmailVerifiedPage />,
});

const emailPendingVerificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "verify-email-pending",
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search.email === "string" ? search.email : "",
  }),
  component: () => <VerifyEmailWaitingPage />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  emailVerifiedRoute,
  emailPendingVerificationRoute,
]);
export const router = createRouter({
  routeTree,
  basepath: "/",
});
