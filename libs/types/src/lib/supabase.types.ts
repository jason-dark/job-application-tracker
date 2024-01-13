import { Database as DB } from './supabase-gen.types';

type SupabaseJob = DB['public']['Tables']['jobs']['Row'];
export interface Job extends SupabaseJob {}
export type Database = DB;
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
