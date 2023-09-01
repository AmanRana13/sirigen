import {Typography, Grid} from '@mui/material';
import {ISeniorDetail} from './UserDataCard.types';

interface SeniorBasicDetailsProps {
  seniorName: string;
  location: string;
  timezone: string;
}

/**
 * @description SeniorBasicDetails render all the details of the senior
 * @param seniorName name of the senior
 * @param age age of senior
 * @param location location of senior
 * @param timezone timezone of senior
 * @returns render senior Basic details
 */
const SeniorBasicDetails = ({
  seniorName,
  location,
  timezone,
}: SeniorBasicDetailsProps) => {
  const list: ISeniorDetail[] = [
    {
      label: 'Senior',
      value: seniorName || '',
    },
    {
      label: 'Location',
      value: location || '',
    },
    {
      label: 'Timezone',
      value: timezone || '',
    },
  ];
  return (
    <Grid container padding='0 15px' data-testid='senior-basic-details'>
      {list.map((item: ISeniorDetail) => (
        <Grid
          container
          key={item.label}
          style={{justifyContent: 'space-between'}}>
          <Grid item style={{flex: 2}}>
            <Typography
              key={item.label}
              style={{fontWeight: 'bold'}}
              variant='body1'>
              {item.label}:&nbsp;
            </Typography>
          </Grid>
          <Grid item style={{flex: 2.5}}>
            <Typography
              key={item.label}
              style={{overflowWrap: 'break-word'}}
              variant='body1'>
              {item.value}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default SeniorBasicDetails;
