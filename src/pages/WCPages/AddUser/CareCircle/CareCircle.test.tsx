import {store} from 'store';
import {
  fireEvent,
  render,
  screen,
  act,
  mockAxios,
} from '../../../utilities/test-utils';
import CareCircle from './ CareCircle.container';
import {CareGiverComponent} from './CareCircle.component';
import {saveCareGiverInfo} from './CareCircle.action';
import APIMocks from '_mocks_/API';

const mockData = {
  addition: [
    {
      basic_info: {
        email: 'rishabh.tak1@yopmail.com@gmail.com',
        gender: 'male',
        location: {
          city: 'test',
          state: 'FL',
          street: 'Dave',
          zipcode: '33033',
        },
        mobile_number: '5345444432',
        name: {
          first_name: 'Rishabh',
          middle_name: '',
          last_name: 'panth',
        },
      },
      caregiver_id: '',
      senior_info: {
        alternate_number: '',
        best_day_to_contact: '',
        best_time_to_contact: '',
        caregiver_type: 'primary',
        contact_priority_sequence: 1,
        emergency_contact: false,
        has_power_of_attorney: false,
        is_living_with_senior: false,
        relationship_with_senior: 'Brother',
      },
    },
  ],
  modification: [],
};
const careGiverInfo = [
  {
    basic_info: {
      email: 'testing@gmail.com',
      gender: 'Male',
      location: {
        city: 'test',
        state: 'FL',
        street: 'Dave',
        zipcode: '33033',
      },
      mobile_number: '5345334234',
      name: {
        first_name: 'shyam',
        middle_name: 'singh',
        last_name: 'Roy',
      },
    },
    caregiver_id: 'caregiver-414091a7ee23475182e80f2deebe2092',
    senior_info: {
      alternate_number: '',
      best_day_to_contact: '',
      best_time_to_contact: '',
      caregiver_type: 'primary',
      contact_priority_sequence: 1,
      created_date: '2022-06-22T12:32:50.855985+00:00',
      emergency_contact: true,
      has_power_of_attorney: false,
      is_living_with_senior: false,
      relationship_with_senior: 'Brother',
    },
  },
];
describe('carecircle container', () => {
  test('should render careCircle container', async () => {
    render(<CareCircle />);
    act(() => {
      render(<CareGiverComponent careGiverInfo={[]} />);
    });
    mockAxios
      .onGet(
        `users/senior/care-circle?senior_id=senior-2334501efc4c46ec9575fcb15b0f7657&account_id=bc66b758376045d98dd881c7695f68da`,
      )
      .reply(function () {
        return [200, APIMocks.careCircle];
      });
    const element = await screen.getByText(/Care Circle/i);
    expect(element).toBeTruthy();
  });
});
describe('CareCircle Component', () => {
  test('should render careCircle container', async () => {
    act(() => {
      render(<CareGiverComponent careGiverInfo={[]} />);
    });
    const element = await screen.getByText(/Care Circle/i);
    expect(element).toBeTruthy();
  });
  test('should render careCircle container', async () => {
    act(() => {
      render(<CareGiverComponent careGiverInfo={careGiverInfo} />);
    });
    const element = await screen.getByText(/Care Circle/i);
    expect(element).toBeTruthy();
  });
  test('should render nine textbox in careCircle component ', async () => {
    act(() => {
      render(<CareGiverComponent careGiverInfo={careGiverInfo} />);
    });
    const textBoxes = screen.getAllByRole('textbox');
    expect(textBoxes.length).toBe(9);
  });
  test('should be able to change value of textbox in careCircle component ', () => {
    act(() => {
      render(<CareGiverComponent careGiverInfo={careGiverInfo} />);
    });
    const textBoxes = screen.getAllByRole('textbox');
    fireEvent.change(textBoxes[0], {target: {value: 'abc@gmail.com'}});
    expect(textBoxes[0]).toHaveValue('abc@gmail.com');
  });
  test('should render twenty seven textbox in careCircle component on clicking add contact button ', () => {
    act(() => {
      render(<CareGiverComponent careGiverInfo={careGiverInfo} />);
    });
    const addContactButton = screen.getByRole('button', {name: /Add Contact/i});
    fireEvent.click(addContactButton);

    const newAllTextboxes = screen.getAllByRole('textbox');
    expect(newAllTextboxes.length).toBe(18);
  });
  test('should check the functionality of delete contact button in  careCircle component  ', () => {
    act(() => {
      render(<CareGiverComponent careGiverInfo={careGiverInfo} />);
    });
    const addContactButton = screen.getByRole('button', {name: /Add Contact/i});
    fireEvent.click(addContactButton);
    const deleteContactButton = screen.getAllByText(/Delete Contact/i);
    fireEvent.click(deleteContactButton[0]);

    const textBoxesAfterDelete = screen.getAllByRole('textbox');
    expect(textBoxesAfterDelete.length).toBe(9);
  });
  test('radio buttons should be checked on click into it ', () => {
    act(() => {
      render(<CareGiverComponent careGiverInfo={careGiverInfo} />);
    });
    const careCircleRadioButton = screen.getAllByRole('radio');
    fireEvent.click(careCircleRadioButton[1]);
    expect(careCircleRadioButton[1]).toBeChecked();
  });
  test('checkboxes should be checked on click into it ', () => {
    act(() => {
      render(<CareGiverComponent careGiverInfo={careGiverInfo} />);
    });
    const emergencyContactCheckbox = screen.getAllByRole('checkbox')[2];

    fireEvent.click(emergencyContactCheckbox);
    expect(emergencyContactCheckbox).toBeTruthy();
  });
  test('when emergency contact checkbox is checked then user can save the details without error', async () => {
    act(() => {
      render(<CareGiverComponent careGiverInfo={careGiverInfo} />);
    });
    const emergencyContactCheckbox = screen.getAllByRole('checkbox')[2];
    fireEvent.click(emergencyContactCheckbox);
    expect(emergencyContactCheckbox).toBeTruthy();

    const saveButton = screen.getByRole('button', {name: /save/i});
    fireEvent.click(saveButton);
    store.dispatch(saveCareGiverInfo(mockData));
    const successMessage = screen.findByText(/Saved Successfully/);
    expect(successMessage).toBeTruthy();
  });
});
