import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Box, Button} from '@mui/material';

import {MedicalHistory} from './components/MedicalHistory.component';
import {MedicalPrescription} from './components/MedicalPrescription.component';

import {addUserStyle} from '../AddUser.style';
import {medicalInfoStyle} from './MedicalInfo.style';
import {
  defaultHistoryValues,
  defaultPrescriptionValue,
} from './components/formData';
import {emptyStringToNull, trimValues} from 'globals/global.functions';
import {setPrescriptionData} from './MedicalInfo.action';

let requestBody: any = {
  history: {},
  prescription: {},
};

const MedicalInfoComponent = React.memo(
  ({medicalInfo, saveMedicalInfo}: any) => {
    const {classes} = addUserStyle();

    useEffect(() => {
      requestBody = {
        history: {},
        prescription: {},
      };
    }, []);

    const historyData = medicalInfo.history
      ? medicalInfo.history
      : defaultHistoryValues;

    if (historyData) {
      const pacemakerUser = historyData.pacemaker_user;
      if (pacemakerUser !== '' && pacemakerUser !== undefined) {
        historyData.pacemaker_user =
          pacemakerUser === true || pacemakerUser === 'Yes' ? 'Yes' : 'No';
      } else {
        historyData.pacemaker_user = '';
      }

      historyData.addictions = historyData?.addictions ?? [
        {value: '', data: ''},
      ];
      historyData.other_exams = historyData?.other_exams ?? [
        {value: '', date: ''},
      ];
      historyData.injuries = historyData?.injuries ?? [{value: '', date: ''}];
      historyData.vaccines = historyData?.vaccines ?? [{value: '', date: ''}];
      historyData.disabilities = historyData?.disabilities ?? [
        {value: '', date: ''},
      ];
    }

    const prescriptionData = medicalInfo.prescription;

    const {
      control,
      register,
      handleSubmit,
      getValues,
      formState: {errors},
      watch,
      setValue,
    } = useForm({
      mode: 'onChange',
      defaultValues: {
        history: historyData ? [historyData] : defaultHistoryValues,
        prescription:
          prescriptionData && prescriptionData.length > 0
            ? prescriptionData
            : [defaultPrescriptionValue],
      },
    });
    const addNullValueArray = React.useCallback((obj: any) => {
      for (const key in obj) {
        const value = obj[key];
        if (Array.isArray(value)) {
          let isEmpty = true;
          value.forEach((item) => {
            for (const key in item) {
              if (item[key] !== null && item[key] != '') {
                isEmpty = false;
              }
            }
          });
          obj[`${key}`] = isEmpty ? null : obj[key];
        }
      }
      return obj;
    }, []);

    const checkProperties = React.useCallback((obj: any) => {
      for (const key in obj) {
        const value = obj[key];
        let isEmpty = true;
        if (key === 'medication_schedule') {
          value.forEach((item: any) => {
            for (const key in item) {
              if (item[key] !== null && item[key] != '') {
                isEmpty = false;
              }
            }
          });
          return isEmpty;
        } else {
          if (value !== null && value != '') return false;
        }
      }
    }, []);

    const isFoodRequired = () => {
      if (prescriptionData.is_food_required === 'With food') {
        return true;
      } else if (prescriptionData.is_food_required === 'Without food') {
        return false;
      } else return null;
    };

    const onSubmit = React.useCallback((data: any) => {
      const medicalHisotry = addNullValueArray(data.history[0]);
      medicalHisotry['pacemaker_user'] =
        medicalHisotry.pacemaker_user === 'Yes' ? true : false;

      if (!medicalHisotry.pacemaker_user) {
        medicalHisotry.pacemaker_implementation_date = null;
      }
      Object.keys(medicalHisotry).forEach((ele) => {
        if (Array.isArray(medicalHisotry[ele])) {
          medicalHisotry[ele] = medicalHisotry[ele].filter((subEle: any) => {
            if (ele === 'addictions') {
              //checking for if addictions value is present
              if (subEle.value) {
                //checking for resetting addictions tab
                if (subEle.value !== 'Select') {
                  return subEle;
                } else {
                  return null;
                }
              }
            }
            //verification for others only if value and date is available
            else {
              if (subEle.value && subEle.date) {
                return subEle;
              }
            }
          });
          if (!medicalHisotry[ele].length) {
            medicalHisotry[ele] = null;
          }
        }
      });
      requestBody.history = emptyStringToNull(medicalHisotry);
      data.prescription.forEach((prescription: any) => {
        let prescriptionData = addNullValueArray(prescription);
        prescriptionData = emptyStringToNull(prescriptionData);
        prescriptionData.duration_of_medication = prescriptionData.duration_of_medication
          ? parseInt(prescriptionData.duration_of_medication)
          : null;
        prescriptionData.is_food_required = isFoodRequired();
        prescriptionData.remaining_pills = prescriptionData.remaining_pills
          ? parseInt(prescriptionData.remaining_pills)
          : null;
        prescriptionData.remaining_refill = prescriptionData.remaining_refill
          ? parseInt(prescriptionData.remaining_refill)
          : null;
        prescriptionData.frequency = parseInt(prescriptionData.frequency);

        prescriptionData.dose = prescriptionData.dose
          ? parseInt(prescriptionData.dose)
          : null;

        if (prescriptionData.medication_schedule) {
          let medication_schedule: any = [];
          prescriptionData.medication_schedule.forEach((medicationDay: any) => {
            const day = medicationDay.day;
            delete medicationDay.day;
            const keys = Object.keys(medicationDay);
            if (day === 'Everyday') {
              const days = [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ];
              days.forEach((day) => {
                keys.forEach((key) => {
                  const value = medicationDay[`${key}`];
                  const data = value
                    ? {day, time: value, timezone: '-07:00'}
                    : null;
                  data && medication_schedule.push(data);
                });
              });
            } else {
              keys.forEach((key) => {
                const value = medicationDay[`${key}`];
                const data = value
                  ? {day, time: value, timezone: '-07:00'}
                  : null;
                data && medication_schedule.push(data);
              });
            }
          });
          prescriptionData.medication_schedule =
            medication_schedule.length > 0 ? medication_schedule : null;
        }

        if (prescriptionData.medication_id) {
          if (requestBody.prescription.modification) {
            requestBody.prescription.modification.push(prescriptionData);
          } else {
            requestBody.prescription.modification = [prescriptionData];
          }
        } else {
          delete prescriptionData.medication_id;
          const isEmpty = checkProperties(prescriptionData);
          if (requestBody.prescription.addition && !isEmpty) {
            requestBody.prescription.addition.push(prescriptionData);
          } else {
            if (!isEmpty) {
              requestBody.prescription.addition = [prescriptionData];
            }
          }
        }
      });
      const trimmedData = trimValues(requestBody);
      saveMedicalInfo(trimmedData)
        .then((res: any) => {
          const prescriptionData = setPrescriptionData(res);
          setValue('prescription', [...prescriptionData]);
        })
        .catch((err: any) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
      requestBody = {
        history: {},
        prescription: {},
      };
    }, []);

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className={classes.title} data-testid='medical-info'>
            <span>Medical Info</span>
          </Box>
          <MedicalHistory
            {...{control, register, getValues, setValue, errors, watch}}
          />
          <MedicalPrescription
            {...{
              control,
              register,
              getValues,
              setValue,
              errors,
              watch,
            }}
            deletePrescription={(medication_id: any) => {
              if (!requestBody.prescription.deletion) {
                requestBody.prescription.deletion = [medication_id];
              } else {
                requestBody.prescription.deletion.push(medication_id);
              }
            }}
          />
          <Buttons />
        </form>
      </>
    );
  },
);

const RenderCancelButton = () => {
  const {classes: addUserClasses} = addUserStyle();
  return (
    <Button
      size='large'
      variant='outlined'
      color='primary'
      className={addUserClasses.cancelButton}>
      Cancel
    </Button>
  );
};

const RenderSaveButton = ({medicalClasses}: any) => {
  return (
    <Button
      size='large'
      color='primary'
      variant='contained'
      type='submit'
      className={medicalClasses.buttonStyle}>
      Save
    </Button>
  );
};
const Buttons = React.memo(() => {
  const {classes: medicalClasses} = medicalInfoStyle();

  return (
    <Box className={medicalClasses.buttonContainerStyle}>
      <RenderCancelButton />
      <RenderSaveButton medicalClasses={medicalClasses} />
    </Box>
  );
});
export {MedicalInfoComponent};
