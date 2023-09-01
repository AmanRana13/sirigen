/* eslint-disable max-len */
import React from 'react';
import moment from 'moment';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryGroup,
  VictoryScatter,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryLine,
} from 'victory';
import get from 'lodash.get';

import {DATE_FORMAT_SHORT} from 'globals/global.constants';
import {Box, Grid, useTheme} from '@mui/material';
import {makeStyles} from 'tss-react/mui';

import {
  createDashedLine,
  getMinMaxAxis,
  getTimestamp,
  roundOff,
} from 'globals/global.functions';
import {ReactComponent as DiffArrow} from 'assets/icons/DiffArrow.svg';

import {wellnessDashboardStyle} from '../../../WellnessDashboard.style';
import {bodyHealthStyle} from '../BodyHealth.styles';
import clsx from 'clsx';

const BodyHydration = ({
  type,
  summary,
  difference,
  lastRecordedDate,
  graphTickValues,
  ...prop
}: any) => {
  const theme: any = useTheme();
  const {currentState} = prop;
  const {classes} = bodyHealthStyle();
  const {classes: hydrationClasses} = bodyHydrationStyle();
  const {classes: globalClasses} = wellnessDashboardStyle();

  let hydrationDiff = 0;
  if (
    get(difference, 'current_percentage.hydration') &&
    get(difference, 'previous_percentage.hydration')
  ) {
    const currentHydrationPercentage: any = roundOff(
      get(difference, 'current_percentage.hydration'),
    );
    const previousHydrationPercentage: any = roundOff(
      get(difference, 'current_percentage.hydration'),
    );
    hydrationDiff = currentHydrationPercentage - previousHydrationPercentage;
  }

  const lowHydration = get(summary, 'extremities.percentage.min_hydration');
  const highHydration = get(summary, 'extremities.percentage.max_hydration');

  const totalHydration: any = [];
  const createHydrationGraph = (arr: any) => {
    if (!arr) return;
    let chart: any = [];
    let chart2: any = [];
    Object.entries(arr).forEach((data: any) => {
      totalHydration.push(data[1].percentage.hydration);
      chart.push({
        x: moment(getTimestamp(data[0])).format(
          type == 'day' ? 'LT' : DATE_FORMAT_SHORT,
        ),
        y: data[1].percentage.hydration,
      });
    });

    graphTickValues.forEach((tick: any) => {
      const temp = chart.find((x: any) => x.x === tick);
      if (temp !== undefined) {
        chart2.push(temp);
      } else {
        chart2.push({
          x: tick,
          y: null,
        });
      }
    });
    let data = chart2.find(function (ele: any) {
      return ele.y != null;
    });
    if (data) {
      return chart2;
    }
  };
  const victoryAreaChartData = createHydrationGraph(get(summary, 'all_data'));

  const interupptionLine = createDashedLine(victoryAreaChartData);
  const dailyAvgChartConfig: any = {
    chart: {width: 1000},
    label: {dx: 50, dy: 10},
    xAxis: {
      orientation: 'bottom',
      fixLabelOverlap: true,
      //style: {tickLabels: {angle: 90}},
    },
    yAxis: {
      orientation: 'right',
      style: {
        axis: {stroke: 'none'},
      },
    },
    area: {
      style: {
        data: {
          fill: theme.palette.common.white,
          fillOpacity: 0.7,
          stroke: theme.palette.customColor.intenseGreen,
          strokeWidth: 3,
        },
        labels: {fontSize: 15, fill: theme.palette.customColor.labelRed},
      },
    },
  };

  const loadHydrationDayGrid = () => {
    return (
      // <Grid item sm={4}>
      // </Grid>
      <Box
        className={clsx(hydrationClasses.circle, {
          [hydrationClasses.noDataRecordColor]: lastRecordedDate,
        })}>
        <span className={hydrationClasses.circleValue}>
          {roundOff(get(summary, 'extremities.percentage.average_hydration'))}
        </span>
        %
      </Box>
    );
  };
  const loadHydrationWeekMonthGrid = () => {
    return (
      <>
        <Grid
          item
          sm={3}
          className={hydrationClasses.bodyContainerLeft}
          data-testid='body-hydration-graph'>
          <Box className={hydrationClasses.squareAvg}>
            <span
              className={clsx(hydrationClasses.squareAvgVal, {
                [hydrationClasses.noDataRecordColor]: lastRecordedDate,
              })}>
              {roundOff(
                get(summary, 'extremities.percentage.average_hydration'),
              )}{' '}
              %
            </span>
          </Box>
          <Box
            className={clsx(hydrationClasses.squareHigh, {
              [hydrationClasses.noData]: !highHydration || lastRecordedDate,
            })}>
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='center'>
              <Grid
                item
                sm={4}
                className={clsx({
                  [hydrationClasses.squareLabel]: !lastRecordedDate,
                  [hydrationClasses.noDataRecordColor]: lastRecordedDate,
                })}>
                HIGH:
              </Grid>
              <Grid
                item
                sm={4}
                className={clsx({
                  [hydrationClasses.squareValue]: !lastRecordedDate,
                  [hydrationClasses.noDataRecordColor]: lastRecordedDate,
                })}>
                {roundOff(highHydration || 0)} %
              </Grid>
            </Grid>
          </Box>
          <Box
            className={clsx(hydrationClasses.squareLow, {
              [hydrationClasses.noData]: !lowHydration || lastRecordedDate,
              [hydrationClasses.squareLowColor]: !lastRecordedDate,
            })}>
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='center'>
              <Grid
                item
                sm={4}
                className={clsx({
                  [hydrationClasses.squareLabel]: !lastRecordedDate,
                  [hydrationClasses.noDataRecordColor]: lastRecordedDate,
                })}>
                LOW:
              </Grid>
              <Grid
                item
                sm={4}
                className={clsx({
                  [hydrationClasses.squareValue]: !lastRecordedDate,
                  [hydrationClasses.noDataRecordColor]: lastRecordedDate,
                })}>
                {roundOff(lowHydration || 0)} %
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item sm={9}>
          {victoryAreaChartData ? (
            <VictoryChart
              width={dailyAvgChartConfig.chart.width}
              minDomain={{
                y: getMinMaxAxis(totalHydration, 'min'),
              }}
              maxDomain={{
                y: getMinMaxAxis(totalHydration, 'max'),
              }}
              containerComponent={
                <VictoryVoronoiContainer
                  voronoiBlacklist={['interuptionLine']}
                  labels={({datum}) => `${roundOff(datum.y)}`}
                  labelComponent={
                    <VictoryTooltip
                      cornerRadius={0}
                      flyoutStyle={{
                        stroke: 'transparent',
                        strokeWidth: 0,
                        fontWeight: 300,
                        fontSize: 12,
                        fill: theme.palette.background.green,
                      }}
                      dy={-7}
                      constrainToVisibleArea
                      style={{fontSize: 20}}
                    />
                  }
                />
              }>
              <defs>
                <linearGradient id='grad' x1='1' y1='1' x2='1' y2='0'>
                  <stop offset='0' stopColor='white' stopOpacity='1' />
                  <stop
                    offset='1'
                    stopColor={theme.palette.customColor.intenseGreen}
                    stopOpacity='1'
                  />
                </linearGradient>
              </defs>
              <VictoryLabel
                text={dailyAvgChartConfig.label.text}
                dx={dailyAvgChartConfig.label.dx}
                dy={dailyAvgChartConfig.label.dy}
              />
              <VictoryAxis
                orientation={dailyAvgChartConfig.yAxis.orientation}
                dependentAxis
                style={dailyAvgChartConfig.yAxis.style}
                label='Percentage (%)'
                axisLabelComponent={
                  <VictoryLabel
                    angle={0}
                    dy={-130}
                    dx={-37}
                    style={{
                      fontWeight: 600,
                      fontSize: 15,
                    }}
                  />
                }
              />
              <VictoryGroup
                style={{
                  data: {
                    fillOpacity: 0.7,
                    stroke: theme.palette.customColor.intenseGreen,
                    strokeWidth: 2,
                  },
                }}
                data={victoryAreaChartData}
                color={theme.palette.common.white}>
                <VictoryArea
                  style={{
                    data: {fill: 'url(#grad)'},
                  }}
                  name='area'
                />
                <VictoryScatter
                  style={{data: {fill: theme.palette.common.white}}}
                  size={4}
                />
              </VictoryGroup>
              <VictoryAxis
                fixLabelOverlap={true}
                orientation={dailyAvgChartConfig.xAxis.orientation}
              />
              <VictoryLine
                style={{
                  data: {
                    stroke: theme.palette.customColor.intenseGreen,
                    strokeWidth: 2,
                    strokeDasharray: '4,4',
                  },
                }}
                name='interuptionLine'
                data={interupptionLine}
              />
            </VictoryChart>
          ) : (
            <Box display='flex' flexDirection='column' mt={12}>
              <Box
                style={{
                  textAlign: 'center',
                  width: '100%',
                  color: theme.palette.customColor.lighterBlack,
                  fontSize: 18,
                }}>
                No Data
              </Box>
              <VictoryChart
                width={dailyAvgChartConfig.chart.width}
                height={200}>
                <VictoryAxis
                  orientation={dailyAvgChartConfig.xAxis.orientation}
                  fixLabelOverlap={true}
                  tickValues={graphTickValues}
                  style={{
                    axis: {stroke: theme.palette.customColor.borderGrey},
                    tickLabels: {fill: theme.palette.customColor.lighterBlack},
                  }}
                />
              </VictoryChart>
            </Box>
          )}
        </Grid>
      </>
    );
  };
  return (
    <>
      <Box className={classes.headerContainer}>
        <Grid container>
          <Grid item sm={3}>
            <Box className={globalClasses.cardTitle}>Hydration</Box>
          </Grid>
          <Grid
            item
            sm={9}
            style={{display: 'flex', justifyContent: 'space-between'}}>
            <Box className={globalClasses.cardTitle} ml={4}>
              {currentState !== 'day' ? 'Daily Avg' : ''}
            </Box>
            <Box className={globalClasses.cardSubTitle}>
              {!lastRecordedDate ? (
                <Box
                  display='flex'
                  justifyContent='flex-end'
                  alignItems='flex-end'>
                  {hydrationDiff ? (
                    <Box
                      style={{
                        marginRight: 5,
                        transform: `rotate(
                    ${hydrationDiff > 0 ? '180deg' : '0deg'})`,
                      }}>
                      <DiffArrow
                        height={25}
                        width={25}
                        fill={
                          hydrationDiff > 0
                            ? theme.palette.customColor.hydrationGreen
                            : theme.palette.customColor.hydrationRed
                        }
                      />
                    </Box>
                  ) : null}
                  {roundOff(hydrationDiff)}
                </Box>
              ) : (
                <Box className={globalClasses.lastRecordedTitle}>
                  Last recorded &nbsp;
                  {lastRecordedDate}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box mt={4.25} mb={4.25}>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'>
          {currentState === 'day'
            ? loadHydrationDayGrid()
            : loadHydrationWeekMonthGrid()}
        </Grid>
      </Box>
    </>
  );
};

export {BodyHydration};

const bodyHydrationStyle = makeStyles()((theme: any) => ({
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    borderRadius: '50%',
    padding: 5,
    background: theme.palette.background.green,
  },
  bodyContainerLeft: {
    borderRight: `1px solid ${theme.palette.customColor.lightSeparator}`,
    paddingRight: 5,
  },
  circleValue: {
    fontSize: 44,
    fontWeight: 'bold',
  },
  squareAvg: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    width: '55%',
    borderRadius: 10,
    padding: 5,
    margin: 'auto',
    marginTop: 20,
    background: theme.palette.background.green,
  },
  squareAvgVal: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  squareHigh: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: '60%',
    borderRadius: 10,
    border: `solid 2px ${theme.palette.customColor.highgreen}`,
    padding: 5,
    margin: 'auto',
    marginTop: 20,
  },
  noData: {
    border: `solid 2px ${theme.palette.customColor.noDataGrey}`,
  },
  noDataRecordColor: {
    color: theme.palette.customColor.noDataGrey,
  },
  squareLow: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: '60%',
    borderRadius: 10,
    padding: 5,
    margin: 'auto',
    marginTop: 20,
  },
  squareLowColor: {
    border: `solid 2px ${theme.palette.customColor.lighterBlack}`,
  },
  squareLabel: {
    color: theme.palette.customColor.lighterBlack,
  },
  squareValue: {
    color: theme.palette.common.black,
  },
}));
