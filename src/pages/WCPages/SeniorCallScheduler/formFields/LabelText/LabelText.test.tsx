import {render} from '../../../../utilities/test-utils';
import {LabelText} from './LabelText.component';

describe('LabelText Component', () => {
  test('should render LabelText component', () => {
    const {queryByTestId} = render(
      <LabelText label='' required={false} bold={false} />,
    );
    const element = queryByTestId(/labelText-component/i);

    expect(element).toBeInTheDocument();
  });
  test('should render LabelText component', () => {
    const {queryByTestId} = render(
      <LabelText label='Middle Name' required={false} bold={true} />,
    );
    const element = queryByTestId(/labelText-component/i);

    expect(element).toBeInTheDocument();
  });
});
