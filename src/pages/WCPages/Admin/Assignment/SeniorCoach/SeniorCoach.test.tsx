import {render, screen} from 'utilities/test-utils';
import SeniorCoach from './SeniorCoach.component';

describe('Assignment component', () => {
  test('renders Senior-Coach Assignment', () => {
    render(
      <SeniorCoach
        seniorCoachHandler={() => jest.fn()}
        mainHeading='Senior-Coach Assignment'
        subHeading='Unassigned Seniors'
        buttonText='Wellness Coaches'>
        <div>Test</div>
      </SeniorCoach>,
    );
    const text = screen.getByText(/Senior-Coach Assignment/i);
    expect(text).toBeInTheDocument();
  });
});
