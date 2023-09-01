import {screen, render} from '../../../../../../../utilities/test-utils';
import {BodyComposition} from '../BodyComposition.component';
import {
  bodyHealthComponentsProps,
  bodyHealthComponentsWithData,
} from '_mocks_/BodyHealth.mock';

describe('BodyComposition Component', () => {
  it('should render BodyComposition component with BodyComposition Heading', () => {
    const {getByTestId} = render(
      <BodyComposition {...bodyHealthComponentsProps} />,
    );
    const element = getByTestId('body-composition-graph');
    const BodyCompositionHeading = screen.getByText('Body Composition');
    expect(element).toBeInTheDocument();
    expect(BodyCompositionHeading).toBeInTheDocument();
  });

  // eslint-disable-next-line max-len
  it('when the current state is day we have to show only one Body composition bar with last recorded date', () => {
    const {getByTestId} = render(
      <BodyComposition {...bodyHealthComponentsProps} />,
    );

    const lastRecordedText = screen.getByText('Last recorded 07/20/22');
    const element = getByTestId('day-body-composition-bar');
    expect(element).toBeInTheDocument();
    expect(lastRecordedText).toBeInTheDocument();
  });

  it('when the current state is day and we have empty all_data inside summary', () => {
    const {getByTestId} = render(
      <BodyComposition
        {...{...bodyHealthComponentsProps, summary: {all_data: {}}}}
      />,
    );
    const element = getByTestId('day-body-composition-bar');
    expect(element).toBeInTheDocument();
  });

  it('test when currentState is week with data', () => {
    const {getByTestId} = render(
      <BodyComposition
        {...{
          ...bodyHealthComponentsProps,
          type: 'week',
          currentState: 'week',
        }}
      />,
    );
    const element = getByTestId('body-composition-graph');
    expect(element).toBeInTheDocument();
  });

  it('test body composition component when type and currentState is week with no data ', () => {
    const {getByTestId} = render(
      <BodyComposition
        {...{
          ...bodyHealthComponentsProps,
          type: 'week',
          summary: {all_data: {}},
          currentState: 'week',
        }}
      />,
    );
    const element = getByTestId('body-composition-graph');
    expect(element).toBeInTheDocument();
  });

  it('test when body composition week have data', () => {
    render(<BodyComposition {...bodyHealthComponentsWithData} />);
  });

  it('test when summary is empty ', () => {
    const {getByTestId} = render(
      <BodyComposition {...{...bodyHealthComponentsProps, summary: {}}} />,
    );
    const element = getByTestId('body-composition-graph');
    expect(element).toBeInTheDocument();
  });
});
