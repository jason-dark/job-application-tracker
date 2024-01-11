import { User } from '@supabase/supabase-js';
import { Database as DB } from './supabase-gen.types';

export type Job = DB['public']['Tables']['jobs']['Row'];
export type Database = DB;
export type RequestWithUser = Request & { user?: User };
