import {render} from '../../utilities/test-utils';
import StateCityFormatter from './StateCityFormatter';

describe('StateCityFormatter Component', () => {
  test('should render StateCityFormatter component', () => {
    expect(
      render(<StateCityFormatter city='Los Angeles' state='CA' />),
    ).toBeTruthy();
  });
  test('should render StateCityFormatter component', () => {
    expect(render(<StateCityFormatter city='' state='CA' />)).toBeTruthy();
  });
});
