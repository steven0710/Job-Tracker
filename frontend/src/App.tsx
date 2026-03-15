import { useState, useEffect } from "react";
import { type Job } from "./types/jobs"; // your type file
import SavedJobs from "./SavedJobs";
import { getJobsByApi } from "./services/jobServices";
import QuoteDisplay from "./quoteDisplay";
import AddJobs from "./AddJobs";
import { login } from "./services/userServices";
// your type file

const JobForm = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load saved jobs from localStorage on mount

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobsByApi(); // await the Promise
        console.log(data);
        setJobs(data.jobs);
      } catch (err) {
        console.error("Failed to load jobs:", err);
      }
    };

    loadJobs();
  }, [setJobs]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await login({ email, password });
    localStorage.setItem("token", data.token);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <form onSubmit={handleLogin} className="mb-4">
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
      <QuoteDisplay />
      <AddJobs setJobs={setJobs} />
      <SavedJobs jobs={jobs} setJobs={setJobs} />
    </div>
  );
};

export default JobForm;
