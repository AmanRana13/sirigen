import {render} from 'utilities/test-utils';

import HeaderData from './HeaderData.component';

const headingText = 'Medical Condition';
const subheadingText = 'Dave'
describe('Preview: HeaderData', () => {
  test('renders HeaderData component', () => {
    const {queryByTestId} = render(
      <HeaderData />,
    );
    const element = queryByTestId('preview-header-data');
    expect(element).toBeInTheDocument();
  });
  test('renders Header component with heading & subheading', () => {
    const {queryByTestId, queryByText} = render(
      <HeaderData heading={headingText} subheading={subheadingText} />,
    );
    const element = queryByTestId('preview-header-data');
    expect(element).toBeInTheDocument();
    const heading = queryByText(headingText);
    expect(heading).toBeInTheDocument();
    const subheading = queryByText(subheadingText);
    expect(subheading).toBeInTheDocument();
  });
});
