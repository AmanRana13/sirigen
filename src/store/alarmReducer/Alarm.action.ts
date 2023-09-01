import moment from 'moment-timezone';

import {
  APPLICATION_EVENTS,
  DATE_FORMAT,
  TIME_FORMAT,
} from 'globals/global.constants';
import {AlarmStatus, EventsType, EventViewState} from 'globals/enums';
import {
  capitalizeFirstLetter,
  getAddressByLatLng,
  isAuthenticateUser,
  removeObjectProperty,
} from 'globals/global.functions';
import {IAlarmData} from 'services/alarmService/alarm.types';
import {updateAlarmStatusService} from 'services/alarmService/alarm.service';

import {ISosEvent} from '../eventsReducer/Events.state';
import {showError} from 'store/commonReducer/common.action';
import get from 'lodash.get';
import {getSeniorMappingService} from 'services/seniorService/senior.service';
import {RootState} from 'store/store';

export const CREATE_SOS = 'CREATE_SOS';
export const CREATE_FALL_DETECTION = 'CREATE_FALL_DETECTION';
export const CLOSE_ALARM = 'CLOSE_ALARM';

/**
 * @function closeAlarms
 * @description action creator to close the alarms
 */
export const closeAlarms =
  (eventId: string, eventType: EventsType) =>
  (dispatch: any, getState: any) => {
    const events = getState().alarms;
    const updatedAlarm = removeObjectProperty(events[eventType], eventId);

    dispatch({type: CLOSE_ALARM, payload: {eventType, updatedAlarm}});
  };

export const updateAlarmStatus =
  (alarmId: string, status: AlarmStatus) => async (dispatch: any) => {
    const param = {
      alarm_id: alarmId,
      status: status,
    };
    try {
      await updateAlarmStatusService(param);
      return {success: true};
    } catch (e) {
      dispatch(showError(e));
      return {success: false};
    }
  };

export const createAlarmDialog =
  (data: IAlarmData) => async (dispatch: any) => {
    const seniorQueryPayload = [
      {
        user_id: data.seniorId,
        account_id: data.accountId,
      },
    ];
    try {
      const seniorDetail = await getSeniorMappingService(seniorQueryPayload);
      const seniorName =
        seniorDetail[data.accountId][data.seniorId]['minimal']['name'];

      const seniorTimezone = get(
        seniorDetail[data.accountId][data.seniorId],
        'minimal.timezone',
      );
      const location = get(
        seniorDetail[data.accountId][data.seniorId],
        'minimal.location',
      );

      // eslint-disable-next-line max-len
      const seniorAddress = location
        ? `${location?.street}, ${location?.city}, ${location?.state}, ${location?.zipcode}`
        : '-';

      const lastKnownAddress = await getAddressByLatLng(
        data.lastLocation.lat,
        data.lastLocation.lng,
      );

      const detailList = [
        {
          label: 'Date/Time',
          value: `${moment(data.timestamp).format(
            `${DATE_FORMAT} @ ${TIME_FORMAT}`,
          )}`,
        },
        {
          label: 'Home Address',
          value: seniorAddress,
        },
        {
          label: 'Last Known Location',
          value: lastKnownAddress || 'No Address Founds',
        },
        {
          label: `Last ${APPLICATION_EVENTS[data.status].shortLabel} Occurence`,
          value: `${
            data.lastAlertTime
              ? moment(data.lastAlertTime).format(
                  `${DATE_FORMAT} @ ${TIME_FORMAT}`,
                )
              : '-'
          }`,
        },
      ];

      const fullName = `${seniorName.first_name} ${seniorName.last_name}`;
      const alertType = capitalizeFirstLetter(data.status);

      if (!isAuthenticateUser()) {
        return;
      }

      if (data.alarmStatus == AlarmStatus.PENDING) {
        const alarmData: ISosEvent = createSosFallData(
          fullName,
          data.seniorId,
          data.status == 'fall' ? EventsType.FALL : EventsType.SOS,
          EventViewState.Maximize,
          data.accountId,
          seniorTimezone,
          data.alarmId,
          detailList,
          data.timestamp,
          alertType,
          data.alarmStatus,
          data.lastAlertTime,
          data.lastCallTime,
        );
        if (data.status == 'fall') {
          dispatch({
            type: CREATE_FALL_DETECTION,
            payload: {alarmData: alarmData},
          });
        } else if (data.status == 'sos') {
          dispatch({type: CREATE_SOS, payload: {alarmData: alarmData}});
        }
      } else if (data.alarmStatus == AlarmStatus.ASSIGNED) {
        const eventId = `${data.seniorId}-${data.alarmId}`;
        dispatch(
          closeAlarms(
            eventId,
            data.status == 'fall' ? EventsType.FALL : EventsType.SOS,
          ),
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Data is missing in the API', {error});
    }
  };

/**
 * @function createSosFallData
 * @description method to create data for alert event
 * @param {string} fullName senior fullname
 * @param {string} seniorId senior ID
 
 * @param {EventsType} type type of event alert
 * @param {EventViewState} viewState view state of event maximize or minimize
 
 */
const createSosFallData = (
  fullName: string,
  seniorId: string,
  eventType: EventsType,
  viewState: EventViewState,
  accountId: string,
  seniorTimezone: string | undefined,
  alarmId: string,
  detailList: any,
  startTime: number | undefined,
  alertType: string,
  alarmStatus: string,
  lastAlertTime: number | undefined,
  lastCallTime: number | undefined,
): ISosEvent => {
  const eventId = `${seniorId}-${alarmId}`;
  return {
    [eventId]: {
      eventType,
      viewState,
      fullName,
      seniorId,
      accountId,
      seniorTimezone,
      eventId,
      alarmId,
      detailList,
      startTime,
      alertType,
      alarmStatus,
      lastAlertTime,
      lastCallTime,
    },
  };
};
