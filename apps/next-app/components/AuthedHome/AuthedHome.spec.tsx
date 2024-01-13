import { render } from 'lib/testing/test-utils';
import * as ReactQuery from 'react-query';

import { AuthedHome } from './AuthedHome';

jest.mock('react-query');
jest
  .spyOn(ReactQuery, 'useQuery')
  .mockImplementation(jest.fn().mockReturnValue({ data: [], isLoading: false, isSuccess: true }));
describe('AuthedHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthedHome />);
    expect(baseElement).toBeTruthy();
  });
});
