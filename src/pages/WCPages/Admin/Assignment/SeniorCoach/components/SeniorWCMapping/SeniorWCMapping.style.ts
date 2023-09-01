import {makeStyles} from 'tss-react/mui';

export const seniorWCMappingStyles = makeStyles()((theme: any) => ({
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
}));
