import {DIALOG_TYPES} from 'globals/global.constants';
import {UPDATE_GOAL_CONTEXT} from 'pages/WCPages/SeniorWellnessPlan/wellnessPlanContext/reducer';
import {openOverlayDialog} from 'store/commonReducer/common.action';
import {deleteFiles} from 'store/deleteFiles/deleteFiles.action';
import {uploadFiles} from 'store/uploadFilesReducer/uploadFiles.action';
import {ISaveResourcesParams} from './ResourcesDialog.types';

/**
 * @description action creator to upload and save files to goal context
 * @param {ISaveResourcesParams} params params for saveResources
 */
export const saveResources =
  ({resourcesDialogState, data, onCloseHandler}: ISaveResourcesParams) =>
  async (dispatch: any) => {
    const {newFilesData, deleteRowsData} = resourcesDialogState;
    // upload files if files exist in newFilesData
    if (newFilesData.length) {
      const isFileUploaded = await dispatch(
        uploadFiles({
          senior_id: data?.seniorId,
          version: data?.currentVersion,
          files: newFilesData,
        }),
      );

      if (!isFileUploaded) {
        return;
      }
    }
    // delete files if files exist in deleteRowsData
    const filesToBeDeleted = deleteRowsData.filter((file: string) => {
      // filter out files that exist in already saved data
      const doesExist = resourcesDialogState.existingResourcesData.some(
        (resource: any) => file === resource.resourceId,
      );
      return !doesExist;
    });
    if (filesToBeDeleted.length) {
      await dispatch(
        deleteFiles({
          senior_id: data?.seniorId,
          version: data?.currentVersion,
          files: filesToBeDeleted,
        }),
      );
    }
    //Dispatch an context action to create a mapping and
    //update the mapping of goals data for new files.
    data?.dispatchGoalsContext({
      type: UPDATE_GOAL_CONTEXT,
      payload: {
        id: data?.goalData?.newGoalId || data?.goalData?.id,
        value: resourcesDialogState.resourcesRowsData,
        name: 'resource',
      },
    });
    // show success message
    dispatch(
      openOverlayDialog({
        type: DIALOG_TYPES.SUCCESS,
        firstMessage: 'Goal Resource has been successfully updated.',
      }),
    );
    // close dialog
    onCloseHandler();
  };
