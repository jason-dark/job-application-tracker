import { render, screen, fireEvent, waitFor } from 'lib/testing/test-utils';
import { AuthModal } from './AuthModal';
import React from 'react';

jest.mock('lib/supabase-client', () => ({
  Supabase: {
    getInstance: () => ({
      client: {
        auth: {
          signInWithOtp: jest.fn(() => Promise.resolve({ data: {}, error: null })),
        },
      },
    }),
  },
}));

describe('AuthModal', () => {
  it('renders the authentication modal with email form by default', () => {
    render(<AuthModal />);

    // Assert that the modal title is rendered
    expect(screen.getByText('Authentication')).toBeInTheDocument();

    // Assert that the email form is rendered
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  it('renders the success ui when the email is set', async () => {
    render(<AuthModal />);
    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: 'Continue' });

    // Assert that the email form is rendered
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Set the email
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(screen.getByText('Please check your email')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('test@example.com')).toBeInTheDocument());
  });
});
