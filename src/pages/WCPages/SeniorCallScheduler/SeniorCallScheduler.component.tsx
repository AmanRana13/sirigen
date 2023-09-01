import {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import {useAppDispatch} from 'hooks/reduxHooks';
import get from 'lodash.get';

import {SubHeader} from 'common/SubHeader';
import StateCityFormatter from 'common/StateCityFormatter/StateCityFormatter';
import {getAge, getCurrentSenior} from 'globals/global.functions';
import {CALL_TYPES} from 'globals/global.constants';
import {fetchSeniorDetail} from 'store/commonReducer/common.action';

import {seniorCallSchedulerStyle} from './SeniorCallScheduler.style';
import {SeniorCallSchedulerForm} from './components/SchedulerForm.component';

import {
  getCareAgentList,
  fetchCareGiverInfo,
} from './SeniorCallScheduler.action';

const SeniorCallScheduler = (props: any) => {
  const {classes} = seniorCallSchedulerStyle();
  const dispatch: any = useAppDispatch();
  const [seniorDetail, setSeniorDetail] = useState([]);
  const [seniorInfo, setSeniorInfo] = useState<any>(null);
  const [callerList, setCallerList] = useState([]);
  const [assignedCareAgent, setAssignedCareAgent] = useState([]);
  const [careGivers, setCareGivers] = useState([]);
  const [allCareGiverList, setAllCareGiverList] = useState([]);

  useEffect(() => {
    let seniorInfoData: any = '';
    if (props.seniorInfo) {
      seniorInfoData = props.seniorInfo;
    } else {
      seniorInfoData = {...getCurrentSenior()};
    }
    dispatch(fetchSeniorDetail(seniorInfoData)).then((res: any) => {
      setSeniorDetail(res);
    });
    dispatch(fetchCareGiverInfo(seniorInfoData)).then((res: any) => {
      const allCG: any = [];
      setAllCareGiverList(res.caregivers);
      res.caregivers.map((data: any) => {
        allCG.push({
          key: get(data, 'caregiver_id'),
          value: `${get(data, 'basic_info.name.first_name')} - ${get(
            data,
            'senior_info.caregiver_type',
          )}`,
        });
      });
      setCareGivers(allCG);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (seniorDetail) {
      setSeniorInfo((prevState: any) => ({
        ...prevState,
        id: get(seniorDetail, 'minimalInfo.user_id'),
        accountId: get(seniorDetail, 'minimalInfo.account_id'),
        memberName: `${get(
          seniorDetail,
          'minimalInfo.name.first_name',
          '',
        )} ${get(seniorDetail, 'minimalInfo.name.last_name', '')}`,
        gender: get(seniorDetail, 'minimalInfo.gender'),
        age: getAge(get(seniorDetail, 'minimalInfo.dob')),
        accountNo: get(seniorDetail, 'minimalInfo.account_id'),
        timeToCall: '-',
        timeZone: get(seniorDetail, 'minimalInfo.address.timezone'),
        location: (
          <StateCityFormatter
            city={get(seniorDetail, 'minimalInfo.address.city', '')}
            state={get(seniorDetail, 'minimalInfo.address.state', '')}
          />
        ),
        lastTimeContacted: '-',
        currentSchedule: ['-'],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seniorDetail]);

  useEffect(() => {
    if (careGivers) {
      setCallerList(getCallerList());
      getCareAgent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seniorDetail, careGivers]);

  const getCareAgent = () => {
    dispatch(getCareAgentList()).then((res: any) => {
      let cgList = get(res, 'caregivers');
      let list: any = [];
      cgList.map((data: any) => {
        list.push({
          key: get(data, 'user_id'),
          value: `${get(data, 'name.first_name')} ${get(
            data,
            'name.last_name',
          )}`,
        });
      });
      setAssignedCareAgent(list);
    });
  };

  const getCallerList = () => {
    const list: any = careGivers;
    if (get(seniorDetail, 'minimalInfo.user_id')) {
      list.push({
        key: get(seniorDetail, 'minimalInfo.user_id'),
        value: `${get(seniorDetail, 'minimalInfo.name.first_name')} - Senior`,
      });
    }
    return list;
  };

  return (
    <>
      <Box
        className={classes.container}
        data-testid='SeniorCallSchedulerComponent'>
        <SubHeader noHeader={props.noHeader} {...props} />
        <Box>
          {seniorInfo && (
            <SeniorCallSchedulerForm
              seniorInfo={seniorInfo}
              setSeniorInfo={setSeniorInfo}
              callerList={callerList}
              assignedCareAgent={assignedCareAgent}
              callType={CALL_TYPES}
              allCareGiverList={allCareGiverList}
              callInfo={props.callInfo}
              closeDialog={props.closeDialog}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default SeniorCallScheduler;
