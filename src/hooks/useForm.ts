import React from 'react';
import {trimValues} from 'globals/global.functions';

export const useForm = (options: any) => {
  const [data, setData] = React.useState(options?.initialValues || {});
  const [beginValidate, setBeginValidate] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const [customErrors, setCustomErrors] = React.useState<any>({});

  React.useEffect(() => {
    if (beginValidate) updateValidation();
  }, [data, customErrors]);

  const handleChange = (
    key: any,
    sanitizeFn: any,
    isValue: boolean = false,
  ) => (e: any) => {
    const val = isValue ? e : e.target.value;
    const value = sanitizeFn ? sanitizeFn(val) : val;

    setData({
      ...data,
      [key]: value,
    });
    if (customErrors[key]) {
      delete customErrors[key];
      setCustomErrors({
        ...customErrors,
      });
      setErrors({...customErrors});
    }
  };

  const updateValidation = () => {
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors: any = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
          continue;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
          continue;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value, data)) {
          valid = false;
          newErrors[key] = custom.message;
        }
        if (customErrors[key]) {
          valid = false;
          newErrors[key] = customErrors[key];
        }
      }
      if (!valid) {
        setErrors(newErrors);
      } else {
        setErrors({});
      }
      return valid;
    }
  };

  const setCustomError = (key: any, message: any) => {
    const customError = {
      [key]: message,
    };
    setCustomErrors({...customErrors, ...customError});
    setErrors({...customErrors, ...customError});
  };

  const handleSubmit = async (e: any, additionalData?: any) => {
    e.preventDefault();
    setBeginValidate(true);
    const valid = updateValidation();
    if (valid && options?.onSubmit) {
      options.onSubmit(trimValues(data), additionalData);
    }
  };

  return {
    data,
    setData,
    handleChange,
    handleSubmit,
    errors,
    setCustomError,
  };
};

export const getFormFields = (fields: any) => {
  let formData: any = [];
  let validationData: any = {};
  let initialValues: any = {};

  Object.entries(fields).forEach(([key, value]: any) => {
    formData.push(value);
    validationData[key] = value['validation'];
    initialValues[key] = value['initialValue'];
  });
  return {formData, validationData, initialValues};
};
