import { render } from 'lib/testing/test-utils';

import { AuthSuccess } from './AuthSuccess';

describe('AuthSuccess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthSuccess email='jest@jest.com' onGoBack={jest.fn()} />);
    expect(baseElement).toBeTruthy();
  });
});
