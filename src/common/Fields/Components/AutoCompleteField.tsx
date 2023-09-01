import React from 'react';
import useAutoComplete from 'hooks/useAutoComplete';
import SelectInputText from 'common/Fields/Components/SelectInputText';
import {IUseAutoCompleteProps} from 'hooks/useAutoComplete.types';
import InputTextWrapper from 'common/InputFields/component/InputTextWrapper';

const AutoCompleteField = ({
  label = '',
  required = false,
  register = () => {},
  helperText = '',
  errorField = '',
  isNewDesign = false,
  defaultValue = '',
  fieldName = '',
  addressOnChangeHandler = () => {},
  handleChange = () => {},
  ...props
}: any) => {
  const addressRef: any = React.useRef<any>(null);
  const autocompleteConfig: IUseAutoCompleteProps = React.useMemo(
    () => ({
      autocompleteConfig: {
        inputRef: addressRef,
        autocompleteOptions: {
          componentRestrictions: {country: 'us'},
          fields: ['address_components', 'formatted_address', 'geometry'],
          types: fieldName.includes('zip') ? ['postal_code'] : ['address'],
        },
        initialInputValue: defaultValue,
        onChange: handleChange,
      },
    }),
    [addressRef],
  );

  const [selectedLocation] = useAutoComplete(autocompleteConfig);

  React.useEffect(() => {
    if (selectedLocation.fullAddress) {
      addressOnChangeHandler(selectedLocation);
    }
  }, [selectedLocation]);

  if (isNewDesign) {
    return (
      <InputTextWrapper
        ref={(e) => {
          addressRef.current = e;
        }}
        {...props}
      />
    );
  } else {
    return (
      <>
        <SelectInputText
          ref={(e) => {
            register.ref(e);
            addressRef.current = e;
          }}
          label={label}
          helperText={helperText}
          errorField={errorField}
          defaultValue={defaultValue}
          {...props}
        />
      </>
    );
  }
};

export default AutoCompleteField;
