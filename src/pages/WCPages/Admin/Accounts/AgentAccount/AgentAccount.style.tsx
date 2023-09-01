import {makeStyles} from 'tss-react/mui';

export const agentAccountStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    border: `solid 1px ${theme.palette.grey.A100}`,
    backgroundColor: theme.palette.background.default,
  },
  agentAccountHeader: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'baseline',
  },
  agentAccountText: {
    color: theme.palette.customColor.primaryLight,
    margin: '5px 0px 0px 0px',
  },
  pagination: {
    '& ul': {
      paddingTop: '24px',
      justifyContent: 'center',
      '& .Mui-selected': {
        color: theme.palette.common.white,
        background: theme.palette.primary.main,
        height: 24,
        minWidth: 24,
      },
    },
  },
  addAgentButton: {
    borderRadius: '20px',
    padding: '7px 30px 8px',
    backgroundColor: theme.palette.primary.light,
    boxShadow: '0 10px 15px 0 rgba(0, 126, 154, 0.15)',
    fontSize: '16px',
    width: '149px',
    height: 34,
  },
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
