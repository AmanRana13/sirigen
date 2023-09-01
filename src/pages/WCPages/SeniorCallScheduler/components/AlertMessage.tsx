import {Box} from '@mui/material';
import AlertImage from '../../../../assets/icons/Alert.svg';
import {alertMessageStyle} from './AlertMessage.style';

/**
 * @description component to display alert message
 * @param {string} message
 * @returns JSX element
 */
const AlertMessage = ({message}: any) => {
  const {classes} = alertMessageStyle();

  return (
    <Box className={classes.alertBox} data-testid='alertMessage'>
      <Box component='img' alt='alert' src={AlertImage} />
      <Box component='span'>{message}</Box>
    </Box>
  );
};

export default AlertMessage;
