import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slide,
} from '@mui/material';
import {makeStyles} from 'tss-react/mui';
import {useAppSelector} from 'hooks/reduxHooks';
import {red} from '@mui/material/colors';
import clsx from 'clsx';

const useStyles = makeStyles()(() => ({
  dialog: {
    borderRadius: 0,
  },
  button: {
    borderRadius: 0,
    textTransform: 'none',
    padding: 5,
  },
  logout: {
    color: '#fff',
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
  },
  countdown: {
    color: red[700],
  },
}));

interface ISessionTimeoutProps {
  countdown: number;
  onLogout: () => void;
  onContinue: () => void;
}

const Transition = React.forwardRef(function Transition(props: any, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const SessionTimeoutDialog = ({
  countdown,
  onLogout,
  onContinue,
}: ISessionTimeoutProps) => {
  const {classes} = useStyles();
  const {isTimeoutModel} = useAppSelector((state: any) => state.auth);

  return (
    <Dialog
      open={isTimeoutModel}
      classes={{paper: classes.dialog}}
      TransitionComponent={Transition}>
      <DialogTitle>Session Timeout</DialogTitle>
      <DialogContent>
        <Typography variant='body2'>
          The current session is about to expire in
          <span className={classes.countdown}>&nbsp;{countdown}</span> seconds.
        </Typography>

        <Typography variant='body2'>
          Would you like to continue the session?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onLogout}
          variant='contained'
          className={clsx(classes.logout, classes.button)}>
          Logout
        </Button>
        <Button
          onClick={onContinue}
          color='primary'
          variant='contained'
          className={classes.button}>
          Continue Session
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionTimeoutDialog;
