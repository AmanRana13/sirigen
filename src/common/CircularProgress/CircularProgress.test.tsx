import {render} from 'utilities/test-utils';

import {CircularProgress} from './CircularProgress';

describe('CircularProgress', () => {
  test('renders CircularProgress component with tooltip', () => {
    const {queryByTestId} = render(
      <CircularProgress value={20} tooltip={true} />,
    );
    const element = queryByTestId('circular-progress-tooltip');
    expect(element).toBeInTheDocument();
  });

  test('renders CircularProgress component without tooltip', () => {
    const {queryByTestId} = render(
      <CircularProgress value={20} tooltip={false} />,
    );
    const element = queryByTestId('circular-progress');
    expect(element).toBeInTheDocument();
  });
});
