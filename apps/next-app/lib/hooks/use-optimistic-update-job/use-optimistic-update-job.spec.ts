import { act, renderHook } from 'lib/testing/test-utils';
import { useOptimisticUpdateJob } from './use-optimistic-update-job';
import * as ReactQuery from 'react-query';
import { UpdateJobPayload } from '@job-application-tracker/types';

jest.mock('react-query');

describe('useOptimisticUpdateJob', () => {
  it('should call useMutation with the correct parameters', () => {
    const mockedMutate = jest.fn();
    jest
      .spyOn(ReactQuery, 'useMutation')
      .mockImplementation(jest.fn().mockReturnValue({ mutate: mockedMutate }));

    const { result } = renderHook(() => useOptimisticUpdateJob());

    const mockedJobUpdate: UpdateJobPayload = {
      id: 'abc123',
      company: 'facebook',
      job_title: 'software engineer',
      status: 'applied',
      hyperlink: 'https://www.facebook.com',
    };

    act(() => result.current.mutate(mockedJobUpdate));

    expect(mockedMutate).toHaveBeenCalledWith(mockedJobUpdate);
  });
});
