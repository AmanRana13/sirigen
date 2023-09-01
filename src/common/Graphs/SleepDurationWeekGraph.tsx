import React from 'react';
import {VictoryChart, VictoryBar, VictoryAxis} from 'victory';

const SleepDurationWeekGraph = () => {
  return (
    <VictoryChart
      domainPadding={{x: 16}}
      // animate={{
      //   duration: 1000,
      //   onLoad: {duration: 200},
      // }}
      width={400}
      height={250}
      padding={{right: 75, bottom: 35, top: 20, left: 35}}>
      <VictoryBar
        data={[
          {x: 'Sun', y: 7, y0: -7},
          {x: 'Mon', y: 10, y0: -6},
          {x: 'Tue', y: 8, y0: -6},
          {x: 'Wed', y: 10, y0: -8},
          {x: 'Thu', y: 0, y0: -6},
          {x: 'Fri', y: -8, y0: 8},
          {x: 'Sat', y: -8, y0: 6},
        ]}
        style={{data: {fill: 'tomato', width: 16}}}
        cornerRadius={{top: 8, bottom: 8}}
        // y0="from"
      />
      <VictoryAxis
        style={
          {
            //axis: {stroke: 'transparent'},
          }
        }
      />
      <VictoryAxis
        orientation='right'
        dependentAxis
        domain={[-8, 12]}
        style={{
          //axis: {stroke: 'transparent'},
          grid: {
            stroke: 'grey',
          },
        }}
        // tickValues={(d) => console.log(d)}
        // axisValue={[-8,-6,-4,-2]}
      />
    </VictoryChart>
  );
};
export {SleepDurationWeekGraph};
