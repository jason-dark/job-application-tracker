import { Job } from '@job-application-tracker/types';
import { AxiosClient } from 'lib/axios';

export const getAllJobs = () =>
  AxiosClient.getInstance()
    .client.get<Job[]>('/jobs')
    .then(({ data }) => data);
