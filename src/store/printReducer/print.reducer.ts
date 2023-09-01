import { RESET_PRINT_DATA, SET_PRINT_DATA } from "./print.action";
import { IInitialState, initialState, IPrintAction } from "./print.types";

const printReducer = (
    state: IInitialState = initialState,
    action: IPrintAction,
  ) => {
    switch (action.type) {
      case SET_PRINT_DATA:
        return { ...state, ...(action.payload || {}) };
      case RESET_PRINT_DATA:
        return initialState;
      default:
        return state;
    }
};
  
export default printReducer;