/* eslint-disable max-len */
import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box, Typography} from '@mui/material';

import {isEmpty} from 'lodash';
import {AssessmentStatus, PrintTemplates} from 'globals/enums';
import {InputFields} from 'common/InputFields';
import ErrorIcon from 'assets/icons/ErrorIcon.svg';
import {DIALOG_TYPES} from 'globals/global.constants';
import {
  calculatePercentage,
  capitalizeFirstLetter,
  constructName,
  getAge,
  getCurrentSenior,
  sortCareGiverInfo,
} from 'globals/global.functions';
import {openDialog, openOverlayDialog} from 'store/commonReducer/common.action';

import AssessmentHistory from '../AssessmentHistory.component';
import CaregiverStrainTable from './components/CaregiverStrainTable.component';
import CountTable from './components/CountTable.component';
import {
  getCaregiverStrainAssessment,
  postCaregiverStrainAssessment,
  toggleCaregiverStrainAssessmentViewState,
  getCaregiverStrainAssessmentHistoryFail,
  getCaregiverStrainAssessmentHistorySuccess,
  getCaregiverStrainAssessmentHistory,
  updateCaregiverStrainAssessmentHistoryPageNumber,
  toggleIncompleteTag,
} from './CaregiverStrainAssessment.action';
import {assessmentStyle} from '../AssessmentTable.style';
import {
  getCaregiverName,
  ICaregiverListItems,
  ICareGiverStrainAssessmentOptions,
  ICaregiverStrainAssessmentProps,
  ICaregiverStrainAssessmentSurveyData,
  ICaregiverStrainHistoryTableProps,
  IPostCaregiverActionParams,
} from './CaregiverStrainAssessment.type';
import {
  IAssementHistoryActionCreators,
  IHistoryData,
  IHistoryTablePaginationProps,
} from '../AssessmentHistory.type';
import {mapCaregiverStrainFormData} from 'services/assessmentService/caregiverStrainAssessmentService/CGAssessment.services';
import {AssessmentActionButtons} from '../AssessmentActionButtons.component';
import AssessmentWrapper from '../AssessmentWrapper';
import {GET_ASSESSMENT, RESET_ASSESSMENT} from '../Assessments.action';
import useAutoSave from 'hooks/useAutoSave';
import useAutoScroll from 'hooks/useAutoScroll';
import CGStrainMetaDataModel from 'common/Print/models/AssessmentMetaDataModel';
import usePrint from 'common/Print/usePrint';
import {getCareAgentName} from 'common/Print/Print.utility';
import {getCareAgents} from 'pages/WCPages/Admin/Accounts/AgentAccount/CareAgentAccount.actions';

const CaregiverStrainAssessment = ({
  heading,
}: ICaregiverStrainAssessmentProps) => {
  const {classes} = assessmentStyle();
  const dispatch: any = useAppDispatch();
  const {seniorID} = getCurrentSenior();

  const {
    isHistory,
    caregiverId,
    dateTime,
    assessmentId,
    isCompleted,
    versionNumber,
    assessmentStatus,
    careAgentId,
  } = useAppSelector((state: any) => state.assessments);

  // getting careAgentName from careAgentInfo
  const allCareAgentAccounts = useAppSelector(
    (state: any) => state.careAgentAccount.allCareAgentAccounts,
  );

  /*
   ref limit the section where we have to search data-error: error attribute for autoscroll feature
   scrollToFirstError handles the focus of user
  */
  const {ref, scrollToFirstError} = useAutoScroll();

  const caregiverStrainAssessmentStates = useAppSelector(
    (state: any) => state.assessments,
  );
  const surveys: ICaregiverStrainAssessmentSurveyData[] =
    caregiverStrainAssessmentStates.surveys;
  const loading = caregiverStrainAssessmentStates.loading;
  const historyTableData = caregiverStrainAssessmentStates.history.data;
  const caregiverInfo = useAppSelector(
    (state: any) => state.common.careGiverInfo,
  );
  const {seniorDetail} = useAppSelector((state: any) => state.common);
  const autoSaveTimeOut = useAppSelector(
    (state: any) => state.config.autoSaveTimeOut,
  );

  const [formError, setFormError] = React.useState(false);
  const [caregiver, setCaregiver] = React.useState({id: '', name: ''});
  const [surveyState, setSurveyState] = React.useState<
    ICaregiverStrainAssessmentSurveyData[]
  >([]);
  const [responses, setResponses] =
    React.useState<ICareGiverStrainAssessmentOptions>({
      no: 0,
      sometimes: 0,
      regular: 0,
    });

  /**
   * @description to get sorted list of caregiver on the basis of caregiverType
   */
  const caregiverList = sortCareGiverInfo(caregiverInfo);

  /**
   * @description to get care agent name
   */
  const careAgentName = React.useMemo(() => {
    const careAgentInfo = allCareAgentAccounts?.find(
      (allCareAgentAccount: any) => allCareAgentAccount.userId === careAgentId,
    );
    return getCareAgentName(careAgentInfo);
  }, [allCareAgentAccounts, careAgentId, caregiverId, caregiver.id]);

  const totalScore: number = React.useMemo(() => {
    return responses.no * 0 + responses.sometimes * 1 + responses.regular * 2;
  }, [responses]);

  /*** function to check whether form is filled or not */
  const checkIfFormFilled = () => {
    let isError = false;
    isError = surveyState.some(
      (dataArr: ICaregiverStrainAssessmentSurveyData) => {
        return (
          dataArr.no === 0 && dataArr.sometimes === 0 && dataArr.regular === 0
        );
      },
    );
    return !isError;
  };

  const isAssessmentDataUpdated = React.useMemo(() => {
    // comparing the current form data with last saved data
    return JSON.stringify(surveys) !== JSON.stringify(surveyState);
  }, [surveys, surveyState]);
  /**
   * @description function to set caregiver in dropdown menu
   */
  const handleCaregiver = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAssessmentDataUpdated) {
      handleSaveSubmit(AssessmentStatus.Save, true, true);
      resetAutoSave();
    }
    caregiverList?.find(
      (item: ICaregiverListItems) => item.id === e.target.value,
    );
    setCaregiver({
      id: e.target.value,
      name: getCaregiverName(e.target.value, caregiverList),
    });
    dispatch(toggleIncompleteTag(true));
  };

  /**
   * @function handleSaveSubmit
   * @description on click assessment action buttons
   */
  const handleSaveSubmit = (
    type: AssessmentStatus = AssessmentStatus.Save,
    isAutoSave: boolean = false,
    isUnMount: boolean = false,
    historyData?: any,
  ) => {
    setFormError(false);

    const assessmentData: IPostCaregiverActionParams = {
      survey: surveyState,
      caregiverName: caregiver.name,
      caregiverId: caregiver.id,
      type: type,
      totalScore: totalScore,
      versionNumber: versionNumber,
      isAutoSave: isAutoSave,
      isUnMount: isUnMount,
      historyData: historyData,
      assessmentId,
      seniorID,
    };
    if (type === AssessmentStatus.Submit) {
      if (!checkIfFormFilled()) {
        dispatch(toggleIncompleteTag(false));
        setFormError(true);
        scrollToFirstError();
      } else {
        dispatch(postCaregiverStrainAssessment(assessmentData));
      }
    } else {
      // save the assessment only if assessment was updated
      if (isAssessmentDataUpdated) {
        dispatch(postCaregiverStrainAssessment(assessmentData));
      }
    }
  };

  const handleReset = (): void => {
    const assessmentData: IPostCaregiverActionParams = {
      survey: surveyState,
      caregiverName: caregiver.name,
      caregiverId: caregiver.id,
      type: AssessmentStatus.Reset,
      totalScore: totalScore,
      versionNumber: versionNumber,
      assessmentId,
      seniorID,
    };
    const boldMessage = `Are you sure you want to RESET the Assessment?`;
    const secondMessage = `Resetting will erase all your entries.`;
    const successButtonText = AssessmentStatus.OK;
    const openDialogProp = {
      boldMessage,
      secondMessage,
      successButtonText,
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        // hit the API only if the form is saved otherwise reset the form on the frontend side
        if (assessmentStatus === AssessmentStatus.Save) {
          dispatch(postCaregiverStrainAssessment(assessmentData));
        } else {
          dispatch(
            openOverlayDialog({
              type: DIALOG_TYPES.SUCCESS,
              firstMessage:
                'Caregiver Strain assessment has been reset successfully ',
            }),
          );
          toggleIncompleteTag(true);
          setSurveyState(surveys);
        }
        setFormError(false);
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  const handleClose = () => {
    dispatch(toggleCaregiverStrainAssessmentViewState(false, '', ''));
    dispatch(getCaregiverStrainAssessment(caregiver.id));
  };

  //<-- Print related Changes Start -->//
  // Create metaData using Model
  const metaData = React.useMemo(() => {
    const caregiverStrainMetaData = new CGStrainMetaDataModel(
      constructName(
        seniorDetail?.minimalInfo?.name?.first_name,
        seniorDetail?.minimalInfo?.name?.middle_name,
        seniorDetail?.minimalInfo?.name?.last_name,
      ),
      seniorDetail?.basicInfo?.preferred_name,
      seniorDetail?.minimalInfo?.account_id,
      `${getAge(seniorDetail?.minimalInfo?.dob)}`,
      seniorDetail?.minimalInfo?.gender,
      dateTime,
      careAgentName,
      assessmentStatus,
      getCaregiverName(caregiverId || caregiver.id, caregiverList),
    );
    return caregiverStrainMetaData;
  }, [
    seniorDetail,
    dateTime,
    assessmentStatus,
    careAgentName,
    caregiverId,
    caregiver.id,
  ]);
  // Pass type, metaData & templateData to usePrint Hook
  usePrint({
    type: PrintTemplates.CAREGIVER_STRAIN,
    meta: metaData,
    data: surveyState,
  });
  //<-- Print related Changes End -->//

  const {onChangeAutoSave, resetAutoSave} = useAutoSave({
    onSave: (isUnMount?: boolean) =>
      handleSaveSubmit(AssessmentStatus.Save, true, isUnMount),
    timeOut: autoSaveTimeOut,
  });

  /**
   * @description Reset the form on component unmount */
  React.useEffect(() => {
    return () => {
      dispatch({type: RESET_ASSESSMENT});
    };
  }, []);

  /** Reload the form on caregiver change */
  React.useEffect(() => {
    setFormError(false);
    dispatch(getCaregiverStrainAssessment(caregiver.id));
  }, [caregiver.id]);

  /**
   * @description toggle incomplete tag on state change */
  React.useEffect(() => {
    const isFormFilled = checkIfFormFilled();
    if (assessmentId) {
      dispatch(toggleIncompleteTag(isFormFilled));
    }
  }, [surveyState]);

  /**
   * @description update the react state with latest data feched from api  */
  React.useEffect(() => {
    if (surveys && surveys.length > 0) {
      setSurveyState(surveys);
    }
  }, [surveys]);

  // getting care agent info
  React.useEffect(() => {
    if (careAgentId) {
      dispatch(getCareAgents('', Array(`${careAgentId}`)));
    }
  }, [dispatch, careAgentId, caregiverId, caregiver.id]);

  return (
    <AssessmentWrapper
      dateTime={
        (isHistory || assessmentStatus === AssessmentStatus.Save) && dateTime
      }
      heading={heading}
      isIncomplete={!isCompleted && !isHistory}
      version={{
        isDraft: assessmentStatus === AssessmentStatus.Save,
      }}>
      <>
        <Box display='flex' mb={3} alignItems='center' mt={2}>
          <Typography variant='h6'>Select Caregiver:&nbsp;</Typography>
          <Box className={classes.dropDown} pl={2}>
            <InputFields
              menu={true}
              initialLabel={
                !isEmpty(caregiverList) ? 'Select a Caregiver' : '-'
              }
              menuItems={caregiverList.map((item: ICaregiverListItems) => {
                return {
                  value: item.id,
                  label: `${capitalizeFirstLetter(
                    item.name.firstName,
                  )} ${capitalizeFirstLetter(
                    item.name.lastName,
                  )} (${capitalizeFirstLetter(item.caregiverType)})`,
                };
              })}
              inputProps={{
                name: 'caregiver',
                classes: {icon: classes.inputFieldArrowIcon},
              }}
              eventProps={{
                onChange: handleCaregiver,
                value: isHistory ? caregiverId : caregiver.id,
                disabled: isHistory || isEmpty(caregiverList),
              }}
            />
          </Box>
          <Box pl={3}>
            {isEmpty(caregiverList) && !loading && (
              <Typography variant='body1' className={classes.incomplete}>
                <img src={ErrorIcon} width='30' height='30' />
                No Caregivers Available
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          data-testid='caregiverStrainAssessmentComponent'
          width='100%'
          ref={ref}>
          <CaregiverStrainTable
            tableData={surveyState}
            setTableData={(data: any) => {
              setSurveyState(data);
              onChangeAutoSave();
            }}
            setResponses={setResponses}
            formError={formError}
            isHistory={isHistory}
            isLoading={loading}
            isCaregiverSelected={caregiver.id}
          />
          <CountTable
            responses={responses}
            totalScore={totalScore}
            maximumScore={surveyState.length * 2}
            isCaregiverSelected={caregiver.id}
          />
          <AssessmentActionButtons
            isHistory={isHistory}
            handleClose={handleClose}
            handleReset={() => {
              handleReset();
              resetAutoSave();
            }}
            handleSaveSubmit={(value: AssessmentStatus) => {
              handleSaveSubmit(value);
              resetAutoSave();
            }}
            disabled={!caregiver.id}
          />
          <CGAssessmentHistoryTable
            historyTableData={historyTableData}
            surveyState={surveys}
            caregiverList={caregiverList}
            handleSaveSubmit={(
              type: AssessmentStatus | undefined,
              isAutoSave?: boolean,
              isUnMount?: boolean,
              history?: any,
            ) => {
              handleSaveSubmit(type, isAutoSave, isUnMount, history);
            }}
            resetAutoSave={resetAutoSave}
            isAssessmentDataUpdated={isAssessmentDataUpdated}
          />
        </Box>
      </>
    </AssessmentWrapper>
  );
};

const CGAssessmentHistoryTable = React.memo(
  ({
    historyTableData,
    surveyState,
    caregiverList,
    handleSaveSubmit,
    resetAutoSave,
    isAssessmentDataUpdated,
  }: ICaregiverStrainHistoryTableProps) => {
    const dispatch: any = useAppDispatch();
    let actionCreatorProps: IAssementHistoryActionCreators = {
      getAssessment: GET_ASSESSMENT,
      getData: getCaregiverStrainAssessmentHistory,
      success: getCaregiverStrainAssessmentHistorySuccess,
      error: getCaregiverStrainAssessmentHistoryFail,
      pageChange: updateCaregiverStrainAssessmentHistoryPageNumber,
    };
    const historyTablePaginationProps: IHistoryTablePaginationProps = {
      lastEvaluatedKeyPath: 'assessments.history.lastEvaluatedKey',
      loadingPath: 'assessments.history.loading',
      pagePath: 'assessments.history.currentPage',
    };

    /**
     * @function onClickViewHistory
     * @param history
     * @description to view the previously submitted assessment
     */
    const onClickViewHistory = (history: any) => {
      const dateTime = `${history.date} ${history.time}`;
      const caregiverId = history.caregiverId;
      if (isAssessmentDataUpdated) {
        handleSaveSubmit(AssessmentStatus.Save, true, false, history);
        resetAutoSave();
      } else {
        dispatch(
          toggleCaregiverStrainAssessmentViewState(true, dateTime, caregiverId),
        );
        dispatch({
          type: GET_ASSESSMENT,
          payload: {
            surveys: mapCaregiverStrainFormData(history.formData),
            dateTime: dateTime,
            assessmentId: history.assessmentId,
            careAgentId: history.careAgentId,
            assessmentStatus: 'submit',
          },
        });
      }
    };
    return (
      <>
        {surveyState && (
          <AssessmentHistory
            tableLabel='Previous Caregiver Strain Assessments'
            tableData={historyTableData}
            columnProps={[
              {label: 'Date', value: 'date'},
              {label: 'Time', value: 'time'},
              {
                label: 'Score %',
                value: 'scorePercent',
                method: (history: IHistoryData) =>
                  `${calculatePercentage(
                    history.totalScore,
                    surveyState.length * 2,
                  )} %`,
              },
              {
                label: 'Caregiver Name',
                value: 'caregiverName',
                method: (history: any) =>
                  getCaregiverName(history.caregiverId, caregiverList),
              },
            ]}
            onClickViewHistory={onClickViewHistory}
            actionCreators={actionCreatorProps}
            paginationProps={historyTablePaginationProps}
          />
        )}
      </>
    );
  },
);

export default CaregiverStrainAssessment;
