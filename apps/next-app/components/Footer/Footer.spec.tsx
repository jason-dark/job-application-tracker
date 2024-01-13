import { AppShell } from '@mantine/core';
import { render, screen } from 'lib/testing/test-utils';

import { Footer } from './Footer';

describe('Footer', () => {
  it('renders the footer component', () => {
    const element = render(
      <AppShell>
        <Footer />
      </AppShell>
    );

    // Assert that the component is rendered
    expect(element).toBeDefined();
  });

  it('renders the LinkedIn link', () => {
    render(
      <AppShell>
        <Footer />
      </AppShell>
    );

    // Assert that the LinkedIn link is rendered with the correct href
    const linkedinLink = screen.getByText('Jason Dark');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/jason-dark/');
  });

  it('renders the GitHub link', () => {
    render(
      <AppShell>
        <Footer />
      </AppShell>
    );

    // Assert that the GitHub link is rendered with the correct href
    const githubLink = screen.getByText('GitHub project');
    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/jason-dark/job-application-tracker'
    );
  });
});
