import { render } from 'lib/testing/test-utils';

import { Header } from './Header';
import { AppShell } from '@mantine/core';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <AppShell>
        <Header />
      </AppShell>
    );
    expect(baseElement).toBeTruthy();
  });
});
