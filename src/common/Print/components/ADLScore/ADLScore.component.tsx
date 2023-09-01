import {Box} from '@mui/material';
import {adlScoreStyles} from './ADLScore.style';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ADLScore = (props: {info: string; score: number}) => {
  const {info, score = 0} = props;
  const {classes} = adlScoreStyles();
  return (
    <Box className={classes.aldScore} data-testid='adl-score'>
      <Box className={classes.scoreBox}>
        <span className={classes.scoreLabel}>Score:</span>
        {score}
      </Box>
      <Box className={classes.scoreInfo}>
        <InfoOutlinedIcon style={{width: '40px', height: '40px'}} />
        <Box>{info}</Box>
      </Box>
    </Box>
  );
};

export default ADLScore;
