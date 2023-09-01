import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useAppDispatch} from 'hooks/reduxHooks';
import moment from 'moment';
import {
  Box,
  Collapse,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Link,
  Paper,
  Button,
  IconButton,
  CircularProgress,
  TextareaAutosize,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {makeStyles} from 'tss-react/mui';

import {SubHeader} from 'common/SubHeader';
import {API_LOAD_STATE, DATE_FORMAT} from 'globals/global.constants';

import {fetchCallNotes, updateCallNotes} from './SeniorCallLogs.action';
import {seniorCallLogsStyle} from './SeniorCallLogs.style';
import {trimValues} from 'globals/global.functions';
import clsx from 'clsx';

const useRowStyles = makeStyles()({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  arrowButton: {
    backgroundColor: '#16A9D0',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#16A9D0',
      color: '#fff',
    },
  },
  tableBody: {
    fontSize: 13,
  },
});

const SeniorCallLogsComponent = ({data, ...props}: any) => {
  const {classes} = seniorCallLogsStyle();

  return (
    <Box className={classes.container} data-testid='senior-call-box'>
      <SubHeader {...props} />
      <Box>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table aria-label='collapsible table'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align='center' className={classes.tableHeader}>
                  Date Stamp
                </TableCell>
                <TableCell align='center' className={classes.tableHeader}>
                  Time Stamp
                </TableCell>
                <TableCell align='center' className={classes.tableHeader}>
                  Acc No.
                </TableCell>
                <TableCell align='center' className={classes.tableHeader}>
                  Care Agent
                </TableCell>
                <TableCell align='center' className={classes.tableHeader}>
                  Call Type
                </TableCell>
                <TableCell align='center' className={classes.tableHeader}>
                  Call Direction
                </TableCell>
                <TableCell align='center' className={classes.tableHeader}>
                  Call Reason
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any, i: number) => (
                <Row key={row.name} row={row} index={i} {...props} />
              ))}
              {props.isDataLoading === API_LOAD_STATE.PROGRESS && (
                <TableRow>
                  <TableCell
                    className={classes.noData}
                    colSpan={14}
                    align='center'>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              )}
              {props.isDataLoading === API_LOAD_STATE.SUCCESSFUL &&
                !data.length && (
                  <TableRow>
                    <TableCell
                      colSpan={14}
                      align='center'
                      className={clsx([classes.tableBody], [classes.noData])}>
                      No Record Found
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

const Row = ({row, ...props}: any) => {
  const {register, reset, handleSubmit, unregister, setValue} = useForm();
  const dispatch: any = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [callInfo, setCallInfo] = useState({
    senior_id: '',
    account_id: '',
    call_id: '',
  });
  const [callDetail, setCallDetail] = useState({
    notes: '',
    actionItem: [''],
  });
  const [disableEdit, setDisableEdit] = useState(true);
  const {classes} = useRowStyles();

  const getCallNotes = (account_id: any, senior_id: any, call_id: any) => {
    if (!open) {
      setCallInfo({senior_id, account_id, call_id});
      dispatch(fetchCallNotes(account_id, senior_id, call_id)).then(
        (res: any) => {
          unregister(`callNotes`);
          setCallDetail({
            notes: res?.care_call_notes,
            actionItem: res?.action_item,
          });
          register('callNotes');
          setValue('callNotes', res?.care_call_notes);
          setOpen(!open);
        },
      );
    } else {
      setDisableEdit(true);
      setOpen(!open);
    }
  };

  const onSubmit = (data: any) => {
    const trimmedData = trimValues(data);
    dispatch(updateCallNotes(callInfo, trimmedData));
  };
  const disableDeleteButton = React.useMemo(() => {
    return callDetail.actionItem.length === 1;
  }, [callDetail.actionItem]);

  const resetForm = () => {
    setCallDetail({
      notes: '',
      actionItem: [''],
    });
    reset({callNotes: '', actionItems: ''});
  };

  const onEditClick = () => {
    if (open) {
      setDisableEdit(!disableEdit);
    }
  };

  const addMoreActionItem = () => {
    if (callDetail.actionItem.length < 5) {
      setCallDetail((prevState) => ({
        ...prevState,
        actionItem: prevState.actionItem.concat(''),
      }));
    }
  };
  const disableAddActionButton = React.useMemo(() => {
    return callDetail.actionItem.length >= 5;
  }, [callDetail]);
  const deleteActionItem = (index: any) => {
    let array = [...callDetail.actionItem]; // make a separate copy of the array
    unregister(`actionItem[${index}]`);
    if (index !== -1 && !disableDeleteButton) {
      array.splice(index, 1);
      setCallDetail((prevState) => ({
        ...prevState,
        actionItem: array,
      }));
    }
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {props.currentPage === 1 && props.index < 3 && (
            <Link
              component='button'
              variant='body2'
              onClick={() => onEditClick()}
              data-testid='callLogEditButton'
              className={classes.tableBody}>
              Edit
            </Link>
          )}
        </TableCell>
        <TableCell align='center' scope='row' className={classes.tableBody}>
          {moment(row.call_time).format(DATE_FORMAT)}
        </TableCell>
        <TableCell align='center' className={classes.tableBody}>
          {moment(row.call_time).format('HH:mm')}
        </TableCell>
        <TableCell align='center' className={classes.tableBody}>
          {row.account_id}
        </TableCell>

        <TableCell align='center' className={classes.tableBody}>
          {row.careagent_name}
        </TableCell>
        <TableCell
          align='center'
          className={clsx([classes.capitalize], [classes.tableBody])}>
          {row.call_type}
        </TableCell>
        <TableCell
          align='center'
          className={clsx([classes.capitalize], [classes.tableBody])}>
          {row.call_direction}
        </TableCell>
        <TableCell align='center' className={classes.tableBody}>
          {row.call_reason}
        </TableCell>
        <TableCell align='center' className={classes.tableBody}>
          <IconButton
            aria-label='expand row'
            className={classes.arrowButton}
            size='small'
            onClick={() => {
              getCallNotes(row.account_id, row.senior_id, row.call_id);
            }}
            data-testid='expandRowIcon'>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={9}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box margin={1} marginLeft={10} marginRight={10}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  display='flex'
                  flexDirection='column'
                  className={classes.tableBody}>
                  <b>Call Notes</b>
                  <TextareaAutosize
                    value={callDetail.notes}
                    disabled={disableEdit}
                    {...register('callNotes')}
                    onChange={(e) =>
                      setCallDetail({
                        ...callDetail,
                        notes: e.target.value,
                      })
                    }
                    minRows={5}></TextareaAutosize>
                </Box>
                <Box
                  display='flex'
                  flexDirection='column'
                  className={classes.tableBody}>
                  <b>Action Items</b>
                  <Button
                    onClick={addMoreActionItem}
                    disabled={disableAddActionButton}
                    variant='contained'
                    style={{
                      margin: 5,
                      display: disableEdit ? 'none' : 'flex',
                      alignSelf: 'flex-end',
                      backgroundColor: !disableAddActionButton
                        ? '#16A9D0'
                        : '#868686',
                      color: '#FFFFFF',
                      borderRadius: 20,
                    }}
                    color='primary'>
                    Add Task
                  </Button>
                  {callDetail.actionItem.map((data, i) => (
                    <Box
                      key={data}
                      display='flex'
                      justifyContent='space-between'
                      alignItems='center'
                      style={{margin: '5px 0'}}>
                      {i + 1}.
                      <TextareaAutosize
                        disabled={disableEdit}
                        {...register(`actionItems[${i}]`)}
                        minRows={2}
                        style={{width: '100%', marginLeft: 2}}
                        defaultValue={data}></TextareaAutosize>
                      <HighlightOffIcon
                        style={{
                          color: disableDeleteButton ? '#aaaaaa' : '#16A9D0',
                          cursor: 'pointer',
                          display: disableEdit ? 'none' : 'flex',
                          alignSelf: 'center',
                          marginLeft: 5,
                        }}
                        onClick={deleteActionItem.bind(this, i)}
                      />
                    </Box>
                  ))}
                </Box>
                {!disableEdit && (
                  <Box mt={2}>
                    <Button
                      style={{marginRight: 4, backgroundColor: '#16A9D0'}}
                      variant='contained'
                      color='primary'
                      type='submit'>
                      Save
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      style={{backgroundColor: '#16A9D0'}}
                      onClick={resetForm}>
                      Reset
                    </Button>
                  </Box>
                )}
              </form>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default SeniorCallLogsComponent;
