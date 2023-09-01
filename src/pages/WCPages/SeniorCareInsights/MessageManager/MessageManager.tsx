import React from 'react';
import clsx from 'clsx';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import moment from 'moment-timezone';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {createSummary} from 'store/eventsReducer/Summary.action';
import {
  DATE_FORMAT,
  TIME_FORMAT,
  PAGINATION_LIMIT,
  summaryTypeLabel,
} from 'globals/global.constants';
import {capitalizeFirstLetter} from 'globals/global.functions';
import {CareInsightStatus} from 'globals/enums';
import {useDynamicScroll} from 'hooks';

import {
  collapseCareInsight,
  expandCareInsight,
  getInsightHistory,
  RESET_INSIGHT_HISTORY,
  RESET_PAGINATION,
  getCareInsightTransaction,
} from './MessageManager.action';
import {messageManagerStyle} from './MessageManager.style';
import {IInsightHistory, IInsightSubHistory} from './MessageManager.type';

const SubRows = (data: any) => {
  const {classes} = messageManagerStyle();

  const {row} = data;
  return (
    <React.Fragment>
      <TableRow>
        <TableCell
          className={classes.tableBodyCell}
          align='center'
          component='th'
          scope='row'
          width={170}>
          <Typography>
            {moment(row.dateGenerated).format(`${DATE_FORMAT} ${TIME_FORMAT}`)}
          </Typography>
        </TableCell>
        <TableCell className={classes.tableBodyCell} align='center' width={170}>
          {moment(row.dateUpdated).format(`${DATE_FORMAT} ${TIME_FORMAT}`)}
        </TableCell>
        <TableCell width={150} className={classes.tableBodyCell} align='center'>
          {capitalizeFirstLetter(row.status?.replace(/_/g, ' '))}
        </TableCell>
        <TableCell width={100} className={classes.tableBodyCell} align='center'>
          {capitalizeFirstLetter(row.agent)}
        </TableCell>
        <TableCell className={classes.tableBodyCell} align='center' width={150}>
          {row.vitalLabel}
        </TableCell>
        <TableCell width={100} className={classes.tableBodyCell} align='center'>
          {capitalizeFirstLetter(row.type)}
        </TableCell>
        <TableCell className={classes.tableBodyCell} align='center'>
          {row.message || '-'}
        </TableCell>
        <TableCell
          align='center'
          className={classes.expandIconCell}></TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const Rows = (data: any) => {
  const {classes} = messageManagerStyle();
  const dispatch: any = useAppDispatch();

  const {row} = data;
  const subHistoryData = useAppSelector(
    (state: any) => state.messageManager.careInsightSubHistory,
  );

  const expandTransaction = (id: string) => {
    if (!row.isExpand) {
      dispatch(expandCareInsight(id));
      dispatch(getCareInsightTransaction(id));
    } else {
      dispatch(collapseCareInsight(id));
    }
  };

  return (
    <React.Fragment>
      <TableRow
        className={clsx(classes.root, {
          [classes.abondoned]: row.status == CareInsightStatus.Abandoned,
          [classes.highlighted]: row.notify,
        })}>
        <TableCell
          className={classes.tableBodyCell}
          align='center'
          component='th'
          width={170}
          scope='row'>
          <Typography>
            {moment(row.dateGenerated).format(`${DATE_FORMAT} ${TIME_FORMAT}`)}
          </Typography>
        </TableCell>
        <TableCell className={classes.tableBodyCell} align='center' width={170}>
          {moment(row.dateUpdated).format(`${DATE_FORMAT} ${TIME_FORMAT}`)}
        </TableCell>
        <TableCell width={150} className={classes.tableBodyCell} align='center'>
          {capitalizeFirstLetter(row.status?.replace(/_/g, ' '))}
        </TableCell>
        <TableCell width={100} className={classes.tableBodyCell} align='center'>
          {capitalizeFirstLetter(row.agent)}
        </TableCell>
        <TableCell className={classes.tableBodyCell} align='center' width={150}>
          {row.vitalLabel}
        </TableCell>
        <TableCell width={100} className={classes.tableBodyCell} align='center'>
          {summaryTypeLabel[row.type] || capitalizeFirstLetter(row.type)}
        </TableCell>
        <TableCell
          className={classes.tableBodyCell}
          style={{width: 900, wordBreak: 'break-all'}}
          align='center'>
          {row.message || '-'}
        </TableCell>
        <TableCell align='center' className={classes.expandIconCell}>
          <IconButton
            aria-label='expand row'
            className={classes.arrowButton}
            disabled={row.status == CareInsightStatus.New ? true : false}
            size='small'
            onClick={() => expandTransaction(row.careInsightId)}
            data-testid='expandIcon'>
            {row.isExpand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{padding: 0, backgroundColor: '#EAF8F7'}} colSpan={8}>
          <Collapse in={row.isExpand} timeout='auto' unmountOnExit>
            <Table aria-label='collapsible table'>
              <TableBody>
                {subHistoryData[row.careInsightId]?.map(
                  (data: IInsightSubHistory) => (
                    <SubRows key={data.id} row={data} />
                  ),
                )}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const MessageManagerRows = React.memo(({insightHistory, listInnerRef}: any) => {
  const {classes} = messageManagerStyle();

  return (
    <TableContainer
      className={classes.tableContainer}
      component={Paper}
      ref={listInnerRef}>
      <Table stickyHeader aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeadCell} align='center'>
              D/T Generated
            </TableCell>
            <TableCell className={classes.tableHeadCell} align='center'>
              D/T Updated
            </TableCell>
            <TableCell className={classes.tableHeadCell} align='center'>
              Status
            </TableCell>
            <TableCell className={classes.tableHeadCell} align='center'>
              Agent
            </TableCell>
            <TableCell className={classes.tableHeadCell} align='center'>
              Vital Sign
            </TableCell>
            <TableCell className={classes.tableHeadCell} align='center'>
              Type
            </TableCell>
            <TableCell className={classes.tableHeadCell} align='center'>
              Message
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {insightHistory.map((data: IInsightHistory) => (
            <Rows key={data.id} row={data} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
const MessageManagerTable = () => {
  const listInnerRef = React.useRef<any>(null);
  const limit = PAGINATION_LIMIT.messageManager;

  const dispatch: any = useAppDispatch();

  const insightHistory = useAppSelector(
    (state: any) => state.messageManager.careInsightHistory,
  );
  const {user_id} = useAppSelector(
    (state: any) => state.common.seniorDetail.minimalInfo,
  );
  const isPaginate = useAppSelector(
    (state: any) => state.messageManager.isPaginate,
  );

  useDynamicScroll(
    (offset: number) => {
      dispatch(getInsightHistory(offset, limit));
      return () => {
        dispatch({type: RESET_INSIGHT_HISTORY});
        dispatch({type: RESET_PAGINATION});
      };
    },
    {
      ref: listInnerRef,
      limit: limit,
      isNext: isPaginate,
      initialRenderDeps: user_id,
    },
  );

  return (
    <MessageManagerRows
      insightHistory={insightHistory}
      listInnerRef={listInnerRef}
    />
  );
};

const InsightHistoryHeader = React.memo(() => {
  const {classes} = messageManagerStyle();

  const dispatch: any = useAppDispatch();

  const createSummaryHandler = () => {
    dispatch(createSummary());
  };

  return (
    <Box className={classes.insightHistoryHeader}>
      <Typography
        className={classes.insightHistoryText}
        variant='h6v1'
        gutterBottom
        component='div'>
        Insight History
      </Typography>
      <Button
        data-testid='create-summary'
        variant='contained'
        size='large'
        color='primary'
        style={{width: 'auto'}}
        onClick={createSummaryHandler}>
        Create Summary
      </Button>
    </Box>
  );
});

const MessageManager = React.memo(() => {
  const {classes} = messageManagerStyle();

  return (
    <Box data-testid='message-manager' className={classes.container}>
      <InsightHistoryHeader />
      <Box className={classes.insightHistory}>
        <Box>
          <MessageManagerTable />
        </Box>
      </Box>
    </Box>
  );
});

export default MessageManager;
