/* eslint-disable max-len */
import React from 'react';
import moment from 'moment';
import {isEmpty} from 'lodash';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box, Typography} from '@mui/material';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {DIALOG_TYPES} from 'globals/global.constants';
import {
  ASSESSMENT_TIME_DIFF,
  BUSINESS_VOILATION_CODE,
} from 'globals/applicationCodes';
import useAutoSave from 'hooks/useAutoSave';
import {
  openDialog,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';
import {mapKatzFormData} from 'services/assessmentService/ADLAssessmentService/katzService/Katz.services';
import {AssessmentStatus, PrintTemplates} from 'globals/enums';
import {
  IAssementHistoryActionCreators,
  IHistoryTablePaginationProps,
} from 'pages/WCPages/Assessments/AssessmentHistory.type';

import AssessmentHistory from '../../AssessmentHistory.component';
import {
  toggleIncompleteTag,
  getKatzAssessment,
  postKatzAssessment,
  toggleKatzAssessmentViewState,
  getKatzAssessmentHistoryFail,
  getKatzAssessmentHistorySuccess,
  getKatzAssessmentHistory,
  updateKatzAssessmentHistoryPageNumber,
} from './KatzAssessment.action';
import {assessmentStyle} from '../../AssessmentTable.style';
import KatzAssessmentTable from '../AdlAssessmentTable';
import {ScoreTable} from '../ADLScoreTabel';
import {
  IKatzADLAssessmentSurveyData,
  IKatzAssessmentHistoryTableProps,
  IPostKatzActionParams,
} from './KatzAssessment.type';
import AssessmentWrapper from 'pages/WCPages/Assessments/AssessmentWrapper';
import {
  GET_ASSESSMENT,
  RESET_ASSESSMENT,
} from 'pages/WCPages/Assessments/Assessments.action';
import {AssessmentActionButtons} from 'pages/WCPages/Assessments/AssessmentActionButtons.component';
import useAutoScroll from 'hooks/useAutoScroll';
import {getCareAgentName} from 'common/Print/Print.utility';
import AssessmentMetaDataModel from 'common/Print/models/AssessmentMetaDataModel';
import {
  constructName,
  getAge,
  getCurrentSenior,
} from 'globals/global.functions';
import usePrint from 'common/Print/usePrint';
import {getCareAgents} from 'pages/WCPages/Admin/Accounts/AgentAccount/CareAgentAccount.actions';

const KatzAssessment = () => {
  const {classes} = assessmentStyle();
  const dispatch: any = useAppDispatch();
  const {seniorID} = getCurrentSenior();

  /*
   ref limit the section where we have to search data-error: error attribute for autoscroll feature
   scrollToFirstError handles the focus of user
  */
  const {ref, scrollToFirstError} = useAutoScroll();

  const {
    isHistory,
    dateTime,
    lastSavedDateTime,
    assessmentId,
    isCompleted,
    versionNumber,
    assessmentStatus,
    careAgentId,
  } = useAppSelector((state: any) => state.assessments);

  const {seniorDetail} = useAppSelector((state: any) => state.common);

  // getting careAgentName from careAgentInfo
  const allCareAgentAccounts = useAppSelector(
    (state: any) => state.careAgentAccount.allCareAgentAccounts,
  );

  const careAgentName = React.useMemo(() => {
    const careAgentInfo = allCareAgentAccounts?.filter(
      (allCareAgentAccount: any) => allCareAgentAccount.userId === careAgentId,
    )[0];
    return getCareAgentName(careAgentInfo);
  }, [allCareAgentAccounts, careAgentId]);

  const surveys: any = useAppSelector(
    (state: any) => state.assessments.surveys,
  );
  const historyTableData = useAppSelector(
    (state: any) => state.assessments.history.data,
  );

  //autoSave timeout value in milli-seconds
  const autoSaveTimeOut = useAppSelector(
    (state: any) => state.config.autoSaveTimeOut,
  );

  const [formError, setFormError] = React.useState(false);
  const [surveyState, setSurveyState] = React.useState<
    IKatzADLAssessmentSurveyData[]
  >([]);
  const surveyCount: number = React.useMemo(() => {
    let count: number = 0;
    surveyState?.forEach((item: IKatzADLAssessmentSurveyData) => {
      item?.options?.forEach((option: any) => {
        count += option.value * option.score;
      });
    });
    return count;
  }, [surveyState]);

  const {onChangeAutoSave, resetAutoSave} = useAutoSave({
    onSave: (isUnMount?: boolean) =>
      handleSaveSubmit(AssessmentStatus.Save, true, isUnMount),
    timeOut: autoSaveTimeOut,
  });

  //check whether assessment updated or not
  const isAssessmentDataUpdated = React.useMemo(() => {
    // comparing the current form data with last saved data
    return JSON.stringify(surveyState) !== JSON.stringify(surveys);
  }, [surveyState, surveys]);

  /**
   * @function handleSaveSubmit
   * @description on click assessment action buttons
   */
  const handleSaveSubmit = (
    type: AssessmentStatus,
    isAutoSave: boolean = false,
    isUnMount: boolean = false,
    historyData?: any,
  ) => {
    setFormError(false);
    const assessmentData: IPostKatzActionParams = {
      survey: [...surveyState],
      type: type,
      totalScore: surveyCount,
      versionNumber: versionNumber,
      isAutoSave: isAutoSave,
      isUnMount: isUnMount,
      historyData: historyData,
      seniorID,
      assessmentId,
    };

    if (type === AssessmentStatus.Submit) {
      if (!checkIfFormFilled()) {
        dispatch(toggleIncompleteTag(false));
        setFormError(true);
        //scrollToFirstError handles to move the focus of user to the first error after hitting submit
        scrollToFirstError();
      } else {
        dispatch(postKatzAssessment(assessmentData));
      }
    } else {
      // save the assessment only if the assessment is updated
      if (isAssessmentDataUpdated) {
        dispatch(postKatzAssessment(assessmentData));
      }
    }
  };

  /**
   * @function handleReset
   * @description function to handle the reset button
   */
  const handleReset = (): void => {
    const boldMessage = `Are you sure you want to RESET this assessment?`;
    const secondMessage = `Resetting will remove all your current entries.`;
    const successButtonText = AssessmentStatus.OK;

    const assessmentData: any = {
      survey: [...surveyState],
      type: AssessmentStatus.Reset,
      totalScore: surveyCount,
      versionNumber: versionNumber,
      isAutoSave: false,
      seniorID,
      assessmentId,
    };

    const openDialogProp = {
      boldMessage,
      secondMessage,
      successButtonText,
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        if (assessmentStatus === AssessmentStatus.Save) {
          dispatch(postKatzAssessment(assessmentData));
        } else {
          dispatch(
            openOverlayDialog({
              type: DIALOG_TYPES.SUCCESS,
              firstMessage:
                'Katz-Index of Independence assessment has been reset successfully ',
            }),
          );
          setSurveyState(surveys);
          dispatch(toggleIncompleteTag(true));
        }
        setFormError(false);
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  /**
   * @function handleClose
   * @description function to handle the close button
   */
  const handleClose = (): void => {
    dispatch(toggleKatzAssessmentViewState(false, ''));
    dispatch(getKatzAssessment());
  };

  /**
   * @function checkIfFormFilled
   * @description function to check whether form is filled or not
   */
  const checkIfFormFilled = () => {
    let isError = false;

    isError = surveyState?.some((dataArr: any) => {
      return dataArr?.options?.every((option: any) => {
        return option.score === 0;
      });
    });
    return !isError;
  };

  const surveyStateData = React.useMemo(() => {
    return Object.entries(surveyState).map(([key, value]) => {
      return {
        surveyName: key,
        surveyData: value,
      };
    });
  }, [surveyState, surveyCount]);

  //<-- Print related Changes Start -->//
  // Create metaData using Model
  const metaData = React.useMemo(() => {
    const katzMetaData = new AssessmentMetaDataModel(
      constructName(
        seniorDetail?.minimalInfo?.name?.first_name,
        seniorDetail?.minimalInfo?.name?.middle_name,
        seniorDetail?.minimalInfo?.name?.last_name,
      ),
      seniorDetail?.basicInfo?.preferred_name,
      seniorDetail?.minimalInfo?.account_id,
      `${getAge(seniorDetail?.minimalInfo?.dob)}`,
      seniorDetail?.minimalInfo?.gender,
      dateTime || lastSavedDateTime,
      careAgentName,
      assessmentStatus,
    );
    return katzMetaData;
  }, [
    seniorDetail,
    lastSavedDateTime,
    dateTime,
    assessmentStatus,
    careAgentName,
  ]);

  // Pass type, metaData & templateData to usePrint Hook
  usePrint({
    type: PrintTemplates.KATZ,
    meta: metaData,
    data: surveyStateData,
  });

  // getting care agent info
  React.useEffect(() => {
    if (careAgentId) {
      dispatch(getCareAgents('', Array(`${careAgentId}`)));
    }
  }, [dispatch, careAgentId]);

  //<-- Print related Changes End -->//

  /**
   * @description Reset the form on component unmount
   */
  React.useEffect(() => {
    dispatch(getKatzAssessment());
    return () => {
      dispatch({type: RESET_ASSESSMENT});
    };
  }, []);

  /**
   * @description toggle incomplete tag on state change
   */
  React.useEffect(() => {
    const isFormFilled = checkIfFormFilled();
    if (assessmentId) {
      dispatch(toggleIncompleteTag(isFormFilled));
    }
  }, [surveyState]);

  /**
   * @description update the react state with latest data feched from api
   */
  React.useEffect(() => {
    if (surveys && surveys.length > 0) {
      setSurveyState(surveys);
    }
  }, [surveys]);

  return (
    <AssessmentWrapper
      dateTime={
        (isHistory || assessmentStatus === AssessmentStatus.Save) && dateTime
      }
      version={{
        isDraft: assessmentStatus === AssessmentStatus.Save,
      }}
      isIncomplete={!isCompleted && !isHistory}
      heading='Katz Index of Independence in ADL'
      infoText='INDEPENDENCE: 1 Point = NO supervision, direction or personal
      assistance. DEPENDENCE: 0 points = WITH supervision, direction,
      personal assistance or total care.'>
      <Box data-testid='KatzAssessmentComponent' mt={2} ref={ref}>
        {surveys &&
          surveyState.map((item: IKatzADLAssessmentSurveyData) => {
            return (
              <KatzAssessmentTable
                key={item.title}
                label={item.title}
                tableData={item.options}
                setTableData={(data: any) => {
                  // call onChangeAutoSave
                  onChangeAutoSave();
                  setSurveyState(data);
                }}
                surveyState={surveyState}
                formError={formError}
                isHistory={isHistory}
              />
            );
          })}

        <ScoreTable surveyCount={surveyCount} />
        <Box display='flex' justifyContent='left' pt={1}>
          <InfoOutlinedIcon
            style={{margin: '1px 5px 0 0', width: '18px', height: '18px'}}
          />
          <Typography paragraph={true} className={classes.note}>
            6 Points=Patient Independent, 0-5 Dependent
          </Typography>
        </Box>
        <AssessmentActionButtons
          isHistory={isHistory}
          handleClose={handleClose}
          handleReset={() => {
            handleReset();
            //call resetAutoSave
            resetAutoSave();
          }}
          handleSaveSubmit={(value: AssessmentStatus) => {
            handleSaveSubmit(value);
            //call resetAutoSave
            resetAutoSave();
          }}
        />
        <KatzAssessmentHistoryTable
          historyTableData={historyTableData}
          handleSaveSubmit={(
            type: AssessmentStatus,
            isAutoSave: boolean,
            isUnMount: boolean,
            history: any,
          ) => {
            handleSaveSubmit(type, isAutoSave, isUnMount, history);
            //call resetAutoSave
            resetAutoSave();
          }}
          isAssessmentDataUpdated={isAssessmentDataUpdated}
        />
      </Box>
    </AssessmentWrapper>
  );
};

const KatzAssessmentHistoryTable = React.memo(
  ({
    historyTableData,
    handleSaveSubmit,
    isAssessmentDataUpdated,
  }: IKatzAssessmentHistoryTableProps) => {
    const dispatch: any = useAppDispatch();
    const actionCreatorProps: IAssementHistoryActionCreators = {
      getAssessment: GET_ASSESSMENT,
      getData: getKatzAssessmentHistory,
      success: getKatzAssessmentHistorySuccess,
      error: getKatzAssessmentHistoryFail,
      pageChange: updateKatzAssessmentHistoryPageNumber,
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
      if (isAssessmentDataUpdated) {
        handleSaveSubmit(AssessmentStatus.Save, true, false, history);
      } else {
        const dateTime = `${history.date} ${history.time}`;
        dispatch(toggleKatzAssessmentViewState(true, dateTime));
        dispatch({
          type: GET_ASSESSMENT,
          payload: {
            surveys: mapKatzFormData(history.formData),
            dateTime: dateTime,
            assessmentId: history.assessmentId,
            assessmentStatus: 'submit',
            careAgentId: history.careAgentId,
          },
        });
      }
    };
    return (
      <AssessmentHistory
        tableLabel='Previous Katz Index of Independence in ADL'
        tableData={historyTableData}
        columnProps={[
          {label: 'Date', value: 'date'},
          {label: 'Time', value: 'time'},
          {label: 'Total Score', value: 'totalScore'},
          {label: 'Agent Name', value: 'careAgentName'},
        ]}
        onClickViewHistory={onClickViewHistory}
        actionCreators={actionCreatorProps}
        paginationProps={historyTablePaginationProps}
      />
    );
  },
);
export default KatzAssessment;
