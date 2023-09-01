import React, {useEffect, useState} from 'react';
import {Box, CircularProgress} from '@mui/material';
import {connect} from 'react-redux';

import DevicesComponent from './DeviceInstallation.component';
import {
  saveDevicesDetail,
  getDevicesInfo,
  deleteDevicesDetail,
} from './Devices.action';

const DevicesContainer = (props: any) => {
  const [devicesInfo, setDevicesInfo] = useState(undefined);
  useEffect(() => {
    props.fetchDevicesInfo().then((res: any) => {
      setDevicesInfo(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (devicesInfo) {
    return <DevicesComponent devicesInfo={devicesInfo} {...props} />;
  } else {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress />
      </Box>
    );
  }
};

const Devices = connect(null, {
  saveDevicesDetail,
  getDevicesInfo,
  deleteDevicesDetail,
})(DevicesContainer);
export default Devices;
