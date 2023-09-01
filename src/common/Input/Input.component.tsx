/* eslint-disable max-len */
import React, {useEffect} from 'react';
import {withStyles} from 'tss-react/mui';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';
import Select from '@mui/material/Select';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import Input from '@mui/material/Input';

import {ReactComponent as CalenderIcon} from 'assets/icons/Calender.svg';
import {ReactComponent as Time} from 'assets/icons/Time.svg';
import {makeStyles} from 'tss-react/mui';
import moment from 'moment';
import clsx from 'clsx';

const OpenPickerIcon = () => {
  return <CalenderIcon aria-label='right-align' height={20} />;
};

const OpenTimePickerIcon = () => {
  return <Time aria-label='right-align' height={20} />;
};

const inputDatePickerStyles = makeStyles()((theme: any) => ({
  root: {
    '&.MuiTextField-root': {
      backgroundColor: theme.palette.common.white,
      width: '100%',
      borderRadius: 5,
      paddingTop: 5,
      paddingLeft: 10,
      paddingRight: 10,
      margin: 0,
      height: 39,
      borderWidth: 0,
      border: `1px solid ${theme.palette.customColor.borderGrey}`,
      '& .MuiInput-underline:before': {
        borderBottom: `0px solid ${theme.palette.common.white}`,
      },
      '& .MuiInput-underline:after': {
        borderBottom: `0px solid ${theme.palette.common.white}`,
      },
    },
  },
  error: {
    '& .MuiFormHelperText-root.Mui-error': {
      color: theme.palette.customColor.error,
      fontSize: 13,
      position: 'relative',
      right: 9,
    },
  },
  timePickerIconColor: {
    '& svg': {
      '& path': {
        fill: theme.palette.customColor.primaryGreen,
      },
    },
  },
}));

const InputText = withStyles(
  (props: any) => <TextField {...props} />,
  () => ({
    root: {
      backgroundColor: '#EAF8F7',
      borderRadius: 7,
      '& .MuiOutlinedInput-root': {
        height: 40,
      },
      '& .MuiInputBase-multiline': {
        height: 'auto',
      },
    },
  }),
);

const InputMasked = withStyles(
  (props: any) => {
    return <Input {...props} />;
  },
  () => ({
    root: {
      backgroundColor: '#EAF8F7',
      borderRadius: 4,
      padding: '18.5px 14px',
      height: 40,
      '& .MuiOutlinedInput-root': {
        height: 40,
      },
      '& .MuiOutlinedInput-multiline': {
        height: 'auto',
      },
      '&.MuiInput-underline::before': {
        borderBottom: '0px solid #fff',
      },
      '&.MuiInput-underline::after': {
        borderBottom: '0px solid #fff',
      },
      '&:hover': {
        '&.MuiInput-underline::before': {
          borderBottom: '0px solid #fff',
        },
        '&.MuiInput-underline::after': {
          borderBottom: '0px solid #fff',
        },
      },
    },
  }),
);

const InputDatePicker = (props: any) => {
  const {classes} = inputDatePickerStyles();
  return (
    <DatePicker
      {...props}
      components={{
        OpenPickerIcon: OpenPickerIcon,
      }}
      renderInput={(params) => (
        <TextField
          variant='standard'
          {...params}
          sx={{
            svg: {
              '& .cls-1': {
                fill: props.disabled ? '#a7a7a7' : '#0186a5 ',
              },
            },
          }}
        />
      )}
      className={clsx(
        classes.root,
        classes.error,
        classes.timePickerIconColor,
        props.className,
      )}
      value={props.value}
    />
  );
};

const InputControlledDatePicker = (props: any) => {
  const {classes} = inputDatePickerStyles();
  return (
    <DatePicker
      {...props}
      components={{
        OpenPickerIcon: OpenPickerIcon,
      }}
      renderInput={(params) => {
        return (
          <TextField
            variant='standard'
            helperText={props.helperText}
            {...params}
            sx={{
              svg: {
                '& .cls-1': {
                  fill: props.disabled ? '#a7a7a7' : '#6ba539',
                },
              },
            }}
          />
        );
      }}
      className={clsx(classes.root, classes.error, props.className)}
      value={props.value}
      data-error={props.isError ? 'error' : ''}
    />
  );
};

const InputTimePicker = (props: any) => {
  const {classes} = inputDatePickerStyles();
  const [customTime, setCustomTime] = React.useState<null | string>(null);

  useEffect(() => {
    setCustomTime(props.value);
  }, [props.value]);

  return (
    <TimePicker
      {...props}
      components={{
        OpenPickerIcon: OpenTimePickerIcon,
      }}
      onOpen={() => {
        if (!props.value) {
          setCustomTime(moment().format());
        }
        if (props.onOpen) {
          props.onOpen();
        }
      }}
      onClose={() => {
        if (!props.value) {
          setCustomTime(null);
        }
        if (props.onClose) {
          props.onClose();
        }
      }}
      renderInput={(params) => <TextField variant='standard' {...params} />}
      className={clsx(
        classes.root,
        classes.error,
        classes.timePickerIconColor,
        props.className,
      )}
      showToolbar={true}
      value={customTime}
    />
  );
};

const StyledInputRadio = withStyles(Radio, (_theme, _params, classes) => ({
  root: {
    color: '#000',
    height: 25,
    width: 35,
    [`&.${classes.checked}`]: {
      color: '#16A9D0',
    },
  },
  checked: {},
}));

const InputRadio = (props: any) => (
  <StyledInputRadio color='default' {...props} />
);

const StyledInputCheckbox = withStyles(
  Checkbox,
  (_theme, _params, classes) => ({
    root: {
      color: '#000',
      height: 25,
      width: 35,
      '&:hover': {
        background: 'transparent',
      },
      [`&.${classes.checked}`]: {
        color: '#16A9D0',
      },
      '& svg': {
        width: '1.2em',
        height: '1.2em',
      },
      '&.Mui-disabled': {
        color: '#ccc',
      },
    },
    checked: {},
  }),
);
const InputCheckBox = (props: any) => (
  <StyledInputCheckbox
    icon={<CheckBoxOutlineBlankSharpIcon fontSize='medium' />}
    checkedIcon={<CheckBoxSharpIcon />}
    data-testid = {`${props.value}`}
    color='default'
    {...props}
  />
);

const Label = withStyles(
  (props: any) => <InputLabel {...props} />,
  (theme) => ({
    root: {
      color: '#000',
      marginBottom: theme.spacing(1),
      whiteSpace: 'pre-wrap',
    },
  }),
);

const InputSelect = withStyles(
  (props: any) => (
    <FormControl style={{marginTop: 0}} margin='dense' fullWidth>
      <Select
        id={props.id}
        SelectDisplayProps={{style: {backgroundColor: '#EAF8F7', padding: 9}}}
        displayEmpty
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
        {...props}
      />
    </FormControl>
  ),
  () => ({
    root: {
      backgroundColor: '#EAF8F7',
      borderRadius: 7,
    },
    outlined: {
      borderColor: '#EAF8F7',
    },
  }),
);

export {
  InputText,
  Label,
  InputSelect,
  InputDatePicker,
  InputTimePicker,
  InputCheckBox,
  InputRadio,
  InputControlledDatePicker,
  InputMasked,
};
