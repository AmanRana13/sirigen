import React from 'react';
import {Box, useTheme} from '@mui/material';
import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryLabel,
  VictoryVoronoiContainer,
} from 'victory';
import moment from 'moment-timezone';

import {getTimestamp} from 'globals/global.functions';
import {sleepStyle} from '../Sleep.style';

const AverageSleep = ({graphData, interupptionGraph}: any) => {
  const theme: any = useTheme();
  const {classes} = sleepStyle();

  return (
    <>
      <Box
        className={classes.heartRateContainer}
        data-testid='average-sleep-graph'>
        <VictoryChart
          width={900}
          height={312}
          minDomain={{y: 30}}
          containerComponent={
            <VictoryVoronoiContainer
              activateLabels={true}
              labels={({datum}) => {
                return `${datum._x} ${datum._y}`;
              }}
              labelComponent={<Tooltip />}
            />
          }>
          <VictoryAxis
            dependentAxis={true}
            style={{
              axis: {stroke: 'none'},
              grid: {stroke: theme.palette.customColor.strokeGrey},
            }}
            label='bpm'
            axisLabelComponent={
              <VictoryLabel
                angle={0}
                dy={-120}
                style={{fontWeight: 600, fontSize: 15}}
              />
            }
          />
          <VictoryLine
            style={{
              data: {
                stroke: theme.palette.customColor.moderateGreen,
                strokeWidth: 2,
              },
            }}
            data={graphData}
          />
          <VictoryLine
            style={{
              data: {
                stroke: theme.palette.customColor.strokeBlue,
                strokeWidth: 3,
              },
            }}
            data={interupptionGraph}
          />
        </VictoryChart>
      </Box>
    </>
  );
};

const Tooltip = (props: any) => {
  const theme: any = useTheme();
  const {x, datum, height} = props;

  return (
    <g transform={`translate(${x - 40}, 0)`} key='tooltip'>
      <g transform='translate(0, 0)'>
        <rect
          height={76}
          width={80}
          stroke={theme.palette.background.green}
          fill={theme.palette.background.green}
          ry={3}
          rx={3}
        />
        <text
          dx={80 / 2}
          dy={30}
          alignmentBaseline='middle'
          textAnchor='middle'
          fontSize={36}
          fill={theme.palette.common.black}>
          {datum.y}
        </text>
        <text
          dx={80 / 2}
          dy={58}
          alignmentBaseline='middle'
          textAnchor='middle'
          fontSize={14}
          fontWeight='bold'
          fill={theme.palette.customColor.info}>
          {moment(getTimestamp(datum.x)).format('h:mm a')}
        </text>
      </g>
      <g transform={`translate(${80 / 2}, 0)`}>
        <line y1={height - 30} y2={76} stroke='grey' strokeWidth={2} />
        <polygon
          points='0,85 -6,76 8,76'
          fill={theme.palette.background.green}
          stroke={theme.palette.background.green}
          strokeWidth='1'
        />
      </g>
    </g>
  );
};

export {AverageSleep};
