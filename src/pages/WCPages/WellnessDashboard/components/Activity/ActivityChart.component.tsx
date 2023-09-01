import React from 'react';
import {
  VictoryChart,
  VictoryLegend,
  VictoryAxis,
  VictoryStack,
  VictoryBar,
  VictoryLabel,
  VictoryVoronoiContainer,
} from 'victory';
import moment from 'moment-timezone';

import {getHourMin, roundOff} from 'globals/global.functions';
import {DATE_FORMAT_SHORT} from 'globals/global.constants';
import {Box, useTheme} from '@mui/material';

const ActivityChart = ({activityChartData, currentState, maxDomain}: any) => {
  const theme: any = useTheme();
  const legendChartData = [
    {
      name: 'Moderate',
      symbol: {fill: theme.palette.customColor.moderateGreen, type: 'square'},
    },
    {
      name: 'Intense',
      symbol: {fill: theme.palette.customColor.intenseGreen, type: 'square'},
    },
  ];
  return (
    <Box marginTop='75px'>
      <VictoryChart
        domainPadding={{x: 50, y: 20}}
        maxDomain={{y: currentState == 'day' ? maxDomain + 10 : maxDomain + 30}}
        width={900}
        containerComponent={
          <VictoryVoronoiContainer
            activateLabels={true}
            labels={(data) => {
              return data;
            }}
            labelComponent={
              <Tooltip data={activityChartData} currentState={currentState} />
            }
          />
        }>
        <VictoryLegend
          orientation='horizontal'
          x={350}
          y={5}
          data={legendChartData}
        />
        <VictoryAxis
          orientation='bottom'
          style={{
            axis: {
              stroke: theme.palette.customColor.borderGrey, //CHANGE COLOR OF Y-AXIS
            },
          }}
          tickFormat={(data) => {
            return moment(data).format(
              currentState == 'day' ? 'h A' : DATE_FORMAT_SHORT,
            );
          }}
          fixLabelOverlap={true}
        />
        <VictoryAxis
          orientation='right'
          dependentAxis
          style={{
            axis: {
              stroke: theme.palette.customColor.borderGrey, //CHANGE COLOR OF Y-AXIS
            },
          }}
          //tickValues={currentState == 'day' ? [] : yTicks}
          minDomain={{y: 0}}
          maxDomain={{y: 40}}
          tickFormat={(data, i) => {
            return currentState == 'day' ? data : `${roundOff(data / 60)}`;
          }}
          label={currentState == 'day' ? 'Minutes' : 'Hours'}
          axisLabelComponent={
            <VictoryLabel
              angle={0}
              dy={-130}
              dx={-20}
              style={{
                fontWeight: 600,
                fontSize: 15,
                fill: theme.palette.customColor.titleBlack,
              }}
            />
          }
        />
        <VictoryStack
          colorScale={[
            theme.palette.customColor.moderateGreen,
            theme.palette.customColor.intenseGreen,
          ]}>
          {activityChartData.map((chartData: any) => (
            <VictoryBar key={chartData.x + chartData.y} data={chartData} />
          ))}
        </VictoryStack>
      </VictoryChart>
    </Box>
  );
};

const Tooltip = (props: any) => {
  const theme: any = useTheme();
  const {x, data, datum, currentState} = props;
  const width = 140;
  const date = datum.x;
  let actual = [0, 0];
  if (data.length) {
    actual = data.map((val: any) => {
      const exact = val.filter((fil: any) => fil.x == date);
      return exact[0].y;
    });
  }

  if (actual[0] == 0 && actual[1] == 0) return null;

  return (
    <g transform={`translate(${x - 64.5}, 0)`} key='tooltip'>
      <g transform='translate(0, 0)'>
        <rect
          height={60}
          width={width}
          stroke={theme.palette.background.green}
          fill={theme.palette.background.green}
          ry={3}
          rx={3}
        />
        <text
          dx={5}
          dy={16}
          alignmentBaseline='inherit'
          textAnchor='start'
          fontSize={14}
          fill={theme.palette.customColor.info}>
          <tspan>
            {moment(date).format(currentState == 'day' ? 'h A' : 'MMMM D')}
          </tspan>
        </text>

        <circle
          cy={30}
          cx={10}
          r={5}
          strokeWidth={1}
          stroke={theme.palette.customColor.strokeGrey}
          fill={theme.palette.customColor.moderateGreen}
        />

        <text
          dx={20}
          dy={34}
          alignmentBaseline='inherit'
          textAnchor='start'
          fontSize={12}
          fill={theme.palette.common.black}>
          <tspan>MODERATE</tspan>
          <tspan dx={9}>{getHourMin(actual[0], 'm', 'short')}</tspan>
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
          fill='rgb(0,0,0)'>
          <tspan>INTENSE</tspan>
          <tspan dx={21}>{getHourMin(actual[1], 'm', 'short')}</tspan>
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

export {ActivityChart};
