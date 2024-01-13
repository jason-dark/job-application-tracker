import { render } from 'lib/testing/test-utils';
import { AuthedHome } from './AuthedHome';

describe('AuthedHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthedHome />);
    expect(baseElement).toBeTruthy();
  });
});
