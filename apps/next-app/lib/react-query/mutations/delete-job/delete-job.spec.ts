import { deleteJob } from './delete-job';
import { AxiosClient } from 'lib/axios';

jest.mock('lib/axios', () => ({
  AxiosClient: { getInstance: jest.fn().mockReturnValue({ client: { delete: jest.fn() } }) },
}));

describe('deleteJob', () => {
  it('should call client.delete with the provided job payload', async () => {
    const id = 'abc123';

    await deleteJob(id);

    expect(AxiosClient.getInstance().client.delete).toHaveBeenCalledWith(`/jobs/${id}`);
  });
});
