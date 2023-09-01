import { store } from 'store';
import { EMPTY_SENIOR_LOCATION } from 'store/commonReducer/common.action';
import {render} from 'utilities/test-utils';

import SeniorLocation from './SeniorLocation.component';
beforeAll(()=>{
  global.window = Object.create(window);
  const url =
    'http://localhost:3000/senior/senior-33246c5ba7234859a52006df7e0a4645/0b0bdebe65c34269915d61bde3486267/America-Los_Angeles/senior-location';
  Object.defineProperty(window, 'location', {
    value: {
      href: url,
      pathname:
        '/senior/senior-33246c5ba7234859a52006df7e0a4645/0b0bdebe65c34269915d61bde3486267/America-Los_Angeles/senior-location',
    },
  });
})
describe('Senior Location', () => {
  test('render the senior location component', () => {
    const {getByTestId} = render(<SeniorLocation />);
    expect(getByTestId('senior-location')).toBeInTheDocument();
  });
  test('dispatch EMPTY_SENIOR_LOCATION action', async() => {
   const element=await store.dispatch({type: EMPTY_SENIOR_LOCATION});
    expect(element).toBeTruthy();
  });
});
