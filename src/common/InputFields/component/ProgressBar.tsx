import {Slider, Box} from '@mui/material';

export const ProgressBar = ({inputProps, eventProps, ...props}: any) => {
  function valuetext(value: number) {
    return `${value}`;
  }
  return (
    <Box
      width='100%'
      className={inputProps?.classes}
      style={{padding: 20}}
      data-testid={inputProps.dataTestid}>
      <Slider
        value={eventProps.value}
        onChange={eventProps.onChange}
        defaultValue={props.initialValue}
        getAriaValueText={valuetext}
        step={props.step}
        marks={props.marks}
        valueLabelDisplay={props.valueLabelDisplay}
      />
    </Box>
  );
};
