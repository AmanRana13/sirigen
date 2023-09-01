/* eslint-disable max-len */
import moment from 'moment';
import {Box, Typography} from '@mui/material';
import {medicationListStyle} from './MedicationListSections.style';
import CreateIcon from '@mui/icons-material/Create';
import ErrorIcon from 'assets/icons/ErrorIcon.svg';
import MedicationListDetails from './MedicationListDetails.component';
import {IMedicationListDetailProps} from './MedicationList.types';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {
  openMedicationDialog,
  postMedicationData,
} from './MedicationList.action';
import {AssessmentStatus} from 'globals/enums';
import {DIALOG_TYPES, DATE_FORMAT, TIME_FORMAT} from 'globals/global.constants';
import {openDialog, openOverlayDialog} from 'store/commonReducer/common.action';
import {getCurrentSenior} from 'globals/global.functions';

/**
 * @description component for each Medication List Section
 * @param {IMedicationListDetailProps} data
 * @returns {JSX}
 */
const MedicationListSections = ({data}: IMedicationListDetailProps) => {
  const {classes} = medicationListStyle();
  const dispatch: any = useAppDispatch();
  const {medicationName} = data;
  const {name} = useAppSelector(
    (state: any) => state.common.seniorDetail.minimalInfo,
  );

  /**
   * @description method to handle edit button
   * @param medicationInfo
   */
  const handleEdit = (medicationInfo: any) => {
    dispatch(
      openMedicationDialog({
        medicationData: medicationInfo,
        dialogTitle: 'Edit Medication',
      }),
    );
  };
  /**
   * @description method to handle delete button
   * @param medicationInfo
   */
  const handleDelete = async () => {
    const boldMessage = `Are you sure you want to DELETE ${medicationName} for ${name.first_name} ${name.last_name}?`;
    const successButtonText = AssessmentStatus.YES;
    const cancelButtonText = AssessmentStatus.NO;
    const {seniorID} = getCurrentSenior();

    const param: any = {
      data: data,
      status: AssessmentStatus.Reset,
      medicationID: data.medicationID,
      seniorID: seniorID,
    };

    const openDialogProp = {
      boldMessage,
      successButtonText,
      cancelButtonText,
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        dispatch(postMedicationData(param));
        dispatch(
          openOverlayDialog({
            type: DIALOG_TYPES.SUCCESS,
            firstMessage: `${data?.medicationName} is successfully deleted from ${name.first_name} ${name.last_name}.`,
          }),
        );
      },
    };

    dispatch(openDialog({...openDialogProp}));
  };

  return (
    <Box className={classes.medicationSectionsContainer} mb={2}>
      <Box className={classes.medicationSectionheader} alignItems='center'>
        <Typography
          variant='body1Bold'
          className={classes.medicationSectionHeading}>
          Medication Name: {medicationName}
        </Typography>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          {data.status === AssessmentStatus.Save && (
            <>
              <Box display='flex'>
                <Typography variant='body1Bold'>Last Saved: &nbsp;</Typography>
                <Typography variant='body1'>
                  {moment
                    .utc(data.lastSaved)
                    .tz(moment.tz.guess())
                    .format(`${DATE_FORMAT} ${TIME_FORMAT}`)}
                </Typography>
              </Box>
              <Typography variant='body1' ml={2} className={classes.incomplete}>
                <img src={ErrorIcon} width='30' height='30' />
                Incomplete
              </Typography>
            </>
          )}
          <Box
            className={classes.editBtn}
            onClick={() => handleEdit(data)}
            data-testid='editButton'>
            <CreateIcon className={classes.createIcon} />
            <Typography variant='body1'>Edit</Typography>
          </Box>
          <Box
            className={classes.deleteBtn}
            onClick={() => handleDelete()}
            data-testid='deleteButton'>
            <Typography variant='body1'>Delete</Typography>
          </Box>
        </Box>
      </Box>
      <MedicationListDetails data={data} />
    </Box>
  );
};

export default MedicationListSections;
