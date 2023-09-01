import React from 'react';
import {Box} from '@mui/material';
import {
  VictoryAxis,
  VictoryArea,
  VictoryLegend,
  VictoryChart,
  VictoryStack,
  VictoryBar,
  VictoryLine,
  VictoryGroup,
  VictoryScatter,
  VictoryVoronoiContainer,
} from 'victory';
import get from 'lodash.get';

import {HeartRespirationTooltip} from 'common/Tooltips';

import {respirationStyle} from '../Respiration.styles';

const RespirationActivity = ({
  summary,
  activityChartData,
  respirationRate,
  minMaxData,
}: any) => {
  const {classes} = respirationStyle();
  const stackChartData = activityChartData;
  const lineChartData = respirationRate;
  const areaChartData = minMaxData;
  const legendChartData = [
    {name: 'Moderate', symbol: {fill: '#52E6FF', type: 'square'}},
    {name: 'Intense', symbol: {fill: '#3BA2F2', type: 'square'}},
    {name: 'Respiration', symbol: {fill: '#ff6932', type: 'minus'}},
  ];
  return (
    <>
      <Box
        className={classes.activityContainer}
        data-testid='respiration-activity'>
        <VictoryChart
          minDomain={{y: Math.floor(get(summary, 'data.min') * 0.8)}}
          maxDomain={{y: get(summary, 'data.max') + 1}}
          domainPadding={50}
          width={900}
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
                stroke: '#707070', //CHANGE COLOR OF Y-AXIS
              },
            }}
            tickFormat={(x) => x}
            fixLabelOverlap={true}
          />
          <VictoryAxis
            orientation='right'
            dependentAxis
            tickFormat={(y) => y}
            style={{
              axis: {
                stroke: '#707070', //CHANGE COLOR OF Y-AXIS
              },
            }}
          />
          <VictoryArea
            interpolation='natural'
            style={{data: {fill: '#dadada', opacity: 0.5}}}
            data={areaChartData}
          />
          <VictoryStack colorScale={['#52E6FF', '#3BA2F2']}>
            {stackChartData.map((chartData: any) => (
              <VictoryBar
                style={{data: chartData.length > 2 ? {} : {width: 30}}}
                key={chartData.x + chartData.y}
                data={chartData}
              />
            ))}
          </VictoryStack>
          <VictoryGroup
            style={{
              data: {
                fillOpacity: 0.7,
                stroke: '#00c8de',
                strokeWidth: 2,
              },
            }}
            color='#fff'
            data={lineChartData}>
            <VictoryLine style={{data: {stroke: '#ff6932'}}} />
            <VictoryScatter style={{data: {fill: '#fff'}}} size={4} />
          </VictoryGroup>
        </VictoryChart>
      </Box>
    </>
  );
};

export {RespirationActivity};
