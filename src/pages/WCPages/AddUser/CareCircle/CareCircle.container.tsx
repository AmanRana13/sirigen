import {useEffect, useState} from 'react';
import {Box, CircularProgress} from '@mui/material';

import {CareGiverComponent} from './CareCircle.component';
import {fetchCareGiverInfo} from './CareCircle.action';
import {useAppDispatch} from 'hooks/reduxHooks';

const CareCircle = () => {
  const dispatch: any = useAppDispatch();

  const [careGiverInfo, setCareGiverInfo] = useState(undefined);
  /**
   * @function fetchCaregivers
   * @description to fetch caregivers data
   */
  const fetchCaregivers = async () => {
    const response: any = await dispatch(fetchCareGiverInfo());
    setCareGiverInfo(response);
  };

  /**
   * @description to fecth careGivers details
   */
  useEffect(() => {
    fetchCaregivers();
  }, []);

  if (careGiverInfo) {
    return <CareGiverComponent careGiverInfo={careGiverInfo} />;
  } else {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress />
      </Box>
    );
  }
};
export default CareCircle;
