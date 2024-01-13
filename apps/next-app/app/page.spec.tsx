import { useSupabase } from 'lib/hooks';
import { render, screen } from 'lib/testing/test-utils';
import * as ReactQuery from 'react-query';

import Home from './page';

jest.mock('react-query');
jest
  .spyOn(ReactQuery, 'useQuery')
  .mockImplementation(jest.fn().mockReturnValue({ data: [], isLoading: false, isSuccess: true }));
jest.mock('lib/axios');
jest.mock('lib/hooks', () => ({
  useSupabase: jest.fn(() => ({ loaded: false, user: null, signOut: jest.fn() })),
  useOptimisticCreateJob: jest.fn(() => ({ mutate: jest.fn() })),
  useOptimisticDeleteJob: jest.fn(() => ({ mutate: jest.fn() })),
  useOptimisticUpdateJob: jest.fn(() => ({ mutate: jest.fn() })),
}));

describe('Home', () => {
  it('renders the header', () => {
    render(<Home />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<Home />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  it('renders the loader when user is not loaded', () => {
    (useSupabase as jest.Mock).mockReturnValue({
      loaded: false,
      user: null,
    });

    render(<Home />);
    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });

  it('renders the auth modal and data table when user is not authenticated', () => {
    (useSupabase as jest.Mock).mockReturnValue({
      loaded: true,
      user: null,
    });

    render(<Home />);
    const authModalElement = screen.getByTestId('auth-modal');
    const dataTableElement = screen.getByTestId('data-table');
    expect(authModalElement).toBeInTheDocument();
    expect(dataTableElement).toBeInTheDocument();
  });

  it('renders the authenticated home page when user is authenticated', () => {
    (useSupabase as jest.Mock).mockReturnValue({
      loaded: true,
      user: { id: '123', email: 'test@test.com' },
    });

    render(<Home />);
    const authedHomeElement = screen.getByTestId('authed-home');
    expect(authedHomeElement).toBeInTheDocument();
  });
});
