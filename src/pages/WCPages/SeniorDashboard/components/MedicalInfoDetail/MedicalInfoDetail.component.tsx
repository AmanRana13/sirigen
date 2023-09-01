import {useState, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {Box, ListItemText, Typography} from '@mui/material';
import moment from 'moment';

import {medicalInfoDetailStyle} from './MedicalInfoDetail.style';
import {DATE_FORMAT_SHORT_YEAR} from 'globals/global.constants';

import {
  fetchMedicalDetail,
  getMedicalConditions,
} from './MedicalInfoDetail.action';
import {RESET_MEDICAL_CONDITION} from 'store/commonReducer/common.action';
import {IMedicalConditionData} from 'pages/WCPages/Assessments/MedicalCondition/MedicalCondition.types';

const MedicalInfoDetail = () => {
  const {classes} = medicalInfoDetailStyle();
  const dispatch: any = useAppDispatch();
  const [medicalInfo, setMedicalInfo] = useState<any>(null);

  useEffect(() => {
    dispatch(getMedicalConditions());
    dispatch(fetchMedicalDetail()).then((res: any) => {
      setMedicalInfo(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      dispatch({type: RESET_MEDICAL_CONDITION});
    };
  }, []);

  const medicalConditions: IMedicalConditionData[] = useAppSelector(
    (state: any) => state.common.medicalConditions,
  );

  return (
    <Box className={classes.container} data-testid='medical-info-detail'>
      <Typography variant='h5'>Last Physical Exam</Typography>
      <Typography variant='body1'>
        {medicalInfo?.last_physical_examination
          ? moment(medicalInfo.last_physical_examination).format(
              DATE_FORMAT_SHORT_YEAR,
            )
          : ''}
      </Typography>
      <Box mt={3}>
        <Typography variant='h5'>Medical Conditions</Typography>
      </Box>
      {medicalConditions?.map((condition: IMedicalConditionData) => {
        if (!condition.resolved) {
          return (
            <ListItemText
              key={condition.condition}
              sx={{display: 'list-item', marginLeft: 2}}>
              {condition.condition}
            </ListItemText>
          );
        }
      })}
      <Box mt={3}>
        <Typography variant='h5'>Allergies/Dietary Concers</Typography>
      </Box>
      <Typography variant='body1'>{medicalInfo?.allergies ?? ''}</Typography>
      <Box mt={3}>
        <Typography variant='h5'>Home Medical Devices</Typography>
      </Box>
      <Typography variant='body1'>
        {medicalInfo?.home_medical_devices ?? ''}
      </Typography>
    </Box>
  );
};

export default MedicalInfoDetail;
