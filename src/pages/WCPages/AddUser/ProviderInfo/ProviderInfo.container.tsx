import React, {useEffect, useState} from 'react';
import {Box, CircularProgress} from '@mui/material';
import {connect} from 'react-redux';

import {ProviderInfoComponent} from './ProviderInfo.component';
import {saveProviderInfo, fetchProviderInfo} from './ProviderInfo.action';

const ProviderInfoContainer = (props: any) => {
  const [providerInfo, setProviderInfo] = useState(null);

  useEffect(() => {
    props.fetchProviderInfo().then((res: any) => {
      setProviderInfo(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (providerInfo) {
    return <ProviderInfoComponent providerInfo={providerInfo} {...props} />;
  } else {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress />
      </Box>
    );
  }
};

const ProviderInfo = connect(null, {
  saveProviderInfo,
  fetchProviderInfo,
})(ProviderInfoContainer);
export default ProviderInfo;
