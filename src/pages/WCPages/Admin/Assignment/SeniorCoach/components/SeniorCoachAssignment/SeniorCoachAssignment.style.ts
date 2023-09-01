import {makeStyles} from 'tss-react/mui';

export const seniorCoachAssignmentStyle = makeStyles()((theme) => ({
  seniorCardContainer: {
    display: 'grid',
    gridGap: '18px 14px',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridAutoFlow: 'unset',
    margin: '18px 0 30px 0',
  },
  emptySeniors: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'top',
    fontSize: 16,
    minHeight: 600,
  },
  pagination: {
    '& ul': {
      paddingTop: '24px',
      justifyContent: 'center',
      '& .Mui-selected': {
        color: theme.palette?.common?.white || 'white',
        background: theme.palette?.primary?.main || '#16a9d0',
        height: 24,
        minWidth: 24,
      },
    },
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
