/* eslint-disable max-len */
import React, {useState} from 'react';
import clsx from 'clsx';
import moment from 'moment-timezone';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {
  DATE_FORMAT_SHORT_YEAR,
  DIALOG_TYPES,
  PAGINATION_LIMIT,
  TIME_FORMAT,
  summaryTypeLabel,
} from 'globals/global.constants';
import {capitalizeFirstLetter} from 'globals/global.functions';

import {CareInsightReviewStyle} from './CareInsightReview.style';
import globalUseStyles from 'config/global.styles';
import {useDynamicScroll} from 'hooks';

import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {
  getAdminCareInsight,
  approveCareInsight,
  resetCareInsightReviewData,
  declineCareInsight,
} from './CareInsightReview.action';
import {openDialog} from 'store/commonReducer/common.action';
import UserName from 'common/UserName';

/**
 * @description This component list down all care insights which needs approval to admin.
 * @returns {JSX}
 */
const CareInsightReview = () => {
  const {classes} = CareInsightReviewStyle();

  const dispatch: any = useAppDispatch();

  const tableRef = React.useRef<HTMLDivElement>(null);
  const limit = PAGINATION_LIMIT.adminCareInsightReview;

  const isPaginate = useAppSelector(
    (state: any) => state.careInsightReview.isPaginate,
  );

  useDynamicScroll(
    (offset: number) => {
      dispatch(getAdminCareInsight(offset, limit));
      return () => {
        dispatch(resetCareInsightReviewData());
      };
    },
    {
      ref: tableRef,
      limit: limit,
      isNext: isPaginate,
    },
  );

  return (
    <Box className={classes.container} data-testid='care-insight-review'>
      <Box>
        <Typography className={classes.CareInsightReviewText} variant='h2'>
          To Do
        </Typography>
      </Box>
      <Box>
        <Box>
          <CareInsightReviewView ref={tableRef} />
        </Box>
      </Box>
    </Box>
  );
};

/**
 * @description This component show care insights listing to admin.
 * @param {*} data
 * @returns {JSX}
 */

const Rows = (data: any) => {
  const {classes} = CareInsightReviewStyle();
  const {classes: globalClasses} = globalUseStyles();

  const dispatch: any = useAppDispatch();

  const {row} = data;

  const [isExpand, setIsExpand] = useState(false);
  const [message, setMessage] = useState(row.message);

  const expandRow = () => {
    setIsExpand(!isExpand);
  };

  /**
   * @functions handleApprove
   * @description approve the care insights.
   * @param {string} careInsightId
   * @param {string} message
   * @param {string} seniorId
   * @param {string} type
   * @returns void
   */
  const handleApprove = (
    careInsightId: string,
    message: string,
    seniorId: string,
    type: string,
  ): void => {
    const openDialogProp = {
      boldMessage: `Are you sure you want to approve this message`,
      successButtonText: 'Confirm',
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        dispatch(approveCareInsight(careInsightId, message, seniorId, type));
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  /**
   * @functions handleDecline
   * @description decline the care insights.
   * @param {*} disableData
   * @returns void
   */
  const handleDecline = (disableData: any): void => {
    const openDialogProp = {
      boldMessage: `Are you sure you want to decline this message`,
      successButtonText: 'Confirm',
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        dispatch(declineCareInsight([disableData.careInsightId]));
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  return (
    <React.Fragment>
      <TableRow className={isExpand ? classes.expandedView : ''}>
        <TableCell
          className={
            isExpand ? classes.tableExpandedSeniorCell : classes.tableBodyCell
          }
          align='left'
          id='senior'>
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
        <TableCell
          className={
            isExpand
              ? clsx(classes.tableExpandedSeniorCell, classes.expandedAlignment)
              : classes.tableBodyCell
          }
          align='left'
          id='agent'>
          <Typography variant='body1'>
            {capitalizeFirstLetter(row.agent)}
          </Typography>
        </TableCell>
        <TableCell
          className={
            isExpand ? classes.tableExpandedSeniorCell : classes.tableBodyCell
          }
          align='left'
          id='date'>
          <Typography variant='body1'>
            {moment(row.dateGenerated).format(`${DATE_FORMAT_SHORT_YEAR}`)}
          </Typography>
        </TableCell>
        <TableCell
          className={
            isExpand ? classes.tableExpandedSeniorCell : classes.tableBodyCell
          }
          align='left'
          id='time'>
          <Typography variant='body1'>
            {moment(row.dateGenerated).format(`${TIME_FORMAT}`)}
          </Typography>
        </TableCell>
        <TableCell
          className={
            isExpand ? classes.tableExpandedSeniorCell : classes.tableBodyCell
          }
          align='left'
          id='type'>
          <Typography variant='body1'>
            {summaryTypeLabel[row.type] || capitalizeFirstLetter(row.type)}
          </Typography>
        </TableCell>
        <TableCell
          className={clsx({
            [classes.tableExpandedSeniorCell]: true,
            [classes.hiddenMsg]: true,
            [classes.messageBorder]: !isExpand,
          })}
          align='left'
          id='message'>
          {isExpand ? (
            <TextField
              hiddenLabel
              defaultValue={capitalizeFirstLetter(row.message)}
              multiline={true}
              InputProps={{
                disableUnderline: true,
              }}
              inputProps={{
                'data-testid': 'inputField',
                style: {padding: 0},
              }}
              className={classes.textFieldMessage}
              onChange={(event) => setMessage(event.target.value)}
            />
          ) : (
            <Typography variant='body1'>
              {capitalizeFirstLetter(row.message)}
            </Typography>
          )}
        </TableCell>
        <TableCell
          className={isExpand ? classes.expandIconCell : classes.collapsedIcon}
          align='center'>
          <IconButton
            className={classes.arrowButton}
            data-testid = 'expandBtn'
            onClick={() => expandRow()}
            size='large'>
            {isExpand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      {isExpand && (
        <TableRow className={classes.expandedView}>
          <TableCell
            className={clsx(classes.buttonsContainer, classes.btns)}
            colSpan={7}
            align='center'>
            <Box className={classes.buttonsInnerContainer}>
              <Button
                variant='contained'
                color='primary'
                data-testid = 'approveBtn'
                className={globalClasses.smallButton}
                onClick={() =>
                  handleApprove(
                    row.careInsightId,
                    message,
                    row.seniorId,
                    row.type,
                  )
                }>
                Approve
              </Button>
              <Button
                variant='contained'
                size='large'
                color='primary'
                data-testid = 'declineBtn'
                className={globalClasses.smallButton}
                onClick={() => handleDecline(row)}>
                Decline
              </Button>
            </Box>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
};

/**
 * @description This component shows care insights table header to admin.
 * @returns {JSX}
 */
const CareInsightReviewView = React.forwardRef<HTMLDivElement>((props, ref) => {
  const {classes} = CareInsightReviewStyle();

  const careInsightReviewData = useAppSelector(
    (state: any) => state.careInsightReview.allCareInsightReviews,
  );

  return (
    <TableContainer className={classes.tableContainer} ref={ref}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeadCell} align='left'>
              Senior
            </TableCell>
            <TableCell
              className={classes.tableHeadCell}
              align='left'
              id='agentHeader'>
              Agent
            </TableCell>
            <TableCell className={classes.tableHeadCell} align='left'>
              Date
            </TableCell>
            <TableCell className={classes.tableHeadCell} align='left'>
              Time
            </TableCell>
            <TableCell className={classes.tableHeadCell} align='left'>
              Type
            </TableCell>
            <TableCell className={classes.tableHeadCell} align='left'>
              Message
            </TableCell>
            <TableCell className={classes.tableHeadCell} />
          </TableRow>
        </TableHead>
        <TableBody>
          {!careInsightReviewData.length && (
            <TableRow>
              <TableCell className={classes.noData} colSpan={6} align='center'>
                No pending messages
              </TableCell>
            </TableRow>
          )}

          {careInsightReviewData.map((data: any) => (
            <Rows key={data.careInsightId} row={data} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default CareInsightReview;
