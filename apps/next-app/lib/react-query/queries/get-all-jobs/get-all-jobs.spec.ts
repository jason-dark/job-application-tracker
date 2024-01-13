import { getAllJobs } from './get-all-jobs';
import { AxiosClient } from 'lib/axios';

jest.mock('lib/axios', () => ({
  AxiosClient: {
    getInstance: jest.fn(() => ({
      client: {
        get: jest.fn(),
      },
    })),
  },
}));

describe('getAllJobs', () => {
  it('should call AxiosClient to get all jobs', async () => {
    const axiosClientInstance = AxiosClient.getInstance();
    const getMock = jest.spyOn(axiosClientInstance.client, 'get');
    const expectedResponse = [{ id: 1, title: 'Software Engineer' }];

    getMock.mockResolvedValueOnce({ data: expectedResponse });

    const result = await getAllJobs();

    expect(getMock).toHaveBeenCalledWith('/jobs');
    expect(result).toEqual(expectedResponse);
  });
});
