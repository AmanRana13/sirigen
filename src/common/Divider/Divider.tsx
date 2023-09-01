import React from 'react';
import {Box, Divider as MuiDivider, DividerProps} from '@mui/material';
import { withStyles } from 'tss-react/mui';

const DividerLine = withStyles(MuiDivider, {
  root: {
    borderColor: '#707070',
  },
});

const Divider = ({variant}: DividerProps) => {
  return (
    <Box marginY={2.5}>
      <DividerLine variant={variant} />
    </Box>
  );
};

export default Divider;
