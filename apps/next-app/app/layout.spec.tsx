import { render } from 'lib/testing/test-utils';

import RootLayout from './layout';

describe('RootLayout', () => {
  it('renders children', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Children</div>
      </RootLayout>
    );

    expect(getByText('Test Children')).toBeInTheDocument();
  });
});
