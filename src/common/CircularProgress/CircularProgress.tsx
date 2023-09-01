import {VictoryPie, VictoryAnimation, VictoryLabel} from 'victory';

import './index.css';
import {useCallback} from 'react';

interface ICircularProgressProps {
  value: number;
  innerText?: string;
  tooltip?: boolean;
  outOff?: number;
  fontSize?: number;
}

const CircularProgress = ({
  value,
  outOff,
  innerText = '',
  tooltip = false,
  fontSize = 120,
}: ICircularProgressProps) => {
  const showValue = useCallback(() => {
    return outOff && value
      ? `${Math.trunc(value)}/${outOff}`
      : innerText || value;
  }, [value, innerText, outOff]);

  return (
    <div data-testid='circular-progress'>
      <svg viewBox='0 0 400 400' width='100%' height='100%'>
        {tooltip && (
          <title data-testid='circular-progress-tooltip'>{value}</title>
        )}
        <VictoryPie
          standalone={false}
          width={400}
          height={400}
          data={[
            {x: 1, y: value},
            {x: 2, y: 100 - value},
          ]}
          colorScale={['#19B3A6', '#EEEEEE']}
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
                text={showValue()}
                style={{fontSize: fontSize}}
              />
            );
          }}
        </VictoryAnimation>
      </svg>
    </div>
  );
};

export {CircularProgress};
