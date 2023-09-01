import {render} from '../../utilities/test-utils';
import {ErrorBoundary} from './ErrorBoundary.component';

describe('ErrorBoundary Component', () => {
  test('should render ErrorBoundary component', () => {
    const {getByText} = render(
      <ErrorBoundary logError={jest.fn()}>
         <div>Something went wrong.</div>
       </ErrorBoundary>,
    );
    const element = getByText(/Something went wrong./i);
    expect(element).toBeInTheDocument();
  });
});
