import { useState } from "react";
import { handleLogin } from "./services/userServices";
import { useNavigate } from "@tanstack/react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await handleLogin({ email, password });
    localStorage.setItem("token", data.token);
    navigate({ to: "/" });
  };
  return (
    <form onSubmit={handleLoginSubmit} className="mb-4">
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
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
