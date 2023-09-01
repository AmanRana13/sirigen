import React from 'react';
import {VictoryBar, VictoryStack, VictoryLabel} from 'victory';

const DepthGraph = () => {
  return (
    <VictoryStack height={300} width={250}>
      <VictoryBar
        barWidth={50}
        cornerRadius={{bottom: 25}}
        style={{data: {fill: '#0097FF'}}}
        data={[{y: 38}]}
        labels={['Deep']}
        labelComponent={
          <VictoryLabel
            dy={20}
            dx={20}
            verticalAnchor='middle'
            textAnchor='end'
          />
        }
      />
      <VictoryBar
        barWidth={50}
        style={{data: {fill: '#00E6FF'}}}
        data={[{y: 40}]}
        labels={['Light']}
        labelComponent={
          <VictoryLabel
            dy={20}
            dx={20}
            verticalAnchor='middle'
            textAnchor='end'
          />
        }
      />

      <VictoryBar
        barWidth={50}
        style={{data: {fill: '#A8FF54'}}}
        data={[{y: 14}]}
        labels={['Rem']}
        labelComponent={
          <VictoryLabel
            dy={20}
            dx={20}
            verticalAnchor='middle'
            textAnchor='end'
          />
        }
      />
      <VictoryBar
        barWidth={50}
        style={{data: {fill: '#F2B921'}}}
        data={[{y: 8}]}
        cornerRadius={{top: 25}}
        labels={['Awake']}
        labelComponent={
          <VictoryLabel
            dy={20}
            dx={20}
            verticalAnchor='middle'
            textAnchor='end'
          />
        }
      />
    </VictoryStack>
  );
};
export {DepthGraph};
