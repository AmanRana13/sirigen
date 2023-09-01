import React from 'react';
import {
  resetPreviewData,
  setPreviewData,
} from 'store/previewReducer/preview.action';
import {IUsePreviewParams} from './Preview.types';
import {useAppDispatch} from 'hooks/reduxHooks';

/**
 * @description hook to use Preview Feature on a page.
 * @param {IUsePreviewParams} { type, data, meta }
 * @returns {void}
 */
const usePreview = ({type: templateType, data, meta}: IUsePreviewParams) => {
  const dispatch: any = useAppDispatch();

  // setPrintData on any change
  React.useEffect(() => {
    dispatch(
      setPreviewData({
        type: templateType,
        data: {
          meta,
          data,
        },
        showButton: true,
      }),
    );
  }, [meta, data, templateType, dispatch]);

  // cleanup
  React.useEffect(() => {
    return () => {
      dispatch(resetPreviewData()); // resetPreviewData on cleanup
    };
  }, [dispatch]);
};

export default usePreview;
