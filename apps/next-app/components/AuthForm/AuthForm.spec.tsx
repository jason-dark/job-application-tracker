import { fireEvent, render, screen, waitFor } from 'lib/testing/test-utils';

import { AuthForm } from './AuthForm';

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

describe('AuthForm', () => {
  it('renders the form with email input and submit button', () => {
    render(<AuthForm onSubmit={jest.fn()} />);

    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: 'Continue' });

    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('calls onSubmit with the entered email when the form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<AuthForm onSubmit={handleSubmit} />);

    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: 'Continue' });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    waitFor(() => expect(handleSubmit).toHaveBeenCalledWith('test@example.com'));
  });

  it('displays an error message when an invalid email is entered', () => {
    render(<AuthForm onSubmit={jest.fn()} />);

    const emailInput = screen.getByLabelText('Email');
    const submitButton = screen.getByRole('button', { name: 'Continue' });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    const errorMessage = screen.getByText('Please enter a valid email');
    expect(errorMessage).toBeInTheDocument();
  });
});
