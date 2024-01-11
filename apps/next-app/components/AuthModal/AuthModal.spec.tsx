import { render } from 'lib/testing/test-utils';

import { AuthModal } from './AuthModal';

describe('AuthModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthModal />);
    expect(baseElement).toBeTruthy();
  });
});
