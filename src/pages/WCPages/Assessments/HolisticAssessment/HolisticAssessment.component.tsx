/* eslint-disable max-len */
import React from 'react';
import {startCase} from 'lodash';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box} from '@mui/material';

import {DIALOG_TYPES} from 'globals/global.constants';
import {openDialog, openOverlayDialog} from 'store/commonReducer/common.action';

import AssessmentHistory from '../AssessmentHistory.component';
import HolisticTable from './components/HolisticTable.component';
import CountTable from './components/CountTable.component';
import {
  constructName,
  getAge,
  getCurrentSenior,
} from 'globals/global.functions';

import {
  getHolisticAssessment,
  postHolisticAssessment,
  toggleHolisticAssessmentViewState,
  getAssessmentHistoryFail,
  getAssessmentHistorySuccess,
  getHolisticAssessmentHistory,
  updateAssessmentHistoryPageNumber,
} from './HolisticAssessment.action';
import {
  IHolisticAssessmentProps,
  IHolisticAssessmentSurvey,
  IHolisticAssessmentSurveyCount,
  IHolisticHistoryTableProps,
} from './HolisticAssessment.types';
import {
  IAssementHistoryActionCreators,
  IHistoryData,
} from '../AssessmentHistory.type';
import {mapHolisticFormData} from 'services/assessmentService/holisticAssessment/assessment.service';
import {AssessmentStatus, PrintTemplates} from 'globals/enums';
import {AssessmentActionButtons} from '../AssessmentActionButtons.component';
import AssessmentWrapper from '../AssessmentWrapper';
import {
  GET_ASSESSMENT,
  RESET_ASSESSMENT,
  TOGGLE_IS_COMPLETED,
} from '../Assessments.action';
import HolisticMetaDataModel from 'common/Print/models/AssessmentMetaDataModel';
import useAutoScroll from 'hooks/useAutoScroll';
import useAutoSave from 'hooks/useAutoSave';
import usePrint from 'common/Print/usePrint';
import {getCareAgents} from 'pages/WCPages/Admin/Accounts/AgentAccount/CareAgentAccount.actions';
import {getCareAgentName} from 'common/Print/Print.utility';

const HolisticAssessment = ({heading}: IHolisticAssessmentProps) => {
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

  const careAgentName = React.useMemo(() => {
    const careAgentInfo = allCareAgentAccounts?.filter(
      (allCareAgentAccount: any) => allCareAgentAccount.userId === careAgentId,
    )[0];
    return getCareAgentName(careAgentInfo);
  }, [allCareAgentAccounts, careAgentId]);

  const {userId, userName} = useAppSelector((state: any) => state.auth);

  const surveys: IHolisticAssessmentSurvey = useAppSelector(
    (state: any) => state.assessments.surveys,
  );
  const historyTableData = useAppSelector(
    (state: any) => state.assessments.history.data,
  );
  const {seniorDetail} = useAppSelector((state: any) => state.common);
  const autoSaveTimeOut = useAppSelector(
    (state: any) => state.config.autoSaveTimeOut,
  );

  const [formError, setFormError] = React.useState(false);

  const [surveyState, setSurveyState] =
    React.useState<IHolisticAssessmentSurvey>({});

  const [surveyCount, setSurveyCount] =
    React.useState<IHolisticAssessmentSurveyCount>({});

  const [totalScore, setTotalScore] = React.useState(0);

  const handleSaveSubmit = (
    type: AssessmentStatus,
    isAutoSave: boolean = false,
    isUnMount: boolean = false,
    historyData?: any,
  ) => {
    setFormError(false);
    const assessmentData = {
      survey: {...surveyState},
      type: type,
      surveyCount: {...surveyCount},
      totalScore: totalScore,
      versionNumber: versionNumber,
      isAutoSave: isAutoSave,
      isUnMount: isUnMount,
      historyData: historyData,
      seniorID,
      assessmentId,
      careAgentId: userId,
      careAgentName: userName,
    };
    if (type == AssessmentStatus.Submit) {
      if (!checkIfFormFilled()) {
        dispatch({
          type: TOGGLE_IS_COMPLETED,
          payload: {isCompleted: false},
        });
        setFormError(true);
        scrollToFirstError();
        return;
      } else {
        dispatch(postHolisticAssessment(assessmentData));
      }
    } else {
      // save the assessment only if assessment was updated
      if (isAssessmentDataUpdated) {
        dispatch(postHolisticAssessment(assessmentData));
      }
    }
  };

  const handleReset = (): void => {
    const assessmentData = {
      survey: {...surveyState},
      type: AssessmentStatus.Reset,
      surveyCount: {...surveyCount},
      totalScore: totalScore,
      versionNumber: versionNumber,
      seniorID,
      assessmentId,
      careAgentId: userId,
      careAgentName: userName,
    };
    const openDialogProp = {
      boldMessage: `Are you sure you want to Reset the Assessment?`,
      secondMessage: `Reseting will erase all the data that has been entered.`,
      successButtonText: AssessmentStatus.OK,
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        // hit the API only if the form is saved otherwise reset the form on the frontend side
        if (assessmentStatus === AssessmentStatus.Save) {
          dispatch(postHolisticAssessment(assessmentData));
        } else {
          dispatch(
            openOverlayDialog({
              type: DIALOG_TYPES.SUCCESS,
              firstMessage: 'Holistic assessment has been reset successfully ',
            }),
          );
          setSurveyState(surveys);
          dispatch({
            type: TOGGLE_IS_COMPLETED,
            payload: {isCompleted: true},
          });
        }
        setFormError(false);
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  const handleClose = () => {
    setSurveyCount({});
    dispatch(toggleHolisticAssessmentViewState(false, ''));
    dispatch(getHolisticAssessment());
  };
  const checkIfFormFilled = () => {
    let isError = false;

    isError =
      surveys &&
      Object.values(surveyState).some((dataArr) => {
        return dataArr.some(
          (val: any) => val.never == 0 && val.sometimes == 0 && val.always == 0,
        );
      });
    return !isError;
  };

  const {onChangeAutoSave, resetAutoSave} = useAutoSave({
    onSave: (isUnMount?: boolean) =>
      handleSaveSubmit(AssessmentStatus.Save, true, isUnMount),
    timeOut: autoSaveTimeOut,
  });

  const surveyStateData = React.useMemo(() => {
    return (
      surveys &&
      Object.entries(surveyState).map(([key, value]) => {
        return {
          surveyName: key,
          surveyData: value,
        };
      })
    );
  }, [surveyState, surveyCount]);

  //<-- Print related Changes Start -->//
  // Create metaData using Model
  const metaData = React.useMemo(() => {
    const holisticMetaData = new HolisticMetaDataModel(
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
    );
    return holisticMetaData;
  }, [seniorDetail, dateTime, assessmentStatus, careAgentName]);
  // Pass type, metaData & templateData to usePrint Hook
  usePrint({
    type: PrintTemplates.HOLISTIC,
    meta: metaData,
    data: surveyStateData,
  });
  //<-- Print related Changes End -->//

  const isAssessmentDataUpdated = React.useMemo(() => {
    // comparing the current form data with last saved data
    return JSON.stringify(surveys) !== JSON.stringify(surveyState);
  }, [surveys, surveyState]);

  React.useEffect(() => {
    dispatch(getHolisticAssessment());
    return () => {
      dispatch({type: RESET_ASSESSMENT});
    };
  }, []);

  React.useEffect(() => {
    const score = Object.values(surveyCount).reduce(
      (prevSectionScore, nextSectionScore) => {
        return prevSectionScore + nextSectionScore;
      },
      0,
    );

    setTotalScore(score);
  }, [surveyCount]);

  React.useEffect(() => {
    const isFormFilled = checkIfFormFilled();
    if (assessmentId) {
      dispatch({
        type: TOGGLE_IS_COMPLETED,
        payload: {isCompleted: isFormFilled},
      });
    }
  }, [surveyState]);

  React.useEffect(() => {
    if (surveys && Object.keys(surveys).length > 0) {
      setSurveyState(surveys);
    }
  }, [surveys]);

  // getting care agent info
  React.useEffect(() => {
    if (careAgentId) {
      dispatch(getCareAgents('', Array(`${careAgentId}`)));
    }
  }, [dispatch, careAgentId]);

  return (
    <AssessmentWrapper
      heading={heading}
      isIncomplete={!isCompleted && !isHistory}
      dateTime={
        (isHistory || assessmentStatus === AssessmentStatus.Save) && dateTime
      }
      version={{
        isDraft: assessmentStatus === AssessmentStatus.Save,
      }}>
      <Box data-testid='holisticAssessmentComponent' mt={2} ref={ref}>
        {surveys &&
          surveyStateData?.map((item) => {
            return (
              <HolisticTable
                key={item.surveyName}
                holisticKey={item.surveyName}
                label={startCase(item.surveyName)}
                count={surveyCount}
                setCount={setSurveyCount}
                tableData={item.surveyData}
                setTableData={(data: any) => {
                  setSurveyState(data);
                  onChangeAutoSave();
                }}
                formError={formError}
                isHistory={isHistory}
              />
            );
          })}

        <CountTable surveyCount={surveyCount} totalScore={totalScore} />
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
        />
        <HolisticAssessmentHistoryTable
          historyTableData={historyTableData}
          setSurveyCount={setSurveyCount}
          handleSaveSubmit={(
            type: AssessmentStatus,
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
    </AssessmentWrapper>
  );
};

const HolisticAssessmentHistoryTable = React.memo(
  ({
    historyTableData,
    setSurveyCount,
    handleSaveSubmit,
    resetAutoSave,
    isAssessmentDataUpdated,
  }: IHolisticHistoryTableProps) => {
    const dispatch: any = useAppDispatch();
    const actionCreatorProps: IAssementHistoryActionCreators = {
      getAssessment: GET_ASSESSMENT,
      getData: getHolisticAssessmentHistory,
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
     * @function onClickViewHistory
     * @param history
     * @description to view the previously submitted assessment
     */
    const onClickViewHistory = (history: IHistoryData) => {
      if (isAssessmentDataUpdated) {
        handleSaveSubmit(AssessmentStatus.Save, true, false, history);
      } else {
        const dateTime = `${history.date} ${history.time}`;

        dispatch(toggleHolisticAssessmentViewState(true, dateTime));
        dispatch({
          type: GET_ASSESSMENT,
          payload: {
            surveys: mapHolisticFormData(history.formData),
            dateTime: dateTime,
            careAgentId: history.careAgentId,
            assessmentStatus: 'submit',
            assessmentId: history.assessmentId,
          },
        });
      }
      resetAutoSave();
      setSurveyCount({});
    };

    return (
      <AssessmentHistory
        tableLabel='Previous Holistic Assessments'
        tableData={historyTableData}
        columnProps={[
          {label: 'Date', value: 'date'},
          {label: 'Time', value: 'time'},
          {label: 'Total Score', value: 'totalScore'},
        ]}
        onClickViewHistory={onClickViewHistory}
        actionCreators={actionCreatorProps}
        paginationProps={historyTablePaginationProps}
      />
    );
  },
);

export default HolisticAssessment;
