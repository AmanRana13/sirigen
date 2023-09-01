import {render} from '../../utilities/test-utils';
import SeniorCallSchedule from './SeniorCallSchedule.component';
import {store} from '../../store/store';
import {
  hideApplicationLoader,
  showApplicationLoader,
} from 'common/ApplicationLoader';
import {markCompleteCall, updateCallStatus} from './SeniorCallSchedule.action';
import {showToast} from 'common/Toast';
import {getCallScheduleList} from 'pages/WCPages/Home/Home.action';

describe('SeniorCallSchedule component', () => {
  test('should render SeniorCallSchedule component', async () => {
    const props = {
      computedMatch: {},
      exact: true,
      getCallScheduleList: jest.fn(),
      history: {},
      location: {},
      markCompleteCall: jest.fn(),
      match: {},
      meta: {},
      path: '/senior/:seniorID/:accountID/:timezone/:tab/:careInsightTab?',
      staticContext: undefined,
      updateCallStatus: jest.fn(),
    };
    const {queryByTestId} = render(
      <SeniorCallSchedule
        callList={[]}
        listAll={[]}
        setRefreshState={false}
        isLoading={true}
        noRecord={false}
        {...props}
      />,
    );
    await store.dispatch(
      getCallScheduleList({
        seniorID: 'senior-33246c5ba7234859a52006df7e0a4645',
        listAll: [],
      }),
    );
    const element = queryByTestId(/seniorCallSchedule/i);

    expect(element).toBeTruthy();
  });
});
describe('SeniorCallSchedule action creaters', () => {
  test('updateCallStatus', async () => {
    await store.dispatch(showApplicationLoader());
    await store.dispatch(
      updateCallStatus({
        senior_id: 'senior-33246c5ba7234859a52006df7e0a4645',
        account_id: '0b0bdebe65c34269915d61bde3486267',
        call_id: '123456',
        call_status: 'inComplete',
      }),
    );

    await store.dispatch(hideApplicationLoader());
    await store.dispatch(showToast('Call Deleted Successfully!', 'success'));
    expect(store.getState().applicationLoader).toBeTruthy();
    expect(store.getState().toast).toStrictEqual({
      duration: 4000,
      message: 'Call Deleted Successfully!',
      open: true,
      type: 'success',
    });
  });
  test('markCompleteCall', async () => {
    await store.dispatch(showApplicationLoader());
    await store.dispatch(
      markCompleteCall({
        senior_id: 'senior-33246c5ba7234859a52006df7e0a4645',
        account_id: '0b0bdebe65c34269915d61bde3486267',
        call_id: '123456',
      }),
    );

    await store.dispatch(hideApplicationLoader());
    await store.dispatch(showToast('Call Completed Successfully!', 'success'));

    expect(store.getState().applicationLoader).toBeTruthy();
    expect(store.getState().toast).toStrictEqual({
      duration: 4000,
      message: 'Call Completed Successfully!',
      open: true,
      type: 'success',
    });
  });
});
