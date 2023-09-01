import React from 'react';
import {Box, Grid, Typography, useTheme} from '@mui/material';
import {makeStyles} from 'tss-react/mui';
import moment from 'moment';
import {isEmpty} from 'lodash';
import {getTimestamp, kgToLbs, roundOff} from 'globals/global.functions';

import {wellnessDashboardStyle} from '../../../WellnessDashboard.style';
import {bodyHealthStyle} from '../BodyHealth.styles';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryVoronoiContainer,
} from 'victory';
import get from 'lodash.get';
import {DATE_FORMAT_SHORT} from 'globals/global.constants';
import clsx from 'clsx';

const BodyComposition = ({
  type,
  summary,
  difference,
  lastRecordedDate,
  lastAvailableKey,
  graphTickValues,
  ...props
}: any) => {
  const theme: any = useTheme();
  const {currentState} = props;
  const {classes: globalClasses} = wellnessDashboardStyle();
  const {classes} = bodyHealthStyle();
  const {classes: compositionClasses} = compositionStyle();
  const muscleDiff =
    get(difference, 'current_mass.muscle_mass') -
    get(difference, 'previous_mass.muscle_mass');
  const fatDiff =
    get(difference, 'current_mass.fat_mass') -
    get(difference, 'previous_mass.fat_mass');
  const boneDiff =
    get(difference, 'current_mass.bone_mass') -
    get(difference, 'previous_mass.bone_mass');

  const graphData = get(summary, 'all_data');
  const isNoData = (chart2: any) => {
    let isData = false;
    Object.entries(chart2).forEach(([key, value]: any) => {
      isData = value.find(function (ele: any) {
        return ele.y != null;
      });
    });
    return isData;
  };

  const createCompositionGraph = (arr: any) => {
    const chart1: any = {bone: [], muscle: [], fat: []};
    const chart2: any = {bone: [], muscle: [], fat: []};

    if (isEmpty(arr)) return;
    Object.entries(arr).forEach((data: any) => {
      chart1.bone.push({
        x: moment(getTimestamp(data[0])).format(
          type == 'day' ? 'LT' : DATE_FORMAT_SHORT,
        ),
        y: get(data[1], 'percentage.bone_mass'),
      });
      chart1.muscle.push({
        x: moment(getTimestamp(data[0])).format(
          type == 'day' ? 'LT' : DATE_FORMAT_SHORT,
        ),
        y: get(data[1], 'percentage.muscle_mass'),
      });
      chart1.fat.push({
        x: moment(getTimestamp(data[0])).format(
          type == 'day' ? 'LT' : DATE_FORMAT_SHORT,
        ),
        y: get(data[1], 'percentage.fat_mass'),
      });
    });

    graphTickValues.forEach((tick: any) => {
      Object.entries(chart1).forEach(([key, value]: any) => {
        const compositionData = value.find((data: any) => {
          return data.x === tick;
        });

        compositionData != undefined
          ? chart2[`${key}`].push({x: tick, y: compositionData.y})
          : chart2[`${key}`].push({x: tick, y: null});
      });
    });
    let data = isNoData(chart2);

    if (data) {
      return chart2;
    }
  };
  const bodyCompositionData = createCompositionGraph(graphData);

  const dailyAvgChartConfig: any = {
    chart: {width: 1000},
    xAxis: {orientation: 'bottom'},
  };

  const loadDayPercentageChart = () => {
    return currentState === 'day'
      ? compositionDayChart()
      : compositionWeekChart();
  };

  const compositionDayChart = () => {
    const avgBoneMass = roundOff(
      get(summary, `all_data[${lastAvailableKey}].percentage.bone_mass`) || 0,
    );
    const avgFatRatio = roundOff(
      get(summary, `all_data[${lastAvailableKey}].percentage.fat_mass`) || 0,
    );
    const avgMuscleMass = roundOff(
      get(summary, `all_data[${lastAvailableKey}].percentage.muscle_mass`) || 0,
    );

    return (
      <>
        <Box height={160} mb={4} data-testid='day-body-composition-bar'>
          <Box
            className={compositionClasses.dayBarChart}
            height={`${avgMuscleMass}%`}>
            <Box
              className={compositionClasses.dayBarChartArea}
              style={{backgroundColor: theme.palette.background.green}}></Box>
            <Box ml={1} display='flex' alignItems='center'>
              <Typography className={compositionClasses.dayBarChartText}>
                MUSCLE
              </Typography>
              <Typography
                className={clsx(compositionClasses.dayBarChartValue, {
                  [compositionClasses.disableTextColor]: lastRecordedDate,
                })}>
                {avgMuscleMass}%
              </Typography>
            </Box>
          </Box>
          <Box
            className={compositionClasses.dayBarChart}
            height={`${avgFatRatio}%`}>
            <Box
              style={{backgroundColor: theme.palette.customColor.remGreen}}
              className={compositionClasses.dayBarChartArea}></Box>
            <Box ml={1} display='flex' alignItems='center'>
              <Typography className={compositionClasses.dayBarChartText}>
                FAT
              </Typography>
              <Typography
                className={clsx(compositionClasses.dayBarChartValue, {
                  [compositionClasses.disableTextColor]: lastRecordedDate,
                })}>
                {avgFatRatio}%
              </Typography>
            </Box>
          </Box>
          <Box
            className={compositionClasses.dayBarChart}
            height={`${avgBoneMass}%`}>
            <Box
              style={{backgroundColor: theme.palette.customColor.intenseGreen}}
              className={compositionClasses.dayBarChartArea}></Box>
            <Box ml={1} display='flex' alignItems='center'>
              <Typography className={compositionClasses.dayBarChartText}>
                BONE
              </Typography>
              <Typography
                className={clsx(compositionClasses.dayBarChartValue, {
                  [compositionClasses.disableTextColor]: lastRecordedDate,
                })}>
                {avgBoneMass}%
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    );
  };
  const compositionWeekChart = () => {
    if (isEmpty(bodyCompositionData)) {
      return (
        <Box display='flex' flexDirection='column'>
          <Box
            style={{
              textAlign: 'center',
              width: '100%',
              color: theme.palette.customColor.lighterBlack,
              fontSize: 18,
            }}
            mt={6}>
            No Data
          </Box>
          <VictoryChart width={dailyAvgChartConfig.chart.width} height={150}>
            <VictoryAxis
              orientation={dailyAvgChartConfig.xAxis.orientation}
              fixLabelOverlap={true}
              tickValues={graphTickValues}
              style={{
                axis: {stroke: theme.palette.customColor.borderGrey},
                tickLabels: {
                  fill: theme.palette.customColor.lighterBlack,
                  fontSize: 15,
                },
              }}
            />
          </VictoryChart>
        </Box>
      );
    } else {
      return (
        <VictoryChart
          domainPadding={{x: 20, y: 20}}
          width={790}
          height={200}
          containerComponent={
            <VictoryVoronoiContainer
              activateLabels={true}
              labels={(data) => {
                return data;
              }}
              labelComponent={
                <Tooltip
                  data={[
                    bodyCompositionData.bone,
                    bodyCompositionData.fat,
                    bodyCompositionData.muscle,
                  ]}
                />
              }
            />
          }>
          <VictoryAxis orientation='bottom' fixLabelOverlap={true} />

          <VictoryStack
            colorScale={[
              theme.palette.customColor.intenseGreen,
              theme.palette.customColor.remGreen,
              theme.palette.background.green,
            ]}
            padding={{right: 89}}>
            <VictoryBar
              barRatio={bodyCompositionData.bone.length == 1 ? 8 : undefined}
              data={bodyCompositionData.bone}
              barWidth={currentState === 'week' ? 70 : 15}
            />
            <VictoryBar
              barRatio={bodyCompositionData.fat.length == 1 ? 8 : undefined}
              data={bodyCompositionData.fat}
              barWidth={currentState === 'week' ? 70 : 15}
            />
            <VictoryBar
              barRatio={bodyCompositionData.muscle.length == 1 ? 8 : undefined}
              data={bodyCompositionData.muscle}
              barWidth={currentState === 'week' ? 70 : 15}
            />
          </VictoryStack>
        </VictoryChart>
      );
    }
  };
  return (
    <>
      <Box className={classes.headerContainer}>
        <Box className={globalClasses.cardTitle}>Body Composition</Box>
      </Box>

      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        data-testid='body-composition-graph'>
        <Grid item sm={5} className={compositionClasses.bodyContainerLeft}>
          <Box
            className={clsx(
              compositionClasses.square,
              {
                [compositionClasses.noData]:
                  type !== 'day' && !get(summary, `extremities`, 0),
              },
              {
                [compositionClasses.noData]:
                  (type == 'day' && !muscleDiff) || lastRecordedDate,
              },
            )}>
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems='center'>
              <Grid item sm={4} className={compositionClasses.squareLabel}>
                MUSCLE
              </Grid>
              <Grid
                item
                sm={4}
                className={clsx(compositionClasses.squareValue, {
                  [compositionClasses.disableTextColor]: lastRecordedDate,
                })}>
                {roundOff(
                  type == 'day'
                    ? kgToLbs(muscleDiff)
                    : get(
                        summary,
                        `extremities.percentage.average_muscle_mass`,
                      ) || 0,
                )}
                {type !== 'day' && `%`}
              </Grid>
              {type !== 'day' && (
                <Grid
                  item
                  sm={4}
                  className={clsx(compositionClasses.squareAvg, {
                    [compositionClasses.disableTextColor]:
                      isEmpty(bodyCompositionData),
                  })}>
                  <div>
                    High:{' '}
                    {roundOff(
                      get(summary, 'extremities.percentage.max_muscle_mass'),
                    ) || 0}
                    %
                  </div>
                  <div>
                    Low:{' '}
                    {roundOff(
                      get(summary, 'extremities.percentage.min_muscle_mass'),
                    ) || 0}
                    %
                  </div>
                </Grid>
              )}
            </Grid>
          </Box>
          <Box
            className={clsx(
              compositionClasses.square,
              {
                [compositionClasses.noData]:
                  type !== 'day' && !get(summary, `extremities`, 0),
              },
              {
                [compositionClasses.noData]:
                  (type == 'day' && !fatDiff) || lastRecordedDate,
              },
            )}>
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems='center'>
              <Grid item sm={4} className={compositionClasses.squareLabel}>
                FAT
              </Grid>
              <Grid
                item
                sm={4}
                className={clsx(compositionClasses.squareValue, {
                  [compositionClasses.disableTextColor]: lastRecordedDate,
                })}>
                {roundOff(
                  type == 'day'
                    ? kgToLbs(fatDiff)
                    : get(summary, `extremities.percentage.average_fat_mass`) ||
                        0,
                )}
                {type !== 'day' && `%`}
              </Grid>
              {type !== 'day' && (
                <Grid
                  item
                  sm={4}
                  className={clsx(compositionClasses.squareAvg, {
                    [compositionClasses.disableTextColor]:
                      isEmpty(bodyCompositionData),
                  })}>
                  <div>
                    High:{' '}
                    {roundOff(
                      get(summary, 'extremities.percentage.max_fat_mass'),
                    ) || 0}
                    %
                  </div>
                  <div>
                    Low:{' '}
                    {roundOff(
                      get(summary, 'extremities.percentage.min_fat_mass'),
                    ) || 0}
                    %
                  </div>
                </Grid>
              )}
            </Grid>
          </Box>
          <Box
            className={clsx(
              compositionClasses.square,
              {
                [compositionClasses.noData]:
                  type !== 'day' && !get(summary, `extremities`, 0),
              },
              {
                [compositionClasses.noData]:
                  (type == 'day' && !boneDiff) || lastRecordedDate,
              },
            )}>
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems='center'>
              <Grid item sm={4} className={compositionClasses.squareLabel}>
                BONE
              </Grid>
              <Grid
                item
                sm={4}
                className={clsx(compositionClasses.squareValue, {
                  [compositionClasses.disableTextColor]: lastRecordedDate,
                })}>
                {roundOff(
                  type == 'day'
                    ? kgToLbs(boneDiff)
                    : get(
                        summary,
                        `extremities.percentage.average_bone_mass`,
                      ) || 0,
                )}
                {type !== 'day' && `%`}
              </Grid>
              {type !== 'day' && (
                <Grid
                  item
                  sm={4}
                  className={clsx(compositionClasses.squareAvg, {
                    [compositionClasses.disableTextColor]:
                      isEmpty(bodyCompositionData),
                  })}>
                  <div>
                    High:{' '}
                    {roundOff(
                      get(summary, 'extremities.percentage.max_bone_mass'),
                    ) || 0}
                    %
                  </div>
                  <div>
                    Low:{' '}
                    {roundOff(
                      get(summary, 'extremities.percentage.min_bone_mass'),
                    ) || 0}
                    %
                  </div>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>

        <Grid item sm={7} className={compositionClasses.graphContainer}>
          <Box display='flex' justifyContent='space-between' pl={2}>
            <Box className={compositionClasses.subHeading}>Day Percentage</Box>
            {lastRecordedDate && (
              <Box
                className={clsx(
                  globalClasses.lastRecordedTitle,
                  globalClasses.lastRecordedRelativeStyle,
                )}>
                Last recorded &nbsp;
                {lastRecordedDate}
              </Box>
            )}
          </Box>
          <Box display='flex' alignItems='center' justifyContent='center'>
            {loadDayPercentageChart()}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

const Tooltip = (props: any) => {
  const theme: any = useTheme();
  const {x, data, datum} = props;
  const width = 130;
  const date = datum.x;
  let actual = [0, 0, 0];
  if (data.length) {
    actual = data?.map((val: any) => {
      const exact = val.filter((fil: any) => fil.x == date);
      return exact[0].y;
    });
  }

  return (
    <g transform={`translate(${x - 65}, 0)`} key='tooltip'>
      <g transform='translate(0, 0)'>
        <rect
          height={60}
          width={width}
          stroke={theme.palette.background.green}
          fill={theme.palette.background.green}
          ry={3}
          rx={3}
        />
        <circle
          cy={15}
          cx={10}
          r={5}
          strokeWidth={1}
          stroke={theme.palette.customColor.strokeGrey}
          fill={theme.palette.background.green}
        />
        <text
          dx={20}
          dy={18}
          alignmentBaseline='inherit'
          textAnchor='start'
          fontSize={12}
          fill={theme.palette.common.black}>
          <tspan>MUSCLE</tspan>
          <tspan dx={14}>{roundOff(actual[2])}%</tspan>
        </text>

        <circle
          cy={30}
          cx={10}
          r={5}
          strokeWidth={1}
          stroke={theme.palette.customColor.strokeGrey}
          fill={theme.palette.customColor.remGreen}
        />
        <text
          dx={20}
          dy={34}
          //alignmentBaseline='middle'
          textAnchor='start'
          fontSize={12}
          fill={theme.palette.common.black}>
          <tspan>FAT</tspan>
          <tspan dx={38}>{roundOff(actual[1])}%</tspan>
        </text>
        <circle
          cy={46}
          cx={10}
          r={5}
          strokeWidth={1}
          stroke={theme.palette.customColor.strokeGrey}
          fill={theme.palette.customColor.intenseGreen}
        />
        <text
          dx={20}
          dy={50}
          alignmentBaseline='middle'
          textAnchor='start'
          fontSize={12}
          fill={theme.palette.common.black}>
          <tspan>BONE</tspan>
          <tspan dx={28}>{roundOff(actual[0])}%</tspan>
        </text>
      </g>
      <g transform={`translate(${width / 2}, -16)`}>
        <polygon
          points='0,85 -6,76 8,76'
          stroke={theme.palette.background.green}
          fill={theme.palette.background.green}
          strokeWidth='1'
        />
      </g>
    </g>
  );
};

export {BodyComposition};

const compositionStyle = makeStyles()((theme: any) => ({
  bodyContainerLeft: {
    borderRight: `1px solid ${theme.palette.customColor.lightSeparator}`,
  },
  graphContainer: {
    alignSelf: 'flex-start',
  },
  square: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    //minHeight: 70,
    width: '55%',
    borderRadius: 10,
    border: `solid 2px ${theme.palette.customColor.squareGreen}`,
    padding: 5,
    margin: 'auto',
    marginTop: 20,
  },
  noData: {
    border: `solid 2px ${theme.palette.customColor.noDataGrey}`,
  },
  squareLabel: {
    color: theme.palette.customColor.lighterBlack,
    // display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  squareValue: {
    fontSize: 20,
    color: theme.palette.customColor.primaryGreen,
    //marginLeft: 3,
  },
  squareAvg: {
    color: theme.palette.common.black,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  subHeading: {
    color: theme.palette.customColor.lighterBlack,
    fontSize: 18,
    textTransform: 'uppercase',
    position: 'relative',
    bottom: 25,
  },
  dayBarChart: {
    display: 'flex',
    minHeight: 15,
    alignItems: 'center',
  },
  dayBarChartArea: {
    height: '100%',
    width: 100,
  },
  dayBarChartText: {
    display: 'flex',
    fontSize: 14,
    color: theme.palette.customColor.lighterBlack,
    marginRight: 5,
  },
  dayBarChartValue: {
    fontSize: 17,
    fontWeight: 'bold',
    color: theme.palette.common.black,
  },
  disableTextColor: {
    color: theme.palette.customColor.noDataGrey,
  },
}));
