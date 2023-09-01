import {Box, Backdrop, CircularProgress} from '@mui/material';

import {loaderStyles} from './ApplicationLoader.style';

const AppFallbackLoader = () => {
  const {classes} = loaderStyles();

  return (
    <Backdrop
      className={classes.backdrop}
      open={true}
      data-testid='application-loader'>
      <Box className={classes.loaderContainer}>
        <CircularProgress thickness={2} size={100} color='inherit' />
      </Box>
    </Backdrop>
  );
};

export {AppFallbackLoader};
