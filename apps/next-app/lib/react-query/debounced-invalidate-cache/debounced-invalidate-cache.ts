import { debounce } from 'lodash';
import { QueryKey } from 'react-query';

import { queryClient } from '../ReactQueryProvider';

/**
 * Singleton class that provides debounced invalidation of React Query cache.
 * Safe to use in any hook or component as the same instance of the debounce function is used globally throughout the application.
 */
export class DebouncedInvalidateCache {
  /**
   * The singleton instance of the Supabase client.
   */
  private static instance: DebouncedInvalidateCache | null;
  /**
   * Gets the singleton instance of DebouncedInvalidateCache.
   * @returns The singleton instance of DebouncedInvalidateCache.
   */
  public static getInstance(): DebouncedInvalidateCache {
    if (!DebouncedInvalidateCache.instance) {
      DebouncedInvalidateCache.instance = new DebouncedInvalidateCache();
    }
    return DebouncedInvalidateCache.instance;
  }

  /**
   * Without debouncing, every time a user causes an optimistic update, the cache is invalidated and a refetch is triggered as soon as the update response is received from the server. If the user spams job delete buttons for example, this causes a lot of unnecessary network requests and can make the UI appear glitchy if the network is slow. Debouncing the invalidation allows us to wait until the user is done making updates before invalidating the cache and triggering a refetch.
   * @returns Debounced function that invalidates the specified query key.
   */
  private debounced = debounce((queryKey: QueryKey) => {
    queryClient.invalidateQueries({ queryKey });
  }, 4000);

  /**
   * Invalidates the React Query cache at the specified query key with debounced behavior.
   * @param queryKey - The query key to invalidate.
   */
  public invalidate(queryKey: QueryKey) {
    this.debounced(queryKey);
  }
}

export default DebouncedInvalidateCache;
