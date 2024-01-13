import { AxiosClient } from 'lib/axios';
import { Job } from '@job-application-tracker/types';

export const getAllJobs = () =>
  AxiosClient.getInstance()
    .client.get<Job[]>('/jobs')
    .then(({ data }) => data);
