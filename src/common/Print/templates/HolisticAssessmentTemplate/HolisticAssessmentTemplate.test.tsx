import { upToSixSectionsData } from 'common/Print/components/HolisticStats/HolisticStats.test';
import {render} from 'utilities/test-utils';

import HolisticAssessmentTemplate from './HolisticAssessmentTemplate.component';

describe('Print: HolisticAssessmentTemplate', () => {
  test('renders HolisticAssessmentTemplate component', () => {
    const {queryByTestId} = render(
      <HolisticAssessmentTemplate data={upToSixSectionsData} />,
    );
    const element = queryByTestId('holistic-template');
    expect(element).toBeInTheDocument();
  });
});
