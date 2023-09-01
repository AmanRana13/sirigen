import {render} from '../../utilities/test-utils';
import isValidZipcode from './index'

describe('isValidZipcode ', () => {
  test('should return true for valid zipCode ', () => {
    expect( isValidZipcode('94203')).toBeTruthy();
  });
  test('should return true for valid zipCode ', () => {
    expect( isValidZipcode('00000')).toBeFalsy();
  });
});
