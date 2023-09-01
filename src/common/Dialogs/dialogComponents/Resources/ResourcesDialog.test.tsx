import {getMBValueInBytes} from 'globals/global.functions';
import {GoalStatus, ResourceFormats} from 'globals/enums';
import {DIALOG_TYPES} from 'globals/global.constants';
import {IResourcesDialogData} from 'pages/WCPages/SeniorWellnessPlan/SeniorWellnessPlan.types';
import React from 'react';
import {fireEvent, render, screen} from '../../../../utilities/test-utils';
import ResourcesDialog from './ResourcesDialog';
import {initialState, IResource} from './ResourcesDialog.types';
import ResourcesDialogPdfUpload from './ResourcesDialogPdfUpload';
import ResourcesDialogTable from './ResourcesDialogTable';

const handleRemove = jest.fn();
const handleChange = jest.fn();
const dispatchContext = jest.fn();
const resources: IResource[] = [
  {
    resourceId: 'a592303ddfc2199c298d94cdb5d764f1/AdaptiveEquipmentNeeds.pdf',
    name: 'AdaptiveEquipmentNeeds.pdf',
    description: '',
    date: '2023-01-10T00:00:00',
    format: ResourceFormats.PDF,
    resourceVersion: '94',
    createdBy: 'Srijan Admin',
    lastUpdatedBy: 'Srijan Admin',
  },
  {
    resourceId: '61ab2df12d78db4189fa32d195585fd0/LinkDocument.pdf',
    name: 'LinkDocument.pdf',
    description: '',
    date: '2023-01-09T00:00:00',
    format: ResourceFormats.PDF,
    resourceVersion: '89',
    createdBy: 'Srijan Team',
    lastUpdatedBy: 'Srijan Team',
  },
];

export const data: IResourcesDialogData = {
  careagentId: 'admin-50e971ade26b48fda891f2bf0adfb32c',
  currentVersion: '96',
  seniorId: 'senior-2b24e2b2c6724a52841f9a494d246fef',
  role: 'Senior',
  name: 'Abhay Katiyar',
  existingResourcesData: [
    {
      resourceId: 'a592303ddfc2199c298d94cdb5d764f1/AdaptiveEquipmentNeeds.pdf',
      name: 'AdaptiveEquipmentNeeds.pdf',
      description: '',
      date: '2023-01-10T00:00:00',
      format: ResourceFormats.PDF,
      resourceVersion: '94',
      createdBy: 'Srijan Admin',
      lastUpdatedBy: 'Srijan Admin',
    },
    {
      resourceId: '61ab2df12d78db4189fa32d195585fd0/LinkDocument.pdf',
      name: 'LinkDocument.pdf',
      description: '',
      date: '2023-01-09T00:00:00',
      format: ResourceFormats.PDF,
      resourceVersion: '89',
      createdBy: 'Srijan Team',
      lastUpdatedBy: 'Srijan Team',
    },
  ],
  goalData: {
    id: '747a86bd454f4c1ab64b88eafdb8b15a',
    goal: 'Adaptive Equipment Needs',
    // eslint-disable-next-line max-len
    action:
      'Obtain a prescription from your medical doctor - Most adaptive equipment devices require a prescription from a medical doctor',
    status: GoalStatus.Not_Started,
    progress: 0,
    startDate: '',
    targetDate: '',
    notes: '',
    createdDate: '2023-01-10T05:31:07.669202+00:00',
    resource: [
      {
        resourceId:
          'a592303ddfc2199c298d94cdb5d764f1/AdaptiveEquipmentNeeds.pdf',
        name: 'AdaptiveEquipmentNeeds.pdf',
        description: '',
        date: '2023-01-10T00:00:00',
        format: ResourceFormats.PDF,
        resourceVersion: '94',
        createdBy: 'Srijan Admin',
        lastUpdatedBy: 'Srijan Admin',
      },
      {
        resourceId: '61ab2df12d78db4189fa32d195585fd0/LinkDocument.pdf',
        name: 'LinkDocument.pdf',
        description: '',
        date: '2023-01-09T00:00:00',
        format: ResourceFormats.PDF,
        resourceVersion: '89',
        createdBy: 'Srijan Team',
        lastUpdatedBy: 'Srijan Team',
      },
    ],
  },
  isDisabled: false,
  fullName: 'Srijan Admin',
  dispatchContext: new dispatchContext(),
};

const file = new File(['foo'], 'foo.txt', {
  type: 'text/plain',
});

describe('test Resources Dialog ', () => {
  test('should render Resources Dialog  ', () => {
    render(<ResourcesDialog />, {
      initialState: {
        common: {
          dialog: {
            isOpen: true,
            type: DIALOG_TYPES.RESOURCES,
            dialogTitle: 'Resources',
            data,
          },
        },
      },
    });
    const element = screen.getByTestId(/resourcesDialog/i);
    expect(element).toBeInTheDocument();
    const closeButton = screen.getByTestId(/resourcesClose/i);
    fireEvent.click(closeButton);
    expect(closeButton).toBeInTheDocument();
    const cancelButton = screen.getByTestId(/resourcesCancel/i);
    fireEvent.click(cancelButton);
    expect(cancelButton).toBeInTheDocument();
    const addToListButton = screen.getByTestId(/resourcesAddToList/i);
    fireEvent.click(addToListButton);
    expect(addToListButton).toBeInTheDocument();
    const saveButton = screen.getByTestId(/resourcesSave/i);
    fireEvent.click(saveButton);
    expect(saveButton).toBeInTheDocument();
  });
});

describe('test Resources Dialog Pdf Upload ', () => {
  test('should render Resources Dialog Pdf Upload ', () => {
    render(
      <ResourcesDialogPdfUpload
        isMultiple
        isDisabled={false}
        handleChange={(e: React.ChangeEvent) => {}}
        handleRemove={(i: number) => {}}
        selectedFiles={[file]}
        fileSize={getMBValueInBytes(15)}
        errors={[]}
        isUploadError={false}
        existingFiles={[
          {
            resourceId:
              'a592303ddfc2199c298d94cdb5d764f1/AdaptiveEquipmentNeeds.pdf',
            name: 'AdaptiveEquipmentNeeds.pdf',
            description: '',
            date: '2023-01-10T00:00:00',
            format: ResourceFormats.PDF,
            resourceVersion: '94',
            createdBy: 'Srijan Admin',
            lastUpdatedBy: 'Srijan Admin',
          },
        ]}
      />,
    );
    const element = screen.getByTestId(/resourcesPdfUpload/i);
    expect(element).toBeInTheDocument();
    const chip = screen.getByTestId(/resourcesChip/i);
    expect(chip).toBeInTheDocument();
    const chooseButton = screen.getByTestId(/resourcesChooseFile/i);
    fireEvent.click(chooseButton);
    expect(chooseButton).toBeInTheDocument();
    const noFiles = screen.queryByText(/No Files Chosen/i);
    expect(noFiles).not.toBeInTheDocument();
  });

  test('should not render Chip if selectedFiles is empty ', () => {
    render(
      <ResourcesDialogPdfUpload
        isMultiple
        isDisabled={false}
        handleChange={(e: React.ChangeEvent) => {}}
        handleRemove={(i: number) => {}}
        selectedFiles={[]}
        fileSize={getMBValueInBytes(15)}
        errors={[]}
        isUploadError={false}
        existingFiles={[
          {
            resourceId:
              'a592303ddfc2199c298d94cdb5d764f1/AdaptiveEquipmentNeeds.pdf',
            name: 'AdaptiveEquipmentNeeds.pdf',
            description: '',
            date: '2023-01-10T00:00:00',
            format: ResourceFormats.PDF,
            resourceVersion: '94',
            createdBy: 'Srijan Admin',
            lastUpdatedBy: 'Srijan Admin',
          },
        ]}
      />,
    );
    const chip = screen.queryByTestId(/resourcesChip/i);
    expect(chip).not.toBeInTheDocument();
    const noFiles = screen.getByText(/No Files Chosen/i);
    expect(noFiles).toBeInTheDocument();
  });
});

describe('test Resources Dialog Table ', () => {
  test('should render Resources Dialog Table ', () => {
    render(
      <ResourcesDialogTable
        isError={false}
        data={{
          ...initialState,
          resourcesRowsData: resources.slice(0, 1),
        }}
        isDisabled={false}
        handleChange={new handleChange()}
        handleRemove={new handleRemove()}
      />,
    );
    const element = screen.getByTestId(/resourcesTable/i);
    expect(element).toBeInTheDocument();
    const row = screen.getByTestId(/resourcesRow/i);
    expect(row).toBeInTheDocument();
    const handleRem = screen.getByTestId(/handleRemove/i);
    fireEvent.click(handleRem);
  });
  test('should show No Records ', () => {
    render(
      <ResourcesDialogTable
        isError={false}
        data={initialState}
        isDisabled={false}
        handleChange={new handleChange()}
        handleRemove={new handleRemove()}
      />,
    );
    const element = screen.getByTestId(/resourcesTable/i);
    expect(element).toBeInTheDocument();
    const noRecords = screen.getByText('No Records');
    expect(noRecords).toBeInTheDocument();
  });
});
