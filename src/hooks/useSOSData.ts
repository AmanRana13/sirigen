import {getCurrentSenior} from 'globals/global.functions';
import {useAppDispatch} from './reduxHooks';
import React, {useEffect, useState} from 'react';
import {useQuery} from 'utilities/react-query';
import {
  getFallDetectionListService,
  getSOSListService,
} from 'services/alarmService/alarm.service';
import {showError} from 'store/commonReducer/common.action';

export const useSOSData = () => {
  const dispatch: any = useAppDispatch();

  const params = React.useMemo(() => {
    const seniorInfo: any = getCurrentSenior();
    const date = new Date();
    const days = 30;
    const startDate: any = new Date(
      date.getTime() - days * 24 * 60 * 60 * 1000,
    );
    const endDateTime: any = new Date();
    const endDateTimeStamp = Math.round(endDateTime / 1000) * 10 ** 9;
    const startDateTimestamp = Math.round(startDate / 1000) * 10 ** 9;
    return {
      senior_id: seniorInfo.seniorID,
      account_id: seniorInfo.accountID,
      start_timestamp: startDateTimestamp,
      end_timestamp: endDateTimeStamp,
    };
  }, []);

  //query to fetch sosData
  const {data: sosData = [], isLoading: sosLoading} = useQuery({
    queryKey: ['sosData'],
    queryFn: (): Promise<any> => {
      return getSOSListService(params);
    },
    onError: (error: any) => {
      dispatch(showError(error));
    },
    cacheTime: 0,
  });

  //query to fetch fallData
  const {data: fallData = [], isLoading: fallLoading} = useQuery({
    queryKey: ['fallData'],
    queryFn: (): Promise<any> => {
      return getFallDetectionListService(params);
    },
    onError: (error: any) => {
      dispatch(showError(error));
    },
    cacheTime: 0,
  });

  const sosFallData = React.useMemo(() => {
    const filteredSOSData = sosData
      .filter((sos: any) => sos.time)
      .map((sos: any) => {
        return {
          ...sos,
          type: 'SOS',
        };
      });
    const filteredFallData = fallData
      .filter((fall: any) => fall.time)
      .map((fall: any) => {
        return {
          ...fall,
          type: 'Fall',
        };
      });
    const finalData = [...filteredSOSData, ...filteredFallData];
    finalData.sort((a, b) => b.time - a.time);
    return finalData.slice(0, 20);
  }, [sosData, fallData]);

  return {sosFallData, sosLoading, fallLoading};
};
