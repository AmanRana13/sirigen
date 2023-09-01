import React from 'react';
import get from 'lodash.get';
import moment from 'moment-timezone';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Collapse,
  Box,
  CircularProgress,
  SelectChangeEvent,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CreateIcon from '@mui/icons-material/Create';
import RoleBaseRender from 'common/RoleBaseRender';
import {Roles, ZoneType} from 'globals/enums';

import {memberDirectoryStyle} from './MemberDirectory.style';
import {useAppDispatch} from 'hooks/reduxHooks';
import {
  API_LOAD_STATE,
  DATE_FORMAT,
  DATE_FORMAT_SHORT_YEAR,
  DIALOG_TYPES,
} from 'globals/global.constants';
import StateCityFormatter from 'common/StateCityFormatter/StateCityFormatter';
import {getCallScheduleList} from '../Home.action';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';
import ZoneSelect from 'common/ZoneSelect/ZoneSelect.component';
import {capitalizeFirstLetter, constructName} from 'globals/global.functions';
import {openDialog} from 'store/commonReducer/common.action';

const Rows = ({
  data,
  navigateToDashboard,
  openSchedulerForm,
  handleZoneChange,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const [pendingList, setPendingList] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const dispatch: any = useAppDispatch();
  const {classes} = memberDirectoryStyle();
  const fullName = React.useMemo(
    () =>
      constructName(
        get(data, 'minimal.name.first_name'),
        get(data, 'minimal.name.last_name'),
      ),
    [data],
  );
  const zone = React.useMemo(
    () => capitalizeFirstLetter(get(data, 'minimal.zone', 'white')) as ZoneType,
    [data],
  );
  const getPendingCall = (senior_id: any, event: any) => {
    event.stopPropagation();
    event.preventDefault();
    if (!open) {
      dispatch(getCallScheduleList(senior_id, undefined)).then((res: any) => {
        setPendingList(res);
        setLoading(false);
      });
    }
    setOpen(!open);
  };

  const getAge = (value: any) => {
    const ageDifMs = Date.now() - new Date(value).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const onZoneChange = React.useCallback(
    (e: SelectChangeEvent) => {
      const value = e.target.value as ZoneType;
      if (value) {
        // dispatching confirmation dialog
        const openDialogProp = {
          /* eslint-disable max-len */
          boldMessage: `Are you sure you want to change ${fullName}'s zone from ${zone} to ${value}?`,
          successButtonText: 'Confirm',
          type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
          isFailButton: true,
          onSuccessButton: () => {
            handleZoneChange(data, value);
          },
        };
        dispatch(openDialog({...openDialogProp}));
      }
    },
    [fullName, zone, data, handleZoneChange],
  );

  return (
    <>
      <TableRow
        data-testid='navigateToDashboard'
        key={data.account_id}
        style={{cursor: 'pointer'}}
        onClick={() =>
          navigateToDashboard(
            data.senior_id,
            data.account_id,
            get(data, 'minimal.location.timezone', ''),
          )
        }>
        <TableCell
          align='center'
          data-testid='openSchedulerForm'
          className={classes.tableBody}
          style={{width: '186px'}}>
          <RoleBaseRender forRole={[Roles.CareAgent]}>
            <Button
              size='small'
              color='primary'
              variant='contained'
              onClick={openSchedulerForm.bind(
                this,
                data.senior_id,
                data.account_id,
                {},
              )}
              style={{width: '153px'}}>
              Call Scheduler
            </Button>
          </RoleBaseRender>
        </TableCell>
        <TableCell
          align='left'
          className={classes.tableBody}
          style={{minWidth: '230px'}}>
          {fullName}
        </TableCell>
        <TableCell align='left' className={classes.tableBody}>
          {getAge(get(data, 'minimal.dob'))}
        </TableCell>
        <TableCell align='left' className={classes.tableBody}>
          {get(data, 'minimal.gender')}
        </TableCell>
        <TableCell align='left' className={classes.tableBody}>
          <StateCityFormatter
            city={get(data, 'minimal.location.city')}
            state={get(data, 'minimal.location.state')}
          />
        </TableCell>
        <TableCell
          align='left'
          className={classes.tableBody}
          style={{minWidth: '153px'}}>
          {moment(get(data, 'minimal.member_since')).utc().format(DATE_FORMAT)}
        </TableCell>
        <TableCell
          align='left'
          className={classes.tableBody}
          style={{minWidth: '230px'}}>
          <ShowHyphen>{get(data, 'minimal.coach_name')}</ShowHyphen>
        </TableCell>
        <TableCell
          align='left'
          className={classes.tableBody}
          style={{minWidth: '230px'}}>
          <ShowHyphen>{get(data, 'minimal.facility_name')}</ShowHyphen>
        </TableCell>
        <TableCell align='left' className={classes.tableBody} width='175px'>
          <ShowHyphen>
            <ZoneSelect zoneType={zone} onChange={onZoneChange} />
          </ShowHyphen>
        </TableCell>
        <TableCell>
          <RoleBaseRender forRole={[Roles.CareAgent]}>
            <IconButton
              aria-label='expand row'
              size='small'
              className={classes.arrowIcon}
              onClick={getPendingCall.bind(this, data.senior_id)}
              data-testid='pending-call'>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </RoleBaseRender>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={12}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box minHeight={40}>
              {isLoading ? (
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <CircularProgress />
                </Box>
              ) : (
                <TableContainer>
                  <Table
                    className={classes.innerTable}
                    size='small'
                    aria-label='a dense table'>
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        <TableCell className={classes.tableHeading}>
                          Call(s) Scheduled
                        </TableCell>
                        <TableCell
                          align='center'
                          className={classes.tableHeading}>
                          Assigned Agent
                        </TableCell>
                        <TableCell
                          align='center'
                          className={classes.tableHeading}>
                          Last Contacted
                        </TableCell>
                        <TableCell
                          align='center'
                          className={classes.tableHeading}>
                          Call Reason
                        </TableCell>
                        <TableCell
                          align='center'
                          className={classes.tableHeading}>
                          Call Type
                        </TableCell>
                        <TableCell
                          align='center'
                          className={classes.tableHeading}>
                          Who To Call
                        </TableCell>
                        <TableCell
                          align='center'
                          className={classes.tableHeading}>
                          Caregiver
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pendingList?.map((scheduledCallData: any) => (
                        <TableRow key={scheduledCallData.name}>
                          <TableCell
                            align='center'
                            className={classes.tableBody}>
                            <div
                              onClick={openSchedulerForm.bind(
                                this,
                                scheduledCallData.senior_id,
                                scheduledCallData.account_id,
                                scheduledCallData,
                              )}
                              style={{color: '#007E9A', cursor: 'pointer'}}>
                              <CreateIcon
                                style={{
                                  height: 12,
                                  width: 12,
                                  marginRight: 2,
                                }}
                              />
                              Edit
                            </div>
                          </TableCell>
                          <TableCell
                            component='th'
                            scope='row'
                            className={classes.tableBody}>
                            {moment(scheduledCallData.start_time).format(
                              DATE_FORMAT_SHORT_YEAR,
                            )}
                            -
                            {moment(scheduledCallData.start_time).format(
                              'HH:mm',
                            )}
                          </TableCell>
                          <TableCell
                            align='center'
                            className={classes.tableBody}>
                            {get(scheduledCallData, 'careagent_name')}
                          </TableCell>
                          <TableCell
                            align='center'
                            className={classes.tableBody}>
                            {scheduledCallData.callee_last_call_time && (
                              <span>
                                {moment(
                                  scheduledCallData.callee_last_call_time,
                                ).format(DATE_FORMAT_SHORT_YEAR)}
                                ,
                              </span>
                            )}

                            {scheduledCallData.callee_last_call_time &&
                              moment(
                                scheduledCallData.callee_last_call_time,
                              ).format('HH:mm')}
                          </TableCell>
                          <TableCell
                            align='center'
                            className={classes.tableBody}>
                            {scheduledCallData.call_reason}
                          </TableCell>
                          <TableCell
                            align='center'
                            className={classes.tableBody}>
                            {scheduledCallData.call_type}
                          </TableCell>
                          <TableCell
                            align='center'
                            className={classes.tableBody}>
                            {scheduledCallData.callee_type}
                          </TableCell>
                          <TableCell
                            align='center'
                            className={classes.tableBody}>
                            {scheduledCallData.callee_name}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const SeniorTable = ({
  data: seniorData,
  isDataLoading,
  navigateToDashboard,
  openSchedulerForm,
  isFilterLoading,
  handleZoneChange,
}: any) => {
  const {classes} = memberDirectoryStyle();

  return (
    <Box>
      <TableContainer component={Paper} data-testid='member-directory'>
        <Table size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell component='td'></TableCell>
              <TableCell align='left' className={classes.tableHeading}>
                Name
              </TableCell>
              <TableCell align='left' className={classes.tableHeading}>
                Age
              </TableCell>
              <TableCell align='left' className={classes.tableHeading}>
                Gender
              </TableCell>
              <TableCell align='left' className={classes.tableHeading}>
                Location
              </TableCell>
              <TableCell align='left' className={classes.tableHeading}>
                Member Since
              </TableCell>
              <TableCell align='left' className={classes.tableHeading}>
                Wellness Coach
              </TableCell>
              <TableCell align='left' className={classes.tableHeading}>
                Facility
              </TableCell>
              <TableCell align='left' className={classes.tableHeading}>
                Zone
              </TableCell>
              <TableCell
                component='td'
                className={classes.tableHeading}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(isDataLoading === API_LOAD_STATE.PROGRESS || isFilterLoading) && (
              <TableRow>
                <TableCell colSpan={10} align='center'>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {!isFilterLoading &&
              isDataLoading !== API_LOAD_STATE.PROGRESS &&
              !seniorData.length && (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    align='center'
                    className={classes.tableBody}>
                    No Record Found
                  </TableCell>
                </TableRow>
              )}
            {!isFilterLoading &&
              isDataLoading === API_LOAD_STATE.SUCCESSFUL &&
              seniorData.length > 0 &&
              seniorData.map((data: any) => (
                <Rows
                  key={data.account_id}
                  data={data}
                  navigateToDashboard={navigateToDashboard}
                  openSchedulerForm={openSchedulerForm}
                  handleZoneChange={handleZoneChange}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SeniorTable;
