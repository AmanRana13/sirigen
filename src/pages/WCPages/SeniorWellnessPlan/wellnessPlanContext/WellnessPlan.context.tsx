import React, {useMemo} from 'react';
import {reducer} from './reducer';
import {initialState} from './WellnessPlan.context.types';

export const WellnessPlanContext = React.createContext<{
  state: any;
  dispatchContext: React.Dispatch<any>;
}>({
  state: initialState,
  dispatchContext: () => null,
});

const WellnessPlanProvider: React.FC<any> = ({children}: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const contextValue = useMemo(() => ({state, dispatchContext: dispatch}), [
    state,
    dispatch,
  ]);

  return (
    <WellnessPlanContext.Provider value={contextValue}>
      {children}
    </WellnessPlanContext.Provider>
  );
};

export default WellnessPlanProvider;
