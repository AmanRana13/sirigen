import React from 'react';
import {connect} from 'react-redux';

import {ProfileInfoComponent} from './ProfileInfo.component';
import {
  createAccount,
  fetchSeniorInfo,
  saveProfileInfo,
  uplaodImage,
  getImage,
  setProfileImage,
  removeImage,
} from './ProfileInfo.action';

const ProfileInfoContainer = (props: any) => (
  <ProfileInfoComponent {...props} />
);

const ProfileInfo = connect(null, {
  createAccount,
  fetchSeniorInfo,
  saveProfileInfo,
  uplaodImage,
  getImage,
  setProfileImage,
  removeImage,
})(ProfileInfoContainer);
export default ProfileInfo;
