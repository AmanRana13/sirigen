import {useTheme} from '@mui/material';
import {roundOff} from 'globals/global.functions';

export const HeartRespirationTooltip = (props: any) => {
  const theme: any = useTheme();
  const {x, datum, height, data, data2} = props;
  const width = 70;
  const date = datum.x;
  let actualRate = 0;
  let min = 0;
  let max = 0;
  if (data.length) {
    data?.forEach((val: any) => {
      if (val.x == date) {
        actualRate = val.y;
      }
    });
  }
  if (data2.length) {
    data2?.forEach((val: any) => {
      if (val.x == date) {
        min = val.y;
        max = val.y0;
      }
    });
  }

  return (
    <g
      transform={`translate(${x - 35}, 0)`}
      key='tooltip'
      data-testid='heart-respiration-tooltip'>
      <g transform='translate(0, 0)'>
        <rect
          height={60}
          width={width}
          fill={theme.palette.background.green}
          ry={3}
          rx={3}
        />
        <text
          dx={width / 2}
          dy={15}
          alignmentBaseline='middle'
          textAnchor='middle'
          fontSize={14}
          fill={theme.palette.common.black}>
          {roundOff(actualRate)}
        </text>

        <text
          dx={width / 2}
          dy={32}
          alignmentBaseline='middle'
          textAnchor='middle'
          fontSize={12}
          fill={theme.palette.common.black}>
          HIGH {max}
        </text>

        <text
          dx={width / 2}
          dy={47}
          alignmentBaseline='middle'
          textAnchor='middle'
          fontSize={12}
          fill={theme.palette.common.black}>
          LOW {min}
        </text>
      </g>
      <g transform={`translate(${width / 2}, 0)`}>
        <line
          y1={height - 50}
          y2={60}
          stroke={theme.palette.customColor.strokegrey}
          strokeWidth={1}
        />
        <polygon
          points='0,70 -6,60 8,60'
          fill={theme.palette.background.green}
          stroke={theme.palette.background.green}
          strokeWidth='1'
        />
      </g>
    </g>
  );
};
