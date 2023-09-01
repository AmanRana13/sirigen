import {makeStyles} from 'tss-react/mui';

export const ResidentTableStyle = makeStyles()((theme: any) => ({
  avatarStyle: {
    height: 64,
    margin: '0 10px 0 0',
    width: 64,
  },
  tableCellStyle: {
    '&.MuiTableCell-root': {
      verticalAlign: 'middle',
      padding: '6px 0',
    },
  },
}));
