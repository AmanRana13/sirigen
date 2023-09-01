import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';
import {SleepComponent} from './Sleep.component';
import {SleepWeek} from './SleepWeek.component';
import {SleepMonth} from './SleepMonth.component';
import {WellnessWrapper} from '../WellnessWrapper.component';

const Sleep = (props: any) => {
  return (
    <WellnessWrapper wellnessParam='sleep'>
      <RenderComponent {...props} />
    </WellnessWrapper>
  );
};

const RenderComponent = () => {
  const {currentState} = useAppSelector(
    (state: any) => state.wellnessDashboard,
  );

  switch (currentState) {
    case 'day':
      return <SleepComponent />;
    case 'week':
      return <SleepWeek />;
    case 'month':
      return <SleepMonth />;
    default:
      return <div>Loading...</div>;
  }
};

export default Sleep;
