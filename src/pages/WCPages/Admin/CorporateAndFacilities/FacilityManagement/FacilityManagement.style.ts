import {makeStyles} from 'tss-react/mui';

export const facilityManagementStyle = makeStyles()((theme: any) => ({
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
  facilityManagementHeader: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'baseline',
  },
  facilityManagementText: {
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
  facilityHeader: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 16,
    boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.16)',
    border: 'solid 1px #d3d3d3',
    padding: '30px 17px 30px 21px',
  },
  detailLableContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  detailValues: {
    fontSize: 16,
    [theme.breakpoints.down('xl')]: {
      fontSize: 14,
    },
  },
  facilityHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: '20px',
    '&>:nth-child(2), &>:nth-child(5)': {
      flex: '0 0 46%',
      paddingLeft: '52px',
    },
    '&>:nth-child(3), &>:nth-child(6)': {
      flex: '0 0 20%',
    },
  },
}));
