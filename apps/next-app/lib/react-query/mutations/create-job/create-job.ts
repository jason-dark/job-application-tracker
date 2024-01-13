import { AxiosClient } from 'lib/axios';
import { CreateJobPayload, Job } from '@job-application-tracker/types';

export const createJob = (job: CreateJobPayload) =>
  AxiosClient.getInstance().client.post<Job[]>('/jobs/create', job);
