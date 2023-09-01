/* eslint-disable max-len */
import {store} from '../../../store/store';
import {
  getHolisticAssessment,
  postHolisticAssessment,
} from './HolisticAssessment.action';
import {showApplicationLoader} from 'common/ApplicationLoader';
import {mockParam} from '../../../_mocks_/holisticAssessmentMocks';

describe('dispatch action creator postHolisticAssessment', () => {
  test('postHolisticAssessment', async () => {
    await store.dispatch(postHolisticAssessment(mockParam));
    await store.dispatch(showApplicationLoader());
    await store.dispatch(getHolisticAssessment());
    expect(store.getState().applicationLoader).toBeTruthy();
  });
});
