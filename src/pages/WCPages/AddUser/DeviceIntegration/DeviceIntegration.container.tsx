import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {DeviceIntegrationComponent} from './DeviceIntegration.component';
import {
  connectWithingDevice,
  fetchDeviceIntegrationInfo,
} from './DeviceIntegration.action';

const DeviceIntegrationContainer = (props: any) => {
  const [navigilInfo, setNavigilInfo] = useState(undefined);
  useEffect(() => {
    props.fetchDeviceIntegrationInfo().then((res: any) => {
      const watchDevice = res?.devices.find(
        (device: any) => device.device_type === 'watch',
      );
      setNavigilInfo(watchDevice);
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <DeviceIntegrationComponent navigilInfo={navigilInfo} {...props} />;
};

const DeviceIntegration = connect(null, {
  connectWithingDevice,
  fetchDeviceIntegrationInfo,
})(DeviceIntegrationContainer);
export default DeviceIntegration;
