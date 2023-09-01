/* eslint-disable max-len */
import {DIALOG_TYPES} from 'globals/global.constants';
import {
  closeDialog,
  getPaginationDataIsolated,
  getSeniorListFail,
  getSeniorListSuccess,
  getUnassignedSeniorList,
  openDialog,
  openOverlayDialog,
} from 'store/commonReducer/common.action';
import {IUserData} from '../../SeniorCoach.types';
import {assignWellnessCoachService} from 'services/seniorCoachMappingService/seniorCoachMappingService';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';

/**
 * @description action to assign wellness coach to a senior
 * @function assignWellnessCoach
 * @param {IUserData} coach CareAgent id & name
 * @param {IUserData} senior Senior id & name
 */
export const assignWellnessCoach =
  (coach: IUserData, senior: IUserData) => async (dispatch: any) => {
    dispatch(showApplicationLoader());
    try {
      await assignWellnessCoachService({
        coach_id: coach.id,
        senior_id: [senior.id],
        coach_name: coach.name,
      });
      dispatch(closeDialog());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: `Senior ${senior.name} is assigned successfully to Wellness Coach ${coach.name}`,
        }),
      );
      dispatch(hideApplicationLoader());
      dispatch(
        getPaginationDataIsolated(
          getUnassignedSeniorList,
          1,
          '',
          1,
          getSeniorListSuccess,
          getSeniorListFail,
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
            errorMessage: `Senior ${senior.name} could not be assigned to Wellness Coach ${coach.name}. Please Try Again.`,
          },
        }),
      );
      dispatch(hideApplicationLoader());
    }
  };

/**
 * @description action to open Assign WellnessCoach Popup
 * @function openAssignCoachDialog
 * @param {any} seniorData
 */
export const openAssignCoachDialog =
  (seniorData: any) => async (dispatch: any) => {
    dispatch(
      openDialog({
        type: DIALOG_TYPES.ASSIGN_WELLNESS_COACH,
        dialogTitle: 'Wellness Coach',
        data: seniorData,
      }),
    );
  };
