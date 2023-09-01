import {render, screen} from '../../utilities/test-utils';
import {Fields} from './Fields.component';

describe('Fields Component', () => {
  test('should render Fields component', () => {
    render(
      <Fields
        label='First Name'
        required={true}
        helperText='John'
        inline={false}
        unitValue=''
        spacing={false}
        menu={false}
        date={false}
        menuItems={[]}
        readOnly={false}
        control={null}
        register={{}}
        multiline={false}
        extraComponent={undefined}
        center={false}
        errorField={undefined}
        errorText=''
        defaultValue=''
        disableFutureDate={true}
        controlledDate={false}
        bottomText=''
        masked={false}
        validated={null}
        fontSize='small'
        secondary={false}
        props={{
          name: {disabled: false, name: 'name.first_name'},
          validation: {
            maxLength: {message: 'Max 50 character is allowed', value: 50},
            required: 'Required Field',
          },
        }}
      />,
    );
    const element = screen.queryByTestId(/field-label/i);

    expect(element).toBeInTheDocument();
  });
});
