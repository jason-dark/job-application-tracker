import { v4 as uuidv4 } from 'uuid';
import { render } from 'lib/testing/test-utils';
import { DataTable } from './DataTable';
import { COMPANIES, JOB_TITLES } from '@job-application-tracker/constants';
import * as ReactQuery from 'react-query';

jest.mock('react-query');
jest
  .spyOn(ReactQuery, 'useQuery')
  .mockImplementation(jest.fn().mockReturnValue({ data: [], isLoading: false, isSuccess: true }));

describe('DataTable', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <DataTable
        jobs={[...Array(16)].map(() => ({
          id: uuidv4(),
          company: COMPANIES.sample(),
          job_title: JOB_TITLES.sample(),
          created_at: new Date().toISOString(),
          hyperlink: 'https://www.metacareers.com/v2/jobs/237697185997433/',
          status: 'applied',
          user_id: uuidv4(),
        }))}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
