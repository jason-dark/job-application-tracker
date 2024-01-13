import { act, renderHook } from 'lib/testing/test-utils';
import { useOptimisticDeleteJob } from './use-optimistic-delete-job';
import * as ReactQuery from 'react-query';

jest.mock('react-query');

describe('useOptimisticDeleteJob', () => {
  it('should call useMutation with the correct parameters', () => {
    const mockedMutate = jest.fn();
    jest
      .spyOn(ReactQuery, 'useMutation')
      .mockImplementation(jest.fn().mockReturnValue({ mutate: mockedMutate }));

    const { result } = renderHook(() => useOptimisticDeleteJob());

    const mockJobId = '123';

    act(() => result.current.mutate(mockJobId));

    expect(mockedMutate).toHaveBeenCalledWith(mockJobId);
  });
});
