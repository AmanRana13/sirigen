import {makeStyles} from 'tss-react/mui';

export const editAdDisableStyle = makeStyles()((theme: any) => ({
  editBtn: {
    cursor: 'pointer',
    float: 'right',
    color: theme.palette.customColor.primaryLight,
    display: 'flex',
    alignItems: 'baseline',
  },
  createIcon: {
    height: 12,
    width: 12,
  },
  disableBtn: {
    cursor: 'pointer',
    float: 'left',
    color: theme.palette.customColor.primaryLight,
    padding: '0 0 0 10px',
  },
}));
