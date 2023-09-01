import {ZoneColor, ZoneType} from 'globals/enums';
import {makeStyles} from 'tss-react/mui';

export const zoneSelectStyle: any = makeStyles<{
  zoneColor: ZoneColor | '';
  hasAllOption: boolean;
}>()((theme: any, {zoneColor, hasAllOption}) => ({
  root: {
    border: `1px solid ${theme.palette.customColor.borderGrey}`,
    overflow: 'hidden',
    borderRadius: 8,
    color:
      theme.palette[zoneColor]?.contrastText ||
      (hasAllOption
        ? theme.palette.customColor?.black
        : theme.palette.customColor?.disabledRemove),
    backgroundColor:
      theme.palette[zoneColor]?.main || theme.palette.background.default,
    minWidth: '160px',
    height: '35px',
    '&.Mui-focused.MuiOutlinedInput-root fieldset': {
      borderWidth: 0,
    },
  },
}));
