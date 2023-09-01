import {render, reduxStore} from 'utilities/test-utils';
import {
  ApplicationLoader,
  showApplicationLoader,
  hideApplicationLoader,
} from 'common/ApplicationLoader';

describe('ApplicationLoader', () => {
  test('renders ApplicationLoader component', () => {
    const {queryByTestId} = render(<ApplicationLoader />, {
      applicationLoader: {
        show: true,
        text: '',
      },
    });
    const element = queryByTestId('application-loader');
    expect(element).toBeInTheDocument();
  });

  test('dispatch showApplicationLoader', () => {
    reduxStore.dispatch(showApplicationLoader());
    expect(reduxStore.getState().applicationLoader.show).toEqual(true);
  });

  test('dispatch hideApplicationLoader', () => {
    reduxStore.dispatch(hideApplicationLoader());
    expect(reduxStore.getState().applicationLoader.show).toEqual(false);
  });
});
