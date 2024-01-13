import { AxiosClient } from 'lib/axios';
import { Job, UpdateJobPayload } from '@job-application-tracker/types';

export const updateJob = (job: UpdateJobPayload) =>
  AxiosClient.getInstance().client.patch<Job[]>('/jobs/update', job);
