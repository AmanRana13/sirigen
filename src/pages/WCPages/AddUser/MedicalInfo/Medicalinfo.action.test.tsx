import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {showToast} from 'common/Toast';
import {store} from '../../../store/store';
import {saveMedicalInfo, setPrescriptionData} from './MedicalInfo.action';

const accountInfo = {
  account_id: '7a97969b5658469b807c8b2797ec62ee',
  senior_id: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
};
beforeAll(() =>
  localStorage.setItem('accountInfo', JSON.stringify(accountInfo)),
);

const data = {
  history: {
    addictions: [{data: '21', value: 'Tobacco'}],
    allergies: 'Nut, Almond, Raddish',
    created_date: '2021-05-07T06:41:02.484435+00:00',
    disabilities: [
      {
        date: '2021-03-07T00:00:00+00:00',
        value: 'Hearing Problem',
      },
      {
        date: '2021-10-04T05:37:00+00:00',
        value: 'Speaking Problem',
      },
    ],
    home_medical_device_reason: 'Type 2 diabetes',
    home_medical_device_usage_date: '2010-03-07T00:00:00+00:00',
    home_medical_devices: 'Insulin Pump',
    injuries: [
      {date: '2021-03-07T00:00:00+00:00', value: 'Leg Ingury'},
      {date: '2021-03-07T00:00:00+00:00', value: 'Head Ingury'},
    ],
    last_physical_examination: '2021-10-03T18:30:00+00:00',
    other_exams: [
      {
        date: '2021-03-07T00:00:00+00:00',
        value: 'Follow Up with Cardiology',
      },
      {
        date: '2021-04-06T00:00:00+00:00',
        value: 'Follow Up with Insulin Expert',
      },
    ],
    pacemaker_implementation_date: null,
    pacemaker_user: 'Yes',
    senior_id: 'senior-f18173fa564c42a2a6622db899072c45',
    vaccines: [{date: '2021-02-07T00:00:00+00:00', value: 'Cors Vars 2019'}],
  },
};
const medicalInfo = {
  history: data.history,
  prescription: [
    {
      allergies: 'no',
      comment: 'no',
      dose: 1,
      dose_form: 'Powder',
      duration_of_medication: null,
      frequency: 3,
      is_food_required: true,
      medication_id: '00031aa22d3b402c97b1e997ebfaf239',
      medication_name: 'Cetamol-1',
      medication_schedule: [{day: ''}],
      medication_type: 'Solid',
      prescribed_date: '2021-03-15T19:32:08.374320+00:00',
      reason: 'heart issue',
      refill_date: '2021-05-27T11:40:00+00:00',
      remaining_pills: 10,
      remaining_refill: 3,
      strength: '100 MG',
    },
    {},
  ],
};
describe('MedicalInfo action creaters', () => {
  test('saveMedicalInfo', async () => {
    await store.dispatch(showApplicationLoader());
    await store.dispatch(saveMedicalInfo(data));
    await store.dispatch(hideApplicationLoader());
    await store.dispatch(showToast('Saved Successfully', 'success'));
    expect(store.getState().applicationLoader).toBeTruthy();
    expect(store.getState().toast).toStrictEqual({
      duration: 4000,
      message: 'Saved Successfully',
      open: true,
      type: 'success',
    });
  });
  test('setPrescriptionData', async () => {
    await store.dispatch(showApplicationLoader());
    await store.dispatch(() => setPrescriptionData(medicalInfo));
    await store.dispatch(hideApplicationLoader());
    expect(store.getState().applicationLoader).toBeTruthy();
  });
});
