import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import reducers from './rootReducer';
import {getCareAgentInfo, saveUserInfo} from 'globals/global.functions';
import {userLoggedIn} from 'pages/WCPages/Login/Login.action';
import {interceptor} from '../globals/axiosInterceptor';
import {createReduxHistory, routerMiddleware} from './reduxFirstHistory';

const middleware = [routerMiddleware, thunk];

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

//Enable devetool extension only in development environment
const composeEnhancers =
  process.env.NODE_ENV === 'development' && typeof window !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware)),
);

const userData = getCareAgentInfo();

if (userData.accessToken) {
  //Roles functionality check for already loged in user. Will remove in future.
  if (!userData.userRole || userData.userRole.length === 0) {
    userData.userRole = ['careagent'];
    saveUserInfo(userData);
  }
  store.dispatch(userLoggedIn());
}

interceptor(store);

const history = createReduxHistory(store);
export {store, history};
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
