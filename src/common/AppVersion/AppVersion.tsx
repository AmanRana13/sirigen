import {Typography} from '@mui/material';

const AppVersion = () => {
  const appGitVersion = process.env.REACT_APP_CARE_PORTAL_GIT_VERSION;
  const appVersion = '1.1.10.';

  return (
    <Typography variant='h5' data-testid='app-version'>
      Version {`${appVersion}${appGitVersion}`}
    </Typography>
  );
};

export default AppVersion;
