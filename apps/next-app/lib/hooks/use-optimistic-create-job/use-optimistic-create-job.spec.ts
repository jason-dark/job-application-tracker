import { act, renderHook } from 'lib/testing/test-utils';
import { useOptimisticCreateJob } from './use-optimistic-create-job';
import * as ReactQuery from 'react-query';
import { CreateJobPayload } from '@job-application-tracker/types';

jest.mock('react-query');

describe('useOptimisticCreateJob', () => {
  it('should call useMutation with the correct parameters', () => {
    const mockedMutate = jest.fn();
    jest
      .spyOn(ReactQuery, 'useMutation')
      .mockImplementation(jest.fn().mockReturnValue({ mutate: mockedMutate }));

    const { result } = renderHook(() => useOptimisticCreateJob());

    const mockedJob: CreateJobPayload = {
      id: 'abc123',
      company: 'facebook',
      job_title: 'software engineer',
      status: 'applied',
      hyperlink: 'https://www.facebook.com',
    };

    act(() => result.current.mutate(mockedJob));

    expect(mockedMutate).toHaveBeenCalledWith(mockedJob);
  });
});
