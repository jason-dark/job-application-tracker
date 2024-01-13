import { render } from 'lib/testing/test-utils';

import { ReactQueryProvider } from './ReactQueryProvider';

describe('ReactQueryProvider', () => {
  it('renders children without crashing', () => {
    render(
      <ReactQueryProvider>
        <div>Test Children</div>
      </ReactQueryProvider>
    );
  });
});
