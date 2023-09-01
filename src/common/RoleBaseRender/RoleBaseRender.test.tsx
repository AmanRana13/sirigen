import {render, screen} from '../../utilities/test-utils';
import RoleBaseRender from './RoleBaseRender';

const children = <div>Welcome To Vimient</div>;
const mockedState = {
  auth: {
    accessToken: 'kmkkmkm.knknk.kmk',
    email: 'srijan-dev@srijan.net',
    refreshToken: 'kmkmknknk$02HOW5AH3HO93DPUZQ9Z80HZ',
    userId: 'careagent-kmkmkmkkmkmkk',
    userName: {
      first_name: 'Srijan',
      last_name: 'Team',
      middle_name: 'Dev',
    },
    userRole: 'careagent',
  },
};
describe('RoleBaseRender ', () => {
  test('should return true for valid zipCode ', () => {
    render(
      <RoleBaseRender forRole='careagent' hasAll={true}>
        {children}
      </RoleBaseRender>,
      {initialState: mockedState},
    );

    expect(screen.getByText(/Welcome To Vimient/i)).toBeTruthy();
  });
});
