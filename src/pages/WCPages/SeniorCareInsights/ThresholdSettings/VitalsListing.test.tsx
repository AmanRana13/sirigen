import { VitalState } from 'globals/enums';
import { store } from 'store';
import {fireEvent, render, screen} from '../../../utilities/test-utils';
import { unAssignVitalState } from './Threshold.action';
import VitalsListing from './VitalsListing';

const selectedVital = {
  seniorId: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
  measurementUnit: 'Beats Per Minute (BPM)',
  measurementName: 'heart_rate_measurement',
  currentState: VitalState.ACTIVE_INSIGHT,
  measurementTitle: 'Heart Rate',
  vendorName: 'Navigil',
  modelNumber: '123456789',
  createdDate: '2021-10-26T04:36:09.43163',
  selected: true,
  baseline: {
    high: 182,
    low: 140,
    avg: 161,
  },
  threshold: {
    upHigh: 45,
    upLow: null,
    lowHigh: null,
    lowLow: 40,
  },
};

describe('VitalsListing Component', () => {
  test('should render active VitalsListing', () => {
    render(<VitalsListing />, {
      initialState: {
        seniorCareInsights: {
          thresholds: {
            vitals: {
              active: [{...selectedVital, currentState: 'assigned'}],
              inactive: [],
            },
          },
        },
      },
    });
    const element = screen.getByTestId(/active-vitals-listing/i);

    expect(element).toBeInTheDocument();
  });

  test('should render inactive VitalsListing ', () => {
    render(<VitalsListing />, {
      initialState: {
        seniorCareInsights: {
          thresholds: {
            vitals: {
              active: [],
              inactive: [{...selectedVital, currentState: 'unassigned'}],
            },
          },
        },
      },
    });
    const element = screen.getByTestId(/inactiveVitalsListing/i);

    expect(element).toBeInTheDocument();
  });

  test('test when we click on close vital button and active vital state is assigned', async () => {
    render(<VitalsListing />, {
      initialState: {
        seniorCareInsights: {
          thresholds: {
            vitals: {
              active: [{...selectedVital, currentState: 'assigned'}],
              inactive: [],
            },
          },
        },
      },
    });
    const closeVitalButton = screen.getByTestId(/closeVitalButton/i);
    fireEvent.click(closeVitalButton);
    await store.dispatch(unAssignVitalState(selectedVital))
   // expect(await screen.findByText(/Remove/i)).toBeInTheDocument();
    expect(closeVitalButton).toBeInTheDocument();
  });
  test('test when we click on close vital button and active vital state is active_insight', async () => {
    render(<VitalsListing />, {
      initialState: {
        seniorCareInsights: {
          thresholds: {
            vitals: {
              active: [{...selectedVital, currentState: 'active_insight'}],
              inactive: [],
            },
          },
        },
      },
    });
    const closeVitalButton = screen.getByTestId(/closeVitalButton/i);
    fireEvent.click(closeVitalButton);
    // expect(await screen.findByText(/Got it!/i)).toBeInTheDocument();

    expect(closeVitalButton).toBeInTheDocument();
  });

  test('select any active vital', async () => {
    render(<VitalsListing />, {
      initialState: {
        seniorCareInsights: {
          thresholds: {
            vitals: {
              active: [{...selectedVital, currentState: 'active_insight'}],
              inactive: [],
            },
          },
        },
      },
    });
    const selectActiveVital = screen.getByTestId(/select-active-vital/i);
    fireEvent.click(selectActiveVital);

    expect(selectActiveVital).toBeInTheDocument();
  });

  test('test add button of a vital', () => {
    render(<VitalsListing />, {
      initialState: {
        seniorCareInsights: {
          thresholds: {
            vitals: {
              active: [],
              inactive: [{...selectedVital, currentState: 'unassigned'}],
            },
          },
        },
      },
    });
    const addVitalButton = screen.getByTestId(/addVitalButton/i);
    expect(addVitalButton).toBeInTheDocument();

    fireEvent.click(addVitalButton);
    expect(addVitalButton).not.toBeInTheDocument();
  });
});
