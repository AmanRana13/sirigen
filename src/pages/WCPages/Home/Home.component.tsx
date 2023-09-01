import {Box} from '@mui/material';

import {homeStyle} from './Home.style';
import {MemberDirectory} from './components/MemberDirectory';
import WelcomeWrapper from 'common/WelcomeWrapper/WelcomeWrapper.component';

const Home = (props: any) => {
  const {classes} = homeStyle();
  return (
    <WelcomeWrapper>
      <Box className={classes.memberDirectory} mb={4}>
        <MemberDirectory {...props} />
      </Box>
    </WelcomeWrapper>
  );
};

export default Home;
