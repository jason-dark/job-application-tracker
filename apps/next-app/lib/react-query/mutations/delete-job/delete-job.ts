import { AxiosClient } from 'lib/axios';

export const deleteJob = (id: string) => AxiosClient.getInstance().client.delete(`/jobs/${id}`);
