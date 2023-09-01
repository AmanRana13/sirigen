export const SET_SLEEP_START_END_TIME = 'SET_SLEEP_START_END_TIME';

export const setSleepHeartRateTime = (startTime: number, endTime: number) => (
  dispatch: any,
) => {
  dispatch({type: SET_SLEEP_START_END_TIME, payload: {startTime, endTime}});
};
