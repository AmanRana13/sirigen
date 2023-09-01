import {Box} from '@mui/material';

import {addUserStyle} from '../AddUser.style';
import DeviceDetails from './component/DeviceDetails';
import {useEffect, useMemo, useState} from 'react';
import {getDevicesInfo} from './Devices.action';
import {DeviceType} from 'globals/enums';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const DevicesComponent = ({saveDevicesDetail, deleteDevicesDetail}: any) => {
  const {classes: addUserClasses} = addUserStyle();
  const dispatch: any = useAppDispatch();

  const devicesInfo = useAppSelector((state: any) => state.devices.data);
  const deviceDataLoader = useAppSelector(
    (state: any) => state.devices.deviceDataLoader,
  );

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(getDevicesInfo());
    setIsDataLoaded(true);
  }, []);

  const devices = useMemo(() => {
    if (!isDataLoaded) {
      return [];
    }

    const getDeviceInfo = (value: any) => {
      return devicesInfo?.find((device: any) => device.device_type === value);
    };

    return [
      {
        deviceName: 'Watch',
        type: DeviceType.WATCH,
        defaultValue: getDeviceInfo('watch') || {
          device_install_date: null,
          vendor: 'Navigil',
          assigned_device_type: 'Navigil 580 Watch',
          model_number: '',
          device_serial: '',
          date_returned: null,
          reason_for_return: '',
          watch_phone_number: '',
        },
        infoMsg: '',
      },
      {
        deviceName: 'Sleep Mat',
        type: DeviceType.SLEEP,
        defaultValue: getDeviceInfo('sleep') || {
          device_install_date: null,
          vendor: 'Withings',
          assigned_device_type: 'Withings Sleep Mat w/Pwr Cord & Microphone',
          model_number: '',
          device_serial: '',
          mfg_date: null,
          date_returned: null,
          reason_for_return: '',
        },
        infoMsg: ' Height in profile info is required to save the device',
      },
      {
        deviceName: 'Body Scale',
        type: DeviceType.SCALE,
        defaultValue: getDeviceInfo('scale') || {
          device_install_date: null,
          vendor: 'Withings',
          assigned_device_type: 'Withings Cardio Scale w/Pwr Cord',
          model_number: '',
          device_serial: '',
          mfg_date: null,
          date_returned: null,
          reason_for_return: '',
        },
        infoMsg: ' Height in profile info is required to save the device',
      },
      {
        deviceName: 'Withings Hub',
        type: DeviceType.WITHINGS_HUB,
        defaultValue: getDeviceInfo('withings_hub') || {
          device_install_date: '',
          vendor: 'Withings',
          assigned_device_type: 'Withings Data Hub',
          model_number: '',
          device_serial: '',
          mfg_date: null,
          date_returned: null,
          reason_for_return: '',
        },
        infoMsg: '',
      },
    ];
  }, [devicesInfo, isDataLoaded]);

  return (
    <>
      <Box className={addUserClasses.title} data-testid='devices-component'>
        <span>Devices</span>
      </Box>
      {!deviceDataLoader &&
        devices.map((device: any) => (
          <DeviceDetails
            key={device.type}
            deviceDetail={device}
            infoMsg={device.infoMsg}
            devicesInfo={devicesInfo}
            saveDevicesDetail={saveDevicesDetail}
            deleteDevicesDetail={deleteDevicesDetail}
          />
        ))}
    </>
  );
};

export default DevicesComponent;
