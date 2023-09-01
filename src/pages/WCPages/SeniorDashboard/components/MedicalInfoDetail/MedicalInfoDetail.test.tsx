import {render, screen, act} from '../../../../utilities/test-utils';
import {fetchMedicalDetail} from './MedicalInfoDetail.action';
import {store} from '../../../../store/store';
import MedicalInfoDetail from './MedicalInfoDetail.component';

describe('MedicalInfoDetailComponent', () => {
  test('should render MedicalInfoDetailComponent', async () => {
    act(() => {
      render(<MedicalInfoDetail />);
    });
    await store.dispatch(fetchMedicalDetail());
    const element = screen.queryByTestId(/medical-info-detail/i);
    expect(element).toBeInTheDocument();
  });
});
