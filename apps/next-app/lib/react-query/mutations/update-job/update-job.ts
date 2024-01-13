import { Job, UpdateJobPayload } from '@job-application-tracker/types';
import { AxiosClient } from 'lib/axios';

export const updateJob = (job: UpdateJobPayload) =>
  AxiosClient.getInstance().client.patch<Job[]>('/jobs/update', job);
