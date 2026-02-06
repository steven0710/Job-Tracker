import { useState, useEffect } from "react";
import { JOB_STATUSES, type Job, type JobStatus } from "./types/jobs"; // your type file
import SavedJobs from "./SavedJobs";
import { getJobs } from "./services/jobServices";
import QuoteDisplay from "./quoteDisplay";
// your type file

const JobForm = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<JobStatus>("Applied");

  // Load saved jobs from localStorage on mount

  useEffect(() => {
    getJobs().then(setJobs);
  }, []);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newJob: Job = {
      company,
      role,
      status,
      dateApplied: new Date().toISOString(),
    };
    setJobs([...jobs, newJob]);
    setStatus("Applied");
  };

  // // update status for a job at a given index
  // const updateJobStatus = (index: number, newStatus: JobStatus) => {
  //   setJobs((prev) => {
  //     const updated = prev.map((job, i) =>
  //       i === index ? { ...job, status: newStatus } : job,
  //     );
  //     localStorage.setItem("jobs", JSON.stringify(updated));
  //     return updated;
  //   });
  // };

  return (
    <div className="flex flex-col relative">
      <QuoteDisplay />

      <h2 className="py-16">Add a Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-row p-2">
            <label className="">Company:</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Role:</label>
            <input
              className=""
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as JobStatus)}
            >
              {JOB_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit">Add Job</button>
      </form>
      <h2>Saved Jobs</h2>
      <SavedJobs jobs={jobs} setJobs={setJobs} />
    </div>
  );
};

export default JobForm;
