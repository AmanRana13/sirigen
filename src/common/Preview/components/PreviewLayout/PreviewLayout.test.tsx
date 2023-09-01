import {render} from 'utilities/test-utils';
import Header from '../Header/Header.component';

import PreviewLayout from './PreviewLayout.component';

const HeaderContent = () => (
  <Header>
    Header Content
  </Header>
)

describe('Preview: PreviewLayout', () => {
  test('renders PreviewLayout component', () => {
    const {queryByTestId} = render(
      <PreviewLayout header={HeaderContent}>
        Child
      </PreviewLayout>,
    );
    const element = queryByTestId('preview-layout');
    expect(element).toBeInTheDocument();
  });
  test('renders children component', () => {
    const {queryByTestId} = render(
      <PreviewLayout header={HeaderContent}>
        <div data-testid='preview-child'>Child</div>
      </PreviewLayout>,
    );
    const element = queryByTestId('preview-child');
    expect(element).toBeInTheDocument();
  })
});
