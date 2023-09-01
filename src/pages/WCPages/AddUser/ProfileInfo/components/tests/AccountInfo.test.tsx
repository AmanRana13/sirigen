import {render, screen} from '../../../../../utilities/test-utils';
import {AccountInfo} from '../AccountInfo.component';

describe('AccountInfo Component', () => {
  test('should render AccountInfo component', () => {
    render(
      <AccountInfo
        createAccount={jest.fn().mockImplementation(() => Promise.resolve())}
        accountDetail={{
          account_id: '355ee3d4f7614f429113b4da17f49ed3',
          created_date: '2017-05-05T16:22:30.414913+00:00',
          dob: '1997-08-11T00:00:00+00:00',
          email: 'senior-f18173fa564c42a2a6622db899072c45-fake.senior.vimient.com',
          gender: 'Female',
          mobile_number: '8966894974',
          name: {
            first_name: 'Tanu',
            last_name: 'Ahuja',
            middle_name: null,
          },
          user_id: 'senior-f18173fa564c42a2a6622db899072c45',
        }} 
        setIsProfileCreated={undefined} setSelectedLocation={undefined} location={undefined} isProfileCreated={undefined}      />,
    );
    const element1 = screen.getByText('Create Account');
    expect(element1).toBeInTheDocument();
  });
});
