import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory';

import './index.css';

interface IDoubleProgressProps {
  innerValue: number;
  outerValue: number;
  value: string;
}

const DoubleProgress = ({
  innerValue,
  outerValue,
  value,
}: IDoubleProgressProps) => {
  return (
    <>
      <div
        className={`progress-circle p${outerValue} ${
          outerValue > 50 && 'over50'
        }`}>
        <span>{}</span>
        <div className='left-half-clipper'>
          <div className='first50-bar'></div>
          <div className='value-bar'></div>
        </div>
        <svg
          viewBox='0 0 400 400'
          width='100%'
          height='100%'
          style={{zIndex: 9, position: 'relative'}}>
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={[
              {x: 1, y: innerValue},
              {x: 2, y: 100 - innerValue},
            ]}
            colorScale={['#3BA2F2', '#EEEEEE']}
            innerRadius={120}
            labels={() => null}
          />
          <VictoryAnimation duration={1000}>
            {() => {
              return (
                <VictoryLabel
                  textAnchor='middle'
                  verticalAnchor='middle'
                  x={200}
                  y={200}
                  text={value || '-'}
                  style={{fontSize: 70}}
                />
              );
            }}
          </VictoryAnimation>
        </svg>
      </div>
      <div></div>
    </>
  );
};

export {DoubleProgress};
