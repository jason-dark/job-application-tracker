import { Box, BoxProps, Button, Card, Table, Title, rem } from '@mantine/core';
import { Job } from '@job-application-tracker/types';
import { useCallback } from 'react';
import { IconCirclePlus } from '@tabler/icons-react';
import { useOptimisticCreateJob } from 'lib/hooks';
import { DataTableRow } from 'components/DataTableRow';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInOut } from 'lib/animation';
import { theme } from 'lib/theme';

interface DataTableProps extends BoxProps {
  jobs: Job[];
}

export const DataTable = ({ jobs, ...props }: DataTableProps) => {
  const optimisticCreateJob = useOptimisticCreateJob();

  const createNewJob = useCallback(
    () =>
      optimisticCreateJob.mutate({
        id: uuidv4(),
        company: '',
        job_title: '',
        hyperlink: '',
        status: '',
        created_at: new Date().toISOString(),
      }),
    [optimisticCreateJob]
  );

  return (
    <Box {...props}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w='10%'>Date added</Table.Th>
            <Table.Th w='20%'>Company</Table.Th>
            <Table.Th w='20%'>Job title</Table.Th>
            <Table.Th w='20%'>Status</Table.Th>
            <Table.Th w='20%'>Link</Table.Th>
            <Table.Th w='10%'>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <AnimatePresence mode='sync'>
            {jobs.map((job, i) => (
              <motion.tr
                key={job.id}
                style={{ borderBottom: `1px solid ${theme.colors.dark[4]}` }}
                {...fadeInOut}
              >
                <DataTableRow key={job.id} job={job} index={i} />
              </motion.tr>
            ))}
          </AnimatePresence>
        </Table.Tbody>
      </Table>
      {jobs.length === 0 ? (
        <Card my='md' withBorder ta='center' py='xl'>
          <Title order={4}>Add your first job!</Title>
          <Button
            rightSection={<IconCirclePlus style={{ height: rem(20) }} />}
            mx='auto'
            mt='md'
            onClick={createNewJob}
          >
            Add job
          </Button>
        </Card>
      ) : (
        <Button
          rightSection={<IconCirclePlus style={{ height: rem(20) }} />}
          mt='md'
          w='100%'
          onClick={createNewJob}
          variant='outline'
        >
          Add job
        </Button>
      )}
    </Box>
  );
};
