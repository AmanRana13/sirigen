import {Box, Typography} from '@mui/material';
import Welcome from 'assets/Welcome.png';
import {getCareAgentInfo} from 'globals/global.functions';
import {welcomeWrapperStyle} from './WelcomeWrapper.style';
import {ReactNode} from 'react';

const WelcomeWrapper = ({children}: {children?: ReactNode}) => {
  const careAgentInfo = getCareAgentInfo();
  const {classes} = welcomeWrapperStyle();

  return (
    <>
      <Box className={classes.welcomeContainer} data-testid='home-component'>
        <Box className={classes.welcomeImageContainer}>
          <img
            alt='welcome username image'
            className={classes.welcomeImage}
            src={Welcome}
          />
        </Box>
        <Box className={classes.welcomeText}>
          <Box display='flex'>
            <Typography variant='h2v1' style={{fontWeight: 300}}>
              Welcome,&nbsp;
            </Typography>
            <Typography variant='h2v1' style={{fontWeight: 800}}>
              {careAgentInfo?.userName?.first_name}
            </Typography>
          </Box>
          <Typography variant='body1'>Have a nice day at work</Typography>
        </Box>
      </Box>
      {children}
    </>
  );
};

export default WelcomeWrapper;
