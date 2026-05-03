import { useState } from "react";
import { handleLogin, handleRegister } from "./services/userServices";
import { useNavigate } from "@tanstack/react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeIntent, setActiveIntent] = useState<"login" | "register" | null>(
    null,
  );
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const submitEvent = e.nativeEvent as SubmitEvent;
      const submitter = submitEvent.submitter as HTMLButtonElement | null;
      const intent =
        (submitter?.value as "login" | "register" | undefined) ?? "login";
      setActiveIntent(intent);

      if (intent === "register") {
        await handleRegister({ email, password });
      } else {
        await handleLogin({ email, password });
      }

      navigate({ to: "/", replace: true });
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Authentication failed.",
      );
    } finally {
      setIsSubmitting(false);
      setActiveIntent(null);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(56,189,248,0.18),_transparent_45%),radial-gradient(ellipse_at_bottom_right,_rgba(249,115,22,0.16),_transparent_50%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-2">
          <section className="hidden flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:flex">
            <div>
              <p className="inline-flex items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                Job Tracker
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white">
                Land better roles with a clear pipeline.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                Organize applications, track progress, and keep your search
                focused from first outreach to final offer.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-slate-300">
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                Track status
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                Manage jobs
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                Stay motivated
              </div>
              <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                Move faster
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-cyan-900/20 backdrop-blur-xl sm:p-8">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Welcome back
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Sign in to your account
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                Enter your credentials to continue.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-slate-200"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-slate-200"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20"
                  required
                />
              </div>

              {errorMessage ? (
                <p className="rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {errorMessage}
                </p>
              ) : null}

              <div className="grid gap-3 pt-2 sm:grid-cols-2">
                <button
                  type="submit"
                  value="login"
                  disabled={isSubmitting}
                  className="rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
                >
                  {isSubmitting && activeIntent === "login"
                    ? "Signing in..."
                    : "Login"}
                </button>

                <button
                  type="submit"
                  value="register"
                  disabled={isSubmitting}
                  className="rounded-xl border border-slate-500 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-700 disabled:text-slate-400"
                >
                  {isSubmitting && activeIntent === "register"
                    ? "Creating account..."
                    : "Register"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
