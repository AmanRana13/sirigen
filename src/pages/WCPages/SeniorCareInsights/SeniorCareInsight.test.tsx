import {render} from '../../utilities/test-utils';
import SeniorCareInsights from './SeniorCareInsights';

describe('SeniorCareInsights ', () => {
  test('should render SeniorCareInsights component', async () => {
    const {queryByTestId} = render(<SeniorCareInsights props={jest.fn()} />);

    const element = queryByTestId(/SeniorCareInsights/i);

    expect(element).toBeTruthy();
  });
});
