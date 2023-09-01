import {render} from 'utilities/test-utils';
import {SeniorCallSchedulerForm} from './SchedulerForm.component';

const props = {
  seniorInfo: {
    accountId: 'bc66b758376045d98dd881c7695f68da',
    accountNo: 'bc66b758376045d98dd881c7695f68da',
    currentSchedule: ['-'],
    id: 'senior-01d4b5025c954ce4a63d85871631d403',
    lastTimeContacted: '-',
    location: '',
    memberName: 'Abhay Katiyar',
    timeToCall: '-',
    timeZone: 'America/Chicago',
  },
  callerList: [
    {key: 'senior-01d4b5025c954ce4a63d85871631d403', value: 'Abhay - Senior'},
    {key: 'senior-01d4b5025c954ce4a63d85871631d403', value: 'Abhay - Senior'},
  ],
  assignedCareAgent: [
    {key: 'admin-75a882b257b54002abc49a36187560f3', value: 'Abhai Katiyar'},
    {key: 'admin-3a6ef1b655cf40a6afd3f7f7904336bf', value: 'Devtest admin'},
    {key: 'admin-2135c32253874189926c7d55bbccf617', value: 'Ishan Yadav'},
    {key: 'admin-fa5987873d8c4f82a3678a8e72d275d6', value: 'John djfo'},
  ],
  callType: [
    {key: 'Senior Onboarding', value: 'Senior Onboarding'},
    {key: 'Caregiver Onboarding', value: 'Caregiver Onboarding'},
    {key: 'Senior Check-in', value: 'Senior Check-in'},
    {key: 'Caregiver Check-in', value: 'Caregiver Check-in'},
    {key: 'Return Call', value: 'Return Call'},
    {key: 'Facility follow-up', value: 'Facility follow-up'},
    {key: 'Fall Detected', value: 'Fall Detected'},
    {key: 'SOS', value: 'SOS'},
    {key: 'Care Coordination', value: 'Care Coordination'},
    {key: 'Care Insight Notification', value: 'Care Insight Notification'},
    {key: 'Other', value: 'Other'},
  ],
  callInfo: {},
};

describe('SeniorCallSchedulerForm Component', () => {
  test('should render SeniorCallSchedulerForm  component', () => {
    const {queryByTestId} = render(<SeniorCallSchedulerForm {...props} />);
    const element = queryByTestId(/Senior-Call-Scheduler-Form/i);
    expect(element).toBeTruthy();
  });
});
