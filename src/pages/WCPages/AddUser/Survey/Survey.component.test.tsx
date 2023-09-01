import {fireEvent, render, screen} from '../../../utilities/test-utils';
import Survey from './Survey.container';
import {SurveyComponent} from './Survey.component';
import { saveSurveyInfo } from './Survey.action';
import {store} from '../../../store/store'
import { hideApplicationLoader, showApplicationLoader } from 'common/ApplicationLoader';

const surveyInfo = {
  diseases: [
    {
      comment: null,
      name: "Alzheimer's Disease",
    },
  ],
  medical_survey: [
    {
      field_id: 'telephone',
      field_type: 'dropdown',
      field_value: {
        data: 'Without Help',
        other_values: ['Without Help', 'With Some Help'],
      },
      label_text: '1. Can you use the telephone?',
    },
  ],
};
const accountInfo = {
  account_id: '7a97969b5658469b807c8b2797ec62ee',
  senior_id: 'senior-11cca3e1a63e4c7589e9b18ea96f37b3',
};
beforeAll(() =>
  localStorage.setItem('accountInfo', JSON.stringify(accountInfo)),
);

describe('Survey Container', () => {
  test('should render survey container', () => {
    render(<Survey />);
    const element = screen.getByText(/survey/i);

    expect(element).toBeInTheDocument();
  });
});
describe('Survey Component', () => {
  test('should render survey component', () => {
    const {queryByTestId} = render(
      <SurveyComponent
        surveyInfo={surveyInfo}
        saveSurveyInfo={jest.fn()}
        fetchDiseases={jest.fn()}
      />,
    );
    const element = queryByTestId(/survey/i);

    expect(element).toBeInTheDocument();
  });
  test('should render survey component title', () => {
    render(
      <SurveyComponent
        surveyInfo={surveyInfo}
        saveSurveyInfo={jest.fn()}
        fetchDiseases={jest.fn()}
      />,
    );
    const element = screen.getByText(/survey/i);

    expect(element).toBeInTheDocument();
  });

  test('should render save button', () => {
    render(
      <SurveyComponent
        surveyInfo={surveyInfo}
        saveSurveyInfo={jest.fn()}
        fetchDiseases={jest.fn()}
      />,
    );
    const element = screen.getByText(/save/i);
    fireEvent.click(element);
    expect(element).toBeInTheDocument();
  });
});
describe('Survey action creaters',()=>{
  test('saveSurveyInfo',async()=>{
    await store.dispatch(showApplicationLoader());
    await store.dispatch(saveSurveyInfo(surveyInfo));
    
    await store.dispatch(hideApplicationLoader());
    expect(store.getState().applicationLoader).toBeTruthy();
    ;
  })
})
