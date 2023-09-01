import {hideApplicationLoader} from 'common/ApplicationLoader';
import {getPortalConfigService} from 'services/configService/config.service';
import {showError} from 'store/commonReducer/common.action';

export const GET_CONFIG_DATA = 'GET_CONFIG_DATA';

export const getPortalConfig = () => async (dispatch: any) => {
  try {
    const params = {
      name: JSON.stringify([
        'locate_me_loader',
        'portal_info_upload_url',
        'portal_info_upload_file',
        'portal_info_resources',
        'portal_auto_save_timeout',
      ]),
    };
    const response = await getPortalConfigService(params);
    if (response) {
      dispatch({
        type: GET_CONFIG_DATA,
        payload: response,
      });
    }
  } catch (error) {
    dispatch(hideApplicationLoader());
    dispatch(showError(error));
    return error;
  }
};
