import React from 'react';
import {resetPrintData, setPrintData} from 'store/printReducer/print.action';
import {printIt} from './components/PrintButton/PrintButton.component';
import {IUsePrintParams} from './Print.types';
import {ASSESSMENT_STATUS_KEYS} from './Print.utility';
import {Roles} from 'globals/enums';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const usePrint = ({type: templateType, data, meta}: IUsePrintParams) => {
  const {type, showButton} = useAppSelector((state: any) => state.print);
  const userRole = useAppSelector((state: any) => state.auth.userRole);

  const dispatch: any = useAppDispatch();
  // check for key press
  const printKeyDown = React.useCallback(
    (event: any) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.code === 'KeyP' &&
        !event.altKey &&
        !event.shiftKey
      ) {
        event.preventDefault();
        event.stopPropagation();
        if (type && showButton) printIt();
        else window.print();
      }
    },
    [type, showButton],
  );

  const listenerRef = React.useRef<any>();

  // add & remove event listener to check for key press
  React.useEffect(() => {
    //new design cmd+p only work for admin
    if (userRole.includes(Roles.Admin)) {
      if (listenerRef.current) {
        window.removeEventListener('keydown', listenerRef.current, true);
      }

      window.addEventListener('keydown', printKeyDown, true);
      listenerRef.current = printKeyDown;
    }
  }, [printKeyDown]);

  // setPrintData on any change
  React.useEffect(() => {
    dispatch(
      setPrintData({
        type: templateType,
        data: {
          meta,
          data,
        },
        showButton: ASSESSMENT_STATUS_KEYS.includes(meta.status),
      }),
    );
  }, [meta, data, templateType, dispatch]);

  // cleanup
  React.useEffect(() => {
    return () => {
      dispatch(resetPrintData()); // resetPrintData on cleanup
      if (listenerRef.current) {
        window.removeEventListener('keydown', listenerRef.current, true);
      }
    };
  }, [dispatch]);
};

export default usePrint;
