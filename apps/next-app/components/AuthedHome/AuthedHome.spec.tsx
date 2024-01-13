import { render } from 'lib/testing/test-utils';
import { AuthedHome } from './AuthedHome';
import * as ReactQuery from 'react-query';

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
