/* eslint-disable max-len */
import {push, go, replace} from 'redux-first-history';

import {EventsType, EventViewState} from 'globals/enums';
import {adminBaseRoute, appRoutesEndpoints} from 'routes/appRoutesEndpoints';

import {closeMilestoneNotification, CREATE_MILESTONE} from './Events.action';
import {ICreateMilestoneDataParams, IMilestoneEvent} from './Events.state';

/**
 * @function createCIRangeMilsetoneNotification action creator to create CI Range milsetone notification
 * @param data
 * @returns null if CI Range milestone exist else void
 */
export const createCIRangeMilsetoneNotification = (data: any) => (
  dispatch: any,
  getState: any,
) => {
  const milestone = getState().events.milestone;

  const isExist = Object.values(milestone).some((value: any) => {
    return value.viewState === EventViewState.Approve;
  });

  // if dialog for milestone already existing return null
  if (isExist) {
    return;
  }

  const milestoneDataParams = {
    seniorId: data.seniorId,
    modificationDate: data.modificationDate,
    eventType: EventsType.MILESTONE,
    viewState: EventViewState.Approve,
    vitalSign: data.vitalSign,
    vitalLabel: data.vitalLabel,
    milestone: data.milestone,
    eventId: data.eventId,
  };
  const milestoneData: IMilestoneEvent = createMilestoneData(
    milestoneDataParams,
  );
  dispatch({type: CREATE_MILESTONE, payload: {milestoneData}});
};

/**
 * @description action creator to redirect the user on CI range milestone page when clicking milestone notification
 * @function redirectMilestoneDialog
 */
export const redirectMilestoneDialog = () => async (
  dispatch: any,
  getState: any,
) => {
  const currentPath = getState().router.location.pathname;

  if (
    currentPath ===
    appRoutesEndpoints.admin.nestedRoutes.cIRangeMilestones.baseRoute
  ) {
    dispatch(go(0));
    dispatch(closeMilestoneNotification());
  } else {
    dispatch(closeMilestoneNotification());
    dispatch(
      push(
        `${adminBaseRoute}${appRoutesEndpoints.admin.nestedRoutes.cIRangeMilestones.baseRoute}`,
      ),
    );
  }
};

/**
 * @function createMilestoneData
 * @description method to create data for milestone event
 * @param {string} seniorId senior ID
 * @param {string} modificationDate modification date
 * @param {EventsType} type type of event milestone
 * @param {EventViewState} viewState view state of milestone event
 * @param {string} vitalSign milestone notification vitalSign
 * @param {string} vitalLabel milestone notication vitalLabel
 * @param {number} milestone milestone number
 * @returns {IMilestoneEvent}
 */
const createMilestoneData = ({
  seniorId,
  modificationDate,
  eventType,
  viewState,
  vitalSign,
  vitalLabel,
  milestone,
  eventId,
}: ICreateMilestoneDataParams): IMilestoneEvent => {
  const id = `${seniorId}-${eventId}`;
  return {
    [id]: {
      seniorId,
      modificationDate,
      eventType,
      viewState,
      vitalSign,
      vitalLabel,
      milestone,
      eventId: id,
    },
  };
};
