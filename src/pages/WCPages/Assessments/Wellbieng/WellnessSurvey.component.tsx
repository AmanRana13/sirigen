/* eslint-disable max-len */
import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box, Typography} from '@mui/material';

import {DIALOG_TYPES} from 'globals/global.constants';

import useAutoSave from 'hooks/useAutoSave';
import useAutoScroll from 'hooks/useAutoScroll';
import {AssessmentStatus} from 'globals/enums';
import {constructName, getCurrentSenior} from 'globals/global.functions';
import {openDialog, openOverlayDialog} from 'store/commonReducer/common.action';

import {GET_ASSESSMENT, TOGGLE_IS_COMPLETED} from '../Assessments.action';
import {
  getAssessmentHistoryFail,
  getAssessmentHistorySuccess,
  getWellnessSurvey,
  getWellnessSurveyHistory,
  postWellnessSurvey,
  toggleIncompleteTag,
  toggleWellnessSurveyViewState,
  updateAssessmentHistoryPageNumber,
} from './WellnessSurvey.action';
import WellnessSurveyTable from './WellnessSurveyTable';
import {
  IPostWellnessSurvey,
  IWellnessSurveyHistoryTableProps,
  IWellnessSurveyProps,
} from './WellnessSurvey.type';
import {wellnessSurveyStyle} from './WellnessSurvey.style';
import AssessmentHistory from '../AssessmentHistory.component';
import {IAssementHistoryActionCreators} from '../AssessmentHistory.type';
import {AssessmentActionButtons} from '../AssessmentActionButtons.component';
import {getCareAgents} from 'pages/WCPages/Admin/Accounts/AgentAccount/CareAgentAccount.actions';

const WellnessSurvey = ({
  survey,
  surveyState,
  setSurveyState,
  checkIfFormFilled,
  surveyStateData,
  surveyCount,
}: IWellnessSurveyProps) => {
  const dispatch: any = useAppDispatch();
  const {classes} = wellnessSurveyStyle();
  const {seniorID, accountID} = getCurrentSenior();

  const {isHistory, assessmentId, versionNumber, assessmentStatus} =
    useAppSelector((state: any) => state.assessments);

  const historyTableData = useAppSelector(
    (state: any) => state.assessments.history.data,
  );

  const autoSaveTimeOut = useAppSelector(
    (state: any) => state.config.autoSaveTimeOut,
  );

  const [formError, setFormError] = React.useState(false);

  const {onChangeAutoSave, resetAutoSave} = useAutoSave({
    onSave: (isUnMount?: boolean) =>
      handleSaveSubmit(AssessmentStatus.Save, true, isUnMount),
    timeOut: autoSaveTimeOut,
  });

  /*
   ref limit the section where we have to search data-error: error attribute for autoscroll feature
   scrollToFirstError handles the focus of user
  */
  const {ref, scrollToFirstError} = useAutoScroll();

  /**
   * @function handleSaveSubmit
   * @description to handle save and submit action
   * @param type
   * @param isAutoSave
   * @param isUnMount
   * @param historyData
   * @returns
   */
  const handleSaveSubmit = (
    type: AssessmentStatus,
    isAutoSave: boolean = false,
    isUnMount: boolean = false,
    historyData?: any,
  ) => {
    setFormError(false);
    const param: IPostWellnessSurvey = {
      data: surveyState,
      type: type,
      versionNumber: versionNumber,
      isAutoSave: isAutoSave,
      isUnMount: isUnMount,
      historyData: historyData,
      assessmentId,
      accountID,
      seniorID,
    };

    if (type === AssessmentStatus.Submit) {
      if (!checkIfFormFilled()) {
        dispatch({
          type: TOGGLE_IS_COMPLETED,
          payload: {isCompleted: false},
        });
        setFormError(true);
        scrollToFirstError();
      } else {
        dispatch(postWellnessSurvey(param));
        setSurveyState(survey);
      }
    } else {
      //save the assessment only if assessment was updated
      if (isAssessmentDataUpdated) {
        dispatch(postWellnessSurvey(param));
      }
    }
  };

  const handleReset = (): void => {
    const assessmentData: IPostWellnessSurvey = {
      data: surveyState,
      type: AssessmentStatus.Reset,
      versionNumber: versionNumber,
      assessmentId,
      accountID,
      seniorID,
    };
    const openDialogProp = {
      boldMessage: `Are you sure you want to RESET this assessment?`,
      secondMessage: `Resetting will remove all your current entries.`,
      successButtonText: AssessmentStatus.OK,
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        // hit the API only if the form is saved otherwise reset the form on the frontend side
        if (assessmentStatus === AssessmentStatus.Save) {
          dispatch(postWellnessSurvey(assessmentData));
        } else {
          dispatch(
            openOverlayDialog({
              type: DIALOG_TYPES.SUCCESS,
              firstMessage: 'Wellness Survey has been reset successfully ',
            }),
          );
          setSurveyState(survey);
          dispatch(toggleIncompleteTag(true));
        }
        setFormError(false);
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };
  const handleClose = () => {
    dispatch(toggleWellnessSurveyViewState(false, ''));
    dispatch(getWellnessSurvey());
  };

  //get careagent details on change of history data to get careagent name
  React.useEffect(() => {
    const careAgentIds = historyTableData?.map((item: any) => item.careAgentId);
    dispatch(getCareAgents('', Array.from(new Set(careAgentIds))));
  }, [historyTableData]);

  const isAssessmentDataUpdated = React.useMemo(() => {
    // comparing the current form data with last saved data
    return JSON.stringify(survey) !== JSON.stringify(surveyState);
  }, [survey, surveyState]);

  return (
    <>
      <Box className={classes.info} data-testid='wellnessSurveyComponent'>
        <Typography variant='body1'>
          Please provide a response for each question below. Each question below
          as two options (for example: relaxed or calm) so only one response is
          required. Additional, if the response on the right is selected,
          provide the level (low, medium, or high) response as well.
        </Typography>
      </Box>
      <Box data-testid='wellnessSurveyTable' mt={2} ref={ref}>
        <Typography variant='h6'>
          Is the senior?
          <Box component='span' className={classes.errorText}>
            *
          </Box>
        </Typography>
        {surveyStateData?.map((item: any, index: number) => {
          return (
            <WellnessSurveyTable
              key={item.questionTitle}
              index={index + 1}
              questionTitle={item.questionTitle}
              surveyData={item.surveyData}
              setTableData={(data: any) => {
                setSurveyState(data);
                // call onChangeAutoSave
                onChangeAutoSave();
              }}
              disabled={isHistory}
              formError={formError}
            />
          );
        })}

        <Box className={classes.scoreTable} data-testid='wellnessSurveyScore'>
          <Typography variant='h6'>Wellness Score: </Typography>

          <span style={{color: '#000', paddingLeft: 5}}>
            {' '}
            <Typography variant='h6'>{surveyCount} </Typography>
          </span>
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
        <WellnessSurveyHistoryTable
          historyTableData={historyTableData}
          handleSaveSubmit={(
            type: AssessmentStatus,
            isAutoSave: boolean,
            isUnMount: boolean,
            historyData: any,
          ) => {
            handleSaveSubmit(type, isAutoSave, isUnMount, historyData);
            //call resetAutoSave
            resetAutoSave();
          }}
          isAssessmentDataUpdated={isAssessmentDataUpdated}
        />
      </Box>
    </>
  );
};

const WellnessSurveyHistoryTable = React.memo(
  ({
    historyTableData,
    handleSaveSubmit,
    isAssessmentDataUpdated,
  }: IWellnessSurveyHistoryTableProps) => {
    const dispatch: any = useAppDispatch();

    // getting allCareAgentAccounts details from redux
    const allCareAgentAccounts = useAppSelector(
      (state: any) => state.careAgentAccount.allCareAgentAccounts,
    );

    const actionCreatorProps: IAssementHistoryActionCreators = {
      getAssessment: GET_ASSESSMENT,
      getData: getWellnessSurveyHistory,
      success: getAssessmentHistorySuccess,
      error: getAssessmentHistoryFail,
      pageChange: updateAssessmentHistoryPageNumber,
    };
    const historyTablePaginationProps = {
      lastEvaluatedKeyPath: 'assessments.history.lastEvaluatedKey',
      loadingPath: 'assessments.history.loading',
      pagePath: 'assessments.history.currentPage',
    };

    /**
     * @function calulateWellnessScore
     * @description calculate wellness score
     * @param data
     * @returns
     */
    const calulateWellnessScore = (data: any) => {
      let score = 0;

      const answerKeysArr = Object.keys(data);
      const scoreLimit = answerKeysArr.length;
      answerKeysArr.forEach((dataKey) => {
        if (!data[dataKey]?.value) {
          score += 1;
        }
      });

      return `${score}/${scoreLimit}`;
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
        dispatch(toggleWellnessSurveyViewState(true, dateTime));
        dispatch({
          type: GET_ASSESSMENT,
          payload: {
            surveys: history.surveys,
            dateTime: dateTime,
            careAgentId: history.careAgentId,
            assessmentStatus: 'submit',
            assessmentId: history.assessmentId,
          },
        });
      }
    };

    /**
     * @function careAgentName
     * @description to get careagent name
     * @param id
     * @returns
     */
    const careAgentName = (id: string) => {
      const careAgentInfo = allCareAgentAccounts?.filter(
        (allCareAgentAccount: any) => allCareAgentAccount.userId === id,
      )[0];

      return constructName(
        careAgentInfo?.name?.firstName,
        careAgentInfo?.name?.middleName,
        careAgentInfo?.name?.lastName,
      );
    };

    return (
      <AssessmentHistory
        tableLabel='Previous Wellness Surveys'
        tableData={historyTableData}
        columnProps={[
          {label: 'Date', value: 'date'},
          {label: 'Time', value: 'time'},
          {
            label: 'Wellness Score',
            value: 'wellnessScore',
            method: (history: any) =>
              calulateWellnessScore(history?.surveys || {}),
          },
          {
            label: ' Surveyed By',
            value: 'careAgentId',
            method: (history: any) => careAgentName(history.careAgentId || ''),
          },
        ]}
        onClickViewHistory={onClickViewHistory}
        actionCreators={actionCreatorProps}
        paginationProps={historyTablePaginationProps}
      />
    );
  },
);

export default WellnessSurvey;
