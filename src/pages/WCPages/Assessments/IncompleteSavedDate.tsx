import React from 'react';
import {Typography, Box} from '@mui/material';
import ErrorIcon from 'assets/icons/ErrorIcon.svg';
import { makeStyles } from 'tss-react/mui';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export interface IIncompleteSavedDateProps {
  dateTime?: string;
  isIncomplete?: boolean;
  isSaved?: boolean;
  infoAlertMessage?: string;
  buttonInHeader?: React.ReactNode;
}

const useStyles = makeStyles()({
  incomplete: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 500,
    justifyContent: 'center',
    color: '#CC0000',
    '& img': {
      marginRight: 10,
    },
  },
});

const IncompleteSavedDate = ({
  dateTime,
  isIncomplete,
  isSaved,
  infoAlertMessage,
  buttonInHeader,
}: IIncompleteSavedDateProps) => {
  const { classes } = useStyles();

  return (
    <Box>
      <Box display='flex' alignItems='center'>
        {dateTime && (
          <Box display='flex'>
            {isSaved ? (
              <Typography variant='h2'>Last Saved:</Typography>
            ) : (
              <Typography variant='h2'>Date &amp; Time:</Typography>
            )}
            &nbsp;
            <Typography variant='body2'>{dateTime}</Typography>
          </Box>
        )}
        {isIncomplete && (
          <Typography variant='body1' ml={2} className={classes.incomplete}>
            <img src={ErrorIcon} width='30' height='30' />
            Incomplete
          </Typography>
        )}
        {infoAlertMessage && (
          <Box display='flex'>
            <InfoOutlinedIcon
              style={{margin: '2px 5px 0 0', width: '20px', height: '20px'}}
            />
            <Typography
              paragraph={true}
              style={{
                alignItems: 'center',
                fontSize: 16,
                marginBottom: 0,
              }}>
              {infoAlertMessage}
            </Typography>
          </Box>
        )}
        {buttonInHeader}
      </Box>
    </Box>
  );
};

export default IncompleteSavedDate;
