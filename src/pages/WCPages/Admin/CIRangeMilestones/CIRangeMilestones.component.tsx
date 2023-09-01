import {Box, Typography} from '@mui/material';

import HeaderWrapper from 'common/HeaderWrapper/HeaderWrapper.component';

import OpenCIRangeMilestones from './Components/OpenCIRangeMilestones.component';
import CompletedCIRangeMilestones from './Components/CompletedCIRangeMilestones.component';
import {cIRangeMilestonesStyle} from './CIRangeMilestones.style';

const navTabs = [
  {
    label: 'Open',
    component: OpenCIRangeMilestones,
  },
  {
    label: 'Completed',
    component: CompletedCIRangeMilestones,
  },
];

const CIRangeMilestones = () => {
  const {classes} = cIRangeMilestonesStyle();

  return (
    <Box className={classes.container}>
      <Box className={classes.cIRangeHeader}>
        <Typography className={classes.cIRangeText} variant='h2'>
          CI Range Milestones
        </Typography>
      </Box>
      <HeaderWrapper navTabs={navTabs} />
    </Box>
  );
};

export default CIRangeMilestones;
