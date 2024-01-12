import { User } from '@supabase/supabase-js';
import { Supabase } from 'lib/supabase-client';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useSupabase() {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);
  const supabase = useMemo(() => Supabase.getInstance().client, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
      setLoaded(true);
    });
  }, [supabase.auth]);

  const signOut = useCallback(() => supabase.auth.signOut(), [supabase.auth]);

  return { user, loaded, signOut, supabase };
}
