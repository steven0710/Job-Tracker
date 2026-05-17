import React, { useState } from "react";
import {
  JOB_STATUSES,
  JOB_TYPES,
  type Job,
  type JobStatus,
  type JobType,
} from "./types/jobs";
import { deleteJobReal, updateJob } from "./services/jobServices";
import {
  SecondarySection,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  FormField,
  FormLabel,
  FormInput,
  FormSelect,
  PrimaryButton,
  SecondaryButton,
} from "./components/StyledElements";

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
      employmentType,
    };
    try {
      await updateJob(_id, payload);
      setJobs((prev) =>
        prev.map((job, idx) =>
          idx === i
            ? {
                ...job,
                ...payload,
              }
            : job,
        ),
      );
    } catch (err) {
      console.error("Failed to update job:", err);
    }
    setEditingIndex(null);
  };

  const cancelEdit = () => setEditingIndex(null);

  const deleteJob = async (_id: string, i: number) => {
    await deleteJobReal(_id);
    setJobs((prev) => prev.filter((_, idx) => idx !== i));
  };

  return (
    <SecondarySection>
      <SectionHeader>
        <SectionTitle>Saved Jobs</SectionTitle>
        <SectionSubtitle>
          Review and update roles in your pipeline.
        </SectionSubtitle>
      </SectionHeader>

      {jobs.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No saved jobs yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job, i) => (
            <li
              key={job._id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-slate-950"
            >
              {editingIndex === i ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField>
                      <FormLabel>Company</FormLabel>
                      <FormInput
                        value={editCompany}
                        onChange={(e) => setEditCompany(e.target.value)}
                      />
                    </FormField>
                    <FormField>
                      <FormLabel>Title</FormLabel>
                      <FormInput
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                      />
                    </FormField>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField>
                      <FormLabel>Status</FormLabel>
                      <FormSelect
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
                      </FormSelect>
                    </FormField>
                    <FormField>
                      <FormLabel>Employment Type</FormLabel>
                      <FormSelect
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
                      </FormSelect>
                    </FormField>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <PrimaryButton onClick={() => saveEdit(job._id, i)}>
                      Save
                    </PrimaryButton>
                    <SecondaryButton onClick={cancelEdit}>
                      Cancel
                    </SecondaryButton>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      {job.company} — {job.title}
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {job.status}
                      </span>
                      {" • "}
                      {job.employmentType}
                    </p>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                      {new Date(job.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <SecondaryButton onClick={() => deleteJob(job._id, i)}>
                      Delete
                    </SecondaryButton>
                    <PrimaryButton onClick={() => startEdit(i)}>
                      Edit
                    </PrimaryButton>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </SecondarySection>
  );
};

export default SavedJobs;
