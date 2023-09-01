import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {AssessmentStatus, PreviewTemplates} from 'globals/enums';
import AssessmentHistoryComponent from '../AssessmentHistory.component';
import {
  IAssementHistoryActionCreators,
  IHistoryTablePaginationProps,
} from '../AssessmentHistory.type';
import AssessmentWrapper from '../AssessmentWrapper';
import {
  IMedicalConditionData,
  IMedicalConditionProps,
} from './MedicalCondition.types';
import MedicalConditionSection from './MedicalConditionSection';
import {GET_ASSESSMENT, RESET_ASSESSMENT} from '../Assessments.action';
import {
  getMedicalConditionHistory,
  getMedicalConditionHistoryFail,
  getMedicalConditionHistorySuccess,
  submitMedicalCondition,
  updateMedicalConditionHistoryPageNumber,
} from './MedicalCondition.action';
import usePreview from 'common/Preview/usePreview';
import {
  constructName,
  getAge,
  getCurrentSenior,
} from 'globals/global.functions';
import MedicalMetaDataModel from 'common/Print/models/AssessmentMetaDataModel';
import {getCareAgentName} from 'common/Print/Print.utility';
import {getCareAgents} from 'pages/WCPages/Admin/Accounts/AgentAccount/CareAgentAccount.actions';

const MedicalCondition = ({heading}: IMedicalConditionProps) => {
  const {
    dateTime,
    assessmentId,
    isHistory,
    assessmentStatus,
    isCompleted,
    versionNumber,
    careAgentId,
  } = useAppSelector((state: any) => state.assessments);
  const {seniorID} = getCurrentSenior();
  const currentCareAgentName = useAppSelector(
    (state: any) => state.auth.userName,
  );
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
  const {seniorDetail} = useAppSelector((state: any) => state.common);
  const historyTableData = useAppSelector(
    (state: any) => state.assessments.history.data,
  );
  const savedMedicalConditionData: IMedicalConditionData[] = useAppSelector(
    (state: any) => state.assessments.surveys,
  );
  const dispatch: any = useAppDispatch();
  const [formError, setFormError] = React.useState(false);
  const [medicalConditionData, setMedicalConditionData] = React.useState<
    IMedicalConditionData[]
  >([]);
  const [deletedMedicalConditions, setDeletedMedicalConditions] =
    React.useState<IMedicalConditionData[]>([]);
  const [modifiedMedicalConditions, setModifiedMedicalConditions] =
    React.useState<string[]>([]);

  const actionCreatorProps: IAssementHistoryActionCreators = {
    getAssessment: GET_ASSESSMENT,
    getData: getMedicalConditionHistory,
    success: getMedicalConditionHistorySuccess,
    error: getMedicalConditionHistoryFail,
    pageChange: updateMedicalConditionHistoryPageNumber,
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
    dispatch(
      submitMedicalCondition({
        type: AssessmentStatus.Save,
        isAutoSave: true,
        data: medicalConditionData,
        modifiedData: modifiedMedicalConditions,
        deletedData: deletedMedicalConditions,
        formError: formError,
        historyData: history,
        isAssessmentDataUpdated: isAssessmentDataUpdated,
        assessmentId,
        seniorID,
        careAgentName: currentCareAgentName,
      }),
    );
    setModifiedMedicalConditions([]);
    setDeletedMedicalConditions([]);
  };

  const isAssessmentDataUpdated = React.useMemo(() => {
    // comparing the current form data with last saved data
    return (
      modifiedMedicalConditions.length > 0 ||
      deletedMedicalConditions.length > 0 ||
      medicalConditionData.some(
        (medicalCondition) => !medicalCondition.modification_date,
      ) // checking for newly added conditions that are not yet saved
    );
  }, [
    modifiedMedicalConditions,
    deletedMedicalConditions,
    medicalConditionData,
  ]);

  //<-- Print related Changes Start -->//
  // Create metaData using Model
  const metaData = React.useMemo(() => {
    const medicalMetaData = new MedicalMetaDataModel(
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
      '',
      versionNumber,
    );
    return medicalMetaData;
  }, [seniorDetail, dateTime, assessmentStatus, careAgentName]);

  // Pass type, metaData & templateData to usePreview Hook
  usePreview({
    type: PreviewTemplates.MEDICAL_CONDITION,
    meta: metaData,
    data: medicalConditionData,
  });
  //<-- Print related Changes End -->//

  React.useEffect(() => {
    return () => {
      dispatch({type: RESET_ASSESSMENT});
    };
  }, []);

  React.useEffect(() => {
    setMedicalConditionData(
      savedMedicalConditionData?.length > 0 ? savedMedicalConditionData : [],
    );
  }, [savedMedicalConditionData]);

  // getting care agent info
  React.useEffect(() => {
    if (careAgentId) {
      dispatch(getCareAgents('', Array(`${careAgentId}`)));
    }
  }, [dispatch, careAgentId]);

  return (
    <AssessmentWrapper
      data-testid='medicalConditionAssessmentComponent'
      heading={heading}
      isIncomplete={!isCompleted && !isHistory}
      dateTime={
        assessmentStatus === AssessmentStatus.Save || isHistory ? dateTime : ''
      }
      version={{
        number: versionNumber,
        isDraft: assessmentStatus === AssessmentStatus.Save,
      }}
      showDivider={true}>
      <>
        <MedicalConditionSection
          setFormError={setFormError}
          formError={formError}
          medicalConditionData={medicalConditionData}
          setMedicalConditionData={setMedicalConditionData}
          deletedMedicalConditions={deletedMedicalConditions}
          setDeletedMedicalConditions={setDeletedMedicalConditions}
          modifiedMedicalConditions={modifiedMedicalConditions}
          setModifiedMedicalConditions={setModifiedMedicalConditions}
          isAssessmentDataUpdated={isAssessmentDataUpdated}
        />
        <AssessmentHistoryComponent
          tableLabel='Previous Medical Condition-Disease Assessments'
          tableData={historyTableData}
          columnProps={[
            {label: 'Date', value: 'date'},
            {label: 'Time', value: 'time'},
            {
              label: 'Version',
              value: 'version',
            },
            {label: 'Changed By', value: 'wellnessCoachName'},
          ]}
          onClickViewHistory={onClickViewHistory}
          actionCreators={actionCreatorProps}
          paginationProps={historyTablePaginationProps}
        />
      </>
    </AssessmentWrapper>
  );
};
export default MedicalCondition;
