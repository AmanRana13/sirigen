import {render} from '../../../../../../../utilities/test-utils';
import {BodyWeight} from '../BodyWeight.component';
import {
  bodyHealthComponentsProps,
  bodyHealthComponentsWithData,
} from '_mocks_/BodyHealth.mock';

describe('BodyWeight Component', () => {
  it('should render BodyWeight component when we have no data in graph', () => {
    const {getByTestId} = render(
      <BodyWeight {...{...bodyHealthComponentsProps, graph: {weight: []}}} />,
    );
    const element = getByTestId('body-weight-graph');
    expect(element).toBeInTheDocument();
  });

  // eslint-disable-next-line max-len
  it('should render BodyWeight component when we have data in weight graph and week tab is selected', () => {
    const {getByTestId} = render(
      <BodyWeight
        {...{
          ...bodyHealthComponentsWithData,
          graph: {
            weight: [
              {time: 1658169000000000000, weight: 76.05199999999999},
              {time: 1658255400000000000, weight: 75.274},
            ],
          },
        }}
      />,
    );
    const element = getByTestId('body-weight-graph');
    expect(element).toBeInTheDocument();
  });
});
