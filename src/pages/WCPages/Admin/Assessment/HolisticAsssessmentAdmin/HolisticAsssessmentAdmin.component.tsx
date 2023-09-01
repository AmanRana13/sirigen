/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import {cloneDeep} from 'lodash';
import {
  Box,
  Button,
  Checkbox,
  ThemeProvider,
  StyledEngineProvider,
  Typography,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import {theme} from 'config/theme.config';

import globalUseStyles from 'config/global.styles';
import ErrorIcon from 'assets/icons/ErrorIcon.svg';
import {InputFields} from 'common/InputFields';
import {HolisticAssessmentAdminStatus} from 'globals/enums';
import {
  formatDateTime,
  toTitleCase,
  trimValues,
} from 'globals/global.functions';
import {
  DATE_FORMAT,
  DATE_FORMAT_SHORT_YEAR,
  DIALOG_TYPES,
  ERROR_MESSAGE,
  REGEX,
  TIME_FORMAT,
} from 'globals/global.constants';
import {openDialog} from 'store/commonReducer/common.action';

import PreviousVersions from './PreviousVersions.component';
import Sections from './Sections.component';
import {
  getHolisticAssessmentAdmin,
  postHolisticAssessmentAdmin,
  toggleHolisticAssessmentAdminViewState,
} from './HolisticAssessmentAdmin.action';
import {holisticAssessmentStyle} from './HolisticAssessmentAdmin.style';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const HolisticAssessmentAdmin = () => {
  const {classes} = holisticAssessmentStyle();
  const {classes: globalClasses} = globalUseStyles();

  const dispatch: any = useAppDispatch();
  const {
    survey,
    isHistory,
    versionNumber,
    formId,
    formStatus,
    publishDateTime,
  } = useAppSelector((state: any) => state.holisticAssessmentAdmin);

  const [submitLater, setSubmitLater] = React.useState(false);
  const [sectionsData, setSectionsData] = React.useState<any>([]);
  const [saveError, setSaveError] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(false);
  const [submitLaterError, setSubmitLaterError] = React.useState(false);
  const [publishDate, setPublishDate] = React.useState<any>(null);
  const [publishTime, setPublishTime] = React.useState<any>(null);
  const [collapseAllSection, setCollapseAllSection] = React.useState(false);

  React.useEffect(() => {
    dispatch(getHolisticAssessmentAdmin());
  }, []);

  React.useEffect(() => {
    const surveyData = cloneDeep(survey);
    setSectionsData(surveyData);
    setSubmitError(false);
    setSubmitLaterError(false);
  }, [survey]);

  React.useEffect(() => {
    if (formStatus == HolisticAssessmentAdminStatus.SubmitLater) {
      setPublishDate(publishDateTime);
      setPublishTime(publishDateTime);
      setSubmitLater(true);
    } else {
      setPublishDate(null);
      setPublishTime(null);
      setSubmitLater(false);
    }
  }, [formStatus]);

  const headerArr = React.useMemo(() => {
    return sectionsData.map(function (item: any) {
      return toTitleCase(item.header.replace(/_/g, ' '));
    });
  }, [sectionsData]);

  const isActionButtonDisabled = React.useMemo(() => {
    return (
      JSON.stringify(survey) == JSON.stringify(sectionsData) &&
      formStatus == HolisticAssessmentAdminStatus.Submit
    );
  }, [sectionsData]);

  const isAllTitleFilled = React.useMemo(() => {
    let isError = false;
    isError = Object.values(sectionsData).some((dataArr: any) => {
      return dataArr.header == '';
    });
    return isError;
  }, [sectionsData]);

  const isDuplicateTitle = React.useMemo(() => {
    let isError = false;
    isError = sectionsData.some((dataArr: any, idx: any) => {
      const title = toTitleCase(dataArr.header.replace(/_/g, ' '));
      return headerArr.indexOf(title) !== idx;
    });
    return isError;
  }, [sectionsData]);

  const isPastTime = React.useMemo(() => {
    const formattedDateTime = formatDateTime(publishDate, publishTime);
    return moment(formattedDateTime).diff(moment(), 'minutes') < 1;
  }, [publishTime, publishDate]);

  const checkIfFormFilled = () => {
    let isError = false;
    isError = Object.values(sectionsData).some((dataArr: any) => {
      return dataArr.data.some(
        (val: any) => !REGEX.BLANK_FIELD.test(val.question),
      );
    });
    return isError;
  };

  const handleAddSection = () => {
    setCollapseAllSection(true);
    setSubmitError(false);
    setSaveError(false);
    setSectionsData([
      {
        data: [
          {
            always: 0,
            never: 0,
            question: '',
            sometimes: 0,
          },
        ],
        header: '',
      },
      ...sectionsData,
    ]);
    setTimeout(() => {
      setCollapseAllSection(false);
    }, 500);
  };

  const handleClose = () => {
    dispatch(toggleHolisticAssessmentAdminViewState(false));
    dispatch(getHolisticAssessmentAdmin());
  };

  const handleSaveSubmitReset = (type: HolisticAssessmentAdminStatus) => {
    const trimmedSectionsData = trimValues(sectionsData);
    const params: any = {
      type: type,
      versionNumber: versionNumber,
      surveyData: trimmedSectionsData,
      formId: formId,
    };

    if (type == HolisticAssessmentAdminStatus.SubmitLater) {
      params.publishDateTime = moment(formatDateTime(publishDate, publishTime))
        .utc()
        .format();
    }

    dispatch(postHolisticAssessmentAdmin(params));
  };

  const onSubmit = () => {
    const submitNowFirstMessage = `Are you sure you want to submit the Holistic Assessment questions?`;
    const submitNowSecondMessage = `Please note that these changes will reflect immediately for all the Care Agents`;
    const submitLaterFirstMessage = `Are you sure you want to schedule the Holistic Assessment questions to publish later?`;
    const submitLaterSecondMessage = `Please note that these changes will reflect automatically from ${moment(
      publishDate,
    ).format(DATE_FORMAT)} ${moment(publishTime).format(
      TIME_FORMAT,
    )} for all the Care Agents`;

    const openDialogProp = {
      boldMessage: submitLater
        ? submitLaterFirstMessage
        : submitNowFirstMessage,
      secondMessage: submitLater
        ? submitLaterSecondMessage
        : submitNowSecondMessage,
      successButtonText: 'Submit',
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        handleSaveSubmitReset(
          submitLater
            ? HolisticAssessmentAdminStatus.SubmitLater
            : HolisticAssessmentAdminStatus.Submit,
        );
      },
    };

    if (
      submitLater &&
      (publishDate == null || publishTime == null || isPastTime)
    ) {
      setSubmitLaterError(true);
      return;
    }

    if (isAllTitleFilled || isDuplicateTitle) {
      setSaveError(true);
      return;
    }

    if (checkIfFormFilled()) {
      setSaveError(true);
      setSubmitError(true);
      return;
    }
    dispatch(openDialog({...openDialogProp}));
  };

  const onReset = () => {
    const openDialogProp = {
      boldMessage: `Are you sure you want to Reset the ${
        formStatus == HolisticAssessmentAdminStatus.SubmitLater
          ? 'scheduled'
          : ''
      } Holistic Assessment form?`,
      secondMessage: `Please note that you will lose all the changes you have made to this form`,
      successButtonText: 'Submit',
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        setSubmitError(false);
        setSaveError(false);
        if (formStatus == HolisticAssessmentAdminStatus.Submit) {
          dispatch(getHolisticAssessmentAdmin());
        } else {
          handleSaveSubmitReset(HolisticAssessmentAdminStatus.Reset);
        }
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  const onSave = () => {
    setSubmitError(false);

    if (isAllTitleFilled || isDuplicateTitle) {
      setSaveError(true);
      return;
    }

    if (checkIfFormFilled()) {
      setSaveError(true);
    }
    handleSaveSubmitReset(HolisticAssessmentAdminStatus.Save);
  };

  const handleCheckboxSubmitLater = () => {
    if (submitLater) {
      setPublishDate(null);
      setPublishTime(null);
      setSubmitLaterError(false);
    }
    setSubmitLater(!submitLater);
  };

  return (
    <Box
      className={classes.container}
      data-testid='holisticAssessmentAdminComponent'>
      <Box className={classes.holisticAssessmentHeader}>
        <Box style={{display: 'flex'}}>
          <Typography
            className={classes.holisticAssessmentHeading}
            variant='h2'>
            Holistic Assessment
          </Typography>
          <Typography
            style={{
              color: '#000',
              paddingLeft: 20,
              display: 'flex',
              justifyContent: 'flex-start',
            }}
            variant='body2'>
            {formStatus == HolisticAssessmentAdminStatus.SubmitLater && (
              <InfoOutlinedIcon style={{marginRight: 5}} />
            )}
            Version {versionNumber}&nbsp;
            {formStatus == HolisticAssessmentAdminStatus.SubmitLater &&
              `will be Published on ${moment(publishDateTime).format(
                DATE_FORMAT_SHORT_YEAR,
              )} at ${moment(publishDateTime).format(TIME_FORMAT)}`}
            <span>
              {formStatus == HolisticAssessmentAdminStatus.Save && 'Draft'}
            </span>
          </Typography>
        </Box>
        <Box style={{display: 'flex'}}>
          {formStatus == HolisticAssessmentAdminStatus.Save && (
            <Typography variant='body1' className={classes.incomplete}>
              <img src={ErrorIcon} width='30' height='30' />
              Incomplete
            </Typography>
          )}
          {!isHistory && (
            <Button
              variant='contained'
              color='primary'
              disabled={sectionsData.length > 9}
              data-testid = 'addSectionBtn'
              onClick={handleAddSection}
              className={globalClasses.smallButton}>
              Add Section
            </Button>
          )}
        </Box>
      </Box>

      <Sections
        allSection={sectionsData}
        setSectionsData={setSectionsData}
        saveError={saveError}
        submitError={submitError}
        headerArr={headerArr}
        collapseAllSection={collapseAllSection}
        isDuplicateTitle={isDuplicateTitle}
      />

      {isHistory ? (
        <Box display='flex' justifyContent='center' margin='50px 0'>
          <Button
            size='large'
            color='primary'
            variant='contained'
            onClick={handleClose}
            style={{color: '#fff'}}
            data-testid='cancelBtn'>
            Close
          </Button>
        </Box>
      ) : (
        <>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '44px 0 50px 0',
            }}>
            <Checkbox
              className={clsx({
                [classes.checkboxNotChecked]: !submitLater,
                [classes.checkedCheckbox]: submitLater,
              })}
              data-testid = 'submitLaterCheckbox'
              checked={submitLater}
              onChange={handleCheckboxSubmitLater}
            />
            <Typography style={{color: '#000'}} variant='body2'>
              Submit this form later
            </Typography>
          </Box>

          <Box display='flex' justifyContent='center'>
            <Box width={170} mr={3}>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                  <InputFields
                    isError={
                      publishDate == null && submitLaterError ? true : false
                    }
                    errorText={ERROR_MESSAGE.REQUIRED_FIELD}
                    controlledDate
                    readOnly={true}
                    inputProps={{
                      name: 'submitLaterDatePicker',
                    }}
                    eventProps={{
                      value: publishDate,
                      disabled: !submitLater,
                      onChange: (val: any) => {
                        setPublishDate(val);
                      },
                      disablePast: true,
                    }}
                  />
                </ThemeProvider>
              </StyledEngineProvider>
            </Box>
            <Box width={150}>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                  <InputFields
                    isError={
                      (publishTime == null || isPastTime) && submitLaterError
                    }
                    errorText={
                      isPastTime
                        ? 'Select Future Time'
                        : ERROR_MESSAGE.REQUIRED_FIELD
                    }
                    controlledTime
                    inputProps={{
                      name: 'submitLaterTimePicker',
                      readOnly: true,
                    }}
                    eventProps={{
                      inputFormat: 'hh:mm a',
                      value: publishTime,
                      disabled: !submitLater,
                      onChange: (val: any) => {
                        setPublishTime(val);
                      },
                    }}
                  />
                </ThemeProvider>
              </StyledEngineProvider>
            </Box>
          </Box>
          <Box
            display='flex'
            alignItems='center'
            justifyContent='center'
            margin='50px 0'>
            <Box mr={2}>
              <Button
                size='large'
                className='secondaryButton'
                variant='outlined'
                disabled={isActionButtonDisabled}
                onClick={onReset}
                data-testid='resetBtn'>
                Reset
              </Button>
            </Box>
            <Box mr={2}>
              <Button
                size='large'
                color='primary'
                variant='contained'
                data-testid = 'saveBtn'
                disabled={isActionButtonDisabled || submitLater}
                onClick={onSave}
                style={{color: '#fff'}}>
                Save
              </Button>
            </Box>
            <Box>
              <Button
                size='large'
                color='primary'
                variant='contained'
                data-testid = 'submitBtn'
                disabled={isActionButtonDisabled}
                onClick={onSubmit}
                style={{color: '#fff'}}>
                {submitLater ? 'Submit Later' : 'Submit Now'}
              </Button>
            </Box>
          </Box>
        </>
      )}
      {formStatus && <PreviousVersions />}
    </Box>
  );
};
export default HolisticAssessmentAdmin;
