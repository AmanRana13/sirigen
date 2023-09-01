/* eslint-disable max-len */
import React from 'react';
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import moment from 'moment';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import {DATE_FORMAT_SHORT_YEAR, TIME_FORMAT} from 'globals/global.constants';
import UserName from 'common/UserName';
import {getExistingVitalsData} from 'globals/global.functions';

import {cIRangeMilestonesTableStyle} from './CIRangeMilestonesTable.style';
import {ICIRangeMilestones} from './CIRangeMilestones.types';

const Rows = (data: any) => {
  const navigate = useNavigate();
  const {classes} = cIRangeMilestonesTableStyle();

  const {row, showArrowButton} = data;
  const existingVitalsData: any = getExistingVitalsData(null);

  const redirectToSeniorCareInsightPage = (data: ICIRangeMilestones) => {
    navigate(
      `/senior/${data.seniorID}/${data.accountID}/${data.timezone}/care-insights/threshold-setting?vital=${data.cIType}`,
      {replace: true},
    );
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell className={classes.tableBodyCell} align='left' id='senior'>
          <Typography variant='body1'>
            <UserName
              name={{
                firstName: row.seniorName.firstName,
                middleName: row.seniorName.middleName,
                lastName: row.seniorName.lastName,
              }}
            />
          </Typography>
        </TableCell>
        <TableCell className={classes.tableBodyCell} align='left' id='type'>
          <Typography variant='body1'>
            {existingVitalsData[`${row.cIType}`].label}
          </Typography>
        </TableCell>
        <TableCell
          className={classes.tableBodyCell}
          align='left'
          id='dateAndTime'>
          <Typography variant='body1'>
            {moment
              .utc(row.milestoneDateAndTime)
              .tz(moment.tz.guess())
              .format(`${DATE_FORMAT_SHORT_YEAR} ${TIME_FORMAT}`)}
          </Typography>
        </TableCell>
        <TableCell
          className={classes.tableBodyCell}
          align='left'
          id='milestone'>
          <Typography variant='body1'>
            {row.milestoneOrdinal == 1 ? 1000 : 3000}
          </Typography>
        </TableCell>
        <TableCell
          className={classes.tableBodyCell}
          align='left'
          id='submittedDate'>
          <Typography variant='body1'>
            {row.submittedDate
              ? moment
                  .utc(row.submittedDate)
                  .tz(moment.tz.guess())
                  .format(`${DATE_FORMAT_SHORT_YEAR}`)
              : '-'}
          </Typography>
        </TableCell>
        {showArrowButton && (
          <TableCell className={classes.iconCell} align='center'>
            <IconButton
              className={classes.arrowButton}
              data-testid = 'gotoSeniorInsightsBtn'
              onClick={() => redirectToSeniorCareInsightPage(row)}
              size='large'>
              <KeyboardArrowRightIcon />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
    </React.Fragment>
  );
};
const CIRangeMilestonesTable = ({
  data: tableData,
  tableHeadersList,
  showArrowButton,
  noDataMsg,
}: any) => {
  const {classes} = cIRangeMilestonesTableStyle();

  return (
    <>
      <TableContainer
        className={classes.tableContainer}
        data-testid='CI-range-milestone-table'>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {tableHeadersList.map((tableHeader: string) => {
                return (
                  <TableCell
                    className={classes.tableHeadCell}
                    align='left'
                    key={tableHeader}>
                    {tableHeader}
                  </TableCell>
                );
              })}
              {showArrowButton && (
                <TableCell className={classes.tableHeadCell}></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!tableData?.length && (
              <TableRow>
                <TableCell
                  className={classes.noData}
                  colSpan={6}
                  align='center'>
                  {noDataMsg}
                </TableCell>
              </TableRow>
            )}

            {tableData?.map((data: any) => (
              <Rows
                key={data.milestoneDateAndTime}
                row={data}
                showArrowButton={showArrowButton}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CIRangeMilestonesTable;
