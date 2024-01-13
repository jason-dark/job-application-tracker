import { CreateJobPayload } from '@job-application-tracker/types';
import { createJob } from './create-job';
import { AxiosClient } from 'lib/axios';

jest.mock('lib/axios', () => ({
  AxiosClient: { getInstance: jest.fn().mockReturnValue({ client: { post: jest.fn() } }) },
}));

describe('createJob', () => {
  it('should call client.post with the provided job payload', async () => {
    const jobPayload: CreateJobPayload = {
      id: 'abc123',
      job_title: 'Software Engineer',
      company: 'Acme Inc.',
      hyperlink: 'https://www.acmeinc.com',
      status: 'Applied',
    };

    await createJob(jobPayload);

    expect(AxiosClient.getInstance().client.post).toHaveBeenCalledWith('/jobs/create', jobPayload);
  });
});
