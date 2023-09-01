import React from 'react';
import {useAppSelector} from 'hooks/reduxHooks';

import {DIALOG_TYPES} from 'globals/global.constants';

import SuccessDialog from './dialogComponents/SuccessDialog';
import ErrorDialog from './dialogComponents/ErrorDialog';
import CallEntryDailog from './dialogComponents/CallEntryDialog';

const OverlayDialogs = React.memo(() => {
  const dialogType = useAppSelector(
    (state: any) => state.common.overlayDialog.type,
  );

  switch (dialogType) {
    case DIALOG_TYPES.SUCCESS:
      return <SuccessDialog />;
    case DIALOG_TYPES.ERROR:
      return <ErrorDialog />;
    case DIALOG_TYPES.ERROR2:
      return <SuccessDialog error={true} />;
    case DIALOG_TYPES.CALL_ENTRY:
      return <CallEntryDailog />;
    default:
      return null;
  }
});

export default OverlayDialogs;
