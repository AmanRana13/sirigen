/* eslint-disable max-len */
import {DIALOG_TYPES} from 'globals/global.constants';
import {
  closeDialog,
  getCareAgentListFail,
  getCareAgentListSuccess,
  getCareAgentListWithoutOvernight,
  getPaginationDataIsolated,
  openDialog,
  openOverlayDialog,
} from 'store/commonReducer/common.action';
import {IUserData} from '../../SeniorCoach.types';
import {unassignSeniorsService} from 'services/seniorCoachMappingService/seniorCoachMappingService';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {ICareAgentData} from 'services/careAgentAccountService/careAgentAccount.types';

/**
 * @description function to build success & error messages
 * @function getMessage
 * @param {IUserData} coach CareAgent id & name
 * @param {IUserData[]} seniors List of [{Senior id & name}] that are to be unassigned
 */
const getMessage = (coach: IUserData, seniors: IUserData[]) => {
  let firstMessage = '',
    errorMessage = '';
  if (seniors.length === 1) {
    firstMessage = `Senior ${seniors[0].name} is un-assigned successfully from Wellness Coach ${coach.name}`;
    errorMessage = `Senior ${seniors[0].name} could not be un-assigned from Wellness Coach ${coach.name}. Please Try Again.`;
  } else if (seniors.length === 2) {
    firstMessage = `Seniors ${seniors[0].name} and ${seniors[1].name} are un-assigned successfully from Wellness Coach ${coach.name}`;
    errorMessage = `Seniors ${seniors[0].name} and ${seniors[1].name} could not be un-assigned from Wellness Coach ${coach.name}. Please Try Again.`;
  } else {
    firstMessage = `Seniors ${seniors[0].name}, ${seniors[1].name} and ${
      seniors.length - 2
    } other seniors are un-assigned successfully from Wellness Coach ${
      coach.name
    }`;
    errorMessage = `Seniors ${seniors[0].name}, ${seniors[1].name} and ${
      seniors.length - 2
    } other seniors could not be un-assigned from Wellness Coach ${
      coach.name
    }. Please Try Again.`;
  }
  return {firstMessage, errorMessage};
};

/**
 * @description action to assign wellness coach to a senior
 * @function assignWellnessCoach
 * @param {IUserData} coach CareAgent id & name
 * @param {IUserData[]} seniors List of [{Senior id & name}] that are to be unassigned
 */
export const unassignSeniors =
  (coach: IUserData, seniors: IUserData[]) => async (dispatch: any) => {
    const {firstMessage, errorMessage} = getMessage(coach, seniors);
    dispatch(showApplicationLoader());
    try {
      await unassignSeniorsService({
        coach_id: coach.id,
        senior_id: seniors.map((senior) => senior.id),
      });
      dispatch(closeDialog());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage,
        }),
      );
      dispatch(hideApplicationLoader());
      dispatch(
        getPaginationDataIsolated(
          getCareAgentListWithoutOvernight,
          1,
          '',
          1,
          getCareAgentListSuccess,
          getCareAgentListFail,
          [],
        ),
      );
    } catch (error) {
      dispatch(closeDialog);
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.ERROR,
          data: {
            errorCode: 2032,
            errorMessage,
          },
        }),
      );
      dispatch(hideApplicationLoader());
    }
  };

/**
 * @description action to open Unassign Seniors Popup
 * @function openUnassignSeniorsDialog
 * @param {ICareAgentData} agentData careagent data
 */
export const openUnassignSeniorsDialog =
  (agentData: ICareAgentData) => async (dispatch: any) => {
    dispatch(
      openDialog({
        type: DIALOG_TYPES.UNASSIGN_SENIORS,
        dialogTitle: 'Assigned Seniors',
        data: agentData,
      }),
    );
  };
