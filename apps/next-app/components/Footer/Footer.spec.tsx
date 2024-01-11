import { render } from 'lib/testing/test-utils';

import { Footer } from './Footer';
import { AppShell } from '@mantine/core';

describe('Footer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AppShell>
        <Footer />
      </AppShell>
    );
    expect(baseElement).toBeTruthy();
  });
});
