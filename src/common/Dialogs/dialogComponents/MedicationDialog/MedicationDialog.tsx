/* eslint-disable max-len */
import React, {useEffect, useMemo} from 'react';
import clsx from 'clsx';
import {
  Box,
  Typography,
  Dialog,
  DialogContent,
  FormControlLabel,
  FormGroup,
} from '@mui/material';

import {InputCheckBox} from 'common/Input';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from 'common/SearchBar/SearchBar';
import {closeDialog} from 'store/commonReducer/common.action';
import RemainingCharacters from 'common/RemainingCharacters/RemainingCharacters';
import {InputFields} from 'common/InputFields';
import {AssessmentStatus, Float, ThemeVersion} from 'globals/enums';
import {APPLICATION_EVENTS, CHARACTERS_LIMIT} from 'globals/global.constants';
import ErrorIcon from 'assets/icons/ErrorIcon.svg';
import {useForm, getFormFields} from 'hooks';
import {getCurrentSenior, maskPhoneNumber} from 'globals/global.functions';
import useAutoSave from 'hooks/useAutoSave';
import {
  RESET_SEARCH,
  postMedicationData,
  searchMedication,
  setMedicationDialogData,
} from 'pages/WCPages/Assessments/MedicationList/MedicationList.action';

import MedicationActionDialogButton from './MedicationActionDialogButton.component';
import {medicationFormFields} from './medicationFormFields';
import {IMedicalDialogProps, IWhenDoTheyTakeIt} from './MedicationDialog.types';
import {medicationDialogStyles} from './MedicationDialog.style';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const MedicationPopUp = ({position}: IMedicalDialogProps) => {
  const {classes} = medicationDialogStyles();
  const dispatch: any = useAppDispatch();

  const searchInputRef: any = React.useRef(); //using ref to hightlight the search results
  const {data, dialogTitle} = useAppSelector(
    (state: any) => state.common.dialog,
  );
  const {searchResult, searchLoading, errorMessage} = useAppSelector(
    (state: any) => state.medicationList,
  );
  const medicationAlreadyAddedData = useAppSelector(
    (state: any) => state.medicationList.data,
  );
  const {sos, fall} = useAppSelector((state: any) => state.alarms);

  const {onChangeAutoSave} = useAutoSave({
    onSave: () => {},
    isTimer: false,
  });

  useEffect(() => {
    onChangeAutoSave();
  }, []);

  const [isError, setIsError] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<String>('');

  const {initialValues, validationData} = getFormFields(medicationFormFields);

  const pharmacy = useAppSelector(
    (state: any) => state.common.providerInfo.pharmacy,
  );
  const dialogData = useAppSelector((state: any) => state.common.dialog);

  const primaryPharmacy = useMemo(() => {
    return pharmacy.find((data: any) => data.is_primary);
  }, [pharmacy]);

  const allPharmacyDetails = pharmacy.map((data: any) => {
    return {
      label: data.name,
      value: data.name,
    };
  });

  const AddMedication = 'Add Medication';

  const {senior_id} = getCurrentSenior();
  const {
    handleSubmit,
    handleChange,
    setData,
    data: medication,
    errors,
    setCustomError,
  }: any = useForm({
    validations: {
      ...validationData,
    },
    onSubmit: (data: any, additionalData?: any) => {
      dispatch(
        postMedicationData({
          data: {...data, ...additionalData},
          status: AssessmentStatus.Submit,
          seniorID: senior_id,
          medicationID: dialogData?.data?.medicationID,
        }),
      );
    },
    initialValues: data
      ? {
          doseForm: data?.doseForm,
          doseFrequencyTime: data?.doseFrequency?.doseFrequencyTime,
          doseFrequencyUnit: data?.doseFrequency?.doseFrequencyUnit,
          whenDoTheyTakeIt: data?.whenDoTheyTakeIt,
          datePrescribed: data?.datePrescribed,
          dateDiscontinued: data?.dateDiscontinued,
          pharmacyName:
            dialogTitle === AddMedication
              ? data?.pharmacyName || primaryPharmacy.name
              : data?.pharmacyName,
          pharmacyPhone:
            dialogTitle === AddMedication
              ? data?.pharmacyPhone || primaryPharmacy.contact_phone
              : data?.pharmacyPhone,
          notes: data?.notes,
        }
      : {
          ...initialValues,
          pharmacyName: primaryPharmacy?.name,
          pharmacyPhone: primaryPharmacy?.contact_phone,
        },
  });

  /**
   * @description useEffect for handeling the special emergency case of autosave when alert or sos comes,
   * it should save the dialog data when we redirect using alert navigate icon.
   */
  useEffect(() => {
    if (Object.keys(sos)?.length !== 0 || Object.keys(fall)?.length !== 0) {
      dispatch(
        setMedicationDialogData({
          ...medication,
          medicationName:
            dialogTitle === AddMedication
              ? searchInputRef?.current?.value
              : data.medicationName,
          medicationID: dialogTitle === AddMedication ? '' : data.medicationID,
        }),
      );
    }
  }, [medication, searchInputRef?.current?.value, sos, fall]);

  /**
   * @description list of already added medication
   */
  const addedMedication = React.useMemo(() => {
    return medicationAlreadyAddedData?.map((item: any) => {
      return item.medicationName;
    });
  }, [medicationAlreadyAddedData]);

  /**
   * @description list of auto suggested value excluding already added values
   */
  const searchList = React.useMemo(() => {
    return searchResult?.filter((item: string) => {
      if (!addedMedication.includes(item)) return item;
    });
  }, [searchResult]);

  const isMedicationSelected = React.useMemo(() => {
    const isSelected = searchList.includes(searchQuery);
    if (isSelected) {
      setIsError(false);
    }
    return isSelected;
  }, [searchQuery, searchList]);

  /**
   * @function onCloseHandler
   * @description to handle close of the dialog
   * @returns void
   */
  const onCloseHandler = () => {
    dispatch(closeDialog());
  };

  /**
   * @function handleSearchChange
   * @description to handle change event of search input field
   * @param value
   */
  const handleSearchChange = async (value: string) => {
    if (value.length >= CHARACTERS_LIMIT.searchMedication) {
      setIsError(true);
    } else if (value && value.length < CHARACTERS_LIMIT.searchMedication) {
      //dispatch action creator to fetch medication matched with search value
      dispatch(searchMedication(value));
      setIsError(false);
    } else {
      // reset the search result if we do not have value in searchBar
      dispatch({type: RESET_SEARCH});
      setIsError(false);
    }
  };

  /**
   * @function handleClear
   * @description to handle clear all fields functionality in medication dialog
   */
  const handleClear = () => {
    setSearchQuery('');
    searchInputRef.current.value = '';
    setIsError(false);
    setData({
      ...initialValues,
      pharmacyName: primaryPharmacy?.name,
      pharmacyPhone: primaryPharmacy?.contact_phone,
    });
    setCustomError('doseFrequencyUnit', '');
  };

  const whenToTakeItCheckBox = [
    {label: 'Morning', value: 'morning'},
    {label: 'Noon', value: 'noon'},
    {label: 'Evening', value: 'evening'},
    {label: 'Bedtime', value: 'bedtime'},
  ];

  /**
   * @function handleDisable
   * @description to handle disable fields
   */
  const handleDisable = () => {
    return dialogTitle === AddMedication && !isMedicationSelected;
  };

  /**
   * @function getNewCheckBoxValue
   * @description method to get the final values of when do they take it checkboxes
   */
  const getNewCheckBoxValue = (value: string) => {
    const when = medication.whenDoTheyTakeIt;

    if (when.includes(value)) {
      return when.filter((oldValue: string) => oldValue !== value);
    }
    return [...when, value];
  };

  /**
   * @function handleFormSubmit
   * @description method for submit the dialog form data
   */
  const handleFormSubmit = (e: any) => {
    if (medication.doseFrequencyTime && !medication.doseFrequencyUnit) {
      e.preventDefault();
      setCustomError('doseFrequencyUnit', 'Required field');
    } else {
      handleSubmit(e, {
        medicationName:
          dialogTitle === AddMedication
            ? searchInputRef?.current?.value
            : data.medicationName,
      });
      //after submit close the dialog
      onCloseHandler();
    }
  };

  /**
   * @function getPhoneNumber
   * @description method to get pharmacy phone number based on pharmacy name
   */
  const getPhoneNumber = (name: string) => {
    const selectedPharmacy = pharmacy.find((data: any) => data.name === name);
    return selectedPharmacy?.contact_phone;
  };

  useEffect(() => {
    setData({
      ...medication,
      pharmacyPhone: getPhoneNumber(medication.pharmacyName),
    });
  }, [medication.pharmacyName]);

  return (
    <form
      onSubmit={(e) => handleFormSubmit(e)}
      noValidate
      data-testid='medication-dialog'>
      <Box
        id='resources-header'
        className={classes.dialogTitle}
        data-testid='resourcesDialog'>
        <Box className={classes.dialogHeader}>
          <Box className={classes.dialogTitleName}>
            <Typography className={classes.titleNameFontStyle}>
              {dialogTitle}
            </Typography>
          </Box>
          <CloseIcon
            data-testid='resourcesClose'
            className={classes.closeIcon}
            onClick={onCloseHandler}
          />
        </Box>
      </Box>
      <DialogContent
        id='callEntry-content'
        style={{padding: '20px 30px 0 29px'}}>
        {dialogTitle === AddMedication ? (
          <>
            <Typography
              variant='h2'
              className={clsx(
                {[classes.heading]: true},
                {[classes.disable]: isMedicationSelected},
              )}
              mb={1}>
              Search Medication<span className={classes.errorText}>*</span>
            </Typography>
            <Box display='flex' alignItems='end'>
              <SearchBar
                width='45%'
                value={searchInputRef?.current?.value}
                handleSearchChange={(value: any) => {
                  handleSearchChange(value);
                }}
                errorText='Max 25 character is allowed'
                isNewDesign
                disabled={isMedicationSelected}
                isError={isError}
                searchLoading={searchLoading}
                inputRef={searchInputRef}
                searchList={searchList || []}
                searchListWidth='42%'
                minHeight={
                  searchList?.length === 0 || errorMessage ? '' : '25%'
                }
                placeholder='Search with minimum 3 characters'
                showCrossIcon={false}
                errorMessage={errorMessage}
                isSelected={isMedicationSelected}
                onSearchTextChange={setSearchQuery}
                maxLength={CHARACTERS_LIMIT.searchMedication}
              />
              {isMedicationSelected && (
                <Box
                  className={classes.clearBtn}
                  onClick={handleClear}
                  data-testid='clearButton'>
                  <Typography variant='body1'>Clear</Typography>
                </Box>
              )}
            </Box>
          </>
        ) : (
          <Box display='flex' justifyContent='space-between'>
            <Box>
              <Typography variant='h2' className={classes.heading} mb={1}>
                Medication<span className={classes.errorText}>*</span>
              </Typography>
              <Box display='flex' alignItems='end'>
                <Typography variant='body1'>{data.medicationName}</Typography>
              </Box>
            </Box>
            {data.status === AssessmentStatus.Save && (
              <Box>
                <Typography
                  variant='body1'
                  ml={2}
                  className={classes.incomplete}>
                  <img src={ErrorIcon} width='30' height='30' />
                  Incomplete
                </Typography>
              </Box>
            )}
          </Box>
        )}
        <Box mt={3}>
          <Box display='flex'>
            <Box style={{marginRight: '81px'}}>
              <Typography
                variant='body1'
                mb='4px'
                style={{fontWeight: 500}}
                className={clsx({
                  [classes.disable]: handleDisable(),
                })}>
                Dose Form:
              </Typography>
              <Box width='360px'>
                <InputFields
                  menu={true}
                  initialLabel='Please select'
                  menuItems={[
                    {value: 'tablet', label: 'Tablet'},
                    {value: 'capsule', label: 'Capsule'},
                    {value: 'suppository', label: 'Suppository'},
                    {value: 'liquid_oral', label: 'Liquid, Oral'},
                    {value: 'injectable', label: 'Injectable'},
                    {value: 'drops', label: 'Drops'},
                    {value: 'patch', label: 'Patch'},
                    {value: 'topical', label: 'Topical'},
                    {value: 'aerosol_inhaler', label: 'Aerosol Inhaler'},
                    {value: 'other', label: 'Other'},
                  ]}
                  inputProps={{name: 'doseForm'}}
                  eventProps={{
                    value: medication.doseForm,
                    onChange: handleChange('doseForm'),
                    disabled: handleDisable(),
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Typography
                variant='body1'
                mb='4px'
                style={{fontWeight: 500}}
                className={clsx({[classes.disable]: handleDisable()})}>
                Dose Frequency:
              </Typography>
              <Box display='flex' alignItems='center'>
                <Typography
                  variant='body1'
                  style={{fontWeight: 500}}
                  className={clsx({[classes.disable]: handleDisable()})}>
                  Every
                </Typography>
                <Box width='133px' style={{marginLeft: 10}}>
                  <InputFields
                    menu={true}
                    initialLabel='Please select'
                    menuItems={[
                      {value: '1', label: '1'},
                      {value: '2', label: '2'},
                      {value: '3', label: '3'},
                      {value: '4', label: '4'},
                      {value: '5', label: '5'},
                      {value: '6', label: '6'},
                    ]}
                    inputProps={{
                      name: 'doseFrequencyTime',
                    }}
                    eventProps={{
                      value: medication.doseFrequencyTime,
                      onChange: handleChange('doseFrequencyTime'),
                      disabled: handleDisable(),
                    }}
                  />
                </Box>
                <Box width='159px' style={{marginLeft: 10}}>
                  <InputFields
                    isError={errors['doseFrequencyUnit']}
                    menu={true}
                    initialLabel='Please select'
                    menuItems={[
                      {value: 'day', label: 'Day'},
                      {value: 'week', label: 'Week'},
                      {value: 'month', label: 'Month'},
                    ]}
                    inputProps={{name: 'doseFrequencyUnit'}}
                    eventProps={{
                      value: medication.doseFrequencyUnit,
                      onChange: handleChange('doseFrequencyUnit'),
                      disabled:
                        handleDisable() || !medication.doseFrequencyTime,
                    }}
                  />
                </Box>
              </Box>
              <Typography
                variant='body1'
                style={{float: 'right', marginRight: 50}}
                className={classes.errorText}>
                {errors['doseFrequencyUnit']}
              </Typography>
            </Box>
          </Box>
          <Typography
            variant='body1'
            mb='4px'
            style={{fontWeight: 500}}
            mt={3}
            className={clsx({[classes.disable]: handleDisable()})}>
            When do they take it?
          </Typography>
          <Box display='flex'>
            <FormGroup row={true}>
              {whenToTakeItCheckBox.map((data: IWhenDoTheyTakeIt) => {
                return (
                  <FormControlLabel
                    key={data.label}
                    control={
                      <InputCheckBox
                        onChange={() => {
                          handleChange(
                            'whenDoTheyTakeIt',
                            null,
                            true,
                          )(getNewCheckBoxValue(data.value));
                        }}
                        style={{
                          paddingRight: 5,
                        }}
                      />
                    }
                    label={data.label}
                    style={{marginRight: '65px', color: '#000'}}
                    disabled={handleDisable()}
                    checked={medication?.whenDoTheyTakeIt?.includes(data.value)}
                  />
                );
              })}
            </FormGroup>
          </Box>
          <Box display='flex' mt={3}>
            <Box style={{marginRight: '81px'}}>
              <Typography
                variant='body1'
                mb='4px'
                style={{fontWeight: 500}}
                className={clsx({[classes.disable]: handleDisable()})}>
                Date Prescribed:
              </Typography>
              <Box width='360px'>
                <InputFields
                  controlledDate
                  readOnly={true}
                  inputProps={{
                    name: 'datePrescribed',
                    placeholder: 'MM/DD/YYYY',
                  }}
                  eventProps={{
                    value: medication.datePrescribed,
                    onChange: handleChange('datePrescribed', null, true),
                    disableFuture: true,
                    disabled: handleDisable(),
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Typography
                variant='body1'
                mb='4px'
                style={{fontWeight: 500}}
                className={clsx({[classes.disable]: handleDisable()})}>
                Date Discontinued:
              </Typography>
              <Box width='360px'>
                <InputFields
                  controlledDate
                  readOnly={true}
                  inputProps={{
                    name: 'dateDiscontinued',
                    placeholder: 'MM/DD/YYYY',
                  }}
                  eventProps={{
                    value: medication.dateDiscontinued,
                    onChange: handleChange('dateDiscontinued', null, true),
                    disableFuture: true,
                    disabled: handleDisable(),
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box display='flex' mt={3}>
            <Box style={{marginRight: '81px'}}>
              <Typography
                variant='body1'
                mb='4px'
                style={{fontWeight: 500}}
                className={clsx({[classes.disable]: handleDisable()})}>
                Pharmacy Name:
              </Typography>
              <Box width='360px'>
                <InputFields
                  menu={true}
                  initialLabel='Please select'
                  menuItems={allPharmacyDetails}
                  inputProps={{name: 'pharmacy'}}
                  eventProps={{
                    value: medication.pharmacyName,
                    onChange: handleChange('pharmacyName'),
                    disabled: handleDisable(),
                  }}
                />
              </Box>
            </Box>
            <Box>
              <Typography
                variant='body1'
                mb='4px'
                style={{fontWeight: 500}}
                className={clsx({[classes.disable]: handleDisable()})}>
                Pharmacy Phone #:
              </Typography>
              <Box width='360px'>
                <InputFields
                  readOnly={true}
                  inputProps={{
                    name: 'pharmacyPhoneNo',
                    placeholder: 'xxx-xxx-xxxx',
                    maxLength: 10,
                  }}
                  eventProps={{
                    value: maskPhoneNumber(
                      String(medication.pharmacyPhone || ''),
                    ),
                    disabled: handleDisable(),
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Typography
          variant='body1'
          style={{fontWeight: 500}}
          mt={3}
          className={clsx({[classes.disable]: handleDisable()})}>
          Notes:
        </Typography>
        <InputFields
          eventProps={{
            value: medication['notes'],
            onChange: handleChange('notes'),
          }}
          inputProps={{
            placeholder: 'Please enter notes here',
            name: 'note',
            required: true,
            maxLength: 500,
            disabled: handleDisable(),
            style: {padding: 0},
          }}
          multiline={true}
          rows={6}
        />
        <RemainingCharacters
          limit={APPLICATION_EVENTS.medication.medicationCharCount}
          value={medication.notes || ''}
          themeVersion={ThemeVersion.v2}
          float={Float.Right}
        />
      </DialogContent>
      <MedicationActionDialogButton
        position={position}
        disable={handleDisable()}
      />
    </form>
  );
};

/**
 * @description main component for medication dialog
 * @param {string} position
 * @returns {JSX}
 */
const MedicationDialog = ({position}: IMedicalDialogProps) => {
  const {isOpen} = useAppSelector((state: any) => state.common.dialog);

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        style: {
          backgroundColor: 'white',
          boxShadow: 'none',
          borderRadius: '12px',
          minWidth: '861px',
        },
      }}
      aria-labelledby='resources-dialog'>
      <MedicationPopUp position={position} />
    </Dialog>
  );
};

export default MedicationDialog;
