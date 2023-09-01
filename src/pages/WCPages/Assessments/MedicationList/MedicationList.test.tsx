import {
  medicationIncompleteData,
  medicationListData,
  medicationListWithEmptyData,
  medicationNewData,
  openDialogMockData,
  phramacyMockData,
} from '_mocks_/medicationMockData';
import {render, screen, fireEvent} from '../../../utilities/test-utils';
import MedicationList from './MedicationList.component';
import {mockSeniorData} from '_mocks_/commonMocks';

describe('MedicationList Component', () => {
  test('should render MedicationList component', () => {
    render(<MedicationList heading='Medication List' />, {
      initialState: {
        common: {
          dialog: {...openDialogMockData},
          providerInfo: {
            doctor: [],
            dentist: [],
            pharmacy: [...phramacyMockData],
          },
          ...mockSeniorData,
        },
        medicationList: {...medicationListData},
      },
    });

    const element = screen.getByText(/Medication List/i);
    expect(element).toBeInTheDocument();
  });
  test('should render Add medication Button', () => {
    render(<MedicationList heading='Medication List' />, {
      initialState: {
        common: {
          dialog: {...openDialogMockData},
          providerInfo: {
            doctor: [],
            dentist: [],
            pharmacy: [...phramacyMockData],
          },
          ...mockSeniorData,
        },
        medicationList: {...medicationListData},
      },
    });

    const addMedicationButton = screen.getByText(/Add Medication/i);
    fireEvent.click(addMedicationButton);
    expect(addMedicationButton).toBeInTheDocument();
  });

  test('should render MedicationList empty component', () => {
    render(<MedicationList heading='Medication List' />, {
      initialState: {
        common: {
          dialog: {...openDialogMockData},
          providerInfo: {
            doctor: [],
            dentist: [],
            pharmacy: [...phramacyMockData],
          },
          ...mockSeniorData,
        },
        medicationList: {...medicationListWithEmptyData},
      },
    });

    const element = screen.getByText(/No Record Found/i);
    expect(element).toBeInTheDocument();
  });
  test('should render MedicationList with different dosefrequencyTime value', () => {
    render(<MedicationList heading='Medication List' />, {
      initialState: {
        common: {
          dialog: {...openDialogMockData},
          providerInfo: {
            doctor: [],
            dentist: [],
            pharmacy: [...phramacyMockData],
          },
          ...mockSeniorData,
        },
        medicationList: {...medicationNewData},
      },
    });

    const element = screen.getByText(/Medication List/i);
    expect(element).toBeInTheDocument();
  });
  test('should render MedicationList with incomplete record', () => {
    render(<MedicationList heading='Medication List' />, {
      initialState: {
        common: {
          dialog: {...openDialogMockData},
          providerInfo: {
            doctor: [],
            dentist: [],
            pharmacy: [...phramacyMockData],
          },
          ...mockSeniorData,
        },
        medicationList: {...medicationIncompleteData},
      },
    });

    const element = screen.getByText(/Medication List/i);
    expect(element).toBeInTheDocument();
  });

  test('should render edit button component', () => {
    render(<MedicationList heading='Medication List' />, {
      initialState: {
        common: {
          dialog: {...openDialogMockData},
          providerInfo: {
            doctor: [],
            dentist: [],
            pharmacy: [...phramacyMockData],
          },
          ...mockSeniorData,
        },
        medicationList: {...medicationListData},
      },
    });

    const element = screen.getByText(/Edit/i);
    fireEvent.click(element);
    expect(element).toBeInTheDocument();
  });
  test('should render delete button component', () => {
    render(<MedicationList heading='Medication List' />, {
      initialState: {
        common: {
          dialog: {...openDialogMockData},
          providerInfo: {
            doctor: [],
            dentist: [],
            pharmacy: [...phramacyMockData],
          },
          ...mockSeniorData,
        },
        medicationList: {...medicationListData},
      },
    });

    const element = screen.getByText(/Delete/i);
    fireEvent.click(element);
    expect(element).toBeInTheDocument();
  });
});
