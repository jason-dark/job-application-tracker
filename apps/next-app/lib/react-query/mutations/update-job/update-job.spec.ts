import { UpdateJobPayload } from '@job-application-tracker/types';
import { AxiosClient } from 'lib/axios';

import { updateJob } from './update-job';

jest.mock('lib/axios', () => ({
  AxiosClient: { getInstance: jest.fn().mockReturnValue({ client: { patch: jest.fn() } }) },
}));

describe('updateJob', () => {
  it('should call client.patch with the provided job payload', async () => {
    const jobPayload: UpdateJobPayload = {
      id: 'abc123',
      job_title: 'Software Engineer',
      company: 'Acme Inc.',
      hyperlink: 'https://www.acmeinc.com',
      status: 'Rejected',
    };

    await updateJob(jobPayload);

    expect(AxiosClient.getInstance().client.patch).toHaveBeenCalledWith('/jobs/update', jobPayload);
  });
});
