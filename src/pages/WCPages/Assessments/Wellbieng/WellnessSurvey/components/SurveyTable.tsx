import React from 'react';
import clsx from 'clsx';
import moment from 'moment-timezone';
import {Box, Tooltip, Typography} from '@mui/material';
import {emotionalSurveyStyle} from '../WellnessSurvey.style';
import {ReactComponent as CommentIcon} from 'assets/icons/Comment.svg';
import {DATE_FORMAT} from 'globals/global.constants';
import {capitalizeFirstLetter} from 'globals/global.functions';

const Heading = ({head1, head2}: any) => (
  <th>
    <Box p={1}>
      {head1}
      <span>
        <Typography variant='body1'>- or -</Typography>
      </span>
      {head2}
    </Box>
  </th>
);

const Row = React.memo(
  ({value, comment, positiveTitle, negativeTitle}: any) => {
    const {classes} = emotionalSurveyStyle();

    return (
      <td
        className={clsx({
          [classes.positive]: !value,
          [classes.negative]: value,
        })}>
        <Typography variant='subtitle1'>
          {value ? negativeTitle : positiveTitle}
        </Typography>

        {value && (
          <Typography variant='subtitle1'>
            ({capitalizeFirstLetter(value)})
          </Typography>
        )}
        {comment && <Comments value={comment} />}
      </td>
    );
  },
);

const Comments = React.memo(({value}: any) => {
  const {classes} = emotionalSurveyStyle();
  return (
    <Tooltip
      classes={{
        tooltip: classes.tooltip,
        arrow: classes.customArrow,
      }}
      arrow
      PopperProps={{
        disablePortal: true,
      }}
      placement='right'
      title={
        <Box
          p={0.5}
          minWidth={200}
          display='flex'
          flexDirection='column'
          textAlign='left'>
          <Box mb={1}>
            <Typography variant='h5'>Comments</Typography>
          </Box>
          <Typography variant='body1'>{value}</Typography>
        </Box>
      }>
      <CommentIcon className={classes.commentIcon} />
    </Tooltip>
  );
});

const SurveyTable = ({data}: any) => {
  const {classes} = emotionalSurveyStyle();

  return (
    <Box>
      <table className={classes.table} data-testid='survey-table'>
        <thead>
          <tr>
            <th>Time Stamp</th>
            <Heading head1='Relaxed' head2='Stressed' />
            <Heading head1='Happy' head2='Sad' />
            <Heading head1='Rested' head2='Tired' />
            <Heading head1='Purpose' head2='No Purpose' />
            <Heading head1='Busy' head2='Bored' />
            <Heading head1='Social' head2='Lonely' />
            <Heading head1='Pain Free' head2='Pain' />
            <th>
              Wellness
              <br />
              Score
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.map((surveyData: any) => (
            <tr key={surveyData.created_date}>
              <td>
                {moment(surveyData.modification_date).format(
                  `${DATE_FORMAT} hh:mm A`,
                )}
              </td>
              <Row
                value={surveyData.answer.relax.value}
                comment={surveyData.answer.relax.comment}
                positiveTitle='Relaxed'
                negativeTitle='Stressed'
              />
              <Row
                value={surveyData.answer.happiness.value}
                comment={surveyData.answer.happiness.comment}
                positiveTitle='Happy'
                negativeTitle='Sad'
              />
              <Row
                value={surveyData.answer.energy.value}
                comment={surveyData.answer.energy.comment}
                positiveTitle='Rested'
                negativeTitle='Tired'
              />
              <Row
                value={surveyData.answer.purpose.value}
                comment={surveyData.answer.purpose.comment}
                positiveTitle='Purpose'
                negativeTitle='No Purpose'
              />
              <Row
                value={surveyData.answer.engagement.value}
                comment={surveyData.answer.engagement.comment}
                positiveTitle='Busy'
                negativeTitle='Bored'
              />
              <Row
                value={surveyData.answer.social.value}
                comment={surveyData.answer.social.comment}
                positiveTitle='Social'
                negativeTitle='Lonely'
              />
              <Row
                value={surveyData.answer.comfort.value}
                comment={surveyData.answer.comfort.comment}
                positiveTitle='Pain Free'
                negativeTitle='Pain'
              />
              <td style={{padding: 0, color: '#fff'}}>
                <Box
                  display='flex'
                  height='100%'
                  alignItems='center'
                  justifyContent='center'
                  className={clsx({
                    [classes.red]:
                      surveyData.score >= 0 && surveyData.score <= 2,
                    [classes.yellow]:
                      surveyData.score >= 3 && surveyData.score <= 4,
                    [classes.green]:
                      surveyData.score >= 5 && surveyData.score <= 7,
                  })}>
                  {surveyData.score}/{surveyData.scoreLimit}
                </Box>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <Box
          display='flex'
          height='40px'
          justifyContent='center'
          alignItems='center'>
          No record found
        </Box>
      )}
    </Box>
  );
};

export default React.memo(SurveyTable);
