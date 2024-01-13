import { Database } from '@job-application-tracker/types';
import { SupabaseClient } from '@supabase/supabase-js';
import { Supabase } from 'lib/supabase-client';
import { act, renderHook } from 'lib/testing/test-utils';

import { useSupabase } from './use-supabase';

describe('useSupabase', () => {
  let supabaseMock: { auth: { onAuthStateChange: jest.Mock; signOut: jest.Mock } };

  beforeEach(() => {
    supabaseMock = {
      auth: {
        onAuthStateChange: jest.fn(),
        signOut: jest.fn(),
      },
    };

    // Mock the Supabase.getInstance().client
    jest.spyOn(Supabase, 'getInstance').mockReturnValue({
      client: supabaseMock as unknown as SupabaseClient<Database, 'public'>,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should initialize with null user and loaded as false', () => {
    const { result } = renderHook(() => useSupabase());

    expect(result.current.user).toBeNull();
    expect(result.current.loaded).toBe(false);
  });

  it('should call signOut when signOut function is called', () => {
    const { result } = renderHook(() => useSupabase());

    act(() => {
      result.current.signOut();
    });

    expect(supabaseMock.auth.signOut).toHaveBeenCalled();
  });
});
