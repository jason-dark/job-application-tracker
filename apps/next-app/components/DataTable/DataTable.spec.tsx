import { COMPANIES, JOB_TITLES } from '@job-application-tracker/constants';
import { render } from 'lib/testing/test-utils';
import * as ReactQuery from 'react-query';

import { DataTable } from './DataTable';

jest.mock('react-query');
jest
  .spyOn(ReactQuery, 'useQuery')
  .mockImplementation(jest.fn().mockReturnValue({ data: [], isLoading: false, isSuccess: true }));

describe('DataTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DataTable
        jobs={[...Array(16)].map((_, i) => ({
          id: i.toString(),
          company: COMPANIES.sample(),
          job_title: JOB_TITLES.sample(),
          created_at: new Date().toISOString(),
          hyperlink: '',
          status: 'applied',
          user_id: i.toString(),
        }))}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
