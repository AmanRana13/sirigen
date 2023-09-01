import {fireEvent, render, screen} from '../../../utilities/test-utils';
import {SeniorCallScheduleTableRow} from './SeniorCallScheduleTableRow.component';
import {seniorCallScheduleTableMockData} from '../../../_mocks_/seniorCallScheduleTableMockData';

describe('SeniorCallScheduleTableRow Component', () => {
  beforeAll(() => {
    global.window = Object.create(window);
    const url = 'http://localhost:3000/call-schedule';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
        pathname:
          '/senior/senior-33246c5ba7234859a52006df7e0a4645/0b0bdebe65c34269915d61bde3486267/America-Los_Angeles/dashboard?call_entry=schedule',
      },
    });
  });

  test('should render SeniorCallScheduleTableRow component when props has no data', () => {
    const {queryByTestId} = render(
      <SeniorCallScheduleTableRow
        rowData={[]}
        updateCallStatus={jest.fn()}
        markCompleteCall={jest.fn()}
        setRefreshState={true}
      />,
    );
    const element = queryByTestId(/senior-call-schedule-row/i);
    expect(element).toBeFalsy();
  });

  test('should render SeniorCallScheduleTableRow component when we have data in props', () => {
    render(<SeniorCallScheduleTableRow {...seniorCallScheduleTableMockData} />);
    const element = screen.queryByTestId(/senior-call-schedule-row/i);
    expect(element).toBeFalsy();
  });

  test('should render SeniorCallScheduleTableRow component when we have data in props', () => {
    render(<SeniorCallScheduleTableRow {...seniorCallScheduleTableMockData} />);
    const element = screen.getByTestId(/iconButton/i);
    fireEvent.click(element);
    const row = screen.getByTestId(/navigateTocallEntryPage/i);
    fireEvent.click(row);

    const editMenuOption = screen.getByTestId(/editMenuOption/i);
    fireEvent.click(editMenuOption);

    expect(window.location.pathname).toBe(
      '/senior/senior-33246c5ba7234859a52006df7e0a4645/0b0bdebe65c34269915d61bde3486267/America-Los_Angeles/dashboard?call_entry=schedule',
    );
  });
  test('should render mark complete button in  SeniorCallScheduleTableRow component when we have data in props', () => {
    render(<SeniorCallScheduleTableRow {...seniorCallScheduleTableMockData} />);
    const element = screen.getByTestId(/markCompleteMenuOption/i);
    fireEvent.click(element)
    expect(element).toBeTruthy();
  });
});
