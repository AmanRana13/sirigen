import React from 'react';
import {Label} from 'common/Input';

import {fieldsStyle} from './Fields.style';

import SelectMenu from './Components/SelectMenu';
import SelectDate from './Components/SelectDate';
import SelectControlledDate from './Components/SelectControlledDate';
import SelectInputText from './Components/SelectInputText';
import AutoCompleteField from 'common/Fields/Components/AutoCompleteField';

/**
 * @description component to access all the form fields
 * @return {JSX.Element} JSX
 */
const Fields = React.forwardRef(
  (
    {
      label = '',
      required = false,
      helperText = '',
      inline = false,
      unitValue = '',
      spacing = false,
      menu = false,
      date = false,
      menuItems = [],
      readOnly = false,
      control = null,
      register = () => {},
      multiline = false,
      extraComponent = undefined,
      center = false,
      errorField = undefined,
      errorText = '',
      defaultValue = '',
      disableFutureDate = true,
      controlledDate = false,
      bottomText = '',
      masked = false,
      validated = null,
      fontSize = 'small',
      secondary = false,
      fieldName = '',
      isAutoComplete = false,
      handleChange = () => {},
      addressOnChangeHandler = () => {},
      ...props
    }: any,
    ref: any,
  ) => {
    const {classes} = fieldsStyle();
    return (
      <>
        {label && (
          <Label
            // htmlFor={label}
            className={errorField && classes.errorTextStyle}
            data-testid='field-label'>
            {label}
            {required && `*`}
          </Label>
        )}
        <Component
          label={label}
          required={required}
          helperText={helperText}
          inline={inline}
          unitValue={unitValue}
          spacing={spacing}
          menu={menu}
          date={date}
          menuItems={menuItems}
          readOnly={readOnly}
          control={control}
          register={register}
          multiline={multiline}
          extraComponent={extraComponent}
          center={center}
          errorField={errorField}
          errorText={errorText}
          defaultValue={defaultValue}
          disableFutureDate={disableFutureDate}
          controlledDate={controlledDate}
          bottomText={bottomText}
          masked={masked}
          validated={validated}
          fontSize={fontSize}
          secondary={secondary}
          ref={ref}
          fieldName={fieldName}
          addressOnChangeHandler={addressOnChangeHandler}
          handleChange={handleChange}
          isAutoComplete={isAutoComplete}
          {...props}
        />
      </>
    );
  },
);

const Component = React.forwardRef(
  (
    {
      label = '',
      required = false,
      helperText = '',
      inline = false,
      unitValue = '',
      spacing = false,
      menu = false,
      date = false,
      menuItems = [],
      readOnly = false,
      control = null,
      register = {},
      multiline = false,
      extraComponent = undefined,
      center = false,
      errorField = undefined,
      errorText = '',
      defaultValue = '',
      disableFutureDate = true,
      controlledDate = false,
      bottomText = '',
      masked = false,
      validated = null,
      fontSize = 'small',
      secondary = false,
      fieldName = '',
      handleChange,
      isAutoComplete = false,
      addressOnChangeHandler,
      ...props
    }: any,
    ref = null,
  ) => {
    if (menu) {
      return (
        <SelectMenu
          errorField={errorField}
          data-testid = 'selectMenu'
          props={props}
          menuItems={menuItems}
          defaultValue={defaultValue}
          errorText={errorText}
          control={control}
        />
      );
    } else if (date) {
      return (
        <SelectDate
          label={label}
          data-testid = {`selectDate${label.replaceAll(' ', '')}`}
          errorField={errorField}
          disableFutureDate={disableFutureDate}
          props={props}
          defaultValue={defaultValue}
          control={control}
          errorText={errorText}
        />
      );
    } else if (controlledDate) {
      return (
        <SelectControlledDate
          label={label}
          data-testid = {`selectControlledDate${label.replaceAll(' ', '')}`}
          errorField={errorField}
          disableFutureDate={disableFutureDate}
          props={props}
          defaultValue={defaultValue}
          errorText={errorText}
          control={control}
          disabled={props.disabled}
        />
      );
    } else if (isAutoComplete) {
      return (
        <AutoCompleteField
          props={props}
          label={label}
          data-testid = {`autoCompleteField${label.replaceAll(' ', '')}`}
          register={register}
          errorText={errorText}
          fieldName={fieldName}
          helperText={helperText}
          errorField={errorField}
          defaultValue={defaultValue}
          handleChange={handleChange}
          addressOnChangeHandler={addressOnChangeHandler}
        />
      );
    }
    return (
      <SelectInputText
        label={label}
        data-testid = {`selectInputType${label.replaceAll(' ', '')}`}
        multiline={multiline}
        defaultValue={defaultValue}
        inline={inline}
        center={center}
        spacing={spacing}
        masked={masked}
        errorText={errorText}
        helperText={helperText}
        readOnly={readOnly}
        errorField={errorField}
        validated={validated}
        register={register}
        props={props}
        fontSize={fontSize}
        secondary={secondary}
        extraComponent={extraComponent}
        bottomText={bottomText}
        unitValue={unitValue}
        ref={ref}
      />
    );
  },
);

export {Fields};
