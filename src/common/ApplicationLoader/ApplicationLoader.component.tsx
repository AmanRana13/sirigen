import {useAppSelector} from 'hooks/reduxHooks';
import {Box, Backdrop, CircularProgress} from '@mui/material';

import {loaderStyles} from './ApplicationLoader.style';
import {PRINT_HIDE_CLASS} from 'common/Print/Print.types';

const ApplicationLoader = () => {
  const {classes} = loaderStyles();

  const {show, text} = useAppSelector((state: any) => state.applicationLoader);
  const {filesUploadCount, uploadedFilesCount} = useAppSelector(
    (state: any) => state.uploadFiles,
  );
  return (
    <Backdrop
      className={`${classes.backdrop} ${PRINT_HIDE_CLASS}`}
      open={show}
      data-testid='application-loader'>
      <Box className={classes.loaderContainer}>
        <CircularProgress thickness={2} size={100} color='inherit' />
        <Box>{text}</Box>
        {filesUploadCount > 0 && (
          <Box>
            Uploading: {uploadedFilesCount}/{filesUploadCount} files
          </Box>
        )}
      </Box>
    </Backdrop>
  );
};

export {ApplicationLoader};
