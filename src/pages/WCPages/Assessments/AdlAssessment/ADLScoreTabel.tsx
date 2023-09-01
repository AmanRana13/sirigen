import {Box, Typography} from '@mui/material';
export const ScoreTable = ({surveyCount}: any) => {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      width={143}
      height={59.3}
      fontSize={16}
      style={{
        border: '1px solid #c9c9c9',
        borderRadius: 10,
        color: '#0186a5',
      }}
      data-testid='AdlScoreTableComponent'>
      <Typography variant='h6'>Score: </Typography>

      <span style={{color: 'black', paddingLeft: 5}}>
        {' '}
        <Typography variant='h6'>{surveyCount} </Typography>
      </span>
    </Box>
  );
};
