import React from 'react';
import {Autocomplete, CircularProgress, TextField} from '@mui/material';
import {autoCompleteSearchStyle} from './AutoComplete.style';

interface IAutoCompleteProps {
  options: any[];
  renderOption: (props: any, option: any) => JSX.Element;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  id: string;
  filterOptions: (x: any) => any[];
  value: string;
  onChange: (event: any, newValue: any) => void;
  onInputChange: (event: any, newValue: any) => void;
  loading: boolean;
  disabled?: boolean;
  getOptionDisabled?: (props: any) => boolean;
}

const AutoComplete = ({
  options,
  renderOption,
  open,
  onOpen,
  onClose,
  id,
  filterOptions,
  value,
  onChange,
  onInputChange,
  loading,
  disabled = false,
  getOptionDisabled,
}: IAutoCompleteProps): JSX.Element => {
  const {classes: className} = autoCompleteSearchStyle();
  return (
    <Autocomplete
      id={id}
      onFocus={() => {
        let b = document.body;
        b.style.overflow = 'hidden';
      }}
      onBlur={() => {
        let b = document.body;
        b.style.overflow = 'auto';
      }}
      classes={{...className}}
      blurOnSelect
      autoHighlight
      options={options}
      sx={{width: 300}}
      open={open}
      value={value}
      onChange={onChange}
      onOpen={onOpen}
      onClose={onClose}
      filterOptions={filterOptions}
      getOptionLabel={(option: any) => option.fullName}
      renderOption={renderOption}
      onInputChange={onInputChange}
      autoComplete
      disablePortal
      disableClearable
      loading={loading}
      disabled={disabled}
      getOptionDisabled={getOptionDisabled}
      renderInput={(params) => (
        <TextField
          variant='standard'
          {...params}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          inputProps={{...params.inputProps, classes: {icon: 'red'}}}
        />
      )}
      ListboxProps={{
        role: 'list-box', // prop to maintain the scroll position when loading more data
      }}
    />
  );
};

export default AutoComplete;
