import { Job } from '@job-application-tracker/types';
import { JOBS } from 'lib/react-query/keys';
import { createJob } from 'lib/react-query/mutations';
import { useMutation, useQueryClient } from 'react-query';

import { useNotifications } from '../use-notifications';

/**
 * Custom React hook for optimistic creation of a job.
 *
 * This hook provides functionality for creating a job optimistically. The cache is immediately updated with the new job data, then a refetch happens to update the cache with data from the server. If there is an error, the UI is rolled back to the previous state.
 *
 * @returns The mutation object provided by `react-query` for handling the optimistic create job operation.
 */
export const useOptimisticCreateJob = () => {
  const queryClient = useQueryClient();
  const { notifyError } = useNotifications();

  const mutation = useMutation({
    mutationFn: createJob,
    onMutate: async (newJob) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [JOBS] });
      // Snapshot the previous value
      const previousJobs = queryClient.getQueryData([JOBS]);
      // Optimistically update to the new value
      queryClient.setQueryData<Job[]>([JOBS], (old) => {
        const updatedJobs = old ? [...old] : [];
        updatedJobs.push(newJob as Job);
        return updatedJobs;
      });
      // Return a context object with the snapshotted value
      return { previousJobs };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [JOBS] }),
    onError: (err, updatedJob, context) => {
      queryClient.setQueryData([JOBS], context?.previousJobs);
      notifyError('Sorry, something went wrong creating your job 😱');
    },
  });

  return mutation;
};
