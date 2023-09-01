import {render} from '../../../utilities/test-utils';
import AlertMessage from './AlertMessage'
describe('AlertMessage ', () => {
  test('should render AlertMessage ',() => {
    const {queryByTestId} = render(<AlertMessage messsage={'test'} />);

    const element = queryByTestId(/alertMessage/i);

    expect(element).toBeTruthy();
  });
});
