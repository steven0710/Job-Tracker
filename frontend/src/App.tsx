import { useState, useEffect } from "react";
import { type Job } from "./types/jobs";
import SavedJobs from "./SavedJobs";
import { getJobsByApi } from "./services/jobServices";
import QuoteDisplay from "./quoteDisplay";
import AddJobs from "./AddJobs";
import { useNavigate } from "@tanstack/react-router";
import { TOKEN_KEY } from "./constants";
import {
  PageBackground,
  Container,
  PrimaryButton,
} from "./components/StyledElements";

const JobForm = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobsByApi();
        console.log(data);
        setJobs(data.jobs.slice().reverse());
      } catch (err) {
        console.error("Failed to load jobs:", err);
      }
    };

    loadJobs();
  }, [setJobs]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    navigate({ to: "/login", replace: true });
  };

  return (
    <PageBackground>
      <Container>
        <div className="w-full max-w-6xl space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 dark:border-white/10 dark:bg-slate-950 dark:shadow-none sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
                  Unemployment Nullifier
                </h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Add roles, track your progress, and keep your search on track.
                </p>
              </div>
              <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
            </div>
          </div>

          <QuoteDisplay />

          <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <AddJobs setJobs={setJobs} />
            <SavedJobs jobs={jobs} setJobs={setJobs} />
          </div>
        </div>
      </Container>
    </PageBackground>
  );
};

export default JobForm;
