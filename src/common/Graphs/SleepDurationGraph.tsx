import {
  VictoryLabel,
  VictoryGroup,
  VictoryArea,
  VictoryChart,
  VictoryAxis,
  VictoryVoronoiContainer,
} from 'victory';
import moment from 'moment-timezone';

import {getHourMin} from 'globals/global.functions';
import {useTheme} from '@mui/material';

const getInHours = (value: any) => {
  const formatValue = moment.duration(value, 'seconds');
  return Math.floor(formatValue.asHours());
};
const SleepDurationGraph = ({sleepMonthGraph}: any) => {
  const theme: any = useTheme();
  const maxTotalTimeInBed = Math.max(
    ...sleepMonthGraph.totalTimeInBed.map((i: any) => i.y),
  );

  return (
    <VictoryChart
      width={600}
      domainPadding={{x: 20}}
      containerComponent={
        <VictoryVoronoiContainer
          activateLabels={true}
          labels={({datum}) => {
            return `${datum._x} ${datum._y}`;
          }}
          labelComponent={
            <Tooltip
              totalTimeInBed={sleepMonthGraph.totalTimeInBed}
              totalSleepTime={sleepMonthGraph.totalSleepTime}
            />
          }
        />
      }>
      <defs>
        <linearGradient id='grad' x1='1' y1='1' x2='1' y2='0'>
          <stop
            offset='1'
            stopColor={theme.palette.customColor.remGreen}
            stopOpacity='1'
          />
        </linearGradient>
        <linearGradient id='grad2' x1='1' y1='1' x2='1' y2='0'>
          <stop offset='0' stopColor='white' stopOpacity='1' />
          <stop
            offset='1'
            stopColor={theme.palette.customColor.intenseGreen}
            stopOpacity='1'
          />
        </linearGradient>
      </defs>
      <VictoryGroup
        colorScale={[
          theme.palette.customColor.remGreen,
          theme.palette.customColor.intenseGreen,
        ]}
        domain={{
          y: [1000, maxTotalTimeInBed + 10000],
        }}>
        <VictoryArea
          style={{
            data: {fill: 'url(#grad)'},
          }}
          data={sleepMonthGraph.totalTimeInBed}
        />
        <VictoryArea
          style={{
            data: {fill: 'url(#grad2)'},
          }}
          data={sleepMonthGraph.totalSleepTime}
        />
      </VictoryGroup>
      <VictoryAxis
        dependentAxis
        orientation='right'
        label='Hrs'
        axisLabelComponent={
          <VictoryLabel angle={0} dy={-130} dx={-2} style={{fontSize: 18}} />
        }
        tickFormat={(t) => getInHours(t)}
        style={{
          axis: {stroke: 'transparent'},
          tickLabels: {
            fontSize: 18,
            color: theme.palette.common.black,
          },
        }}
      />
      <VictoryAxis
        orientation='bottom'
        width={600}
        tickFormat={(t, index) => {
          if (index === 28 && sleepMonthGraph?.tickValues?.length === 29) {
            return '';
          } else {
            return index % 7 == 0 ? t : '';
          }
        }}
        style={{
          axis: {stroke: 'transparent'},
          tickLabels: {
            fontSize: 18,
            color: theme.palette.common.black,
          },
        }}
      />
    </VictoryChart>
  );
};

const Tooltip = (props: any) => {
  const theme: any = useTheme();
  const {x, datum, height} = props;
  const width = 140;
  const getTimeInBed = props.totalTimeInBed.find(
    (item: any) => item.x == datum.x,
  );
  const getTotalSleepTime = props.totalSleepTime.find(
    (item: any) => item.x == datum.x,
  );
  return (
    <g transform={`translate(${x - 70}, 0)`} key='tooltip'>
      <g transform='translate(0, 0)'>
        <rect
          height={76}
          width={width}
          stroke={theme.palette.customColor.strokeBlack}
          fill={theme.palette.common.white}
          ry={3}
          rx={3}
        />
        <text
          dx={width / 2}
          dy={15}
          alignmentBaseline='middle'
          textAnchor='middle'
          fontSize={14}
          fill={theme.palette.customColor.info}>
          {datum.z}
        </text>
        <circle
          cy={35}
          cx={10}
          r={5}
          stroke='white'
          strokeWidth={1}
          fill={theme.palette.customColor.remGreen}
        />
        <text
          dx={width / 1.9}
          dy={39}
          alignmentBaseline='middle'
          textAnchor='middle'
          fontSize={12}
          fill={theme.palette.common.black}>
          <tspan fill={theme.palette.customColor.info}>In Bed</tspan>{' '}
          <tspan>{getHourMin(getTimeInBed.y)}</tspan>
        </text>

        <circle
          cy={57}
          cx={10}
          r={5}
          stroke='white'
          strokeWidth={1}
          fill={theme.palette.customColor.intenseGreen}
        />
        <text
          dx={width / 1.9}
          dy={60}
          alignmentBaseline='middle'
          textAnchor='middle'
          fontSize={12}
          fill={theme.palette.common.black}>
          <tspan fill={theme.palette.customColor.info}>Asleep</tspan>{' '}
          <tspan>{getHourMin(getTotalSleepTime.y)}</tspan>
        </text>
      </g>
      <g transform={`translate(${width / 2}, 0)`}>
        <line y1={height - 50} y2={76} stroke='grey' strokeWidth={2} />
        <polygon
          points='0,85 -6,76 8,76'
          fill={theme.palette.common.white}
          stroke={theme.palette.customColor.strokeBlack}
          strokeWidth='1'
        />
      </g>
    </g>
  );
};
export {SleepDurationGraph};
