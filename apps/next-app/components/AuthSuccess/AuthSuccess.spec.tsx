import { render, screen, fireEvent } from 'lib/testing/test-utils';
import { AuthSuccess } from './AuthSuccess';

describe('AuthSuccess', () => {
  const email = 'test@example.com';
  const onGoBack = jest.fn();

  beforeEach(() => {
    render(<AuthSuccess email={email} onGoBack={onGoBack} />);
  });

  it('renders the correct email', () => {
    const emailElement = screen.getByText(email);
    expect(emailElement).toBeInTheDocument();
  });

  it('renders the mail providers buttons', () => {
    const gmailButton = screen.getByText('Gmail');
    const outlookButton = screen.getByText('Outlook');
    const icloudButton = screen.getByText('iCloud Mail');
    expect(gmailButton).toBeInTheDocument();
    expect(outlookButton).toBeInTheDocument();
    expect(icloudButton).toBeInTheDocument();
  });

  it('calls onGoBack when "Go back" button is clicked', () => {
    const goBackButton = screen.getByRole('button', { name: 'Go back' });
    fireEvent.click(goBackButton);
    expect(onGoBack).toHaveBeenCalled();
  });
});
