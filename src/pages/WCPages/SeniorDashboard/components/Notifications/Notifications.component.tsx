import React, {useEffect} from 'react';
import {
  Box,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  Paper,
  Typography,
} from '@mui/material';
import moment from 'moment';
import get from 'lodash.get';

import {getTimestamp, toTitleCase} from 'globals/global.functions';

import {notificationStyle} from './Notifications.style';
import {DATE_FORMAT_SHORT_YEAR} from 'globals/global.constants';

const Notifications = () => {
  const {classes} = notificationStyle();
  const notifications: any[] = [{}];

  useEffect(() => {
    //@TODO this is not the correct way to dispatch the action. Need to fix this in future.
    // dispatch(fetchNotifications())
    //   .then((res) => {
    //     setNotifications(res.insights);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box mt={2} data-testid='notifications-component'>
      <TableContainer component={Paper}>
        <Table aria-label='dense table' size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='left' className={classes.tableHeader}>
                Type
              </TableCell>
              <TableCell align='left' className={classes.tableHeader}>
                Occur Date
              </TableCell>
              <TableCell align='left' className={classes.tableHeader}>
                Time
              </TableCell>
              <TableCell align='left' className={classes.tableHeader}>
                Location
                <br />
                <Typography variant='subtitle1'>(of occurrence)</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => {
              return (
                <TableRow key={notification}>
                  <TableCell className={classes.tableBorderStyle} align='left'>
                    {notification?.message}
                  </TableCell>
                  <TableCell className={classes.tableBorderStyle} align='left'>
                    {moment(
                      getTimestamp(get(notification, 'event_time')),
                    ).format(DATE_FORMAT_SHORT_YEAR)}
                  </TableCell>
                  <TableCell className={classes.tableBorderStyle} align='left'>
                    {moment(
                      getTimestamp(get(notification, 'event_time')),
                    ).format('HH:mm')}
                  </TableCell>
                  <TableCell className={classes.tableBorderStyle} align='left'>
                    {toTitleCase(get(notification, 'location_based_on_beacon'))}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Notifications;
