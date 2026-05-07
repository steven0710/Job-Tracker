import { useState } from "react";
import {
  JOB_STATUSES,
  JOB_TYPES,
  type Job,
  type JobStatus,
  type JobType,
} from "./types/jobs";
import { createJob } from "./services/jobServices";
import {
  SecondarySection,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  FormField,
  FormLabel,
  FormInput,
  FormSelect,
  ButtonGrid,
  PrimaryButton,
} from "./components/StyledElements";

type Props = {
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
};

const JobForm = ({ setJobs }: Props) => {
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
      employmentType,
    };
    const updated = await createJob(newJob);
    setJobs((prevJobs) => [...prevJobs, updated]);
    setCompany("");
    setRole("");
    setStatus("applied");
    setEmploymentType("full-time");
  };

  return (
    <SecondarySection>
      <SectionHeader>
        <SectionTitle>Add a Job</SectionTitle>
        <SectionSubtitle>
          Save a role to your pipeline and update its status later.
        </SectionSubtitle>
      </SectionHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField>
          <FormLabel>Company</FormLabel>
          <FormInput
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <FormLabel>Title</FormLabel>
          <FormInput
            type="text"
            value={title}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </FormField>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField>
            <FormLabel>Status</FormLabel>
            <FormSelect
              value={status}
              onChange={(e) => setStatus(e.target.value as JobStatus)}
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
              onChange={(e) => setEmploymentType(e.target.value as JobType)}
            >
              {JOB_TYPES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </FormSelect>
          </FormField>
        </div>

        <ButtonGrid>
          <PrimaryButton type="submit">Add Job</PrimaryButton>
        </ButtonGrid>
      </form>
    </SecondarySection>
  );
};

export default JobForm;
