import { Database } from '@job-application-tracker/types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
/**
 * Represents a Supabase client for managing Supabase Auth.
 */
export class Supabase {
  /**
   * The singleton instance of the Supabase client.
   */
  private static instance: Supabase | null;

  /**
   * The Supabase client instance.
   */
  public client: SupabaseClient<Database, 'public'>;

  /**
   * Constructs a new instance of the Supabase client.
   */
  private constructor() {
    this.client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.NEXT_PUBLIC_SUPABASE_KEY ?? ''
    );
  }

  /**
   * Returns the singleton instance of the Supabase client.
   * If the instance does not exist, it creates a new one.
   * @returns The singleton instance of the Supabase client.
   */
  public static getInstance(): Supabase {
    if (!Supabase.instance) {
      Supabase.instance = new Supabase();
    }

    return Supabase.instance;
  }

  /**
   * Resets the singleton instance of the Supabase client to null. Used for testing.
   */
  public static resetInstance(): void {
    Supabase.instance = null;
  }
}
