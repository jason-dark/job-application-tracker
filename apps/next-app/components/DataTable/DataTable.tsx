import { Table, TableProps } from '@mantine/core';
import { Job } from '@job-application-tracker/types';
import { useEffect, useState } from 'react';

interface DataTableProps extends TableProps {
  jobs: Job[];
}

export const DataTable = ({ jobs, ...props }: DataTableProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (isClient) {
    return (
      <Table {...props}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Company</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Link</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {jobs.map((job) => (
            <Table.Tr key={job.id}>
              <Table.Td>{job.company}</Table.Td>
              <Table.Td>{job.job_title}</Table.Td>
              <Table.Td>{job.hyperlink}</Table.Td>
              <Table.Td>{job.status}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    );
  }
  return null;
};
