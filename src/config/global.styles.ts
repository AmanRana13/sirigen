import {makeStyles} from 'tss-react/mui';

const globalUseStyles = makeStyles()((theme) => ({
  smallButton: {
    width: 'fit-content',
    minWidth: '180px',
    height: 38,
    padding: '8px 18px',
    borderRadius: 46,
    fontSize: 18,
    fontWeight: 600,
    color: theme.palette.common.white,
    '&.MuiButton-containedPrimary': {
      '&:disabled': {
        backgroundColor: '#868686',
        color: '#FFFFFF',
      },
    },
  },
  smallButtonOutlined: {
    width: 180,
    height: 38,
    padding: '8px 18px',
    borderRadius: 46,
    fontSize: 18,
    fontWeight: 600,
    color: '#6B6B6B',
    border: '1px solid #0000003b',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: '#0000000a',
      border: '1px solid #0000003b',
    },
  },
  largeButton: {},
}));

export default globalUseStyles;
