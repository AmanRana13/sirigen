import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
} from '@mui/material';
import {TransitionProps} from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import {previewStyles} from './Preview.style';
import {useAppSelector} from 'hooks/reduxHooks';
import {PreviewTemplates} from 'globals/enums';
// eslint-disable-next-line max-len
import MedicalConditionTemplate from './templates/MedicalCondition/MedicalConditionTemplate.component';
import {PRINT_HIDE_CLASS} from 'common/Print/Print.types';

// Transition component to apply Slide from Bottom Transition effect to PreviewDialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Preview = () => {
  const [open, setOpen] = React.useState(false);
  const {classes} = previewStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {type} = useAppSelector((state: any) => state.preview);
  const {meta, data} = useAppSelector((state: any) => state.preview.data);
  // switch between Template depends on redux state preview.type
  const Template = React.useMemo(() => {
    if (PreviewTemplates.MEDICAL_CONDITION === type) {
      return <MedicalConditionTemplate data={data} meta={meta} />;
    } else {
      return null;
    }
  }, [type, data, meta]);

  return (
    <Box data-testid='preview'>
      <Button
        variant='contained'
        color='primary'
        sx={{
          borderRadius: '1.5rem',
          color: 'white',
          padding: '0.25rem 1rem',
          fontWeight: '700',
        }}
        onClick={handleClickOpen}
        data-testid='preview-button'>
        Preview
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className={PRINT_HIDE_CLASS}>
        <AppBar sx={{position: 'relative'}}>
          <Toolbar className={classes.toolbar} disableGutters>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
              className={classes.close}
              data-testid='preview-close-button'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {Template}
      </Dialog>
    </Box>
  );
};

export default Preview;
