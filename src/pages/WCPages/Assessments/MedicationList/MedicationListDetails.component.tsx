/* eslint-disable max-len */
import {Typography, Grid, Box} from '@mui/material';
import {maskPhoneNumber} from 'globals/global.functions';
import {IMedicationListDetailProps} from './MedicationList.types';
import {
  capitalizeFirstLetter,
  capitalizeAndJoinStrings,
} from 'globals/global.functions';
import {DATE_FORMAT} from 'globals/global.constants';
import moment from 'moment';

/**
 * @function formatDoseFrequency method to format the dose frequency in reuired format
 * @param {string | number} time
 * @param {string} unit
 * @returns {string}
 */
const formatDoseFrequency = (time: string | number, unit: string) => {
  const frequency = `${time} ${capitalizeFirstLetter(unit)}`;
  if (time !== '1' && unit) return frequency + 's';
  return frequency;
};

/**
 * @description component for each Medication List
 * @param {IMedicationListDetailProps} data
 * @returns {JSX}
 */
const MedicationListDetails = ({data}: IMedicationListDetailProps) => {
  const list = [
    {
      label: 'Dose Form',
      value: capitalizeFirstLetter(data.doseForm),
    },
    {
      label: 'Dose Frequency',
      value:
        data.doseFrequency.doseFrequencyTime &&
        data.doseFrequency.doseFrequencyUnit
          ? `Every ` +
            formatDoseFrequency(
              data?.doseFrequency?.doseFrequencyTime,
              data?.doseFrequency?.doseFrequencyUnit,
            )
          : '',
    },
    {
      label: 'When do they take it',
      value: capitalizeAndJoinStrings(data?.whenDoTheyTakeIt || [], ', '),
    },
    {
      label: 'Date Prescribed',
      value: data.datePrescribed
        ? moment
            .utc(data.datePrescribed)
            .tz(moment.tz.guess())
            .format(DATE_FORMAT)
        : '',
    },
    {
      label: 'Date Discontinued',
      value: data.dateDiscontinued
        ? moment
            .utc(data.dateDiscontinued)
            .tz(moment.tz.guess())
            .format(DATE_FORMAT)
        : '',
    },
    {
      label: 'Pharmacy Name',
      value: data.pharmacyName,
    },
    {
      label: 'Pharmacy Phone#',
      value: maskPhoneNumber(data.pharmacyPhone),
    },
  ];

  return (
    <Box mt={3} display='flex' width='100%'>
      <Box
        display='flex'
        flexDirection='column'
        minWidth={430}
        style={{marginRight: 40}}>
        {list.map((item) => (
          <Grid container key={item.label} direction='row'>
            <Grid item width={180}>
              <Typography key={item.label} variant='body1Bold'>
                {item.label}:&nbsp;
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                key={item.label}
                style={{wordBreak: 'break-all'}}
                variant='body1'>
                {item.value || '-'}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </Box>
      <Box display='flex' flex={2}>
        <Typography variant='body1Bold'>Notes:&nbsp;</Typography>
        <Typography style={{wordBreak: 'break-all'}} variant='body1'>
          {data.notes || '-'}
        </Typography>
      </Box>
    </Box>
  );
};

export default MedicationListDetails;
