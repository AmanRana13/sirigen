import {render} from '../../../../utilities/test-utils';
import Notifications from './Notifications.component';
import {store} from '../../../../store/store';
import {fetchNotifications} from './Notifications.action';

describe('Notifications Component', () => {
  test('should render Notifications component', () => {
    const {queryByTestId} = render(<Notifications />);
    const element = queryByTestId(/notifications-component/i);

    expect(element).toBeInTheDocument();
  });
});

describe('dispatch action creators', () => {
  test('test action creators in notifications file', async () => {
    await store.dispatch(fetchNotifications());
  });
});
