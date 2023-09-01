import React from 'react';
import {useAppDispatch} from 'hooks/reduxHooks';
import moment from 'moment';
import {useNavigate} from 'react-router-dom';
import get from 'lodash.get';

import {
  getAge,
  getCurrentSenior,
  getQueryParamTimezone,
  maskPhoneNumber,
} from 'globals/global.functions';
import {SchedulerForm} from 'pages/WCPages/SeniorCallScheduler/components/SchedulerDialog.component';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import {seniorCallSchedulesStyle} from '../SeniorCallSchedule.style';
import {Typography} from '@mui/material';
import StateCityFormatter from 'common/StateCityFormatter/StateCityFormatter';
import {updateCallStatus, markCompleteCall} from '../SeniorCallSchedule.action';
import clsx from 'clsx';

const ITEM_HEIGHT = 48;

function groupDataByDate(data: any) {
  const groupedData = data.reduce((groups: any, calldata: any) => {
    const date = moment(calldata.start_time).format();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(calldata);
    return groups;
  }, {});

  return Object.keys(groupedData).map((date) => {
    return {
      date,
      data: groupedData[date],
    };
  });
}

const SeniorCallScheduleTableRow = (props: any) => {
  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();
  const {rowData, setRefreshState} = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentOpenMenu, setCurrentOpenMenu] = React.useState({
    senior_id: '',
    account_id: '',
    call_id: '',
  });
  const [callInfo, setCallInfo] = React.useState(null);
  const [openScheduler, setOpenSchedulerDialog] = React.useState(false);
  const open = Boolean(anchorEl);
  const {classes} = seniorCallSchedulesStyle();

  const handleClick = (data: any, event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setCurrentOpenMenu({
      senior_id: data.senior_id,
      account_id: data.account_id,
      call_id: data.call_id,
    });
    setCallInfo(data);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleCallStatus = (status: any, event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (status == 'completed') {
      dispatch(
        markCompleteCall(
          currentOpenMenu.senior_id,
          currentOpenMenu.account_id,
          currentOpenMenu.call_id,
        ),
      ).then(() => setRefreshState(true));
    } else {
      dispatch(
        updateCallStatus(
          currentOpenMenu.senior_id,
          currentOpenMenu.account_id,
          currentOpenMenu.call_id,
          status,
        ),
      ).then(() => setRefreshState(true));
    }

    handleClose(event);
  };

  const openSchedulerForm = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenSchedulerDialog(true);
    handleClose(event);
  };

  const navigateToCallEntry = (data: any) => {
    if (props.disableRowClick) {
      return;
    }
    const {seniorID, accountID, timezone} = getCurrentSenior();
    dispatch({
      type: 'SET_CALL_ENTRY',
      payload: {
        callEntryData: data,
      },
    });
    navigate(
      // eslint-disable-next-line max-len
      `/senior/${seniorID}/${accountID}/${getQueryParamTimezone(
        timezone,
      )}/dashboard?call_entry=schedule`,
    );
  };
  const groupedData = groupDataByDate(rowData);
  return (
    <>
      {groupedData.map((group) => {
        return (
          <>
            <TableRow key={group.date}>
              <TableCell className={classes.tableGroupHead} colSpan={15}>
                <Typography variant='h5'>
                  {displayGroupDate(group.date)}
                </Typography>
              </TableCell>
            </TableRow>
            {group.data.map((row: any) => {
              return (
                <TableRow
                  key={row.id}
                  style={{cursor: 'pointer'}}
                  onClick={navigateToCallEntry.bind(null, row)}
                  data-testid='navigateTocallEntryPage'>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    {moment(get(row, 'start_time')).format('MM-DD-YY HH:mm')}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    {get(row, 'careagent_name')}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    {get(row, 'callee_last_call_time')
                      ? moment(get(row, 'callee_last_call_time')).format(
                          'MM-DD-YY HH:mm',
                        )
                      : '-'}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    {get(row, 'call_reason')}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    {get(row, 'call_type')}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    {get(row, 'callee_type')}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    {get(row, 'account_id')}
                  </TableCell>
                  <TableCell
                    align='center'
                    className={clsx(
                      [classes.seniorName],
                      [classes.tableBodyStyle],
                    )}>
                    {get(row, 'callee_name')}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    {getAge(row.dob)}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    {get(row, 'gender')}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    {maskPhoneNumber(get(row, 'mobile_number'))}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    {get(row, 'timezone', '-')}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    {maskPhoneNumber(get(row, 'alternate_number')) || '-'}
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    <StateCityFormatter
                      city={get(row, 'location.city')}
                      state={get(row, 'location.state')}
                    />
                  </TableCell>
                  <TableCell align='center' className={classes.tableBodyStyle}>
                    <IconButton
                      aria-label='more'
                      onClick={handleClick.bind(null, row)}
                      data-testid='iconButton'
                      size='large'>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </>
        );
      })}
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}>
        <MenuItem
          key='Mark Complete'
          //info={row}
          onClick={handleCallStatus.bind(null, 'completed')}
          data-testid='markCompleteMenuOption'>
          Mark Complete
        </MenuItem>
        <MenuItem
          key='Edit'
          onClick={openSchedulerForm}
          data-testid='editMenuOption'>
          Edit
        </MenuItem>
        <MenuItem key='Delete' onClick={handleCallStatus.bind(null, 'delete')}>
          Delete
        </MenuItem>
      </Menu>
      <SchedulerForm
        closeDialog={() => {
          setOpenSchedulerDialog(false);
          setRefreshState(true);
        }}
        openScheduler={openScheduler}
        seniorInfo={{
          seniorID: currentOpenMenu.senior_id,
          accountID: currentOpenMenu.account_id,
        }}
        callInfo={callInfo}
        {...props}
      />
    </>
  );
};

function displayGroupDate(dateStr: any) {
  const day = moment(dateStr).format('ddd');
  const dayMonth = moment(dateStr).format('DD MMM');
  return `${day}, ${dayMonth}`;
}

export {SeniorCallScheduleTableRow};
