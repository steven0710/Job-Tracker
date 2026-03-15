import { useState } from "react";
import {
  JOB_STATUSES,
  JOB_TYPES,
  type Job,
  type JobStatus,
  type JobType,
} from "./types/jobs";
import { createJob } from "./services/jobServices";
type Props = {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
};
const JobForm: React.FC<Props> = ({ setJobs }) => {
  const [company, setCompany] = useState<string>("");
  const [title, setRole] = useState<string>("");
  const [status, setStatus] = useState<JobStatus>("applied");
  const [employmentType, setEmploymentType] = useState<JobType>("full-time");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newJob: Omit<Job, "createdAt" | "_id"> = {
      company,
      title,
      status,
      employmentType: employmentType,
    };
    const updated = await createJob(newJob);
    setJobs((prevJobs) => [...prevJobs, updated]);
    setCompany("");
    setRole("");
    setStatus("applied");
    setEmploymentType("full-time");
  };

  return (
    <div>
      <h2 className="py-16 font-bold">Add a Job</h2>
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
            <label>Title:</label>
            <input
              className=""
              type="text"
              value={title}
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
          <div>
            <label>Employment Type:</label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value as JobType)}
            >
              {JOB_TYPES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit">Add Job</button>
      </form>
    </div>
  );
};

export default JobForm;
