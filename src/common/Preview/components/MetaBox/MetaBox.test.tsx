import {render} from 'utilities/test-utils';

import MetaBox from './MetaBox.component';

const mockData = [
    {
        "firstLabel": "Preferred:",
        "secondLabel": "Account:",
        "firstValue": "cris",
        "secondValue": "70cdf821fd1e47ffa7a23aea9735d147",
        "columns": 6
    },
    {
        "firstLabel": "Age:",
        "secondLabel": "Gender:",
        "firstValue": "17 yrs",
        "secondValue": "Female",
        "columns": 4
    },
    {
        "firstLabel": "Last Saved Date:",
        "secondLabel": "Last Saved By:",
        "firstValue": "02/06/2023",
        "secondValue": "Berkha Choudhary",
        "columns": 6
    },
    {
        "firstLabel": "Status:",
        "firstValue": "Saved",
        "secondLabel": "Version:",
        "secondValue": "5 Draft",
        "columns": 4
    }
]

describe('Preview: MetaBox', () => {
  test('renders MetaBox component', () => {
    const {queryByTestId} = render(
      <MetaBox data={mockData} columns={22}/>,
    );
    const element = queryByTestId('preview-meta-box');
    expect(element).toBeInTheDocument();
  });
});
