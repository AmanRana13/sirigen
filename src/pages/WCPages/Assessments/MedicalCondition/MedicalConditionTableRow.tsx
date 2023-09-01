/* eslint-disable max-len */
import React from 'react';
import moment from 'moment';
import {useAppDispatch, useAppSelector} from 'hooks/reduxHooks';
import {TableCell, TableRow, Typography} from '@mui/material';
import {useMedicalCondtionStyle} from './MedicalCondition.style';
import {IMedicalConditionData} from './MedicalCondition.types';
import {InputFields} from 'common/InputFields';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import clsx from 'clsx';
import RemainingCharacters from 'common/RemainingCharacters/RemainingCharacters';
import {
  APPLICATION_EVENTS,
  DATE_FORMAT,
  DIALOG_TYPES,
  INVALID_DATE,
} from 'globals/global.constants';
import {Float, ThemeVersion} from 'globals/enums';
import {openDialog} from 'store/commonReducer/common.action';
import {constructName} from 'globals/global.functions';
interface IMedicalConditionTableRowProps extends IMedicalConditionData {
  disabled: boolean;
  setError: (dateErrorText: boolean) => void;
  setMedicalConditionData: (medicalConditionData: any) => void;
  setDeletedMedicalConditions: (
    medicalConditionData: IMedicalConditionData,
  ) => void;
  setModifiedMedicalConditions: (
    medicalConditionData: IMedicalConditionData,
  ) => void;
}
const radioItem = [
  {
    value: 'minor',
    label: 'Minor',
  },
  {
    value: 'moderate',
    label: 'Moderate',
  },
  {
    value: 'major',
    label: 'Major',
  },
  {
    value: 'extreme',
    label: 'Extreme',
  },
];

const MedicalConditionTableRow = ({
  date_of_onset,
  resolved,
  condition,
  notes,
  severity_level,
  setMedicalConditionData,
  setDeletedMedicalConditions,
  setModifiedMedicalConditions,
  disabled,
  setError,
}: IMedicalConditionTableRowProps) => {
  const {classes} = useMedicalCondtionStyle();
  const dispatch: any = useAppDispatch();
  const [dateErrorText, setDateErrorText] = React.useState('');
  const name = useAppSelector(
    (state: any) => state?.common?.seniorDetail?.minimalInfo?.name || {},
  );

  /**
   * @function handleChange
   * @description to update the values of input fields
   * @param value
   * @param name
   * @param medicalCondition
   */
  const handleChange = React.useCallback(
    (value: string, name: string, condition: string) => {
      setMedicalConditionData((prevState: IMedicalConditionData[]) => {
        return prevState?.map((item: IMedicalConditionData) => {
          if (item.condition === condition && !item.resolved) {
            setModifiedMedicalConditions({...item});
            return {
              ...item,
              [name]: value,
            };
          }
          return {...item};
        });
      });
    },
    [setMedicalConditionData, setModifiedMedicalConditions],
  );

  /**
   * @function deleteMedicalConditionhandler
   * @description handle deletion of any particular medical condition from table
   * @param medicalCondition
   */
  const deleteMedicalConditionhandler = (medicalCondition: string) => {
    const boldMessage = `Are you sure you want to delete the Medical Condition ${medicalCondition}?`;
    const successButtonText = 'Yes';
    const cancelButtonText = 'No';
    const openDialogProp = {
      boldMessage,
      successButtonText,
      cancelButtonText,
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        setMedicalConditionData((prevState: IMedicalConditionData[]) => {
          return prevState?.filter((item: IMedicalConditionData) => {
            if (item.condition !== medicalCondition) {
              return {
                ...item,
              };
            } else if (!item.resolved) {
              setDeletedMedicalConditions({
                ...item,
              });
            }
          });
        });
      },
    };
    dispatch(openDialog({...openDialogProp}));
  };

  /**
   * @function handleResolve
   * @description handle resolve action of any particular medical condition from table
   */
  const handleResolve = React.useCallback(() => {
    const openDialogProp = {
      /* eslint-disable max-len */
      boldMessage: `Are you sure you want to resolve ‘${condition}’ for ${constructName(
        name?.first_name,
        name?.middle_name,
        name?.last_name,
      )}?`,
      successButtonText: 'Yes',
      cancelButtonText: 'No',
      type: DIALOG_TYPES.ADMIN_ACTION_DIALOG,
      isFailButton: true,
      onSuccessButton: () => {
        handleChange(moment().toISOString(), 'resolved', condition);
      },
    };
    dispatch(openDialog({...openDialogProp}));
  }, [condition, name, dispatch, handleChange]);
  return (
    <>
      <TableRow>
        <TableCell
          className={classes.tableDataRow}
          style={{
            maxWidth: 200,
            minWidth: 200,
            position: 'relative',
            paddingBottom: '2.5rem',
          }}
          component='th'
          scope='row'
          align='left'>
          <Typography variant='body1'>{condition}</Typography>
          {resolved ? (
            <Typography variant='body1' className={classes.resolved}>
              Resolved {moment(resolved).format(DATE_FORMAT)}
            </Typography>
          ) : (
            !disabled && (
              <Typography
                variant='body1'
                className={classes.resolve}
                onClick={handleResolve}>
                Resolve Condition
              </Typography>
            )
          )}
        </TableCell>
        <TableCell
          className={classes.tableDataRow}
          style={{maxWidth: 125, minWidth: 125}}
          component='th'
          scope='row'
          align='left'>
          {resolved ? (
            <Typography variant='body1' style={{textTransform: 'capitalize'}}>
              {severity_level}
            </Typography>
          ) : (
            <InputFields
              showRadioLabel={true}
              radio={true}
              className={classes.optionsRadioField}
              inputProps={{
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                },
                name: `radio`,
                disabled: disabled,
              }}
              eventProps={{
                value: severity_level,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(e.target.value, 'severity_level', condition),
              }}
              radioItems={radioItem.map((option: any) => {
                return {
                  value: option.value,
                  label: option.label,
                };
              })}
            />
          )}
        </TableCell>
        <TableCell
          className={classes.tableDataRow}
          style={{maxWidth: 161, minWidth: 161}}
          component='th'
          scope='row'
          align='left'>
          {resolved ? (
            <Typography variant='body1'>
              {date_of_onset && moment(date_of_onset).format(DATE_FORMAT)}
            </Typography>
          ) : (
            <InputFields
              controlledDate
              inputProps={{name: 'date_of_onset'}}
              isError={dateErrorText ? true : false}
              errorText={dateErrorText}
              eventProps={{
                valueDefault: null,
                disableFuture: true,
                value: date_of_onset,
                onChange: (value: string) => {
                  handleChange(value, 'date_of_onset', condition);
                },
                onError: (error: any) => {
                  if (error) {
                    setDateErrorText(INVALID_DATE);
                    setError(true);
                  } else {
                    setDateErrorText('');
                    setError(false);
                  }
                },
                disabled: disabled,
                minDate: undefined,
                maxDate: moment().format(DATE_FORMAT),
              }}
              //isErrorCustomeStyle
            />
          )}
        </TableCell>
        <TableCell
          className={classes.tableDataRow}
          style={{maxWidth: 550, minWidth: 550}}
          component='th'
          scope='row'
          align='left'>
          {resolved ? (
            <Typography variant='body1'>{notes}</Typography>
          ) : (
            <>
              <InputFields
                inputProps={{
                  placeholder: 'Please enter notes here',
                  name: 'notes',
                  required: true,
                  disabled: disabled,
                  maxLength: 500,
                  style: {color: disabled ? '#a7a7a7' : '#000000'},
                }}
                eventProps={{
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e.target.value, 'notes', condition),
                  value: notes,
                }}
                multiline
                rows={5}
                isLabel={false}
                label=''
              />
              <RemainingCharacters
                limit={
                  APPLICATION_EVENTS.medicalAssessment
                    .medicalAssessmentNotesCharCount
                }
                value={notes?.replace(/\s\s+/g, ' ') || ''}
                themeVersion={ThemeVersion.v2}
                float={Float.Right}
              />
            </>
          )}
        </TableCell>
        <TableCell className={classes.tableBtn} align='left'>
          {!resolved && (
            <HighlightOffIcon
              data-testid='deleteIcon'
              onClick={() => deleteMedicalConditionhandler(condition)}
              className={clsx({
                [classes.removeIcon]: true,
                [classes.removeIconDisable]: disabled,
              })}
            />
          )}
        </TableCell>
      </TableRow>
    </>
  );
};
export default MedicalConditionTableRow;
