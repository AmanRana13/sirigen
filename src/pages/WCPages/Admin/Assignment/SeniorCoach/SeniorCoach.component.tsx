import {Box, Button, Typography} from '@mui/material';

import {seniorCoachsStyle} from './SeniorCoach.style';

interface ISeniorCoachProps {
  seniorCoachHandler: () => void;
  children: any;
  mainHeading: string;
  subHeading: string;
  buttonText: string;
}

/**
 * @description SeniorCoach common component
 * @param  seniorCoachHandler handle senior coach
 * @param children render children
 * @param mainHeading mainheading of senior coach component
 * @param subHeading subHeading of senior coach component
 * @param buttonText buttonText of senior coach component
 * @returns JSX
 */
const SeniorCoach = ({
  seniorCoachHandler,
  children,
  mainHeading,
  subHeading,
  buttonText,
}: ISeniorCoachProps) => {
  const {classes} = seniorCoachsStyle();

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography className={classes.mainHeadingText} variant='h2'>
          {mainHeading}
        </Typography>
      </Box>
      <Box className={classes.subContainer}>
        <Box className={classes.header}>
          <Typography className={classes.subHeadingText} variant='h2'>
            {subHeading}
          </Typography>
          <Button
            color='primary'
            variant='contained'
            onClick={seniorCoachHandler}
            data-testid = {`${buttonText.replaceAll(' ','')}Btn`}
            className={classes.wCButton}>
            {buttonText}
          </Button>
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default SeniorCoach;
