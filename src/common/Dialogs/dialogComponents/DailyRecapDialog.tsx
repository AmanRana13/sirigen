import * as React from 'react';
import moment from 'moment-timezone';
import {Box, Dialog, DialogContent, Slide, Typography} from '@mui/material';
import Clear from '@mui/icons-material/Clear';

import {DATE_FORMAT} from 'globals/global.constants';
import {getTimestamp, roundOff} from 'globals/global.functions';

import {IDailyRecapPayload, IHeartRateData} from './DialogRecapDialog.types';
import {dailyRecapDialogStyle} from './DailyRecapDialog.style';
import {closeDialog} from '../../../store/commonReducer/common.action';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const DailyRecapDialog = () => {
  const {classes} = dailyRecapDialogStyle();
  const dispatch: any = useAppDispatch();

  const {isOpen} = useAppSelector((state: any) => state.common.dialog);
  const data: IDailyRecapPayload = useAppSelector(
    (state: any) => state.common.dialog.data,
  );

  const highValue = data.rangeMap?.high;
  const lowValue = data.rangeMap?.low;

  const onCloseHandler = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog
      open={isOpen}
      classes={{paper: classes.container}}
      TransitionComponent={Slide}>
      <Box width='100%' data-testid='DailyRecapDialog'>
        <DialogContent className={classes.content}>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'>
            <Box>
              <Typography variant='h6v1'>DAILY RECAP</Typography>
            </Box>
            <Box display='flex' alignItems='center'>
              <Typography variant='h6v1'>
                {moment(getTimestamp(data.date)).format(DATE_FORMAT)}
              </Typography>
              <Clear
                onClick={onCloseHandler}
                style={{
                  cursor: 'pointer',
                  height: 25,
                  width: 25,
                  marginLeft: 5,
                }}
                fontSize='large'
              />
            </Box>
          </Box>
          <Box className={classes.recapSummary}>{data.summaryMessage}</Box>
          <Box mt={1}>
            {highValue && (
              <>
                <Typography variant='subtitle1'>
                  Elevated heart rate summary:
                </Typography>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    maxHeight: 176,
                    overflowX: 'scroll',
                  }}>
                  {data.heartRateData.map((item: IHeartRateData) => {
                    if (highValue <= item.y) {
                      return (
                        <li key={`${item.x}${item.y}`}>
                          <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>
                              {item.x}
                            </Typography>
                            <Typography variant='subtitle1'>
                              {roundOff(item.y)}
                            </Typography>
                            <Typography variant='subtitle1'></Typography>
                          </Box>
                        </li>
                      );
                    }
                  })}
                </ul>
              </>
            )}

            {lowValue && (
              <>
                <Typography variant='subtitle1'>
                  Lower than expected heart rate summary:
                </Typography>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    maxHeight: 176,
                    overflowX: 'scroll',
                  }}>
                  {data.heartRateData.map((item: IHeartRateData) => {
                    if (lowValue >= item.y) {
                      return (
                        <li key={`${item.x}${item.y}`}>
                          <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>
                              {item.x}
                            </Typography>
                            <Typography variant='subtitle1'>
                              {roundOff(item.y)}
                            </Typography>
                            <Typography variant='subtitle1'></Typography>
                          </Box>
                        </li>
                      );
                    }
                  })}
                </ul>
              </>
            )}
          </Box>
          <Box mt={1} display='flex' justifyContent='space-between'>
            <Typography variant='subtitle1'>Total reported hours</Typography>
            <Typography variant='subtitle2'>-</Typography>
          </Box>
        </DialogContent>
      </Box>
      <Box></Box>
    </Dialog>
  );
};

export default DailyRecapDialog;
