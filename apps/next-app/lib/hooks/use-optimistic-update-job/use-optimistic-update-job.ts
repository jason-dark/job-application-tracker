import { Job } from '@job-application-tracker/types';
import { JOBS } from 'lib/react-query/keys';
import { updateJob } from 'lib/react-query/mutations';
import { useMutation, useQueryClient } from 'react-query';

import { useNotifications } from '../use-notifications';

export const useOptimisticUpdateJob = () => {
  const queryClient = useQueryClient();
  const { notifyError } = useNotifications();

  const mutation = useMutation({
    mutationFn: updateJob,
    onMutate: async (updatedJob) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [JOBS] });
      // Snapshot the previous value
      const previousJobs = queryClient.getQueryData([JOBS]);
      // Optimistically update to the new value
      queryClient.setQueryData<Job[]>([JOBS], (old) => {
        const updatedJobs = old ? [...old] : [];
        return updatedJobs.map((job) =>
          job.id === updatedJob.id ? { ...job, ...updatedJob } : job
        );
      });
      // Return a context object with the snapshotted value
      return { previousJobs };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [JOBS] }),
    onError: (err, updatedJob, context) => {
      queryClient.setQueryData([JOBS], context?.previousJobs);
      notifyError('Sorry, something went wrong updating your job 😱');
    },
  });

  return mutation;
};
