import { Job } from './supabase.types';

export type CreateJobPayload = Pick<
  Job,
  'id' | 'created_at' | 'company' | 'job_title' | 'status' | 'hyperlink'
>;

export type UpdateJobPayload = Pick<Job, 'id'> & Partial<CreateJobPayload>;

export type RequestWithUser = Request & { user: DecodedUserJwt };

export interface DecodedUserJwt {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  email: string;
  phone: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  role: string;
  aal: string;
  amr: AMR[];
  session_id: string;
}

export interface AMR {
  method: string;
  timestamp: number;
}

export interface AppMetadata {
  provider: string;
  providers: string[];
}

export interface UserMetadata {}
