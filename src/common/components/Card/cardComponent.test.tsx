import {render} from '../../../utilities/test-utils';
import {Card} from './Card.component';

describe('card Component', () => {
  test('should render circularProgressBar in card component', () => {
    const {getByText} = render(
      <Card
        title='test'
        subTitle='unitTest'
        children={jest.fn()}
        mt={jest.fn()}
        isLoading={false}
        noRecordFound={true}
      />,
    );
    const element = getByText(/No Records Found/i);
    expect(element).toBeInTheDocument();
  });
  test('should render children in card component', () => {
    const {queryAllByTestId} = render(
      <Card
        title='test'
        subTitle='unitTest'
        children={<div data-testid='simpleCard'>card Component</div>}
        mt={jest.fn()}
        isLoading={false}
        noRecordFound={false}
      />,
    );
    const element = queryAllByTestId(/simpleCard/i);
    expect(element[0]).toBeInTheDocument();
  });
});
