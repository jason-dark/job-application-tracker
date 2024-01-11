import { MockProviders } from './mock-react-providers';

import { Queries, render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

const customRender = (ui: ReactElement, options?: RenderOptions<Queries, Element, Element>) =>
  render(ui, { wrapper: MockProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
