import React from 'react';
import ControlledDatePicker from '../../common/ControlledDatePicker/ControlledDatePicker';
import {addDate, subtractDate} from '../../globals/date.functions';
import {
  DATE_FORMAT,
  DATE_ERROR_MESSAGE,
  INVALID_DATE,
} from '../../globals/global.constants';
import {IDateRangeSelectorProps} from './DateRangeSelector.types';
import moment from 'moment-timezone';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';

const DateRangeSelector = ({
  startDate,
  endDate,
  isDateError,
  onStartDateSuccess,
  onEndDateSuccess,
  onChangeStartDate,
  onChangeEndDate,
  onError,
}: IDateRangeSelectorProps): any => {
  const dispatch: any = useAppDispatch();

  const accountCreatedDate = useAppSelector(
    (state: any) => state.common.seniorDetail.minimalInfo.created_date,
  );

  const [errorTextStart, setErrorTextStart] = React.useState('');
  const [errorTextEnd, setErrorTextEnd] = React.useState('');

  const datePickerData = React.useMemo(() => {
    const dateErrorhandler = (error: any, errorFn: any, errorMessage: any) => {
      switch (error) {
        case 'minDate':
          errorFn(errorMessage.minDate);
          break;
        case 'invalidDate':
          errorFn(errorMessage.invalidDate);
          break;
        case 'disableFuture':
          errorFn(errorMessage.disableFuture);
          break;
        default:
          errorFn('');
      }

      if (error) {
        onError(true);
      }
    };
    return [
      {
        value: startDate || null,
        id: 'dateFrom',
        //variant: 'inline',
        autoOk: true,
        label: 'From',
        disableToolbar: true,
        disableFuture: true,
        format: DATE_FORMAT,
        inputProps: {
          placeholder: DATE_FORMAT,
          onBlur: () => {
            onStartDateSuccess();
          },
        },
        helperText: errorTextStart,
        maxDate: endDate ? endDate : undefined,
        minDate: accountCreatedDate,
        error: errorTextStart,
        onAccept: (date: any) => {
          onStartDateSuccess(date);
        },
        onChange: (date: any, value: any) => {
          if (value) {
            onChangeStartDate(moment(value, DATE_FORMAT, true));
          } else {
            onChangeStartDate(moment(date).format(DATE_FORMAT));
          }
        },
        onError: (error: any) => {
          const errorMessage = {
            minDate: DATE_ERROR_MESSAGE.beforeOnboarding,
            invalidDate: INVALID_DATE,
            disableFuture: DATE_ERROR_MESSAGE.maxDateMessage,
          };
          dateErrorhandler(
            error,
            (message: string) => {
              setErrorTextStart(message);
            },
            errorMessage,
          );
        },
        onPrevMouseDown: () => {
          onChangeStartDate(subtractDate(startDate, 1, 'days'));
        },
        onPrevMouseUp: () => {
          onStartDateSuccess();
        },
        onNextMouseDown: () => {
          onChangeStartDate(addDate(startDate, 1, 'days'));
        },
        onNextMouseUp: () => {
          onStartDateSuccess();
        },
      },
      {
        value: endDate || null,
        id: 'dateTo',
        //variant: 'inline',
        autoOk: true,
        label: 'To',
        disableToolbar: true,
        disableFuture: true,
        format: DATE_FORMAT,
        inputProps: {
          placeholder: DATE_FORMAT,
          onBlur: () => {
            onEndDateSuccess();
          },
        },
        helperText: errorTextEnd,
        error: errorTextEnd,
        minDate: startDate ? startDate : undefined,
        onAccept: (date: any) => {
          onEndDateSuccess(date);
        },

        onChange: (date: any, value: any) => {
          if (value) {
            onChangeEndDate(moment(value, DATE_FORMAT, true));
          } else {
            onChangeEndDate(moment(date).format(DATE_FORMAT));
          }
        },
        onError: (error: any) => {
          const errorMessage = {
            minDate: DATE_ERROR_MESSAGE.minDateMessage,
            invalidDate: INVALID_DATE,
            disableFuture: DATE_ERROR_MESSAGE.futureDateDisable,
          };
          dateErrorhandler(
            error,
            (message: string) => {
              setErrorTextEnd(message);
            },
            errorMessage,
          );
        },
        onPrevMouseDown: () => {
          onChangeEndDate(subtractDate(endDate, 1, 'days'));
        },
        onPrevMouseUp: () => {
          onEndDateSuccess();
        },
        onNextMouseDown: () => {
          onChangeEndDate(addDate(endDate, 1, 'days'));
        },
        onNextMouseUp: () => {
          onEndDateSuccess();
        },
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    accountCreatedDate,
    startDate,
    endDate,
    dispatch,
    isDateError,
    errorTextStart,
    errorTextEnd,
  ]);

  return datePickerData.map((datePickerItem) => {
    return <ControlledDatePicker key={datePickerItem.id} {...datePickerItem} />;
  });
};

export default React.memo(DateRangeSelector);
