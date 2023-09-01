import {render} from 'utilities/test-utils';

import ADLScore from './ADLScore.component';

const dummyText = 'test text';

describe('Print: ADLScore', () => {
  test('renders ADLScore component', () => {
    const {queryByTestId, queryByText} = render(
        <ADLScore info={dummyText} score={10}/>,
    );
    const element = queryByTestId('adl-score');
    expect(element).toBeInTheDocument();
    const text = queryByText(dummyText);
    expect(text).toBeInTheDocument();
    const score = queryByText('10');
    expect(score).toBeInTheDocument();
  });
});
