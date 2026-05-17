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
import ForgotPasswordPage from "./ForgotPasswordPage";
import ResetPasswordPage from "./ResetPasswordPage";

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

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem(TOKEN_KEY);
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

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "forgot-password",
  component: () => <ForgotPasswordPage />,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "reset-password",
  validateSearch: (search: Record<string, unknown>) => ({
    token: typeof search.token === "string" ? search.token : "",
  }),
  component: () => <ResetPasswordPage />,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  loginRoute,
  emailVerifiedRoute,
  emailPendingVerificationRoute,
  forgotPasswordRoute,
  resetPasswordRoute,
]);
export const router = createRouter({
  routeTree,
  basepath: "/",
});
