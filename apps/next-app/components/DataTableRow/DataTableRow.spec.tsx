import { Table } from '@mantine/core';
import { useOptimisticDeleteJob, useOptimisticUpdateJob } from 'lib/hooks';
import { fireEvent,render, screen } from 'lib/testing/test-utils';

import { DataTableRow } from './DataTableRow';

jest.mock('lib/hooks', () => ({
  useOptimisticDeleteJob: jest.fn(() => ({ mutate: jest.fn() })),
  useOptimisticUpdateJob: jest.fn(() => ({ mutate: jest.fn() })),
}));

describe('DataTableRow', () => {
  const mockJob = {
    id: '1',
    company: 'Test Company',
    job_title: 'Test Job',
    hyperlink: 'https://example.com',
    status: 'In Progress',
    created_at: '2022-01-01',
    user_id: '123',
  };

  it('renders the job details correctly', () => {
    render(
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <DataTableRow job={mockJob} index={0} />
          </Table.Tr>
        </Table.Tbody>
      </Table>
    );

    expect(screen.getByPlaceholderText('Enter a company name...')).toHaveValue(mockJob.company);
    expect(screen.getByPlaceholderText('Enter a job title...')).toHaveValue(mockJob.job_title);
    expect(screen.getByPlaceholderText('Enter a link...')).toHaveValue(mockJob.hyperlink);
    expect(screen.getByPlaceholderText('Enter a status...')).toHaveValue(mockJob.status);
  });

  it('updates the job details on input change', async () => {
    const updateMutation = jest.fn();
    (useOptimisticUpdateJob as jest.Mock).mockReturnValue({
      mutate: updateMutation,
    });

    render(
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <DataTableRow job={mockJob} index={0} />
          </Table.Tr>
        </Table.Tbody>
      </Table>
    );

    const companyInput = screen.getByPlaceholderText('Enter a company name...');
    const jobTitleInput = screen.getByPlaceholderText('Enter a job title...');
    const hyperlinkInput = screen.getByPlaceholderText('Enter a link...');
    const statusInput = screen.getByPlaceholderText('Enter a status...');

    const update = {
      company: 'Updated Company',
      job_title: 'Updated Job',
      hyperlink: 'https://updated-example.com',
      status: 'Updated Status',
    };

    fireEvent.change(companyInput, { target: { value: update.company } });
    fireEvent.change(jobTitleInput, { target: { value: update.job_title } });
    fireEvent.change(hyperlinkInput, { target: { value: update.hyperlink } });
    fireEvent.change(statusInput, { target: { value: update.status } });

    expect(screen.getByPlaceholderText('Enter a company name...')).toHaveValue(update.company);
    expect(screen.getByPlaceholderText('Enter a job title...')).toHaveValue(update.job_title);
    expect(screen.getByPlaceholderText('Enter a link...')).toHaveValue(update.hyperlink);
    expect(screen.getByPlaceholderText('Enter a status...')).toHaveValue(update.status);
  });

  it('calls the delete function on delete button click', async () => {
    const deleteMutation = jest.fn();
    (useOptimisticDeleteJob as jest.Mock).mockReturnValue({
      mutate: deleteMutation,
    });

    render(
      <Table>
        <Table.Tbody>
          <Table.Tr>
            <DataTableRow job={mockJob} index={0} />
          </Table.Tr>
        </Table.Tbody>
      </Table>
    );

    const deleteButton = screen.getByLabelText('Delete');
    fireEvent.click(deleteButton);

    expect(deleteMutation).toHaveBeenCalledWith(mockJob.id);
  });
});
