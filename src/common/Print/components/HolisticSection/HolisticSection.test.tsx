import {render} from 'utilities/test-utils';

import HolisticSection from './HolisticSection.component';

const sectionData = [
    {
        "always": 0,
        "never": 0,
        "question": "Do your values guide your decisions and actions?",
        "sometimes": 1
    },
    {
        "always": 0,
        "never": 0,
        "question": "Do you have a sense of purpose in your life?",
        "sometimes": 1
    },
    {
        "always": 0,
        "never": 1,
        "question": "Are you active in communities or causes you care about?",
        "sometimes": 0
    },
    {
        "always": 0,
        "never": 0,
        "question": "Do you utilise resources to improve your well-being?",
        "sometimes": 0
    }
]

const mockData = {
    heading: 'Emotional Survey',
    data: sectionData
}

describe('Print: HolisticSection', () => {
  test('renders HolisticSection component', () => {
    const {queryByTestId, queryByText} = render(
      <HolisticSection heading={mockData.heading} data={mockData.data}/>,
    );
    const element = queryByTestId('print-holistic-section');
    expect(element).toBeInTheDocument();
    const heading = queryByText(mockData.heading);
    expect(heading).toBeInTheDocument();
    const question = queryByText('Do your values guide your decisions and actions?');
    expect(question).toBeInTheDocument();
  });
});
