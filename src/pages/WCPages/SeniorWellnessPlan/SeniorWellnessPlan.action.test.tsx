import {
  getWellnessPlan,
  updateWellnessPlan,
  getSeniorCareGiver,
} from './SeniorWellnessPlan.action';
import {store} from '../../store/store';
import * as Service from 'services/wellnessPlanService/wellnessPlan.service';
import * as CareGiverService from 'services/commonService/common.service';
import {waitFor} from '@testing-library/react';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import { getCareGiver } from 'store/commonReducer/common.action';
jest.mock('services/wellnessPlanService/wellnessPlan.service');
jest.mock('services/commonService/common.service');

const updateMockData = {
  "leftField": {
      "situation": {
          "error": false,
          "errorText": "",
          "value": "testing"
      },
      "background": {
          "error": false,
          "errorText": "",
          "value": "testing"
      },
      "assessment": {
          "error": false,
          "errorText": "",
          "value": "testing"
      },
      "recommendation": {
          "error": false,
          "errorText": "",
          "value": "testing"
      }
  },
  "memberPriority": [
      {
          "seq": 1,
          "value": "testing",
          "error": false,
          "errorText": ""
      }
  ],
  "challenges": [
      {
          "seq": 1,
          "value": "testing",
          "error": false,
          "errorText": ""
      }
  ],
  "isNextVersion": true,
  "selectedSeniorCareGiver": {
      "value": "senior-2b24e2b2c6724a52841f9a494d246fef",
      "label": "Senior - Abhay Katiyar"
  }
}

const WellnessplanMockedPayload = {
  wellnessPlanDetail: {
    situation: {error: false, errorText: '', value: 'situation'},
    background: {error: false, errorText: '', value: 'background'},
    assessment: {error: false, errorText: '', value: 'assesment'},
    recommendation: {error: false, errorText: '', value: 'recommendation'},
  },
  memberPriority: [
    {
      seq: 1,
      value: 'priority',
      error: false,
      errorText: '',
    },
  ],
  challenges: [
    {
      seq: 1,
      value: 'chalanges',
      error: false,
      errorText: '',
    },
  ],
  dateStarted: '18/05/2022',
  careagentId: '123',
  createdDate: '18/05/2022',
  currentVersion: '1',
  lastUpdatedBy: 'test',
  lastUpdatedDate: '18/05/2022',
  lastVersion: '3',
  modificationDate: '',
  seniorId: '1234223',
  seniorName: 'test',
  lastAvailableVersion: 2,
};
const mockedInitialState = {
  show: false,
  text: '',
  loadingApp: false,
};
const mockedInitialState2 = {
  show: true,
  text: '',
  loadingApp: false,
};

describe('SeniorWellnessPlan.action', () => {
  test('should test for initiateAddUsers action generator', async () => {
    const mockData = {
      wellnessPlanDetail: {
        situation: {error: false, errorText: '', value: ''},
        background: {error: false, errorText: '', value: ''},
        assessment: {error: false, errorText: '', value: ''},
        recommendation: {error: false, errorText: '', value: ''},
      },
      memberPriority: [
        {
          seq: 1,
          value: '',
          error: false,
          errorText: '',
        },
      ],
      challenges: [
        {
          seq: 1,
          value: '',
          error: false,
          errorText: '',
        },
      ],
      dateStarted: '',
      careagentId: '',
      createdDate: '',
      currentVersion: '',
      lastUpdatedBy: '',
      lastUpdatedDate: '',
      lastVersion: '',
      modificationDate: '',
      seniorId: '',
      seniorName: '',
      isLatestVersion: true,
      lastAvailableVersion: 0,
    };

    expect(store.getState().wellnessPlan).toEqual(mockData);
  });

  test('api call with vailid params on dispatching getWellnessPlan', async () => {
    store.dispatch(getWellnessPlan());
    expect(Service.getWellnessPlanService).toHaveBeenCalledTimes(1);
    await waitFor(() => null);
  });
  test('api call with vailid params on dispatching getCareGiver', async () => {
    store.dispatch(getCareGiver());
    expect(CareGiverService.getCareGiverService).toHaveBeenCalledTimes(1);
    await waitFor(() => null);
  });
  test('api call with vailid params on dispatching updateWellnessPlan', async () => {
    store.dispatch(updateWellnessPlan(
      updateMockData.leftField,
      updateMockData.memberPriority,
      updateMockData.challenges,
      updateMockData.isNextVersion,
      updateMockData.selectedSeniorCareGiver
    ));
    store.dispatch(getWellnessPlan());
    expect(Service.getWellnessPlanService).toHaveBeenCalledTimes(1);
    await waitFor(() => null);
  });
  test('api call with vailid params on dispatching getSeniorCareGiver', async () => {
    store.dispatch(getSeniorCareGiver());

    expect(CareGiverService.getCareGiverService).toHaveBeenCalledTimes(1);
    await waitFor(() => null);
  });
  test('dispatching hideApplicationLoader', async () => {
    store.dispatch(hideApplicationLoader());
    expect(store.getState().applicationLoader).toEqual(mockedInitialState);
  });
  test('dispatching showApplicationLoader', async () => {
    store.dispatch(showApplicationLoader());
    expect(store.getState().applicationLoader).toEqual(mockedInitialState2);
  });
});
