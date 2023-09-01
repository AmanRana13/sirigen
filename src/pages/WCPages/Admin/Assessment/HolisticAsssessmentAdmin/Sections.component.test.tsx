import {fireEvent, render, screen} from '../../../../utilities/test-utils';
import Sections from './Sections.component';
import {SectionsWrapper} from './SectionsWrapper.component';

const props = {
  allSection: [
    {
      data: [
        {
          always: 0,
          never: 0,
          question:
            '134614763462134664179824638463714637468346734673647364734913648713649832647913264912346382746981264912346238174623176423',
          sometimes: 0,
        },
      ],
      header: 'heading_three',
    },
  ],
  setSectionsData: jest.fn(),
  saveError: jest.fn(),
  submitError: jest.fn(),
  headerArr: [],
  collapseAllSection: jest.fn(),
  isDuplicateTitle: false,
};
const props2 = {
  children: <div>SectionsWrapper</div>,
  headerArr: [],
  headerValue: 'holistic_test',
  saveError: jest.fn(),
  updateTitle: jest.fn(),
  handleAddQuestion: jest.fn(),
  handleDeleteSection: jest.fn(),
  collapseAllSection: jest.fn(),
  collapseSection: jest.fn(),
};

const holisticAssessmentAdmin = {
  holisticAssessmentAdmin: {
    isHistory: false,
  },
};

describe('Testing multiple sections in admin holistic assessment', () => {
  test('should render multiple sections', () => {
    render(<Sections {...props} />, {
      initialState: {
        holisticAssessmentAdmin: {
          isHistory: false,
        },
      },
    });
    const element = screen.getByTestId(/sections/i);
    expect(element).toBeTruthy();
  });

  test('should render delete button in sections', async () => {
    render(<Sections {...props} />, {
      initialState: holisticAssessmentAdmin,
    });
    const element = screen.getByTestId(/deleteQuestion/i);
    expect(element).toBeTruthy();
    fireEvent.click(element);
    expect(
      screen.findByText(/Are you sure you want to delete this question?/i),
    ).toBeTruthy();
  });

  test('should render add question button', async () => {
    render(<Sections {...props} />, {
      initialState: holisticAssessmentAdmin,
    });
    const element = screen.getByText(/Add Question/i);
    fireEvent.click(element);
    expect(element).toBeTruthy();
  });

  test('should render delete Sections button ', () => {
    render(<Sections {...props} />);
    const element = screen.getByText(/Delete Section/i);
    expect(element).toBeTruthy();
    fireEvent.click(element);
    expect(screen.findByText(/Are you sure you want to delete/i)).toBeTruthy();
  });
});

describe('Testing  SectionsWrapper in admin holistic assessment', () => {
  test('should render SectionsWrapper ', () => {
    render(<SectionsWrapper {...props2} />);
    const element = screen.getByText(/SectionsWrapper/i);
    expect(element).toBeTruthy();
  });
});
