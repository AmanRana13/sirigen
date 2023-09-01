import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import moment from 'moment';

import SeniorCallLogsComponent from './SeniorCallLogs.component';
import {getCallLogs} from './SeniorCallLogs.action';
import withPagination from '../../../hoc/withPagination';
import {TABLE_CACHE_KEY, TABLE_ROWS_PER_PAGE} from 'globals/global.constants';

const SeniorCallLogs = (props: any) => {
  const dispatch: any = useAppDispatch();
  const currentSeniorId = useAppSelector(
    (state: any) => state?.common?.seniorDetail?.minimalInfo?.user_id,
  );
  const getCallLogsHandler = async () => {
    return await dispatch(getCallLogs()).then((res: any) => {
      res.data = res.data.sort(function (a: any, b: any) {
        const aCallTime: any = moment(a.call_time);
        const bCallTime: any = moment(b.call_time);
        return aCallTime - bCallTime;
      });
      return res;
    });
  };

  // HOC props
  const withPaginationProps = {
    getData: getCallLogsHandler,
    cacheKey: `${TABLE_CACHE_KEY.CALL_LOGS}-${currentSeniorId}`,
    rowsPerPage: TABLE_ROWS_PER_PAGE,
  };

  /**
   * @description Wrap component withPagination HOC to get the pagination service
   */
  const CallLogsWithPagination = withPagination(
    SeniorCallLogsComponent,
    props,
    withPaginationProps,
  );

  return <CallLogsWithPagination />;
};

export default SeniorCallLogs;
