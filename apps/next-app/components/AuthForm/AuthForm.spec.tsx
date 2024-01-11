import { render } from 'lib/testing/test-utils';

import { AuthForm } from './AuthForm';

describe('AuthForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AuthForm onSubmit={jest.fn()} />);
    expect(baseElement).toBeTruthy();
  });
});
