import {render} from 'utilities/test-utils';

import CollapsibleContainer from './CollapsibleContainer.component';

describe('CollapsibleContainer', () => {
  test('renders CollapsibleContainer component', () => {
    const {queryByTestId} = render(
      <CollapsibleContainer heading='test heading'>
        <div></div>
      </CollapsibleContainer>,
    );
    const element = queryByTestId('collapsible-container');
    expect(element).toBeInTheDocument();
  });
});
