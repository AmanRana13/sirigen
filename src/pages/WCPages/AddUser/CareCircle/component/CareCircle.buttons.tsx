import {Box, Button} from '@mui/material';
export const CareCircleButton = (props: any) => {
  return (
    <Box className={props.className || ''}>
      <Button
        type={props.type}
        size='large'
        color='primary'
        variant={props.variant}
        onClick={props.onClick}
        startIcon={props.icon}
        className={props.buttonStyle}
        disabled={props.disabled}
        data-testid = {`${props.label}`}>
        {props.label}
      </Button>
    </Box>
  );
};
