import {Typography, Grid} from '@mui/material';
import {ISeniorDetail} from './UserDataCard.types';
import ShowHyphen from 'common/ShowHyphen/ShowHyphen';

interface ResidentBasicDetailsProps {
  ResidentName: string;
  facility?: string;
  location: string;
  timezone: string;
}

/**
 * @description ResidentBasicDetails render all the details of the Resident
 * @param ResidentName name of the Resident
 * @param location location of Resident
 * @param timezone timezone of Resident
 * @returns render Resident Basic details
 */
const ResidentBasicDetails = ({
  ResidentName,
  facility,
  location,
  timezone,
}: ResidentBasicDetailsProps) => {
  const list: ISeniorDetail[] = [
    {
      label: 'Resident',
      value: ResidentName || '',
    },
    {
      label: 'Location',
      value: location || '',
    },
    {
      label: 'Timezone',
      value: timezone || '',
    },
    {
      label: 'Facility',
      value: '',
    },
  ];
  return (
    <Grid container padding='0 15px' data-testid='resident-basic-details'>
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
              <ShowHyphen>{item.value}</ShowHyphen>
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default ResidentBasicDetails;
