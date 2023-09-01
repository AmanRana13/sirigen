import React, {useState, useEffect} from 'react';
import {Box, CircularProgress} from '@mui/material';
import {connect} from 'react-redux';

import {MedicalInfoComponent} from './MedicalInfo.component';
import {
  saveMedicalInfo,
  fetchMedicalInfo,
  setPrescriptionData,
} from './MedicalInfo.action';

const MedicalInfoContainer = (props: any) => {
  const [medicalInfo, setMedicalInfo] = useState<any>(null);

  useEffect(() => {
    props.fetchMedicalInfo().then((res: any) => {
      setMedicalInfo({
        prescription: setPrescriptionData(res),
        history: res?.history,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (medicalInfo) {
    return (
      <MedicalInfoComponent
        medicalInfo={JSON.parse(JSON.stringify(medicalInfo))}
        {...props}
      />
    );
  } else {
    return (
      <Box
        data-testid='medical-info-container'
        display='flex'
        justifyContent='center'
        alignItems='center'>
        <CircularProgress />
      </Box>
    );
  }
};

const MedicalInfo = connect(null, {
  saveMedicalInfo,
  fetchMedicalInfo,
})(MedicalInfoContainer);

export default MedicalInfo;
