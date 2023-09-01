import React from 'react';
import moment from 'moment-timezone';
import {
  TextField,
  TextFieldProps,
  InputLabel,
  InputLabelProps,
  Checkbox,
  CheckboxProps,
  Select,
  SelectProps,
  FormControl,
  FormControlProps,
  Radio,
  RadioProps,
  Input,
  InputProps,
  useTheme,
} from '@mui/material';
import {withStyles} from 'tss-react/mui';
import {DatePicker, TimePicker} from '@mui/x-date-pickers';
import CheckBoxOutlineBlankSharpIcon from '@mui/icons-material/CheckBoxOutlineBlankSharp';
import CheckBoxSharpIcon from '@mui/icons-material/CheckBoxSharp';

import {ReactComponent as Calender} from 'assets/icons/Calender.svg';
import {ReactComponent as Time} from 'assets/icons/Time.svg';
import {ZINDEX} from 'globals/global.constants';
import {makeStyles} from 'tss-react/mui';
import clsx from 'clsx';

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

export const OpenPickerIcon = () => {
  return <Calender aria-label='right-align' height={20} />;
};

const OpenTimePickerIcon = () => {
  return <Time aria-label='right-align' height={20} />;
};

const InputText = withStyles(
  (props: TextFieldProps) => {
    return <TextField {...props} />;
  },
  () => ({
    root: {
      backgroundColor: '#EAF8F7',
      borderRadius: 5,
      '& .MuiOutlinedInput-root': {
        height: 36,
        borderRadius: 5,
      },
      '& .MuiInputBase-multiline': {
        backgroundColor: '#FAFAFA',
        padding: 11,
        height: 'auto',
        '& .MuiInputBase-multiline:disabled': {
          color: '#a7a7a7',
        },
      },
    },
  }),
);

const InputMasked = withStyles(
  (props: InputProps) => {
    return <Input {...props} />;
  },
  () => ({
    root: {
      backgroundColor: '#EAF8F7',
      padding: '17.5px 14px',
      borderRadius: 5,
      height: 36,
      '& .MuiOutlinedInput-root': {
        height: 36,
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

const InputControlledDatePicker = (props: any) => {
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
                fill: props.disabled ? '#a7a7a7' : '#6ba539',
              },
            },
          }}
        />
      )}
      className={clsx(classes.root, classes.error, props.className)}
      value={props.value}
    />
  );
};

const InputTimePicker = (props: any) => {
  const {classes} = inputDatePickerStyles();
  const [customTime, setCustomTime] = React.useState<any>(null);

  React.useEffect(() => {
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
      data-error={props.isError ? 'error' : ''}
      renderInput={(params) => <TextField variant='standard' {...params} />}
      className={clsx(
        classes.root,
        classes.error,
        {[classes.timePickerIconColor]: !props.disabled},
        props.className,
      )}
      showToolbar={true}
      value={customTime}
    />
  );
};

const InputRadio = withStyles(
  (props: RadioProps) => <Radio color='default' {...props} />,
  {
    root: {
      color: 'inherit',
      '& .MuiSvgIcon-root-199': {
        height: '1.2em',
        width: '1.2em',
      },
    },
    checked: {},
  },
);

const InputCheckBox = withStyles(
  (props: CheckboxProps) => (
    <Checkbox
      icon={<CheckBoxOutlineBlankSharpIcon />}
      checkedIcon={<CheckBoxSharpIcon />}
      color='default'
      {...props}
    />
  ),
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
    },
    checked: {},
  }),
);

const Label = withStyles(
  (props: InputLabelProps) => <InputLabel {...props} />,
  (theme) => ({
    root: {
      color: '#000',
      marginBottom: theme.spacing(1),
    },
  }),
);

const InputSelect = withStyles(
  (props: FormControlProps & SelectProps) => {
    const theme: any = useTheme();
    return (
      <FormControl
        style={{marginTop: 0, borderRadius: 5}}
        margin='dense'
        size='small'
        fullWidth>
        <Select
          id={props.id}
          style={{borderRadius: 5}}
          SelectDisplayProps={{
            style: {
              backgroundColor: theme.palette.secondary.main,
              paddingTop: 0,
              paddingBottom: 0,
            },
          }}
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
            // getContentAnchorEl: null,
            style: {zIndex: ZINDEX.ACTION_ERROR},
          }}
          {...props}
        />
      </FormControl>
    );
  },
  (theme: any) => ({
    root: {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: 5,
    },
    outlined: {
      borderColor: theme.palette.secondary.main,
    },
  }),
);

export {
  InputText,
  Label,
  InputSelect,
  InputTimePicker,
  InputCheckBox,
  InputRadio,
  InputControlledDatePicker,
  InputMasked,
};
