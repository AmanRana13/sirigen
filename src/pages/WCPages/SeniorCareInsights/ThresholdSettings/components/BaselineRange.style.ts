import {makeStyles} from 'tss-react/mui';

export const baselineRangeStyle = makeStyles()((theme: any) => ({
  inputContainer: {
    width: '86%',
    display: 'flex',
    marginTop: 40,
    padding: 0,
    marginRight: 0,
    justifyContent: 'space-between',
    '& div': {
      width: '70%',
    },
  },
  helperText: {
    color: theme.palette.customColor.grey,
  },
  refreshButton: {
    flex: 0,
    color: '#16A9D0',
    display: 'flex',
    position: 'relative',
    right: '13%',
    marginTop: '6%',
    alignItems: 'center',
    cursor: 'pointer',
  },
  disableRefreshButton: {
    pointerEvents: 'none',
    color: '#00000042',
  },
  tooltip: {
    backgroundColor: theme.palette.customColor.white,
    color: theme.palette.customColor.black,
    borderRadius: 0,
    boxShadow: `0px 8px 12px ${theme.palette.customColor.boxShadow}`,
  },
}));
