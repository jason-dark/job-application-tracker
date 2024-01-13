import { useMutation, useQueryClient } from 'react-query';
import { useNotifications } from '../use-notifications';
import { JOBS } from 'lib/react-query/keys';
import { createJob } from 'lib/react-query/mutations';
import { Job } from '@job-application-tracker/types';

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
