import {fireEvent, render, screen} from '../../../../../utilities/test-utils';
import EmotionalSurvey from './WellnessSurvey.component';
import {resetDateFilter} from './WellnessSurvey.action';
import {store} from '../../../../../store/store';
import {
  commonStateData,
  seniorDashboardStateData,
} from '../../../../../_mocks_/commonMocks';

describe('EmotionalSurvey Component', () => {
  test('should render EmotionalSurvey component', () => {
    const {queryByTestId} = render(<EmotionalSurvey />, {
      initialState: {
        common: commonStateData,
        seniorDashboard: seniorDashboardStateData,
      },
    });
    const element = queryByTestId(/emotional-survey/i);

    expect(element).toBeInTheDocument();
  });
  test('should render EmotionalSurvey component', async () => {
    render(<EmotionalSurvey />, {
      initialState: {
        commonStateData,
        seniorDashboardStateData,
      },
    });
    const element = screen.getByTestId(/clear-button/i);
    fireEvent.click(element);
    // const ele = screen.getByTestId(/table-with-pagination/i);
    await store.dispatch(resetDateFilter());
    expect(element).toBeInTheDocument();
    // expect(ele).toBeInTheDocument();
  });
});
