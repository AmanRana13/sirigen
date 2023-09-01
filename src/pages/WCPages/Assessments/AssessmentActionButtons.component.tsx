import {Box, Button} from '@mui/material';
import globalUseStyles from 'config/global.styles';
import {AssessmentStatus} from 'globals/enums';
import {IAssessmentActionButtons} from './Assessments.type';

export const AssessmentActionButtons = ({
  isHistory,
  handleClose,
  handleReset,
  handleSaveSubmit,
  disabled,
  buttonText = 'Reset',
  disableSave,
}: IAssessmentActionButtons) => {
  const {classes} = globalUseStyles();
  return (
    <>
      {isHistory ? (
        <Box display='flex' justifyContent='center' margin='75px 0'>
          <Button
            size='large'
            color='primary'
            className={classes.smallButton}
            variant='contained'
            onClick={handleClose}
            style={{color: '#fff'}}
            data-testid='cancelBtn'>
            Close
          </Button>
        </Box>
      ) : (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          margin='75px 0'>
          <Box mr={2}>
            <Button
              size='large'
              className={classes.smallButtonOutlined}
              variant='outlined'
              onClick={handleReset}
              disabled={disabled}
              data-testid='resetBtn'>
              {buttonText}
            </Button>
          </Box>
          <Box mr={2}>
            <Button
              size='large'
              color='primary'
              className={classes.smallButton}
              variant='contained'
              onClick={() => handleSaveSubmit(AssessmentStatus.Save)}
              style={{color: '#fff'}}
              disabled={disabled || disableSave}>
              Save
            </Button>
          </Box>
          <Box>
            <Button
              size='large'
              color='primary'
              variant='contained'
              className={classes.smallButton}
              onClick={() => handleSaveSubmit(AssessmentStatus.Submit)}
              style={{color: '#fff'}}
              data-testid='submitBtn'
              disabled={disabled}>
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};
