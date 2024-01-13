import { Alert, Container, ContainerProps } from '@mantine/core';
import { useQuery } from 'react-query';
import { JOBS } from 'lib/react-query/keys';
import { getAllJobs } from 'lib/react-query/queries';
import { IconInfoCircle } from '@tabler/icons-react';
import { DataTable } from 'components/DataTable';
import { Job } from '@job-application-tracker/types';

interface AuthedHomeProps extends ContainerProps {}

export const AuthedHome = ({ ...props }: AuthedHomeProps) => {
  const { isLoading, isError, isSuccess, data } = useQuery<Job[]>(JOBS, getAllJobs, {
    retry: false,
  });

  return (
    <Container {...props}>
      {isLoading && null}
      {isError && (
        <Alert variant='light' color='red' title='Error' icon={<IconInfoCircle />}>
          Something went wrong loading your jobs. Please try again later.
        </Alert>
      )}
      {isSuccess && <DataTable jobs={data} />}
    </Container>
  );
};
