import moment from 'moment-timezone';
import {render, screen} from 'utilities/test-utils';

import DateRangeSelector from './DateRangeSelector';

describe('DateRangeSelector', () => {
  test('renders DateRangeSelector component', () => {
    render(
      <DateRangeSelector
        startDate={moment().format()}
        endDate={moment().add(20, 'days').format()}
        onChangeEndDate={jest.fn()}
        onChangeStartDate={jest.fn()}
        onEndDateSuccess={jest.fn()}
        onError={jest.fn()}
        onStartDateSuccess={jest.fn()}
        isDateError={false}
      />,
    );
    const element = screen.queryByText('From');
    expect(element).toBeInTheDocument();
  });
});
