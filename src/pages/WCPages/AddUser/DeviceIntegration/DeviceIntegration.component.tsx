import React from 'react';
import {Box} from '@mui/material';
import {addUserStyle} from '../AddUser.style';
import {deviceIntegrationStyle} from './DeviceIntegration.style';
import DeviceForm from './component/DeviceForm';

const DeviceIntegrationComponent = ({
  navigilInfo,
  connectWithingDevice,
  connectNavigilDevice,
}: any) => {
  const {classes} = deviceIntegrationStyle();
  const {classes: addUserClasses} = addUserStyle();

  const deviceData = React.useMemo(() => {
    return [
      {
        name: 'navigil',
        label: 'Connect with Navigil',
        placeHolder: 'Navigil Id',
        defaultValue: navigilInfo?.device_serial,
        size: 4,
        required: true,
        disabled: true,
        validation: {
          required: 'Required Field',
        },
        onSumbit: (data: any) => connectNavigilDevice(data),
      },
      // {
      //   name: 'withing',
      //   label: 'Connect with Withing',
      //   placeHolder: 'Email Id',
      //   defaultValue: '',
      //   unitValue: 'Registered email id on HealthMate App',
      //   required: true,
      //   size: 4,
      //   validation: {
      //     required: 'Required Field',
      //     pattern: {
      //       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      //       message: 'Invalid email address',
      //     },
      //   },
      //   onSumbit: (data) => connectWithingDevice(data),
      // },
    ];
  }, [connectWithingDevice, connectNavigilDevice, navigilInfo]);

  return (
    <>
      <Box className={addUserClasses.title}>
        <span>Device/Vendor Integration</span>
      </Box>

      <Box className={classes.container} data-testid='date-picker'>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          className={classes.gridContainer}>
          {deviceData.map((props) => {
            return (
              <Box
                key={props.name}
                data-testid={`${props.name}`}
                display='flex'
                flexDirection='row'
                justifyContent='center'
                alignItems='center'>
                <DeviceForm {...props} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export {DeviceIntegrationComponent};
