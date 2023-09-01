import React, {useCallback, useEffect, useState} from 'react';
import {Button, Typography} from '@mui/material';
import {Box} from '@mui/system';

import {InputTextBox} from 'pages/WCPages/SeniorCallScheduler/formFields';

import {goalStyle} from './index.style';
import {useMutation} from 'utilities/react-query';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {getCurrentSenior} from 'globals/global.functions';
import {useAppDispatch} from 'hooks/reduxHooks';
import {
  getSeniorFullName,
  openOverlayDialog,
  showError,
} from 'store/commonReducer/common.action';
import {DIALOG_TYPES} from 'globals/global.constants';
import {postActivityGoalService} from 'services/activityGoalService/activityGoal.service';

const SleepGoal = ({width}: {width?: number}) => {
  const {classes} = goalStyle();
  const [disable, setDisable] = useState<boolean>(true);
  const [goal, setGoal] = useState<number>(80);
  const dispatch: any = useAppDispatch();
  const fullName = dispatch(getSeniorFullName());
  console.log(fullName, 'fullName');

  const postSleepGoal = useMutation({
    mutationFn: (goal: number): Promise<any> => {
      dispatch(showApplicationLoader());
      const senior = getCurrentSenior();
      return postActivityGoalService({
        senior_id: senior.seniorID,
        account_id: senior.accountID,
        goal,
      });
    },
    onSuccess: () => {
      dispatch(hideApplicationLoader());
      dispatch(
        openOverlayDialog({
          type: DIALOG_TYPES.SUCCESS,
          firstMessage: `Sleep Goal is updated successfully for ${fullName}`,
        }),
      );
    },
    onError: (error: any) => {
      dispatch(hideApplicationLoader());
      dispatch(showError(error));
    },
  });

  const onHandleChange = useCallback((e: any) => {
    const value = e.target.value;
    if (value < 0) {
      setGoal(0);
    } else if (value > 100) {
      setGoal(100);
    } else {
      setGoal(value);
    }
  }, []);

  const onButtonClick = useCallback(() => {
    !disable ? handleSetSleepGoal() : setDisable(false);
  }, [disable]);

  const handleSetSleepGoal = React.useCallback(() => {
    postSleepGoal.mutate(goal);
    setDisable(true);
  }, [goal, postSleepGoal]);

  return (
    <Box
      display='flex'
      justifyContent='start'
      maxWidth={width}
      className={classes.card}>
      <Typography>Set Sleep Goal</Typography>
      <Box style={{display: 'flex', columnGap: '12px'}}>
        <Box>
          <InputTextBox
            required={true}
            type='number'
            className={classes.input}
            onChange={onHandleChange}
            disabled={disable}
            inputProps={{value: goal}}
          />
        </Box>
        <Button
          className={classes.button}
          style={{width: '119px'}}
          variant='contained'
          color='primary'
          size='large'
          onClick={onButtonClick}>
          {disable ? 'Edit' : 'Save'}
        </Button>
      </Box>
    </Box>
  );
};

export default SleepGoal;
