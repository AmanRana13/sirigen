import {Box} from '@mui/system';
import SleepGoal from '../sleepGoal';
import SleepPercentage from '../sleepPercentage';
import {CircularProgress} from 'common/CircularProgress';

const SleepQualityGoals = ({
  value,
  sleepGoal = 80,
}: {
  value: number;
  sleepGoal: number;
}) => {
  return (
    <Box style={{alignItems: 'center'}} data-testid='Sleep-quality-goals'>
      <SleepGoal width={370} />
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress value={value} outOff={80} fontSize={80} />
        <SleepPercentage percentage={value} sleepGoal={sleepGoal} />
      </Box>
    </Box>
  );
};

export default SleepQualityGoals;
