import {render} from '../../../../../utilities/test-utils';
import {ActivityChart} from './ActivityChart.component';
const props={activityChartData:[[{x: "2022-03-01T00:30:00+05:30",
y: 2.4}]], maxDomain:48}
describe('ActivityChart Component', () => {
  test('should render ActivityChart component when current state is day', () => {
    const {getByText} = render(<ActivityChart currentState='day' {...props}/>);
    const element = getByText(/minutes/i);

    expect(element).toBeInTheDocument();
  });
  test('should render ActivityChart component when current state is week ', () => {
    const {getByText} = render(<ActivityChart currentState='week' {...props}/>);
    const element = getByText(/Hours/i);

    expect(element).toBeInTheDocument();
  });
});