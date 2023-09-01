import {render, screen, waitFor} from '../../../../utilities/test-utils';
import SeniorDetail from './SeniorDetail.component';
import {
  mockSeniorData,
  mockApplicationState,
  mockCaregiverInfo,
  mockProviderInfo,
} from '../../../../_mocks_/commonMocks';

describe('SeniorDetail Component', () => {
  test('should render SeniorDetail component', () => {
    render(<SeniorDetail />, {
      initialState: {
        common: {...mockSeniorData, ...mockCaregiverInfo, ...mockProviderInfo},
      },
    });

    const element = screen.getByTestId(/seniorDetailComponent/i);
    expect(element).toBeInTheDocument();
  });

  test('test when we dont have any senior information then we only have a loader on screen', () => {
    render(<SeniorDetail />, {
      initialState: {common: mockApplicationState.common},
    });

    const loader = screen.getByTestId(/loader/i);
    expect(loader).toBeInTheDocument();
  });
});
