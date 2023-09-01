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
        "firstValue": "02/06/2023 11:42 AM",
        "secondValue": "Berkha Choudhary",
        "columns": 8
    },
    {
        "firstLabel": "Status:",
        "firstValue": "Saved",
        "columns": 4
    }
]

describe('Print: MetaBox', () => {
  test('renders MetaBox component', () => {
    const {queryByTestId} = render(
      <MetaBox data={mockData} columns={22}/>,
    );
    const element = queryByTestId('print-meta-box');
    expect(element).toBeInTheDocument();
  });
});
