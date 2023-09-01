import {makeStyles} from 'tss-react/mui';

export const zoneChipStyle = makeStyles()((theme) => ({
  welcomeContainer: {
    width: '138px',
    border: `1px solid ${theme.palette.common.black}`,
    fontSize: theme.typography.body1.fontSize,
  },
}));
