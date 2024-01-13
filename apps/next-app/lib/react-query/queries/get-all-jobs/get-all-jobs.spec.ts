import { AxiosClient } from 'lib/axios';

import { getAllJobs } from './get-all-jobs';

jest.mock('lib/axios', () => ({
  AxiosClient: {
    getInstance: jest
      .fn()
      .mockReturnValue({ client: { get: jest.fn(() => Promise.resolve({ data: [] })) } }),
  },
}));

describe('getAllJobs', () => {
  it('should call client.get', async () => {
    await getAllJobs();

    expect(AxiosClient.getInstance().client.get).toHaveBeenCalledWith('/jobs');
  });
});
