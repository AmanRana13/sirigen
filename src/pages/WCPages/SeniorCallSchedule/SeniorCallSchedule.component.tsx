import React, {useEffect, useState} from 'react';
import {useAppDispatch} from 'hooks/reduxHooks';
import {Box} from '@mui/material';
import {isEmpty} from 'lodash';

import {SubHeader} from 'common/SubHeader';
import {getCurrentSenior} from 'globals/global.functions';

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import {seniorCallSchedulesStyle} from './SeniorCallSchedule.style';
import {SeniorCallScheduleTableRow} from './components/SeniorCallScheduleTableRow.component';
import {getCallScheduleList} from 'pages/WCPages/Home/Home.action';
import clsx from 'clsx';

const SeniorCallSchedule = (props: any) => {
  const {classes} = seniorCallSchedulesStyle();
  const [callList, setCallList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noRecord, setNoRecord] = useState(false);
  const [refreshState, setRefreshState] = useState(false);
  const {seniorID} = getCurrentSenior();
  const dispatch: any = useAppDispatch();

  useEffect(() => {
    setRefreshState(false);
    setIsLoading(true);
    dispatch(getCallScheduleList(seniorID, props.listAll)).then((res: any) => {
      setCallList(res);
      setIsLoading(false);
      if (isEmpty(res)) {
        setNoRecord(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshState]);

  return (
    <>
        <Box className={classes.container} data-testid='seniorCallSchedule'>
          <SubHeader noHeader={props.noHeader} {...props} />
          <Box>
            <TableContainer component={Paper}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Scheduled
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Agent Assigned
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Last Contacted
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Call Reason
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Call Type
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Contact
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Member Id
                    </TableCell>
                    <TableCell
                      className={clsx(
                        [classes.tableHeadStyle],
                        [classes.tableHeadName],
                      )}
                      align='center'>
                      Name
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Age
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Gender
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Contact Phone
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Time Zone
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Alternate Phone
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}>
                      Location
                    </TableCell>
                    <TableCell
                      align='center'
                      className={classes.tableHeadStyle}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading && (
                    <TableRow>
                      <TableCell
                        className={classes.noData}
                        colSpan={14}
                        align='center'>
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  )}
                  {noRecord && (
                    <TableRow>
                      <TableCell
                        className={classes.noData}
                        colSpan={14}
                        align='center'>
                        No Record Found
                      </TableCell>
                    </TableRow>
                  )}
                  <SeniorCallScheduleTableRow
                    rowData={callList}
                    setRefreshState={setRefreshState}
                    disableRowClick={props.listAll}
                    {...props}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
    </>
  );
};

export default SeniorCallSchedule;
