import React from 'react';
import {Box, useTheme} from '@mui/material';
import {
  VictoryAxis,
  VictoryArea,
  VictoryLegend,
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryLine,
  VictoryScatter,
  VictoryGroup,
  VictoryVoronoiContainer,
  VictoryLabel,
} from 'victory';
import get from 'lodash.get';

import {HeartRespirationTooltip} from 'common/Tooltips';
import {roundToTen} from 'globals/global.functions';

import {heartRateStyle} from './HearRate.style';

const HeartRateActivity = ({
  summary,
  heartRateActivity,
  activityChartData,
  minMaxData,
  type,
}: any) => {
  const theme: any = useTheme();
  const {classes} = heartRateStyle();
  const stackChartData = activityChartData;
  const lineChartData = heartRateActivity;
  const areaChartData = minMaxData;
  const legendChartData = [
    {
      name: 'Moderate',
      symbol: {fill: theme.palette.customColor.moderateGreen, type: 'square'},
    },
    {
      name: 'Intense',
      symbol: {fill: theme.palette.customColor.intenseGreen, type: 'square'},
    },
    {
      name: 'Heart Rate',
      symbol: {fill: theme.palette.customColor.error, type: 'minus'},
    },
  ];

  const minValue =
    type == 'day' ? roundToTen(get(summary, 'data.min') * 0.8, 'min') : 0;
  const maxValue = roundToTen(get(summary, 'data.max'), 'max');

  const getArray = (min: any, max: any) => {
    const step = 10;
    const len = Math.floor((max - min) / step) + 1;
    return Array(len)
      .fill(0)
      .map((_, idx) => min + idx * step);
  };

  return (
    <Box
      className={classes.activityContainer}
      data-testid='heart-rate-activity'>
      <VictoryChart
        minDomain={{y: minValue}}
        maxDomain={{y: maxValue}}
        domainPadding={50}
        width={900}
        height={300}
        containerComponent={
          <VictoryVoronoiContainer
            voronoiBlacklist={['area', 'bar']}
            activateLabels={true}
            labels={({datum}) => {
              return `${datum.x}`;
            }}
            labelComponent={
              <HeartRespirationTooltip
                data2={areaChartData}
                data={lineChartData}
              />
            }
          />
        }>
        <VictoryLegend
          orientation='horizontal'
          gutter={20}
          symbolSpacer={6}
          x={320}
          y={10}
          style={{
            labels: {fontSize: 16, padding: 0, margin: 0},
          }}
          data={legendChartData}
        />
        <VictoryAxis
          orientation='bottom'
          style={{
            axis: {
              stroke: theme.palette.customColor.titleBlack,
            },
            tickLabels: {
              fill: theme.palette.customColor.titleBlack,
              fontSize: 15,
            },
          }}
          tickFormat={(x) => x}
          fixLabelOverlap={true}
        />
        <VictoryAxis
          orientation='right'
          dependentAxis
          tickFormat={getArray(minValue, maxValue)}
          fixLabelOverlap={true}
          style={{
            axis: {
              stroke: theme.palette.customColor.lighterBlack,
            },
            tickLabels: {
              fill: theme.palette.customColor.lighterBlack,
              fontSize: 15,
            },
          }}
          label='bpm'
          axisLabelComponent={
            <VictoryLabel
              angle={0}
              dy={-130}
              style={{
                fontWeight: 600,
                fontSize: 15,
                color: theme.palette.customColor.lighterBlack,
              }}
            />
          }
        />
        <VictoryArea
          name='area'
          interpolation='natural'
          style={{
            data: {fill: theme.palette.customColor.whitesmoke, opacity: 0.5},
          }}
          data={areaChartData}
        />
        <VictoryStack
          colorScale={[
            theme.palette.customColor.moderateGreen,
            theme.palette.customColor.intenseGreen,
          ]}>
          {stackChartData.map((chartData: any) => {
            return (
              <VictoryBar
                name='bar'
                style={{data: chartData.length > 2 ? {} : {width: 30}}}
                key={`heartRateActivity-${chartData.length}`}
                data={chartData}
              />
            );
          })}
        </VictoryStack>
        <VictoryGroup
          style={{
            data: {
              fillOpacity: 0.7,
              stroke: theme.palette.customColor.intenseGreen,
              strokeWidth: 2,
            },
          }}
          color={theme.palette.common.white}
          data={lineChartData}>
          <VictoryLine
            style={{data: {stroke: theme.palette.customColor.error}}}
          />
          <VictoryScatter
            style={{data: {fill: theme.palette.common.white}}}
            size={4}
          />
        </VictoryGroup>
      </VictoryChart>
    </Box>
  );
};

export {HeartRateActivity};
