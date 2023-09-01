import moment from 'moment';
import clsx from 'clsx';
import {Box} from '@mui/material';

import {DATE_FORMAT_SHORT_YEAR, TIME_FORMAT} from 'globals/global.constants';

import {markerTooltipStyle} from './MarkerTooltipComponent.style';

const MarkerTooltipComponent = ({
  latitude,
  longitude,
  address,
  timestamp,
  tooltipIcon,
  label,
  addressPlaceholder,
  timezone,
}: any) => {
  const {classes} = markerTooltipStyle();
  const tooltipData = [
    {
      label: 'Date & time:',
      value: moment(timestamp)
        .tz(timezone)
        .format(`${DATE_FORMAT_SHORT_YEAR} ${TIME_FORMAT}`),
    },
    {
      label: 'Address:',
      value: address,
      alternateValue: addressPlaceholder,
    },
    {
      label: 'Latitude:',
      value: latitude,
    },
    {
      label: 'Longitude:',
      value: longitude,
    },
  ];

  return (
    <>
      <Box data-testid='markerTooTipComponent'>
        {label != 'none' ? (
          <Box
            className={clsx({
              [classes.markerNumber]: true,
              [classes.threeDigitWidth]: label.toString().length == 3,
            })}>
            {label}
          </Box>
        ) : (
          <img src={tooltipIcon} width='28px' height='28px' />
        )}
      </Box>
      <Box mt={1}>
        {tooltipData.map((data) => {
          return (
            <Box key={data.label} className={classes.tooltipDetailContainer}>
              <Box width={100}>
                <Box className={classes.tooltipLabel}>{data.label}</Box>
              </Box>
              <Box width={180}>
                <Box
                  className={clsx(
                    {[classes.tooltipValue]: data.value},
                    {[classes.tooltipAlternateValue]: !data.value},
                  )}>
                  {data.value || data.alternateValue}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default MarkerTooltipComponent;
