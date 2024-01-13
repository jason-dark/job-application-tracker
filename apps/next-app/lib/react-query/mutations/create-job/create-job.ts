import { CreateJobPayload, Job } from '@job-application-tracker/types';
import { AxiosClient } from 'lib/axios';

export const createJob = (job: CreateJobPayload) =>
  AxiosClient.getInstance().client.post<Job[]>('/jobs/create', job);
