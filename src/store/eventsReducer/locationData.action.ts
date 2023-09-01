import {removeLocalStorage} from 'globals/global.functions';

export const UPDATE_IS_RENDER_LOCATION = 'UPDATE_IS_RENDER_LOCATION';

/**
 * @function createPusherLocationData action creator to create create location data
 * @param data
 * @returns null if location data exist else void
 */
export const createPusherLocationData = (data: any) => (
  dispatch: any,
  getState: any,
) => {
  const currentPagePath = getState().router.location.pathname;
  const currentLocationData = createLocationData(data.seniorId);

  removeLocalStorage(`location-${currentLocationData}`);

  if (
    currentPagePath.includes('/senior-location') &&
    currentPagePath.includes(data.seniorId)
  ) {
    dispatch(updateIsRenderLocation(false));

    setTimeout(() => {
      dispatch(updateIsRenderLocation(true));
    }, 500);
  }
};

const updateIsRenderLocation = (value: boolean) => (dispatch: any) => {
  dispatch({type: UPDATE_IS_RENDER_LOCATION, payload: value});
};

/**
 * @function createLocationData
 * @description method to create data for location event
 * @param {string} seniorId senior ID
 * @returns seniorId
 */
const createLocationData = (seniorId: string) => {
  return seniorId;
};
