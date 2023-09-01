import React, {useState} from 'react';
import {
  Box,
  Button,
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  Table,
  TableBody,
  TableRow,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material';
import {isEmpty} from 'lodash';
import moment from 'moment-timezone';
import {useAppDispatch} from 'hooks/reduxHooks';
import {getCurrentSenior} from 'globals/global.functions';
import {DATE_FORMAT, TIME_FORMAT} from 'globals/global.constants';
import {theme} from 'config/theme.config';
import {InputFields} from 'common/InputFields';
import {useDynamicScroll} from 'hooks';

import {
  downloadThresholdData,
  updateHistoryDateFilter,
} from '../Threshold.action';
import {thresholdsStyle} from './Threshold.style';

const ThresholdHistory = ({highCutOff, lowCutOff, filter, tableData}: any) => {
  const {classes} = thresholdsStyle();

  const [data, setData] = useState<any>([]);
  const [enableDates, setEnableDates] = useState<any>();

  const dispatch: any = useAppDispatch();

  const seniorInfo = {...getCurrentSenior()};

  const getEnableDates = (arr: any) => {
    if (!arr) return [];
    const datesWithData = Object.entries(arr).map((value: any) => {
      return moment(value[1].time / 1000000).format(DATE_FORMAT);
    });
    return new Set(datesWithData);
  };

  const filterTableByDate = (arr: any) => {
    if (!arr) return null;
    return Object.entries(arr).filter((value: any) => {
      if (
        moment(value[1].time / 1000000).format(DATE_FORMAT) ===
        moment(filter).format(DATE_FORMAT)
      ) {
        return value;
      }
    });
  };

  const handleClear = async () => {
    await dispatch(updateHistoryDateFilter(null));
    if (!isEmpty(tableData)) {
      setData(Object.entries(tableData));
    }
  };

  const handleEnableDates = (currentDate: any) => {
    const enableMonthData = Array.from(enableDates || []);
    return !enableMonthData?.find(
      (disableDate) => disableDate == moment(currentDate).format(DATE_FORMAT),
    );
  };

  React.useEffect(() => {
    if (!isEmpty(tableData)) {
      setData(Object.entries(tableData));
      setEnableDates(getEnableDates(tableData));
    }
  }, [tableData]);

  React.useMemo(() => {
    if (filter != null) {
      const filteredValues: any = filterTableByDate(tableData);
      setData(filteredValues);
    }
  }, [filter]);

  const HistoryRecord = ({records}: any) => {
    const listInnerRef = React.useRef(null);
    const limit = 100;
    const [history, setHistoryData] = React.useState([]);
    const [isNext, setIsNext] = React.useState(true);

    useDynamicScroll(
      (offset: any) => {
        const newData = history.concat(records.slice(offset, limit + offset));
        setHistoryData(newData);
        if (records.length <= limit + offset) {
          setIsNext(false);
        }

        return () => {
          setHistoryData([]);
        };
      },
      {
        ref: listInnerRef,
        limit: limit,
        isNext: isNext,
        initialRenderDeps: records,
      },
    );

    return (
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        ref={listInnerRef}>
        <Table
          className={classes.table}
          size='small'
          aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Date</TableCell>
              <TableCell align='center'>Time</TableCell>
              <TableCell align='center'>Heart Rate</TableCell>
              <TableCell align='center'>Filter</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((row: any, i: any) => (
              <Row
                key={`${row.name}-${i}`}
                row={row}
                index={i}
                highCutOff={highCutOff}
                lowCutOff={lowCutOff}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box
      className={classes.thresholdHistory}
      data-testid='thresholdHistoryComponent'>
      <Box display='flex' justifyContent='space-between'>
        <Box>
          <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'>
            <Box>
              <Typography
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#313131',
                }}>
                Search :
              </Typography>
            </Box>
            <Box width='40%'>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                  <InputFields
                    controlledDate
                    inputProps={{
                      name: 'dateFilter',
                    }}
                    eventProps={{
                      disableFuture: true,
                      shouldDisableDate: (currentDate: any) => {
                        return handleEnableDates(currentDate);
                      },
                      value: filter,
                      onClick: (e: any) => e.preventDefault(),
                      onChange: (val: any) => {
                        dispatch(updateHistoryDateFilter(val));
                      },
                    }}
                  />
                </ThemeProvider>
              </StyledEngineProvider>
            </Box>
            <Box>
              <Button
                color='primary'
                variant='contained'
                className={classes.smallButton}
                onClick={handleClear}>
                Clear
              </Button>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography
            variant='subtitle1'
            className={classes.downloadLink}
            onClick={() =>
              dispatch(
                downloadThresholdData({
                  senior_id: seniorInfo.seniorID,
                  account_id: seniorInfo.accountID,
                }),
              )
            }>
            Download
          </Typography>
        </Box>
      </Box>
      {data.length ? (
        <Box>
          <HistoryRecord records={data} />
        </Box>
      ) : (
        <Box
          className={classes.thresholdHistoryBox}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'fff',
          }}>
          <Typography className={classes.noData} textAlign='center'>
            No Data
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const Row = ({row, highCutOff, lowCutOff}: any) => {
  return (
    <TableRow>
      <TableCell align='center'>
        {row[1].time ? moment(row[1].time / 1000000).format(DATE_FORMAT) : '-'}
      </TableCell>
      <TableCell align='center'>
        {row[1].time ? moment(row[1].time / 1000000).format(TIME_FORMAT) : '-'}
      </TableCell>
      <TableCell align='center'>{row[1].heart_rate}</TableCell>

      <TableCell align='center'>
        <Box
          style={{
            width: 60,
            padding: 2,
            position: 'relative',
            left: '36%',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 192, 0, 0.75)',
            borderRadius: '5px',
          }}>
          {row[1].heart_rate < highCutOff && row[1].heart_rate > lowCutOff
            ? row[1].heart_rate
            : 'NA'}
        </Box>
      </TableCell>
    </TableRow>
  );
};
export default React.memo(ThresholdHistory);
