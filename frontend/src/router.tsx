// router.tsx
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { TOKEN_KEY } from "./constants";
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
  beforeLoad: () => {
    throw redirect({ to: "/dashboard", replace: true });
  },
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: () => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      throw redirect({ to: "/login", replace: true });
    }
  },
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
  dashboardRoute,
  loginRoute,
  emailVerifiedRoute,
  emailPendingVerificationRoute,
]);
export const router = createRouter({
  routeTree,
  basepath: "/",
});
