import { Job } from '@job-application-tracker/types';
import { Box, BoxProps, Button, Card, rem, Table, Title } from '@mantine/core';
import { IconCirclePlus } from '@tabler/icons-react';
import { DataTableRow } from 'components/DataTableRow';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInOut } from 'lib/animation';
import { useOptimisticCreateJob } from 'lib/hooks';
import { theme } from 'lib/theme';
import { useCallback } from 'react';
import { useStyles } from 'tss-react';
import { v4 as uuidv4 } from 'uuid';

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

  const { css } = useStyles();

  return (
    <Box
      data-testid='data-table'
      className={css({ overflowX: 'auto', overflowY: 'hidden' })}
      {...props}
    >
      <Table miw={rem(1000)}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w='12%'>Date added</Table.Th>
            <Table.Th w='20%'>Company</Table.Th>
            <Table.Th w='20%'>Job title</Table.Th>
            <Table.Th w='20%'>Status</Table.Th>
            <Table.Th w='20%'>Link</Table.Th>
            <Table.Th w='8%'>Actions</Table.Th>
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
          onClick={createNewJob}
          variant='outline'
          className={css({ position: 'sticky', left: 0, width: '100%' })}
        >
          Add job
        </Button>
      )}
    </Box>
  );
};
