import { useState, useEffect } from "react";
import { type Job } from "./types/jobs"; // your type file
import SavedJobs from "./SavedJobs";
import { getJobsByApi } from "./services/jobServices";
import QuoteDisplay from "./quoteDisplay";
import AddJobs from "./AddJobs";
import { useNavigate } from "@tanstack/react-router";
import { TOKEN_KEY } from "./constants";
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

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate({ to: "/login", replace: true }); // redirect to login page
  };
  return (
    <div className="flex flex-col gap-4 p-4">
      <QuoteDisplay />
      <button onClick={handleLogout}>Logout</button>
      <AddJobs setJobs={setJobs} />
      <SavedJobs jobs={jobs} setJobs={setJobs} />
    </div>
  );
};

export default JobForm;
