import * as supabaseJS from '@supabase/supabase-js';

import { Supabase } from './supabase-client';

describe('Supabase', () => {
  let supabaseInstance: Supabase;

  beforeAll(() => {
    // Mocking the createClient function from @supabase/supabase-js
    jest.spyOn(supabaseJS, 'createClient').mockResolvedValue(jest.fn() as never);
  });

  beforeEach(() => {
    // Reset the instance before each test
    Supabase.resetInstance();
    supabaseInstance = Supabase.getInstance();
  });

  afterAll(() => {
    // Restore the createClient function after all tests
    jest.restoreAllMocks();
  });

  it('should create a Supabase instance', () => {
    expect(supabaseInstance).toBeInstanceOf(Supabase);
    expect(supabaseJS.createClient).toHaveBeenCalledTimes(1);
  });

  it('should return the same instance on multiple calls to getInstance', () => {
    const newSupabaseInstance = Supabase.getInstance();
    expect(newSupabaseInstance).toBe(supabaseInstance);
  });
});
