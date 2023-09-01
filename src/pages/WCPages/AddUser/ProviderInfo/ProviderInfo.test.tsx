import {render, screen, fireEvent} from '../../../utilities/test-utils';
import {ProviderInfoComponent} from '../ProviderInfo/ProviderInfo.component';

jest.mock('./ProviderInfo.action');
const providerInfo = {
  dentist: [
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
  doctor: [
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
  pharmacy: [
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
};

const props = {
  fetchProviderInfo: jest.fn(() =>
    Promise.resolve({
      doctor: providerInfo.doctor,
      dentist: providerInfo.dentist,
      pharmacy: providerInfo.pharmacy,
    }),
  ),
  saveProviderInfo: jest.fn(() => Promise.resolve({data: {}})),
};
const accountInfo = {
  account_id: '7a97969b5658469b807c8b2797ec62ee',
  senior_id: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
};
beforeAll(() =>
  localStorage.setItem('accountInfo', JSON.stringify(accountInfo)),
);

describe('ProviderInfo Component', () => {
  test('should render ProviderInfo component with data in props', () => {
    const {queryByTestId} = render(
      <ProviderInfoComponent
        providerInfo={providerInfo}
        saveProviderInfo={jest.fn(() => Promise.resolve({data: {}}))}
      />,
    );
    const element = queryByTestId(/cancel-button/i);

    expect(element).toBeInTheDocument();
  });

  test('should render ProviderInfo component with 18 textbox', () => {
    render(
      <ProviderInfoComponent
        providerInfo={providerInfo}
        saveProviderInfo={jest.fn(() => Promise.resolve({data: {}}))}
      />,
    );
    const element = screen.getAllByRole('textbox');
    expect(element.length).toBe(18);
  });

  test('should render ProviderInfo component with 18 text boxes including doctor, dentist and pharmacy section', () => {
    render(
      <ProviderInfoComponent
        providerInfo={providerInfo}
        saveProviderInfo={jest.fn(() => Promise.resolve({data: {}}))}
      />,
    );
    const element = screen.getAllByRole('textbox');
    expect(element.length).toBe(18);
  });

  test('should render 5 more textbox on clicking add Doctor button ', () => {
    render(
      <ProviderInfoComponent
        providerInfo={providerInfo}
        saveProviderInfo={jest.fn(() => Promise.resolve({data: {}}))}
      />,
    );
    const textBoxElements = screen.getAllByRole('textbox');
    expect(textBoxElements.length).toBe(18);

    const addDoctorButton = screen.getByText(/Add Doctor/i);
    fireEvent.click(addDoctorButton);
    const newTextBoxElements = screen.getAllByRole('textbox');
    expect(newTextBoxElements.length).toBe(23);
  });

  test('should render save button along with 18 text boxes initially', async () => {
    render(
      <ProviderInfoComponent
        providerInfo={providerInfo}
        saveProviderInfo={jest.fn(() => Promise.resolve({data: {}}))}
      />,
    );
    const textBoxElements = screen.getAllByRole('textbox');
    expect(textBoxElements.length).toBe(18);

    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);
  });

  test('test add and delete doctor functionality', () => {
    render(
      <ProviderInfoComponent
        providerInfo={providerInfo}
        saveProviderInfo={jest.fn(() => Promise.resolve({data: {}}))}
      />,
    );
    const textBoxElements = screen.getAllByRole('textbox');
    expect(textBoxElements.length).toBe(18);

    const addDoctorButton = screen.getByText(/Add Doctor/i);
    fireEvent.click(addDoctorButton);
    const deleteButton = screen.getAllByText(/Delete Doctor/i);
    fireEvent.click(deleteButton[0]);

    const totalTextBoxes = screen.getAllByRole('textbox');
    expect(totalTextBoxes.length).toBe(18);
  });

  test('test add and delete dentist functionality', () => {
    render(
      <ProviderInfoComponent
        providerInfo={providerInfo}
        saveProviderInfo={jest.fn(() => Promise.resolve({data: {}}))}
      />,
    );
    const textBoxElements = screen.getAllByRole('textbox');
    expect(textBoxElements.length).toBe(18);

    const addDentistButton = screen.getByText(/Add Dentist/i);
    fireEvent.click(addDentistButton);

    const deleteButton = screen.getAllByText(/Delete Dentist/i);
    fireEvent.click(deleteButton[0]);

    const totalTextBoxes = screen.getAllByRole('textbox');
    expect(totalTextBoxes.length).toBe(18);
  });
  test('test add and delete pharmacy functionality', () => {
    render(
      <ProviderInfoComponent
        providerInfo={providerInfo}
        saveProviderInfo={jest.fn(() => Promise.resolve({data: {}}))}
      />,
    );
    const textBoxElements = screen.getAllByRole('textbox');
    expect(textBoxElements.length).toBe(18);

    const addPharmacyButton = screen.getByText(/Add Pharmacy/i);
    fireEvent.click(addPharmacyButton);

    const deleteButton = screen.getAllByText(/Delete Pharmacy/i);
    fireEvent.click(deleteButton[0]);

    const totalTextBoxes = screen.getAllByRole('textbox');
    expect(totalTextBoxes.length).toBe(18);
  });
});
