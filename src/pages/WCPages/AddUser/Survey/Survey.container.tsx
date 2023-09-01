import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {SurveyComponent} from './Survey.component';
import {saveSurveyInfo, fetchSurvey, fetchDiseases} from './Survey.action';

const SurveyContainer = (props: any) => {
  const [surveyInfo, setSurveyInfo] = useState(null);

  useEffect(() => {
    props.fetchSurvey().then((res: any) => {
      setSurveyInfo(res);
    });
    props.fetchDiseases('a');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <SurveyComponent surveyInfo={surveyInfo} {...props} />;
};

const Survey = connect(null, {
  saveSurveyInfo,
  fetchSurvey,
  fetchDiseases,
})(SurveyContainer);
export default Survey;
