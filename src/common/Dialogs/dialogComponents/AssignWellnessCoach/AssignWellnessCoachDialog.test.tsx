import { DIALOG_TYPES } from 'globals/global.constants';
import { render } from 'utilities/test-utils';
import AssignWellnessCoachDialog from './AssignWellnessCoachDialog';

const mockData = {
    "minimal": {
        "name": {
            "middle_name": "",
            "first_name": "Abhay",
            "last_name": "Katiyar"
        },
        "gender": "Male",
        "dob": "1993-01-01T18:30:00+00:00",
        "mobile_number": "1122333200",
        "member_since": "2023-03-28T10:27:43.467052+00:00",
        "location": {
            "zipcode": "53029",
            "city": "Orlando",
            "street": "County Road VV",
            "timezone": "America/Chicago",
            "coordinates": {
                "latitude": "43.156065",
                "longitude": "-88.3398448"
            },
            "state": "WI",
            "radius": {
                "value": "5.0",
                "radius_measurement": "mile"
            }
        },
        "timezone": "America/Chicago"
    },
    "basic_info": {
        "preferred_name": null,
        "location": {
            "zipcode": "53029",
            "city": "Orlando",
            "street": "County Road VV",
            "timezone": "America/Chicago",
            "coordinates": {
                "latitude": "43.156065",
                "longitude": "-88.3398448"
            },
            "state": "WI",
            "radius": {
                "value": "5.0",
                "radius_measurement": "mile"
            }
        },
        "timezone": "America/Chicago"
    },
    "account_id": "bc66b758376045d98dd881c7695f68da",
    "senior_id": "senior-01d4b5025c954ce4a63d85871631d403",
    "alerts": "-",
    "attention": "-",
    "unack": "-",
    "good_news": "-"
}

describe('AssignWellnessCoachDialog', () => {
  test('should render AssignWellnessCoachDialog', () => {
    const { getByTestId } = render(<AssignWellnessCoachDialog />, {
      initialState: {
        common: {
          dialog: {
            isOpen: true,
            type: DIALOG_TYPES.ASSIGN_WELLNESS_COACH,
            data: mockData
          },
          careAgentList: {
            data: [],
            lastEvaluatedKey: '',
            searchLastEvaluatedKey: '',
            loading: false,
            totalRows: 0,
            currentPage: 1,
          },
        },
      },
    });
    const element = getByTestId(/AssignWellnessCoachDialog/i);
    expect(element).toBeInTheDocument();
  });

  test('should render AssignWellnessCoachDialog Cancel Button', () => {
    const { getByTestId, queryByTestId } = render(<AssignWellnessCoachDialog />, {
      initialState: {
        common: {
          dialog: {
            isOpen: true,
            type: DIALOG_TYPES.ASSIGN_WELLNESS_COACH,
            data: mockData
          },
          careAgentList: {
            data: [],
            lastEvaluatedKey: '',
            searchLastEvaluatedKey: '',
            loading: false,
            totalRows: 0,
            currentPage: 1,
          },
        },
      },
    });
    const cancel = getByTestId(/AssignWellnessCoachCancel/i);
    expect(cancel).toBeInTheDocument();
  })

  test('should render AssignWellnessCoachDialog Assign Button', () => {
    const { getByTestId } = render(<AssignWellnessCoachDialog />, {
      initialState: {
        common: {
          dialog: {
            isOpen: true,
            type: DIALOG_TYPES.ASSIGN_WELLNESS_COACH,
            data: mockData
          },
          careAgentList: {
            data: [],
            lastEvaluatedKey: '',
            searchLastEvaluatedKey: '',
            loading: false,
            totalRows: 0,
            currentPage: 1,
          },
        },
      },
    });
    const assign = getByTestId(/AssignWellnessCoachAssign/i);
    expect(assign).toBeInTheDocument();
  })
});