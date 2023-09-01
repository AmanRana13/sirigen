import React from 'react';

import {formData} from './WellnessSurveyData';
import {RESET_ASSESSMENT} from '../Assessments.action';
import {getWellnessSurvey, toggleIncompleteTag} from './WellnessSurvey.action';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {AssessmentStatus} from 'globals/enums';
import {IWellnessSurveyProps} from './WellnessSurvey.type';

export interface IUseSetWellbiengSurveyReturn extends IWellnessSurveyProps {
  isHistory: boolean;
  dateTime: any;
  isCompleted: boolean;
  assessmentStatus: AssessmentStatus;
}

const useSetWellbiengSurvey = (): IUseSetWellbiengSurveyReturn => {
  const dispatch: any = useAppDispatch();
  const [surveyState, setSurveyState] = React.useState({});

  const {isHistory, dateTime, isCompleted, assessmentStatus, assessmentId} =
    useAppSelector((state: any) => state.assessments);

  const survey = useAppSelector((state: any) => state.assessments.surveys);

  const accountCreatedDate = useAppSelector(
    (state: any) => state?.common?.seniorDetail?.minimalInfo?.created_date,
  );

  //map survey data with key value pair
  const surveyStateData = React.useMemo(() => {
    return (
      surveyState &&
      Object.entries(surveyState).map(([key, value]) => {
        return {
          questionTitle: key,
          surveyData: value,
        };
      })
    );
  }, [surveyState]);

  // calculating the score of the survey
  const surveyCount: number = React.useMemo(() => {
    let count: number = 0;
    surveyStateData?.forEach((item: any) => {
      const selectedOption: any = formData(item.questionTitle)?.options.filter(
        (option: any) => option.value === item.surveyData.measurement_name,
      )[0];
      count += selectedOption?.score || 0;
      return count;
    });
    return count;
  }, [surveyStateData]);

  //To check form is completly filled or not
  const checkIfFormFilled = () => {
    let isError = false;
    const negativeResponse = surveyStateData?.filter(
      (item: any) => item.surveyData.value,
    );

    isError = surveyStateData?.some(
      (dataArr: any) => !dataArr.surveyData.measurement_name,
    );
    return (
      !isError &&
      surveyCount === surveyStateData?.length - negativeResponse?.length
    );
  };

  //update the local state on the change of redux state
  React.useEffect(() => {
    setSurveyState(survey);
  }, [survey]);

  /**
   * @description toggle incomplete tag on state change
   */
  React.useEffect(() => {
    const isFormFilled = checkIfFormFilled();
    if (assessmentId) {
      dispatch(toggleIncompleteTag(isFormFilled));
    }
  }, [surveyState]);

  //Reset assessment on unmount
  React.useEffect(() => {
    return () => {
      dispatch({type: RESET_ASSESSMENT});
    };
  }, []);

  //dispatch get action if we have accountCreated date
  React.useEffect(() => {
    if (accountCreatedDate) {
      dispatch(getWellnessSurvey());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountCreatedDate]);

  return {
    isHistory,
    dateTime,
    isCompleted,
    assessmentStatus,
    survey,
    surveyState,
    setSurveyState,
    checkIfFormFilled,
    surveyStateData,
    surveyCount,
  };
};

export default useSetWellbiengSurvey;
