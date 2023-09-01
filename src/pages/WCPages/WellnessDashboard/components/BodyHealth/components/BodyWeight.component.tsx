/* eslint-disable max-len */
import moment from 'moment';
import get from 'lodash.get';
import {isEmpty} from 'lodash';
import {Box, Grid, useTheme} from '@mui/material';
import {makeStyles} from 'tss-react/mui';
import {
  VictoryArea,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryStack,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryScatter,
  VictoryGroup,
  VictoryLine,
} from 'victory';

import {
  getTimestamp,
  kgToLbs,
  roundOff,
  convertKgToLbs,
  numberRoundOff,
  createDashedLine,
  getMinMaxAxis,
} from 'globals/global.functions';
import {DATE_FORMAT_SHORT} from 'globals/global.constants';
import {ReactComponent as DiffArrow} from 'assets/icons/DiffArrow.svg';

import {bodyHealthStyle} from '../BodyHealth.styles';
import {wellnessDashboardStyle} from '../../../WellnessDashboard.style';
import clsx from 'clsx';

const viewTypeLabel: any = {
  day: 'Day',
  week: 'Week',
  month: 'Month',
};
const BodyWeight = ({
  type,
  summary,
  difference,
  graph,
  lastRecordedDate,
  graphTickValues,
}: any) => {
  const theme: any = useTheme();
  const {classes: globalClasses} = wellnessDashboardStyle();
  const {classes} = bodyHealthStyle();
  const {classes: weightClasses} = weightStyle();
  const avgWeight = get(summary, 'extremities.raw_data.average_weight', 0);
  const avgBMI = get(summary, 'extremities.raw_data.average_bmi', 0);

  const previousWeight = get(difference, 'previous_mass.weight', 0);
  const currentWeight = get(difference, 'current_mass.weight', 0);

  const previousWeightLbs = numberRoundOff(convertKgToLbs(previousWeight));
  const currentWeightLbs = numberRoundOff(convertKgToLbs(currentWeight));

  let diffWeight = 0;
  if (previousWeight && currentWeight)
    diffWeight = numberRoundOff(currentWeightLbs - previousWeightLbs);

  let totalWeight: any = [];

  const createWeightGraph = (arr: any) => {
    let chart: any = [];
    let chart2: any = [];
    if (isEmpty(arr)) return;
    arr.map((data: any) => {
      const weight = kgToLbs(data.weight);
      const day = moment(getTimestamp(data.time)).format(DATE_FORMAT_SHORT);
      totalWeight.push(weight);
      chart.push({
        x: day,
        y: weight,
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

    createDashedLine(chart2);
    return chart2;
  };

  const victoryAreaChartData = createWeightGraph(graph.weight);
  const interupptionLine = createDashedLine(victoryAreaChartData);
  const dailyAvgChartConfig: any = {
    chart: {width: 1000},
    label: {text: 'Daily Avg', dx: 50, dy: 10},
    xAxis: {orientation: 'bottom'},
    yAxis: {
      orientation: 'right',
      style: {
        axis: {stroke: 'none'},
        tickLabels: {
          fill: lastRecordedDate && theme.palette.customColor.lighterBlack,
        },
      },
    },
    area: {
      style: {
        data: {
          fill: theme.palette.customColor.remGreen,
          fillOpacity: 0.7,
          stroke: theme.palette.customColor.moderateGreen,
          strokeWidth: 3,
        },
        labels: {fontSize: 15, fill: theme.palette.customColor.labelRed},
      },
    },
  };

  return (
    <>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        data-testid='body-weight-graph'>
        <Grid item sm={4} className={weightClasses.bodyContainerLeft}>
          <Box className={classes.headerContainer}>
            <Box className={globalClasses.cardTitle}>Weight</Box>
            {!lastRecordedDate && (
              <Box className={globalClasses.cardSubTitle}>
                <Box
                  display='flex'
                  justifyContent='flex-end'
                  alignItems='center'>
                  {diffWeight !== 0 &&
                    (diffWeight > 0 ? (
                      <Box
                        style={{
                          marginRight: 5,
                          transform: 'rotate(180deg)',
                        }}>
                        <DiffArrow
                          height={25}
                          width={25}
                          fill={theme.palette.customColor.hydrationGreen}
                        />
                      </Box>
                    ) : (
                      <Box
                        style={{
                          marginRight: 5,
                          transform: 'rotate(0deg)',
                        }}>
                        <DiffArrow
                          height={25}
                          width={25}
                          fill={theme.palette.customColor.hydrationRed}
                        />
                      </Box>
                    ))}
                  {roundOff(diffWeight)}
                </Box>
                <Box fontSize={18} className={weightClasses.noDataLabelColor}>
                  {`${viewTypeLabel[type]} Change`}
                </Box>
              </Box>
            )}
          </Box>
          <Box display='flex' justifyContent='center' mb={2}>
            <Box
              className={clsx(weightClasses.circle, {
                [weightClasses.noDataValueColor]: lastRecordedDate,
              })}>
              <span className={weightClasses.circleValue}>
                {roundOff(kgToLbs(avgWeight))}
              </span>{' '}
              lbs
            </Box>
          </Box>
          <Grid
            container
            direction='row'
            justifyContent='space-around'
            alignItems='center'>
            <Grid item sm={3}>
              <Box className={classes.summaryBox}>
                <Box className={classes.summaryBoxLabel}>Target</Box>
                <Box
                  className={clsx({
                    [classes.summaryBoxValue]: !lastRecordedDate,
                    [classes.lastRecordedColor]: lastRecordedDate,
                  })}>
                  -
                </Box>
              </Box>
            </Grid>
            <Grid item sm={3}>
              <Box className={classes.summaryBox}>
                <Box className={classes.summaryBoxLabel}>Lbs to goal</Box>
                <Box
                  className={clsx({
                    [classes.summaryBoxValue]: !lastRecordedDate,
                    [classes.lastRecordedColor]: lastRecordedDate,
                  })}>
                  -
                </Box>
              </Box>
            </Grid>
            <Grid item sm={3}>
              <Box className={classes.summaryBox}>
                <Box className={classes.summaryBoxLabel}>Total gain</Box>
                <Box
                  className={clsx({
                    [classes.summaryBoxValue]: !lastRecordedDate,
                    [classes.lastRecordedColor]: lastRecordedDate,
                  })}>
                  -
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box>
            <Box mt={2} display='flex' justifyContent='space-between'>
              <Box fontSize={18} color={theme.palette.customColor.lighterBlack}>
                BMI
              </Box>
              {/* <Box
            className={weightClasses.bMIValueColor}
            display={lastRecordedDate && 'none'}
            fontSize={18}>
            {roundOff(diffBMI || 0)}
          </Box> */}
              <Box
                className={clsx({
                  [weightClasses.bMIValueColor]: !lastRecordedDate,
                  [weightClasses.noDataValueColor]: lastRecordedDate,
                })}
                fontSize={18}>
                {roundOff(avgBMI)}
              </Box>
            </Box>
            {type == 'day' && (
              <>
                <VictoryChart
                  // width={360}
                  height={50}
                  padding={{left: 20, right: 30}}>
                  <VictoryStack
                    colorScale={[
                      theme.palette.customColor.moderateBlue,
                      theme.palette.customColor.stackGreen,
                      theme.palette.customColor.stackYellow,
                      theme.palette.customColor.hydrationRed,
                    ]}
                    horizontal>
                    <VictoryBar
                      data={[{x: 'bmi', y: 1, label: 'Underweight'}]}
                      cornerRadius={{bottomRight: 16, bottomLeft: 16}}
                      barWidth={32}
                      labelComponent={
                        <VictoryLabel
                          dx={({datum}) => -datum.y - 4}
                          textAnchor='end'
                          verticalAnchor='middle'
                        />
                      }
                    />
                    <VictoryBar
                      data={[{x: 'bmi', y: 1, label: 'Normal'}]}
                      barWidth={32}
                      labelComponent={
                        <VictoryLabel
                          dx={({datum}) => -datum.y - 20}
                          textAnchor='end'
                          verticalAnchor='middle'
                        />
                      }
                    />
                    <VictoryBar
                      data={[{x: 'bmi', y: 1, label: 'Overweight'}]}
                      barWidth={32}
                      labelComponent={
                        <VictoryLabel
                          dx={({datum}) => -datum.y - 8}
                          textAnchor='end'
                          verticalAnchor='middle'
                        />
                      }
                    />
                    <VictoryBar
                      data={[{x: 'bmi', y: 1, label: 'Obese'}]}
                      barWidth={32}
                      cornerRadius={{topRight: 16, topLeft: 16}}
                      labelComponent={
                        <VictoryLabel
                          dx={({datum}) => -datum.y - 25}
                          textAnchor='end'
                          verticalAnchor='middle'
                        />
                      }
                    />
                  </VictoryStack>
                  <VictoryAxis
                    style={{axis: {stroke: 'transparent'}}}
                    tickFormat={() => ''}
                  />
                </VictoryChart>
                <Box
                  display='flex'
                  position='relative'
                  width='100%'
                  bottom='8px'
                  color={
                    !lastRecordedDate
                      ? theme.palette.customColor.primaryGreen
                      : theme.palette.customColor.noDataGrey
                  }>
                  <Box position='relative' left='25%'>
                    18
                  </Box>
                  <Box position='relative' left='44%'>
                    25
                  </Box>
                  <Box position='relative' left='63%'>
                    30
                  </Box>
                </Box>
              </>
            )}
          </Box>
        </Grid>
        <Grid item sm={8} className={weightClasses.bodyContainerRight}>
          <Box display='flex' justifyContent='space-between'>
            <Box className={globalClasses.cardTitle} ml={2} mb={4}>
              Daily Avg
            </Box>
            {lastRecordedDate && (
              <Box className={globalClasses.lastRecordedTitle}>
                Last recorded &nbsp;
                {lastRecordedDate}
              </Box>
            )}
          </Box>
          <Box className={weightClasses.activityContainer}>
            {isEmpty(victoryAreaChartData) ? (
              <Box display='flex' flexDirection='column' mt={12} width='100%'>
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
                  height={150}>
                  <VictoryAxis
                    orientation={dailyAvgChartConfig.xAxis.orientation}
                    fixLabelOverlap={true}
                    tickValues={graphTickValues}
                    style={{
                      axis: {stroke: theme.palette.customColor.borderGrey},
                      tickLabels: {
                        fill: theme.palette.customColor.lighterBlack,
                      },
                    }}
                  />
                </VictoryChart>
              </Box>
            ) : (
              <VictoryChart
                width={dailyAvgChartConfig.chart.width}
                minDomain={{
                  y: getMinMaxAxis(totalWeight, 'min'),
                }}
                maxDomain={{
                  y: getMinMaxAxis(totalWeight, 'max'),
                }}
                containerComponent={
                  <VictoryVoronoiContainer
                    voronoiBlacklist={['interuptionLine']}
                    labels={({datum}) => {
                      if (`${roundOff(datum.y)}` === '-') {
                        return '';
                      }
                      return `${roundOff(datum.y)}`;
                    }}
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
                        style={{
                          fontSize: 20,
                          color: theme.palette.customColor.titleBlack,
                        }}
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
                <VictoryAxis
                  orientation={dailyAvgChartConfig.xAxis.orientation}
                  fixLabelOverlap={true}
                  tickValues={graphTickValues}
                  style={{
                    axis: {
                      stroke: lastRecordedDate
                        ? theme.palette.customColor.borderGrey
                        : theme.palette.customColor.axisBlack,
                    },
                    tickLabels: {
                      fill:
                        lastRecordedDate &&
                        theme.palette.customColor.lighterBlack,
                    },
                  }}
                />
                <VictoryAxis
                  orientation={dailyAvgChartConfig.yAxis.orientation}
                  dependentAxis
                  style={dailyAvgChartConfig.yAxis.style}
                  label='lbs'
                  axisLabelComponent={
                    <VictoryLabel
                      angle={0}
                      dy={-130}
                      style={{
                        fontWeight: 600,
                        fontSize: 15,
                        fill:
                          lastRecordedDate &&
                          theme.palette.customColor.lighterBlack,
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
                <VictoryLine
                  style={{
                    data: {
                      stroke: theme.palette.customColor.primaryGreen,
                      strokeWidth: 2,
                      strokeDasharray: '4,4',
                    },
                  }}
                  name='interuptionLine'
                  data={interupptionLine}
                />
              </VictoryChart>
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export {BodyWeight};

const weightStyle = makeStyles()((theme: any) => ({
  bodyContainerLeft: {
    borderRight: `1px solid ${theme.palette.customColor.lightSeparator}`,
    paddingRight: 5,
  },
  bodyContainerRight: {alignSelf: 'flex-start'},
  circle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    width: 180,
    borderRadius: '50%',
    padding: 5,
    background: theme.palette.background.green,
  },
  circleValue: {
    fontSize: 44,
    fontWeight: 'bold',
  },
  activityContainer: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
  },
  noDataValueColor: {
    color: theme.palette.customColor.lightBlack,
  },
  bMIValueColor: {
    color: theme.palette.customColor.primaryGreen,
  },
  noDataLabelColor: {
    color: theme.palette.customColor.lighterBlack,
  },
}));
