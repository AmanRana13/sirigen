import {render} from '../../utilities/test-utils';
import {HeartRespirationTooltip} from './HeartRespirationTooltip.component';

describe('HeartRespirationTooltip Component', () => {
  test('should render HeartRespirationTooltip component', () => {
    const {queryByTestId} = render(
      <HeartRespirationTooltip
        x={99.99999999999997}
        datum={{
          x: '12:00 PM',
          xName: '12:00 PM',
          y: 116.5,
          _voronoiX: 1,
          _voronoiY: 116.5,
          _x: 1,
          _y: 116.5,
        }}
        height={300}
        data={[
          {x: '12:00 PM', y: 116.5},
          {x: '2:00 PM', y: 117.5},
        ]}
        data2={[
          {x: '12:00 PM', y: 116, y0: 117},
          {x: '2:00 PM', y: 112, y0: 123},
        ]}
      />,
    );
    const element = queryByTestId(/heart-respiration-tooltip/i);
    expect(element).toBeInTheDocument();
  });
});
