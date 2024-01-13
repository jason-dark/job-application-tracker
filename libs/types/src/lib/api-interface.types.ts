import { Job } from './supabase.types';

export type CreateJobPayload = Pick<Job, 'id' | 'company' | 'job_title' | 'status' | 'hyperlink'>;

export type UpdateJobPayload = Pick<Job, 'id'> & Partial<CreateJobPayload>;
