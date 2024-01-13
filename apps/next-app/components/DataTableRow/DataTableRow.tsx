import { ActionIcon, Box, Group, Table, TextInput, Tooltip, rem } from '@mantine/core';
import { Job, UpdateJobPayload } from '@job-application-tracker/types';
import { useOptimisticDeleteJob, useOptimisticUpdateJob } from 'lib/hooks';
import { useForm } from '@mantine/form';
import { debounce } from 'lodash';
import { IconExternalLink, IconExternalLinkOff, IconTrashX } from '@tabler/icons-react';

interface DataTableRowProps {
  job: Job;
  index: number;
}

export const DataTableRow = ({ job, index, ...props }: DataTableRowProps) => {
  const optimisticDeleteJob = useOptimisticDeleteJob();
  const optimisticJobUpdate = useOptimisticUpdateJob();
  const debouncedUpdate = debounce(
    (updatedJob: UpdateJobPayload) => optimisticJobUpdate.mutate(updatedJob),
    1000
  );

  const form = useForm({
    initialValues: {
      company: job.company,
      job_title: job.job_title,
      hyperlink: job.hyperlink,
      status: job.status,
    },
    onValuesChange: (values) => debouncedUpdate({ ...values, id: job.id }),
  });

  return (
    <>
      <Table.Td>
        {new Date(job.created_at).toLocaleDateString('en-NZ', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </Table.Td>
      <Table.Td>
        <TextInput
          variant='unstyled'
          name='company'
          placeholder='Enter a company name...'
          {...form.getInputProps('company')}
        />
      </Table.Td>
      <Table.Td>
        <TextInput
          variant='unstyled'
          name='job_title'
          placeholder='Enter a job title...'
          {...form.getInputProps('job_title')}
        />
      </Table.Td>
      <Table.Td>
        <TextInput
          variant='unstyled'
          name='status'
          placeholder='Enter a status...'
          {...form.getInputProps('status')}
        />
      </Table.Td>
      <Table.Td>
        <Group>
          <ActionIcon
            variant='light'
            size='xs'
            disabled={!form.values.hyperlink}
            component='a'
            style={{ pointerEvents: form.values.hyperlink ? 'auto' : 'none' }}
            href={form.values.hyperlink}
            target='_blank'
          >
            <Box
              component={form.values.hyperlink ? IconExternalLink : IconExternalLinkOff}
              stroke={1}
              style={{ height: rem(18) }}
            />
          </ActionIcon>
          <TextInput
            variant='unstyled'
            name='hyperlink'
            placeholder='Enter a link...'
            {...form.getInputProps('hyperlink')}
          />
        </Group>
      </Table.Td>
      <Table.Td>
        <Group>
          <Tooltip label='Delete' color='dark.9' withArrow fz='xs'>
            <ActionIcon
              variant='light'
              color='red'
              aria-label='Delete'
              onClick={() => optimisticDeleteJob.mutate(job.id)}
            >
              <IconTrashX stroke={1} style={{ height: rem(20) }} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
    </>
  );
};
