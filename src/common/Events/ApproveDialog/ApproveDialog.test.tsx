import {EventsType} from 'globals/enums';
import {fireEvent, render} from '../../../utilities/test-utils';
import ApproveDialog from './ApproveDialog';

describe('ApproveDialog Component', () => {
  test('should render ApproveDialog component', () => {
    const {queryByTestId} = render(
      <ApproveDialog index={1} type='summary' eventId='123' label='summary' />,
    );
    const element = queryByTestId(/approve-dialog/i);

    expect(element).toBeInTheDocument();
  });
  test('should render close button in ApproveDialog component', () => {
    const {queryByTestId} = render(
      <ApproveDialog index={1} type='summary' eventId='123' label='summary' />,
    );
    const element = queryByTestId(/cancelButton/i);

    expect(element).toBeInTheDocument();
  });
  test('should render summary ApproveDialog component', () => {
    const {getByTestId} = render(
      <ApproveDialog
        index={1}
        type={EventsType.Summary}
        eventId='123'
        label='summary'
      />,
      {initialState: {router: {location: {pathname: '/summary'}}}},
    );
    const redirectButton = getByTestId(/redirect/i);

    expect(redirectButton).toBeInTheDocument();
    fireEvent.click(redirectButton);
  });
  test('should render milestone ApproveDialog component', () => {
    const {getByTestId} = render(
      <ApproveDialog
        index={1}
        type={EventsType.MILESTONE}
        eventId='123'
        label='milestone'
      />,
      {initialState: {router: {location: {pathname: '/milestone'}}}},
    );
    const redirectButton = getByTestId(/redirect/i);

    expect(redirectButton).toBeInTheDocument();
    fireEvent.click(redirectButton);
  });
  test('should render alert ApproveDialog component', () => {
    const {getByTestId} = render(
      <ApproveDialog
        index={1}
        type={EventsType.Alert}
        eventId='123'
        label='alert'
      />,
      {initialState: {router: {location: {pathname: '/alert'}}}},
    );
    const redirectButton = getByTestId(/redirect/i);

    expect(redirectButton).toBeInTheDocument();
    fireEvent.click(redirectButton);
  });
});
