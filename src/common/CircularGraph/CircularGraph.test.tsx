import {render} from 'utilities/test-utils';

import CircularGraph from './CircularGraph.component';

const mockData = [
  {
    value: 50,
    color: 'violet',
    key: 'intense',
  },
  {
    value: 75,
    color: 'blue',
    key: 'moderate',
  },
  {
    value: 99,
    color: 'green',
    key: 'score',
  },
];

describe('CircularGraph', () => {
  test('renders CircularGraph component', () => {
    const {queryByTestId} = render(<CircularGraph data={[]} />);
    const element = queryByTestId('circular-graph');
    expect(element).toBeInTheDocument();
  });
  test('renders Circle components for each element in array', () => {
    const {queryAllByTestId} = render(<CircularGraph data={mockData} />);
    const elements = queryAllByTestId('circular-graph-circle');
    expect(elements).toHaveLength(mockData.length);
  });
});
