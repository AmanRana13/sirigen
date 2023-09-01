import React from 'react';
import {connect} from 'react-redux';

import {fetchSeniorInfo} from 'pages/WCPages/AddUser/ProfileInfo/ProfileInfo.action';
import {SubHeader} from 'common/SubHeader';
import AddUserPage from 'pages/WCPages/AddUser';

const OnboardingInfoComponent = (props: any) => {
  return (
    <>
      <SubHeader {...props} />
      <AddUserPage noHeader={true} isOnboardingInfo />
    </>
  );
};
const OnboardingInfo = connect(null, {fetchSeniorInfo})(
  OnboardingInfoComponent,
);
export {OnboardingInfo};
