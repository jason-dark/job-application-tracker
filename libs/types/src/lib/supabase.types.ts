import { User } from '@supabase/supabase-js';
import { Database as DB } from './supabase-gen.types';

type SupabaseJob = DB['public']['Tables']['jobs']['Row'];
export interface Job extends SupabaseJob {}
export type Database = DB;
export type RequestWithUser = Request & { user?: User };
