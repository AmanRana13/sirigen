import PublicWrapper from 'common/PublicWrapper';

import UpdatePassword from 'common/UpdatePassword/UpdatePassword';

const ChoosePassword = () => {
  return (
      <PublicWrapper heading='Choose New Password'>
        <UpdatePassword alwaysShowPassCriteria={true} />
      </PublicWrapper>
  );
};
export default ChoosePassword;
