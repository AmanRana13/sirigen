import {Box, CircularProgress} from '@mui/material';
import {ICircleProps, ICircularGraphProps} from './CircularGraph.types';
import {theme} from 'config/theme.config';

const Circle = ({
  value = 0,
  color = theme?.palette?.customColor?.black,
  bgColor = theme?.palette?.customColor?.bgGrey,
  size = 100,
  thickness = 0.1,
  top = 0,
  left = 0,
}: ICircleProps) => {
  return (
    <Box
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
      }}
      data-testid='circular-graph-circle'>
      <CircularProgress
        variant='determinate'
        value={100}
        style={{
          color: bgColor,
          position: 'absolute',
          top: top,
          left: left,
        }}
        size={size}
        thickness={thickness}
      />
      <CircularProgress
        variant='determinate'
        value={value}
        style={{
          color: color,
          position: 'absolute',
          top: top,
          left: left,
        }}
        size={size}
        thickness={thickness}
      />
    </Box>
  );
};

const CircularGraph = ({
  data = [],
  bgColor = theme?.palette?.customColor?.bgGrey,
  thickness = 7.5,
  gap = 10,
  centerSize = 50,
}: ICircularGraphProps) => {
  return (
    <Box position='relative' data-testid='circular-graph'>
      {data.map((circle, i) => {
        let size = centerSize + thickness * 2;
        if (i > 0) {
          size = size + i * (thickness + gap * 2) * 2;
        }
        const thicknessRatio = (thickness / size) * 100;
        const position = (data.length - i - 1) * (thickness + gap * 2);
        return (
          <Circle
            key={circle.key}
            color={circle.color}
            bgColor={circle.bgColor || bgColor}
            value={circle.value > 100 ? 100 : circle.value}
            size={size}
            thickness={thicknessRatio}
            left={position}
            top={position}
          />
        );
      })}
    </Box>
  );
};

export default CircularGraph;
