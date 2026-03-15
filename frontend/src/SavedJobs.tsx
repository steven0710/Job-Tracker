import React, { useState } from "react";
import {
  JOB_STATUSES,
  JOB_TYPES,
  type Job,
  type JobStatus,
  type JobType,
} from "./types/jobs";
import { deleteJobReal, updateJob } from "./services/jobServices";

type Props = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
};

const SavedJobs: React.FC<Props> = ({ jobs, setJobs }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editCompany, setEditCompany] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState<JobStatus>("applied");
  const [employmentType, setEmploymentType] = useState<JobType>("full-time");

  const startEdit = (i: number) => {
    const j = jobs[i];
    setEditCompany(j.company);
    setEditRole(j.title);
    setEditStatus(j.status);
    setEditingIndex(i);
    setEmploymentType(j.employmentType);
  };

  const saveEdit = async (_id: string, i: number) => {
    const payload = {
      company: editCompany,
      title: editRole,
      status: editStatus,
      employmentType: employmentType,
    };
    try {
      await updateJob(_id, payload);
      setJobs((prev) => {
        const updated = prev.map((job, idx) =>
          idx === i
            ? {
                ...job,
                ...payload,
              }
            : job,
        );
        return updated;
      });
    } catch (err) {
      console.error("Failed to update job:", err);
    }
    setEditingIndex(null);
  };

  const cancelEdit = () => setEditingIndex(null);

  const deleteJob = async (_id: string, i: number) => {
    await deleteJobReal(jobs[i]._id);
    setJobs((prev) => {
      const updated = prev.filter((_, idx) => idx !== i);
      return updated;
    });
  };

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
    <>
      <h2>Saved Jobs</h2>
      <ul>
        {jobs.map((job, i) => (
          <li
            key={i}
            className="flex justify-between items-center border p-2 mb-2"
          >
            <div className="flex justify-between items-center w-full">
              {editingIndex === i ? (
                <>
                  <div className="flex gap-2 items-center">
                    <input
                      value={editCompany}
                      onChange={(e) => setEditCompany(e.target.value)}
                    />
                    <input
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                    />
                    <select
                      value={editStatus}
                      onChange={(e) =>
                        setEditStatus(e.target.value as JobStatus)
                      }
                    >
                      {JOB_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <select
                      value={employmentType}
                      onChange={(e) =>
                        setEmploymentType(e.target.value as JobType)
                      }
                    >
                      {JOB_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button onClick={() => saveEdit(job._id, i)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    {job.company} - {job.title} (<span>{job.status}</span>)
                    {new Date(job.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div>
                    <button onClick={() => deleteJob(job._id, i)}>
                      Delete{job._id}
                    </button>
                    <button onClick={() => startEdit(i)}>Edit</button>
                  </div>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SavedJobs;
