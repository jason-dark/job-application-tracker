import { render } from 'lib/testing/test-utils';

import { DataTable } from './DataTable';
import { getMockJob } from '@job-application-tracker/mocks/get-mock-job';

describe('DataTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DataTable jobs={[...Array(10)].map(() => getMockJob())} />);
    expect(baseElement).toBeTruthy();
  });
});
