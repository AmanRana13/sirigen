import React from 'react';

import {HeartRateComponent} from './HeartRate.component';
import {WellnessWrapper} from '../WellnessWrapper.component';

const HeartRate = () => {
  return (
    <WellnessWrapper>
      <HeartRateComponent />
    </WellnessWrapper>
  );
};

export default HeartRate;
