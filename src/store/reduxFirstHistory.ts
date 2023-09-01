import {createReduxHistoryContext} from 'redux-first-history';
import {browserHistory} from './history';

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer,
} = createReduxHistoryContext({
  history: browserHistory,
});

export {createReduxHistory, routerMiddleware, routerReducer};
