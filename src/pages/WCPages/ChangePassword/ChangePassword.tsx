import {Box} from '@mui/material';

import {changePasswordStyle} from './ChangePassword.style';
import UpdatePassword from 'common/UpdatePassword/UpdatePassword';
import WelcomeWrapper from 'common/WelcomeWrapper/WelcomeWrapper.component';

const ChangePassword = () => {
  const {classes} = changePasswordStyle();

  return (
    <WelcomeWrapper>
      <Box className={classes.mainContainer}>
        <Box boxShadow={1} className={classes.choosePassword}>
          <UpdatePassword
            showCancelBtn={true}
            heading='Change password'
            showOldPasswordField={true}
            placeholderText='Enter New Password'
          />
        </Box>
      </Box>
    </WelcomeWrapper>
  );
};
export default ChangePassword;
