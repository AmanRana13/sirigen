import {Box, Typography} from '@mui/material';
import Table from 'pages/FacilityPages/ResidentDashboard/components/SOSTable/SOSTable.component';
import {SOSTableStyle} from './SOSTable.style';
import {theme} from 'config/theme.config';
import {useSOSData} from 'hooks/useSOSData';

const SOSTable = () => {
  const {classes} = SOSTableStyle();
  const {sosFallData, sosLoading, fallLoading} = useSOSData();

  return (
    <Box className={classes.tableCard}>
      <Box padding='12px 20px'>
        <Typography
          variant='h2'
          style={{color: theme.palette.customColor.primaryGreen}}>
          Fall and SOS Detection
        </Typography>
      </Box>
      <Table
        data={sosFallData || []}
        loading={sosLoading || fallLoading}
        width='100%'
        height='556px'
      />
    </Box>
  );
};

export default SOSTable;
