import { Database } from '@job-application-tracker/types';
import { createClient,SupabaseClient } from '@supabase/supabase-js';

export class Supabase {
  private static instance: Supabase | null;
  public client: SupabaseClient<Database, 'public'>;

  private constructor() {
    this.client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''
    );
  }

  public static getInstance(): Supabase {
    if (!Supabase.instance) {
      Supabase.instance = new Supabase();
    }

    return Supabase.instance;
  }

  public static resetInstance(): void {
    Supabase.instance = null;
  }
}
