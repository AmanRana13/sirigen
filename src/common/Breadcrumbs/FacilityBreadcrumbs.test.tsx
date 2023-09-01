import {render} from 'utilities/test-utils';

import FacilityBreadcrumbs from './FacilityBreadcrumbs';

describe('FacilityBreadcrumbs', () => {
  test('renders FacilityBreadcrumbs component', () => {
    const {queryByTestId} = render(
      <FacilityBreadcrumbs />,
    );
    const element = queryByTestId('breadcrumb');
    expect(element).toBeInTheDocument();
  });
});
