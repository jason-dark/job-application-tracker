import { Job } from '@job-application-tracker/types';
import { Alert, Container, ContainerProps, rem,Skeleton } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { DataTable } from 'components/DataTable';
import { JOBS } from 'lib/react-query/keys';
import { getAllJobs } from 'lib/react-query/queries';
import { useQuery } from 'react-query';

const skeletonProps = { radius: rem(4), mb: rem(2) };

interface AuthedHomeProps extends ContainerProps {}

export const AuthedHome = ({ ...props }: AuthedHomeProps) => {
  const { isLoading, isError, isSuccess, data } = useQuery<Job[]>(JOBS, getAllJobs, {
    retry: false,
  });

  return (
    <Container {...props}>
      {isLoading && (
        <>
          <Skeleton height={rem(33)} {...skeletonProps} />
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} height={rem(50)} {...skeletonProps} />
          ))}
          <Skeleton height={rem(34)} mt={rem(14)} {...skeletonProps} />
        </>
      )}
      {isError && (
        <Alert variant='light' color='red' title='Error' icon={<IconInfoCircle />}>
          Something went wrong loading your jobs. Please try again later.
        </Alert>
      )}
      {isSuccess && <DataTable jobs={data} />}
    </Container>
  );
};
