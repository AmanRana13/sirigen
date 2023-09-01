/* eslint-disable max-len */
import React from 'react';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import {Fields} from '../../Fields';
import {
  APPLICATION_EVENTS,
  DATE_FORMAT,
  DIALOG_TYPES,
  REGEX,
} from '../../../globals/global.constants';
import {createSummaryMaximizeStyle} from './CreateSummaryMaximize.style';
import {IDateRandeState} from './CreateSummaryMaximize.types';
import {EventsType, CareInsightTypes} from 'globals/enums';
import {closeEvent, minimizeEvent} from 'store/eventsReducer/Events.action';
import {ISummaryDataType} from 'store/eventsReducer/Events.state';
import DateRangeSelector from '../../DateRangeSelector/DateRangeSelector';
import {ICareInsightHistory} from 'pages/WCPages/SeniorCareInsights/SeniorCareInsight.state';
import CareInsightHistoryTable from './CareInsightHistoryTable';
import {searchRangeDateValidation} from 'globals/global.functions';
import moment from 'moment';
import {openDialog} from 'store/commonReducer/common.action';
import EventMaxDialog from '../../../common/Events/EventMaxDialog';
import {IDateRangeSelectorProps} from 'common/DateRangeSelector/DateRangeSelector.types';
import RemainingCharacters from '../../RemainingCharacters/RemainingCharacters';
import {
  getSummaryCareInsightHistory,
  postSummaryMessage,
} from 'store/eventsReducer/Summary.action';
import {useAppDispatch} from 'hooks/reduxHooks';
import {InputFields} from 'common/InputFields';

/**
 * @function validateSummaryMessage
 * @description check summary message is less than 2000 letters or not
 * @param {string} value
 * @returns {boolean}
 */
const validateSummaryMessage = (value: string): boolean => {
  let isValidate = true;
  if (
    value.length > APPLICATION_EVENTS.summary.summarMessageCharCount ||
    !REGEX.BLANK_FIELD.test(value)
  ) {
    isValidate = false;
  }

  return isValidate;
};

const CreateSummaryMaximize = ({
  seniorId,
  eventType,
  careInsightHistory,
  fullName,
  message,
  endDate,
  startDate,
  accountId,
  eventId,
  isResident,
}: ISummaryDataType) => {
  const {classes} = createSummaryMaximizeStyle();

  const [dateRange, setDateRange] = React.useState<IDateRandeState>({
    startDate: '',
    endDate: '',
    isDateError: false,
  });

  const [historyData, setHistoryData] = React.useState<ICareInsightHistory[]>(
    [],
  );
  const [summaryMessage, setSummaryMessage] = React.useState<string>('');
  const [summaryType, setSummaryType] = React.useState<string | null>(null);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSummaryType((event.target as HTMLInputElement).value);
  };

  const dispatch: any = useAppDispatch();

  /**
   * @function minimizeModal
   * @description function to minimize the summary.
   * @returns void
   */
  const minimizeModal = () => {
    const data = {
      careInsightHistory: historyData,
      message: summaryMessage,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    };
    dispatch(minimizeEvent(eventId, eventType, data));
  };

  /**
   * @function getCareInsightHistory
   * @description function to get history of all care insights.
   * @returns void
   */
  const getCareInsightHistory = async (
    startDate: any,
    endDate: any,
    error?: boolean,
  ) => {
    if (!searchRangeDateValidation(startDate, endDate, error)) {
      const response: any = await dispatch(
        getSummaryCareInsightHistory(startDate, endDate, accountId, seniorId),
      );
      if (response) {
        setHistoryData(response.results);
        setSummaryMessage((prevState) => {
          return response.message ? response.message : prevState;
        });
      }
    }
  };

  /**
   * @function handleClose
   * @description function call when we click on close button inside summary dialog.
   * @returns void
   */
  const handleClose = (): void => {
    const openDialogProp = {
      firstMessage: 'Are you sure you want to',
      boldMessage: 'close',
      secondMessage: '?',
      successButtonText: 'Confirm',
      type: DIALOG_TYPES.MESSAGE_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => dispatch(closeEvent(eventId, eventType)),
    };
    dispatch(openDialog({...openDialogProp}));
  };

  /**
   * @function handleSubmit
   * @description function call when we click on submit button inside summary dialog.
   * @returns void
   */
  const handleSubmit = () => {
    const trimmedSummaryMessage = summaryMessage.trim();
    const openDialogProp = {
      firstMessage: 'Are you sure you want to',
      boldMessage: 'proceed',
      secondMessage: '?',
      successButtonText: 'Confirm',
      type: DIALOG_TYPES.MESSAGE_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () =>
        dispatch(
          postSummaryMessage(
            seniorId,
            trimmedSummaryMessage,
            eventId,
            summaryType,
          ),
        ),
    };
    dispatch(openDialog({...openDialogProp}));
  };

  /**
   * @function handleClear
   * @description function call when we click on clear button inside summary dialog.
   * @returns void
   */
  const handleClear = () => {
    setSummaryMessage('');
    setDateRange((prevState: IDateRandeState) => {
      return {
        ...prevState,
        endDate: '',
        startDate: '',
        isDateError: false,
      };
    });
    setHistoryData([]);
  };

  /**
   * @function messageChangeHandler
   * @description Set summaryMessage state value with the latest message.
   * @returns void
   */
  const messageChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSummaryMessage(event.target.value);
  };

  const isDatesSelectedAndValid = searchRangeDateValidation(
    dateRange.startDate,
    dateRange.endDate,
    dateRange.isDateError,
  );

  const searchRangeProps = React.useMemo<IDateRangeSelectorProps>(
    () => ({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      isDateError: dateRange.isDateError,
      onStartDateSuccess: (paramDate?: any) => {
        if (paramDate) {
          paramDate = moment(paramDate).format(DATE_FORMAT);
        }

        getCareInsightHistory(
          paramDate || dateRange.startDate,
          dateRange.endDate,
          dateRange.isDateError,
        );
      },
      onEndDateSuccess: (paramDate?: any) => {
        if (paramDate) {
          paramDate = moment(paramDate).format(DATE_FORMAT);
        }

        getCareInsightHistory(
          dateRange.startDate,
          paramDate || dateRange.endDate,
          dateRange.isDateError,
        );
      },
      onChangeStartDate: (date: any) => {
        setDateRange((prevState: IDateRandeState) => {
          return {
            ...prevState,
            startDate: date,
            isDateError: false,
          };
        });
      },
      onChangeEndDate: (date: any) => {
        setDateRange((prevState: IDateRandeState) => {
          return {
            ...prevState,
            endDate: date,
            isDateError: false,
          };
        });
      },
      onError: (isError: boolean) => {
        setDateRange((prevState: IDateRandeState) => {
          return {
            ...prevState,
            isDateError: isError,
          };
        });
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dateRange],
  );

  const isData = React.useMemo(() => {
    return historyData.length > 0;
  }, [historyData]);

  /**
   * @function disableSendButton
   * @description disable the send button until the care agent put valid date and a message inside the summary.
   * @returns void
   */
  const disableSendButton = React.useMemo(() => {
    if (
      !isDatesSelectedAndValid &&
      summaryMessage &&
      !dateRange.isDateError &&
      validateSummaryMessage(summaryMessage) &&
      summaryType
    ) {
      return false;
    }
    return true;
  }, [isDatesSelectedAndValid, summaryMessage, dateRange, summaryType]);

  React.useEffect(() => {
    if (!isResident) {
      setSummaryType(CareInsightTypes.Summary);
    }
  }, [isResident]);

  React.useEffect(() => {
    setSummaryMessage(message);
    setDateRange((prevState: IDateRandeState) => {
      return {
        ...prevState,
        endDate,
        startDate,
      };
    });
    setHistoryData(careInsightHistory);
  }, [message, endDate, startDate, careInsightHistory]);

  return (
    <EventMaxDialog
      disableSendButton={disableSendButton}
      eventType={EventsType.Summary}
      fullName={fullName}
      isOpen={true}
      showMinimize={true}
      handleClose={handleClose}
      handleSubmit={handleSubmit}
      minimizeModal={minimizeModal}>
      <Box data-testid='summary-maximize' className={classes.innerContainer}>
        <Box display='flex'>
          <Typography variant='body1Bold' pr={2} width={215} lineHeight='41px'>
            Summary Type:
            <Box component='span' className={classes.errorText}>
              *
            </Box>
          </Typography>
          <InputFields
            radio={true}
            inputProps={{
              name: `summaryType`,
              disabled: false,
            }}
            eventProps={{
              value: summaryType,
              onChange: handleRadioChange,
              row: true,
            }}
            showRadioLabel
            radioItems={[
              {
                value: 'summary',
                label: 'Caregiver Summary',
              },
              {
                value: 'facility_summary',
                label: 'Facility Summary',
                disabled: !isResident,
              },
            ]}
          />
        </Box>
        <Box className={classes.summaryDescription}>
          <RemainingCharacters
            limit={APPLICATION_EVENTS.summary.summarMessageCharCount}
            value={summaryMessage}
          />
          <Fields
            inputProps={{
              'aria-label': 'summary-message-input',
              style: {padding: 0},
            }}
            name='summaryMessage'
            secondary={true}
            value={summaryMessage}
            label=''
            disabled={isDatesSelectedAndValid}
            rows={4}
            multiline={true}
            onChange={messageChangeHandler}
            spellCheck={true}
          />
        </Box>
        <Box className={classes.insightTitle}>
          <Typography variant='h4'>Insight Timeframe</Typography>
        </Box>
        <Box className={classes.dateContainer}>
          <DateRangeSelector {...searchRangeProps} />
          <Box className={classes.clearButton}>
            <Button
              aria-label='clear-button'
              onClick={handleClear}
              size='small'
              color='primary'
              disabled={dateRange.startDate && dateRange.endDate ? false : true}
              variant='contained'>
              Clear
            </Button>
          </Box>
        </Box>
        {!isData && <Box style={{height: 280}}></Box>}
        {isData && <CareInsightHistoryTable historyData={historyData} />}
      </Box>
    </EventMaxDialog>
  );
};

export default CreateSummaryMaximize;
