/* eslint-disable max-len */
import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
} from '@mui/material';
import {IHolisticStatsData} from 'common/Print/Print.types';
import {
  parseHolisticStats,
  splitIntoSmallerArrays,
} from 'common/Print/Print.utility';
import {IHolisticSectionData} from 'common/Print/templates/HolisticAssessmentTemplate/HolisticAssessmentTemplate.types';
import {holisticStatsStyles} from './HolisticStats.style';
import {startCase} from 'lodash';

const HolisticStats = ({data = []}: {data: IHolisticSectionData[]}) => {
  const {scores: allScores = [], totalScore = 0} = parseHolisticStats(data);
  const {classes} = holisticStatsStyles();
  return (
    <Box className={classes.container} data-testid='print-holistic-stats'>
      {splitIntoSmallerArrays(allScores, 6).map((scores) => (
        <TableContainer
          key={scores[0].surveyName}
          className={classes.tableContainer}
          data-testid='holistic-stats-table'>
          <Table>
            <TableHead>
              <TableRow>
                {scores.map((section: IHolisticStatsData) => (
                  <TableCell
                    key={section.surveyName}
                    className={classes.heading}
                    scope='header'>
                    {startCase(section.surveyName)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {scores.map((section: IHolisticStatsData) => (
                  <TableCell
                    key={section.surveyName}
                    scope='row'
                    style={{width: 'max-content'}}>
                    <Box className={classes.content}>{section.score || 0}</Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ))}
      <Box display='flex' justifyContent='flex-end'>
        <Box className={classes.totalScore}>
          <span>Total Score: </span> {totalScore || 0}
        </Box>
      </Box>
    </Box>
  );
};

export default HolisticStats;
