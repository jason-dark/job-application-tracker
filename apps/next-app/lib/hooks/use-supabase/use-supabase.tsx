import { User } from '@supabase/supabase-js';
import { AxiosClient } from 'lib/axios';
import { Supabase } from 'lib/supabase-client';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useSupabase() {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);
  const supabase = useMemo(() => Supabase.getInstance().client, []);
  const axios = useMemo(() => AxiosClient.getInstance(), []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      axios.token = session?.user ? session?.access_token : null;
      setUser(session?.user || null);
      setLoaded(true);
    });
  }, [axios, supabase.auth]);

  const signOut = useCallback(() => supabase.auth.signOut(), [supabase.auth]);

  return { user, loaded, signOut, supabase };
}
