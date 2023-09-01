import React from 'react';
import {Dialog} from '@mui/material';

import SeniorCallScheduler from 'pages/WCPages/SeniorCallScheduler';

const SchedulerForm = ({
  closeDialog,
  openScheduler,
  seniorInfo,
  ...props
}: any) => {
  return (
    <Dialog
      onClose={closeDialog}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
      fullScreen={true}
      aria-labelledby='simple-dialog-title'
      open={openScheduler}>
      <SeniorCallScheduler
        closeDialog={closeDialog}
        noHeader={true}
        {...props}
        seniorInfo={seniorInfo}
      />
    </Dialog>
  );
};

export {SchedulerForm};
