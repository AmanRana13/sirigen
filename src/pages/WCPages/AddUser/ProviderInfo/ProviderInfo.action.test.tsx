import {fetchProviderInfo} from './ProviderInfo.action';
import {store} from '../../../store/store';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {saveProviderInfo} from './ProviderInfo.action';

const accountInfo = {
  account_id: '7a97969b5658469b807c8b2797ec62ee',
  senior_id: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
};
beforeAll(() =>
  localStorage.setItem('accountInfo', JSON.stringify(accountInfo)),
);
const providerInfo = {
  dentist: {
    provider_addition: [
      {
        contact_phone: '2222222222',
        created_date: '2021-12-17T05:22:26.332674+00:00',
        email_address: 'tes03@gmail.com',
        last_modified_by: null,
        name: {
          first_name: 'test',
          last_name: 'ss',
          middle_name: null,
        },
        provider_id: '77e7dfabdc7148a498db19d95107a5f3',
        provider_name: 'test',
        senior_id: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
        speciality: 'Geriatric Dentistry/Geriodontics',
      },
    ],
    provider_modification: [],
    provider_deletion: [],
  },
  doctor: {
    provider_addition: [
      {
        contact_phone: '0321456789',
        created_date: '2021-12-17T05:22:26.339780+00:00',
        email_address: 'tes0s3@gmail.com',
        last_modified_by: null,
        name: {
          first_name: 'test',
          last_name: 'as',
          middle_name: null,
        },
        provider_id: '90f00b64f17d4fc6949f7a376644204e',
        provider_name: 'res',
        senior_id: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
        speciality: 'Anesthesiologist',
        is_primary: true,
      },
    ],
    provider_modification: [],
    provider_deletion: [],
  },
  pharmacy: {
    provider_addition: [
      {
        name: 'Florida Pharmacy',
        contact_phone: '4545345432',
        address: {
          street: '5114,',
          state: 'FL',
          city: 'Homestead',
          zip: '33033',
        },

        fax: '4312423133',
        website: 'www.florida.com',
        comment: 'welcome to florida pharmacy',
        is_primary: true,
      },
    ],
    provider_modification: [],
    provider_deletion: [],
  },
};
describe('api call', () => {
  test('dispatch saveProviderInfo action creator', async () => {
    await store.dispatch(showApplicationLoader());
    await store.dispatch(saveProviderInfo(providerInfo));
    await store.dispatch(hideApplicationLoader());
    await store.dispatch(showToast('Saved Successfully', 'success'));
    expect(store.getState().toast).toStrictEqual({
      duration: 4000,
      message: 'Saved Successfully',
      open: true,
      type: 'success',
    });
  });
});
