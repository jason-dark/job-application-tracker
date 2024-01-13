import { updateJob } from './update-job';
import { AxiosClient } from 'lib/axios';

jest.mock('lib/axios');

describe('updateJob', () => {
  it('should call client.patch with the correct arguments', () => {
    const job = { id: 'abc123', title: 'Software Engineer' };
    const expectedUrl = '/jobs/update';
    const expectedPayload = job;

    updateJob(job);

    expect(AxiosClient.getInstance().client.patch).toHaveBeenCalledWith(
      expectedUrl,
      expectedPayload
    );
  });
});
