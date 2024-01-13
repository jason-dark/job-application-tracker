import { useMutation, useQueryClient } from 'react-query';
import { useNotifications } from '../use-notifications';
import { JOBS } from 'lib/react-query/keys';
import { deleteJob } from 'lib/react-query/mutations';
import { Job } from '@job-application-tracker/types';

export const useOptimisticDeleteJob = () => {
  const queryClient = useQueryClient();
  const { notifyError } = useNotifications();

  const mutation = useMutation({
    mutationFn: deleteJob,
    onMutate: async (id: string) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: [JOBS] });
      // Snapshot the previous value
      const previousJobs = queryClient.getQueryData([JOBS]);
      // Optimistically update to the new value
      queryClient.setQueryData<Job[]>([JOBS], (old) => {
        const updatedJobs = old ? [...old] : [];
        return updatedJobs.filter((job) => job.id !== id);
      });
      // Return a context object with the snapshotted value
      return { previousJobs };
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [JOBS] }),
    onError: (err, updatedJob, context) => {
      queryClient.setQueryData([JOBS], context?.previousJobs);
      notifyError('Sorry, something went wrong deleting your job 😱');
    },
  });

  return mutation;
};
