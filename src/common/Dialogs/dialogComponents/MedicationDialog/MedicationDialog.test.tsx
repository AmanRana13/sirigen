import {
  medicationIncompleteData,
  medicationListData,
  openDialogAddMedicationMockData,
  openDialogMockData,
  phramacyMockData,
} from '_mocks_/medicationMockData';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../utilities/test-utils';
import MedicationDialog from './MedicationDialog';
import MedicationActionDialogButton from './MedicationActionDialogButton.component';

describe('MedicationDialog Component', () => {
  test('should render MedicationDialog component', () => {
    render(<MedicationDialog position='right' />, {
      initialState: {
        common: {
          dialog: {...openDialogMockData},
          providerInfo: {
            doctor: [],
            dentist: [],
            pharmacy: [...phramacyMockData],
          },
        },
        medicationList: {...medicationListData},
      },
    });

    const element = screen.getByTestId(/medication-dialog/i);
    expect(element).toBeInTheDocument();
  });

  test('should render incomplete MedicationDialog component', () => {
    render(<MedicationDialog position='right' />, {
      initialState: {
        common: {
          dialog: {...openDialogAddMedicationMockData},
          providerInfo: {
            doctor: [],
            dentist: [],
            pharmacy: [...phramacyMockData],
          },
        },
        medicationList: {...medicationIncompleteData},
      },
    });

    const element = screen.getByTestId(/medication-dialog/i);
    expect(element).toBeInTheDocument();
  });

  test('should input in search medication input field MedicationDialog component', async () => {
    render(<MedicationDialog position='right' />, {
      initialState: {
        common: {
          dialog: {...openDialogAddMedicationMockData},
          providerInfo: {
            doctor: [],
            dentist: [],
            pharmacy: [...phramacyMockData],
          },
        },
        medicationList: {...medicationIncompleteData},
      },
    });

    const element = screen.getByPlaceholderText(
      /Search with minimum 3 characters/i,
    );
    fireEvent.change(element, {
      target: {value: 'Amitriptyline/Perphenazine (Oral Pill) 25-4 mg Tab'},
    });

    await waitFor(() =>
      expect(element).toHaveDisplayValue(
        'Amitriptyline/Perphenazine (Oral Pill) 25-4 mg Tab',
      ),
    );
    expect(element).toBeInTheDocument();
  });

  test('should render MedicationDialog submit button', () => {
    render(<MedicationActionDialogButton position='right' disable={false} />, {
      initialState: {
        common: {
          dialog: {...openDialogMockData},
          providerInfo: {
            doctor: [],
            dentist: [],
            pharmacy: [...phramacyMockData],
          },
        },
        medicationList: {...medicationListData},
      },
    });

    const element = screen.getByText('Submit');
    fireEvent.click(element);
    expect(element).toBeInTheDocument();
  });

  test('should render MedicationDialog cancel button cases', () => {
    render(<MedicationActionDialogButton position='right' disable={false} />, {
      initialState: {
        common: {
          dialog: {...openDialogMockData},
          providerInfo: {
            doctor: [],
            dentist: [],
            pharmacy: [...phramacyMockData],
          },
        },
        medicationList: {...medicationListData},
      },
    });

    const element = screen.getByText(/Cancel/i);
    expect(element).toBeInTheDocument();
    fireEvent.click(element);

    const alertNoButton = screen.getByText(/No/i);
    expect(alertNoButton).toBeInTheDocument();
    fireEvent.click(alertNoButton);

    const cancelBtn = screen.getByText(/Cancel/i);
    expect(cancelBtn).toBeInTheDocument();
    fireEvent.click(cancelBtn);

    const alertYesButton = screen.getByText(/Yes/i);
    expect(alertYesButton).toBeInTheDocument();
    fireEvent.click(alertYesButton);
  });
});
