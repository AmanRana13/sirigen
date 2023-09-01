import React from 'react';
import Chip from '@mui/material/Chip';
import {zoneChipStyle} from './ZoneChip.style';
import {ZoneColor, ZoneType} from 'globals/enums';

interface IZoneChipProps {
  zoneType: ZoneType;
}

/**
 * @description component to display senior/resident zone
 * @function ZoneChip
 */
const ZoneChip = ({zoneType}: IZoneChipProps) => {
  const {classes} = zoneChipStyle();
  const zoneColor: ZoneColor = ZoneColor[`zone${zoneType}`];
  return (
    <Chip
      data-testid='zone-chip'
      label={`${zoneType} Zone`}
      variant='filled'
      size='small'
      color={zoneColor}
      classes={{root: classes.welcomeContainer}}
    />
  );
};

export default ZoneChip;
