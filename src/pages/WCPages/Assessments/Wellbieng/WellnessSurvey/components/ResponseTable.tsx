import React from 'react';
import {roundOff} from 'globals/global.functions';
import {emotionalSurveyStyle} from '../WellnessSurvey.style';
import {Typography} from '@mui/material';

const NegativeRow = ({value, length}: any) => {
  const {classes} = emotionalSurveyStyle();
  return (
    <td className={classes.negative}>
      {length ? roundOff(((length - value) * 100) / length, 0) : 0}%
    </td>
  );
};
const PositiveRow = ({value, length}: any) => {
  const {classes} = emotionalSurveyStyle();
  return (
    <td className={classes.positive}>
      {length ? roundOff((value / length) * 100, 0) : 0}%
    </td>
  );
};

const ResponseTable = ({data}: any) => {
  const {classes} = emotionalSurveyStyle();
  const bottomRow = React.useMemo(() => {
    const wellnessScore: any = {
      relax: 0,
      happiness: 0,
      energy: 0,
      purpose: 0,
      engagement: 0,
      social: 0,
      comfort: 0,
    };
    if (data) {
      data.forEach((surveyItem: any) => {
        const answerKeysArr = Object.keys(surveyItem.answer);
        answerKeysArr.forEach((dataKey) => {
          if (!surveyItem.answer[dataKey]?.value) {
            wellnessScore[dataKey] += 1;
          }
        });
      });
    }

    return Object.entries(wellnessScore);
  }, [data]);

  return (
    <table
      className={`${classes.table} responseTableRow`}
      data-testid='response-table'>
      <tbody>
        <tr>
          <td>
            <Typography variant='subtitle2'>Negative Response</Typography>
          </td>
          {bottomRow.map((score) => (
            <NegativeRow key={score[0]} value={score[1]} length={data.length} />
          ))}
        </tr>
        <tr>
          <td>
            <Typography variant='subtitle2'>Positive Response</Typography>
          </td>
          {bottomRow.map((score) => (
            <PositiveRow key={score[0]} value={score[1]} length={data.length} />
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default ResponseTable;
