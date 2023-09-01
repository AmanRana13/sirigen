/* eslint-disable max-len */
import {Box, Typography, Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import globalUseStyles from 'config/global.styles';
import withPaginationTable from 'hoc/withPaginationIsolated';

import AssessmentWrapper from '../AssessmentWrapper';
import MedicationListSections from './MedicationListSections.component';
import {
  MEDICATION_TOGGLE_IS_COMPLETED,
  getMedicationData,
  getMedicationDataSuccess,
  getMedicationFail,
  openMedicationDialog,
  resetAllMedicationData,
  updateMedicationPageNumber,
} from './MedicationList.action';
import React from 'react';
import {IWithPaginationProps} from 'hoc/withPaginationIsolated/withPaginationTable.types';

import {MAX_RECORDS_LIMIT, PAGINATION_LIMIT} from 'globals/global.constants';
import {
  IMedicalListProps,
  IMedicationData,
  IMedicationDataProps,
} from './MedicationList.types';
import {
  AssessmentStatus,
  PaginationFetchTypes,
  PAGINATION_TYPE,
} from 'globals/enums';

/**
 * @description Add Medication Button
 * @returns {JSX}
 */
const AddMedicationButton = ({medicationInfo}: IMedicationDataProps) => {
  const {classes: globalClasses} = globalUseStyles();
  const dispatch: any = useAppDispatch();

  return (
    <Button
      size='large'
      color='primary'
      className={globalClasses.smallButton}
      variant='contained'
      onClick={() => {
        dispatch(
          openMedicationDialog({
            dialogTitle: 'Add Medication',
          }),
        );
      }}
      style={{
        color: '#fff',
        marginLeft: 12,
        paddingLeft: 55,
        paddingRight: 55,
      }}
      disabled={medicationInfo?.length >= 15}>
      Add Medication
    </Button>
  );
};

/**
 * @description table component for all the medications
 * @returns {JSX}
 */
const MedicationListTable = ({data}: any) => {
  return (
    <>
      {data?.length === 0 ? (
        <>
          <Typography align='center' mt={18}>
            No Record Found
          </Typography>
        </>
      ) : (
        <Box mb={3} width='100%'>
          {data?.map((medicationData: IMedicationData) => {
            return (
              <MedicationListSections
                key={medicationData.medicationName}
                data={medicationData}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};

/**
 * @description component to list all the medications
 * @returns {JSX}
 */
const MedicationList = ({heading}: IMedicalListProps) => {
  const medicationInfo: IMedicationData[] = useAppSelector(
    (state: any) => state.medicationList.data,
  );

  const dispatch: any = useAppDispatch();

  //checking for any incomplete record using status save, we found any then toggle isCompleted
  React.useEffect(() => {
    if (medicationInfo.length !== 0) {
      const isMedicationCompleted = medicationInfo.some(
        (medicationData: any) =>
          medicationData.status === AssessmentStatus.Save,
      );
      if (isMedicationCompleted)
        dispatch({
          type: MEDICATION_TOGGLE_IS_COMPLETED,
          payload: {isCompleted: false},
        });
    }
  }, [medicationInfo]);

  React.useEffect(() => {
    return () => {
      dispatch(resetAllMedicationData());
    };
  }, []);

  // HOC props
  const withPaginationProps: IWithPaginationProps = React.useMemo(() => {
    return {
      fetchType: PaginationFetchTypes.LAST_EVALUATED_KEY,
      paginationProps: {
        getData: () => getMedicationData(),
        onSuccess: getMedicationDataSuccess,
        onError: getMedicationFail,
        onPageChange: updateMedicationPageNumber,
        rowsPerPage: PAGINATION_LIMIT.medication,
        className: '',
        lastEvaluatedKeyPath: 'medicationList.lastEvaluatedKey',
        loadingPath: 'medicationList.loading',
        paginationType: PAGINATION_TYPE.SECONDARY,
        pagePath: 'medicationList.currentPage',
        tableData: medicationInfo,
        isScrollOnTop: true,
      },
    };
  }, [medicationInfo]);

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const MedicationListWithPagination = withPaginationTable(
    MedicationListTable,
    {},
    withPaginationProps,
  );
  return (
    <AssessmentWrapper
      heading={heading}
      showDivider={true}
      buttonInHeader={<AddMedicationButton medicationInfo={medicationInfo} />}
      infoAlertMessage={
        medicationInfo?.length >= MAX_RECORDS_LIMIT.medication
          ? 'Maximum 15 medications added already.'
          : ''
      }
      data-testid='medication-list'>
      {MedicationListWithPagination()}
    </AssessmentWrapper>
  );
};

export default MedicationList;
