import {DIALOG_TYPES} from 'globals/global.constants';
import {store} from 'store';
import {openOverlayDialog} from 'store/commonReducer/common.action';
import {fireEvent, render, screen} from '../../../../utilities/test-utils';
import CorporateDialog from './CorporateDialog/CorporateDialog.component';
import {postCorporateService} from 'services/coporateAndFacilitiesService/corporateManagementService/corporateManagement.service';

const mockedValues = {
  common: {
    dialog: {
        isOpen:true,
        type:"CORPORATE",
        dialogTitle: 'Edit Corporate',
      data: {
        name: 'New Old Age',
        code: 'Corp1',
        phone: 9876543210,
        corporate_email: 'NOA@srijan.com',
        corporate_address: {
          street: '123456',
          state: 'NY',
          zipcode: '12435',
        },
      },
    },
  },
};
const props = {};
describe('Corporate Dailog Component', () => {
  test('should render CorporateDailog component', () => {
    const {queryByTestId} = render(<CorporateDialog {...props} />, {
      initialState: mockedValues,
    });
    const element = queryByTestId(/corporate-dialog/i);
    expect(element).toBeTruthy();
  });
});
