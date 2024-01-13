import { AppShell } from '@mantine/core';
import { useSupabase } from 'lib/hooks';
import { fireEvent,render, screen } from 'lib/testing/test-utils';

import { Header } from './Header';

// Mock the useSupabase hook
jest.mock('lib/hooks', () => ({
  useSupabase: jest.fn(() => ({ loaded: false, user: null, signOut: jest.fn() })),
}));

describe('Header', () => {
  it('renders the title correctly', () => {
    render(
      <AppShell>
        <Header />
      </AppShell>
    );
    const titleElement = screen.getByText('Job Application Tracker');
    expect(titleElement).toBeInTheDocument();
  });

  it('renders the sign out button when user is loaded and logged in', () => {
    const mockSignOut = jest.fn();
    (useSupabase as jest.Mock).mockReturnValue({
      loaded: true,
      user: { name: 'John Doe' },
      signOut: mockSignOut,
    });

    render(
      <AppShell>
        <Header />
      </AppShell>
    );
    const signOutButton = screen.getByText('Sign out');
    expect(signOutButton).toBeInTheDocument();

    fireEvent.click(signOutButton);
    expect(mockSignOut).toHaveBeenCalled();
  });

  it('does not render the sign out button when user is not loaded or not logged in', () => {
    (useSupabase as jest.Mock).mockReturnValue({
      loaded: false,
      user: null,
      signOut: jest.fn(),
    });

    render(
      <AppShell>
        <Header />
      </AppShell>
    );
    const signOutButton = screen.queryByText('Sign out');
    expect(signOutButton).not.toBeInTheDocument();
  });
});
