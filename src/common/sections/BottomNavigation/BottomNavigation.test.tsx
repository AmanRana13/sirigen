import {fireEvent, render, screen} from '../../../utilities/test-utils';
import {BottomNavigation} from './BottomNavigation.component';

describe('Bottom Navigation Component', () => {
  test('should render Bottom Navigation component when we have no data in props', () => {
    render(
      <BottomNavigation
        prevLabel=''
        nextLabel=''
        navigate={null}
        nextValue={null}
        prevValue={null}
      />,
    );

    const element = screen.getByTestId(/bottom-navigation-container/i);
    expect(element).toBeInTheDocument();
  });

  test('test prev button in Bottom navigation component', () => {
    const props: any = {
      prevLabel: 'Provider Info',
      nextLabel: 'Care Circle',
      navigate: jest.fn(),
      nextValue: 5,
      prevValue: 3,
    };
    render(<BottomNavigation {...props} />);

    const prevButton = screen.getByTestId(/prevButton/i);
    fireEvent.click(prevButton);
    expect(prevButton).toBeInTheDocument();
  });

  test('test next button in Bottom navigation component', () => {
    const props: any = {
      prevLabel: 'Provider Info',
      nextLabel: 'Care Circle',
      navigate: jest.fn(),
      nextValue: 5,
      prevValue: 3,
    };
    render(<BottomNavigation {...props} />);

    const nextButton = screen.getByTestId(/nextButton/i);
    fireEvent.click(nextButton);
    expect(nextButton).toBeInTheDocument();
  });
});
