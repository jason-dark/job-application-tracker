import { deleteJob } from './delete-job';
import { AxiosClient } from 'lib/axios';

jest.mock('lib/axios');

describe('deleteJob', () => {
  it('should call client.delete with the correct URL', async () => {
    const id = '123';
    const deleteMock = jest.fn();
    AxiosClient.getInstance().client.delete = deleteMock;

    await deleteJob(id);

    expect(deleteMock).toHaveBeenCalledWith('/jobs/123');
  });
});
