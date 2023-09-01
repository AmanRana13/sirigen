import {store} from '../../store/store';
import {loginUser, logoutUser} from './Login.action';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import * as Services from 'services/userService/userService';
import {FETCHING_LOGIN_DETAILS} from './Login.types';
import {LOGOUT_MESSAGE} from 'globals/global.constants';
import {showToast} from 'common/Toast';
import userInfo from '_mocks_/userInfo.mock.json';
import {setLocalStorage} from 'globals/global.functions';
import SharedStorage from 'store/SharedStorage';

jest.mock('services/userService/userService');
describe('dispatch action creator loginUser', () => {
  test('dispatch loginUser action', async () => {
    await store.dispatch(showApplicationLoader());
    await store.dispatch(
      loginUser({email: 'test@gmail.com', password: 'Demo142@'}),
    );
    await store.dispatch({type: FETCHING_LOGIN_DETAILS});
    Services.loginUserService({email: 'test@gmail.com', password: 'Demo142@'});
    await store.dispatch(hideApplicationLoader());
    await store.dispatch(showToast('Login Successfull !', 'success'));
    expect(store.getState().toast).toStrictEqual({
      duration: 4000,
      message: 'Login Successfull !',
      open: true,
      type: 'success',
    });
    expect(store.getState().applicationLoader).toBeTruthy();
  });
});
describe('dispatch action creator logoutUser', () => {
  beforeAll(() => setLocalStorage('userInfo', userInfo));
  test('should dispatch logoutUser action', async () => {
    await store.dispatch(showApplicationLoader());
    await store.dispatch(
      logoutUser({message: LOGOUT_MESSAGE, inActiveLogout: false}),
    );
    await store.dispatch(hideApplicationLoader());
    await store.dispatch(showToast('User logged out successfully!'));
    SharedStorage.setNavigationEnable(false);

    expect(store.getState().toast).toEqual({
      duration: 4000,
      message: 'User logged out successfully!',
      open: true,
    });
    expect(store.getState().applicationLoader).toBeTruthy();
  });
});
