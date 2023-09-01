import {Box} from '@mui/material';
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryLabel,
  VictoryGroup,
  VictoryTheme,
} from 'victory';
import {DATE_FORMAT, TIME_FORMAT} from 'globals/global.constants';
import moment from 'moment';
import {createDashedLine, updateHistoryDateFilter} from '../Threshold.action';
import {useAppDispatch} from 'hooks/reduxHooks';
const Chart = ({selectedVital, actual, baseline}: any) => {
  const heartRateArray = selectedVital.array;

  const createHeartRateGraph = (arr: any) => {
    if (!arr) return;
    let chart: any = [];
    let chart2: any = [];
    let chart3: any = [];
    Object.entries(arr).forEach((data: any) => {
      chart.push({
        x: data[0],
        y: data[1].heart_rate,
      });
      chart2.push({x: data[0], y: baseline.high});
      chart3.push({x: data[0], y: baseline.low});
    });
    return [chart, chart2, chart3];
  };

  const victoryAreaChartData = createHeartRateGraph(heartRateArray);
  const interupted: any = victoryAreaChartData
    ? createDashedLine(victoryAreaChartData[0], baseline)
    : [];
  const redLine = interupted[0];
  const blueLine = interupted[1];
  const dailyAvgChartConfig: any = {
    chart: {width: 3000},
    label: {dx: 500, dy: 20},
    xAxis: {
      orientation: 'bottom',
      fixLabelOverlap: true,
      style: {tickLabels: {angle: 90}},
    },
    yAxis: {
      orientation: 'left',
    },
  };

  const getArray = (min: any, max: any, step: any) => {
    const len = Math.floor((max - min) / step) + 1;
    if (isNaN(len)) {
      return [];
    }
    return Array(len)
      .fill(0)
      .map((_, idx) => min + idx * step);
  };

  return (
    <Box
      data-testid='heart-rate-chart'
      display='flex'
      paddingLeft={1}
      height={410}>
      {victoryAreaChartData && (
        <Box width='3000px'>
          <VictoryChart
            width={dailyAvgChartConfig.chart.width}
            height={379}
            minDomain={{x: 0, y: actual.low}}
            maxDomain={{x: victoryAreaChartData[0].length, y: actual.high}}
            containerComponent={
              <VictoryVoronoiContainer
                voronoiBlacklist={['baselineHigh', 'baselineLow']}
                labels={({datum}) =>
                  datum.y != null ? `value: ${datum.y}` : ''
                }
                activateLabels={true}
                labelComponent={<Tooltip array={heartRateArray} />}
              />
            }>
            <VictoryAxis
              orientation={dailyAvgChartConfig.xAxis.orientation}
              tickFormat={(t) => {
                if (t % 50 == 0) {
                  return t;
                } else {
                  return '';
                }
              }}
            />
            <VictoryAxis
              orientation={dailyAvgChartConfig.yAxis.orientation}
              dependentAxis
              style={dailyAvgChartConfig.yAxis.style}
              tickFormat={getArray(0, actual.high, 20)}
              fixLabelOverlap={true}
              axisLabelComponent={
                <VictoryLabel
                  angle={0}
                  dy={-130}
                  dx={-37}
                  style={{fontWeight: 600, fontSize: 15}}
                />
              }
            />
            <VictoryGroup
              theme={VictoryTheme.material}
              style={{
                data: {
                  fillOpacity: 0.7,
                  stroke: '#af0902',
                  strokeWidth: 1,
                },
              }}
              name='red'
              data={redLine}
              color='#fff'>
              <VictoryLine
                style={{
                  data: {
                    stroke: '#af0902',
                    strokeWidth: 1,
                  },
                }}
                name='red'
              />
            </VictoryGroup>
            <VictoryGroup
              theme={VictoryTheme.material}
              style={{
                data: {
                  fillOpacity: 0.7,
                  stroke: '#00c8de',
                  strokeWidth: 1,
                },
              }}
              name='blue'
              data={blueLine}
              color='#fff'>
              <VictoryLine
                style={{
                  data: {
                    stroke: '#00c8de',
                    strokeWidth: 1,
                  },
                }}
                name='blue'
              />
            </VictoryGroup>
            <VictoryGroup
              style={{
                data: {
                  fillOpacity: 0.7,
                  stroke: '#00c8de',
                  strokeWidth: 2,
                },
              }}
              data={victoryAreaChartData[1]}
              color='#fff'>
              <VictoryLine
                style={{
                  data: {
                    stroke: 'rgba(255, 192, 0, 0.75)',
                    strokeWidth: 4,
                  },
                }}
                name='baselineHigh'
              />
            </VictoryGroup>
            <VictoryGroup
              style={{
                data: {
                  fillOpacity: 0.7,
                  stroke: '#00c8de',
                  strokeWidth: 2,
                },
              }}
              data={victoryAreaChartData[2]}
              color='#fff'>
              <VictoryLine
                style={{
                  data: {
                    stroke: 'rgba(121, 190, 39, 0.75)',
                    strokeWidth: 4,
                  },
                }}
                name='baselinelow'
              />
            </VictoryGroup>
          </VictoryChart>
        </Box>
      )}
    </Box>
  );
};
const Tooltip = (props: any) => {
  const {x, y, array, datum} = props;
  const dispatch: any = useAppDispatch();
  const width = 125;
  return (
    <g
      transform={`translate(${x - 64.5}, 0)`}
      key='tooltip'
      onClick={() => {
        dispatch(updateHistoryDateFilter(array[datum.x].time / 1000000));
      }}>
      <g transform={`translate(0,${y - 67.5})`}>
        <rect
          height={60}
          width={width}
          stroke='#DFF4F3'
          fill='#DFF4F3'
          ry={3}
          rx={3}
        />
        <text
          dx={10}
          dy={16}
          alignmentBaseline='auto'
          textAnchor='start'
          fontSize={12}
          fill='rgb(0,0,0)'>
          <tspan>Value:</tspan>
          <tspan dx={9}>{datum.y}</tspan>
        </text>

        <text
          dx={10}
          dy={32}
          alignmentBaseline='auto'
          textAnchor='start'
          fontSize={12}
          fill='rgb(0,0,0)'>
          <tspan>Date:</tspan>
          <tspan dx={9}>
            {moment(array[datum.x].time / 1000000).format(DATE_FORMAT)}
          </tspan>
        </text>
        <text
          dx={10}
          dy={48}
          alignmentBaseline='middle'
          textAnchor='start'
          fontSize={12}
          fill='rgb(0,0,0)'>
          <tspan>Time:</tspan>
          <tspan dx={9}>
            {moment(array[datum.x].time / 1000000).format(TIME_FORMAT)}
          </tspan>
        </text>
      </g>
      <g transform={`translate(${width / 2}, ${y - 82.5})`}>
        <polygon
          points='0,85 -6,76 8,76'
          fill='#DFF4F3'
          stroke='#DFF4F3'
          strokeWidth='1'
        />
      </g>
    </g>
  );
};
export default Chart;
