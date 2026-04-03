import { useState } from "react";
import { handleLogin, handleRegister } from "./services/userServices";
import { useNavigate } from "@tanstack/react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const submitEvent = e.nativeEvent as SubmitEvent;
      const submitter = submitEvent.submitter as HTMLButtonElement | null;
      const intent = submitter?.value;

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
    }
  };

  return (
    <form onSubmit={onSubmit} className="mb-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        required
      />
      <button type="submit" value="login" disabled={isSubmitting}>
        Login
      </button>
      <button type="submit" value="register" disabled={isSubmitting}>
        Register
      </button>
      {errorMessage ? (
        <p className="mt-2 text-red-600">{errorMessage}</p>
      ) : null}
    </form>
  );
};

export default Login;
