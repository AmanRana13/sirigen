import { getSeniorCalenderDates } from 'store/commonReducer/common.action';
import {render, fireEvent, within, waitFor} from 'utilities/test-utils';
import {mockApplicationState} from '_mocks_/commonMocks';
import LocationDateSelector from './LocationDateSelector';

const coordinates = {latitude: '-40.7013287', longitude: '-121.0813535'};
const common = {
  seniorDetail: {
    basicInfo: {
      user_id: 'senior-33246c5ba7234859a52006df7e0a4645',
      height: {
        feet: '4.0',
        inch: '10.0',
      },
      weight: '137.0',
      radius: {
        value: '670.0',
        radius_measurement: 'feet',
      },
      address: {
        state: 'GA',
        city: 'Sacramento',
        street: 'None',
        zipcode: '94203',
        timezone: 'America/Los_Angeles',
        radius: {
          value: '670.0',
          radius_measurement: 'feet',
        },
        coordinates: {
          latitude: '-40.7013287',
          longitude: '-121.0813535',
        },
      },
      academic_level: 'Bachelor Degree',
      career: 'engineer',
      primary_spoken_language: 'Hindi',
      other_spoken_language: 'English',
      preferred_name: 'Tannu',
      home_phone: null,
      emergency_phone: '1111111111',
      email: null,
      faith: 'Hindu',
      other_faith: null,
      home_technology: 'Unknown',
      home_gate_code: '543423',
      race: null,
      other_race: 'Indian',
      pets: [{0: 'Dogs'}],
      other_pets: null,
      social_media_links: [{0: 'insta.com'}, {1: 'www.google.com'}],
      life_event: 'SomeEvent',
      lock_box_code: null,
      created_date: '2021-05-05T16:29:09.640906+00:00',
    },
    minimalInfo: {
      name: {
        first_name: 'Jeff',
        last_name: 'Barbieri',
        middle_name: null,
      },
      mobile_number: '8966894974',
      gender: 'Female',
      dob: '1997-08-11T00:00:00+00:00',
      user_id: 'senior-33246c5ba7234859a52006df7e0a4645',
      account_id: '0b0bdebe65c34269915d61bde3486267',
      created_date: '2021-05-06T21:26:47.166113+00:00',
      email: 'senior-33246c5ba7234859a52006df7e0a4645-fake.senior.vimient.com',
    },
    isLoading: false,
    nameInitials: 'J B',
  },

  seniorLocation: {
    calenderDates: {'09-2022': {calenderDates: ['2022-09-01T00:30:41-07:00']}},
  },
};

beforeAll(() => {
  global.window = Object.create(window);
  const url =
    'http://localhost:3000/senior/senior-33246c5ba7234859a52006df7e0a4645/0b0bdebe65c34269915d61bde3486267/America-Los_Angeles/senior-location';
  Object.defineProperty(window, 'location', {
    value: {
      href: url,
      pathname:
        '/senior/senior-33246c5ba7234859a52006df7e0a4645/0b0bdebe65c34269915d61bde3486267/America-Los_Angeles/senior-location',
    },
  });
});
afterEach(() => jest.clearAllMocks());
describe('LocationDateSelector', () => {
  test('render the LocationDateSelector ',async () => {
    const {getByTestId} = render(
      <LocationDateSelector coordinates={coordinates} />,{initialState:{common:common,auth:mockApplicationState}}
    );
    expect(getByTestId('locationDateSelector')).toBeInTheDocument();
  });
  
  test('render the LocationDateSelector datePicker', () => {
    const {getByTestId} = render(
      <LocationDateSelector coordinates={coordinates} />)
    expect(getByTestId('controlledDatePicker')).toBeInTheDocument();
  });
  test('render the LocationDateSelector navigate-before icon', () => {
    const {getByTestId} = render(
      <LocationDateSelector coordinates={coordinates} />,{initialState:{common:common,auth:mockApplicationState}})
    const element = getByTestId('undefined-navigate-before');
    fireEvent.click(element);
    expect(element).toBeInTheDocument();
  });
  test('render the LocationDateSelector navigate-after icon', () => {
    const {getByTestId} = render(
      <LocationDateSelector coordinates={coordinates} />,{initialState:{common:common,auth:mockApplicationState}});
    const element = getByTestId('undefined-navigate-next');
    fireEvent.click(element);
    expect(element).toBeInTheDocument();
  });
});
