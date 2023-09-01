import React from 'react';
import {ZoneColor, ZoneType} from 'globals/enums';
import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import {zoneSelectStyle} from './ZoneSelect.style';

interface IZoneSelectProps {
  zoneType?: ZoneType | '';
  onChange?: (e: SelectChangeEvent) => void;
  hasAllOption?: boolean;
}
const MENU_ITEMS = Object.values(ZoneType);
/**
 * @description component to display senior/resident zone
 * @function ZoneSelect
 */
const ZoneSelect = ({
  zoneType = '',
  onChange = (e: SelectChangeEvent) => {},
  hasAllOption = false,
}: IZoneSelectProps) => {
  const zoneColor: ZoneColor = (
    zoneType ? ZoneColor[`zone${zoneType}`] : ''
  ) as ZoneColor;
  const {classes} = zoneSelectStyle({zoneColor, hasAllOption});
  return (
    <Select
      displayEmpty
      value={zoneType}
      onChange={onChange}
      className={classes.root}
      inputProps={{
        'data-testid': 'zone-select',
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}>
      {hasAllOption ? (
        <MenuItem data-testid='allZones' value=''>All Zones</MenuItem>
      ) : (
        <MenuItem data-testid='selectZone' disabled value='' style={{display: 'none'}}>
          Select zone
        </MenuItem>
      )}
      {MENU_ITEMS.map((zone) => (
        <MenuItem data-testid={`${zone}Zone`} key={zone} value={zone}>
          {`${zone} Zone`}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ZoneSelect;
