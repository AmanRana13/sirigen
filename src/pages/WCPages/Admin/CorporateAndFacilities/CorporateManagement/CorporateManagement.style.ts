import {makeStyles} from 'tss-react/mui';

export const corporateManagementStyle = makeStyles()((theme: any) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 25px 45px 25px',
    borderRadius: '16px',
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    border: `solid 1px ${theme.palette.grey.A100}`,
    backgroundColor: theme.palette.background.default,
    height: 'fit-content',
  },
  corporateManagementHeader: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'baseline',
  },
  corporateManagementText: {
    color: theme.palette.customColor.primaryLight,
    margin: '5px 0px 0px 0px',
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
  link: {
    cursor: 'pointer',
    color: theme.palette.customColor.highlight,
    textDecoration: 'underline',
  },
  disableLink: {
    color: theme.palette.customColor.disabledRemove,
    textDecorationColor: theme.palette.customColor.disabledRemove,
    pointerEvents: 'none',
    cursor: 'auto',
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
  paginationContainer: {
    marginTop: '18px',
  },
  searchbar: {
    '& form': {
      '& > .MuiInputBase-root.MuiInputBase-colorPrimary': {
        backgroundColor: theme.palette.secondary.main,
        width: '285px',
      },
    },
  },
}));
